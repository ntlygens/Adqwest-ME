import { Hono } from "hono";
import { cors } from "hono/cors";
import type { D1Database, KVNamespace } from "@cloudflare/workers-types";

type Env = {
DB: D1Database;
SITE_KV: KVNamespace;
RESEND_API_KEY: string;
ASSETS: any;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// -------------------- CONTENT --------------------
app.get("/api/content/:page", async (c) => {
const page = c.req.param("page");

const cached = await c.env.SITE_KV.get(page);
if (cached) return c.json(JSON.parse(cached));

const result = await c.env.DB.prepare(
"SELECT * FROM page_content WHERE page = ?"
).bind(page).all();

const data = result.results;

await c.env.SITE_KV.put(page, JSON.stringify(data), { expirationTtl: 300 });

return c.json(data);
});

// -------------------- DEMO REQUEST --------------------
app.post("/api/demo-request", async (c) => {
const body = await c.req.json();
const { name, email, company, vertical, phone, message } = body;

const insert = await c.env.DB.prepare(
`INSERT INTO demo_requests (name,email,company,vertical,phone,message)
     VALUES (?,?,?,?,?,?)`
)
.bind(name, email, company, vertical, phone, message)
.run();

// EMAIL (Resend style)
await fetch("https://api.resend.com/emails", {
method: "POST",
headers: {
Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
from: "Adqwest-ME [noreply@adqwestme.com](mailto:noreply@adqwestme.com)",
to: email,
subject: "Demo Request Received",
html: `<h2>Thanks ${name}</h2><p>We will contact you soon.</p>`,
}),
});

return c.json({ success: true, id: insert.meta.last_row_id });
});

// -------------------- ADMIN LOGIN --------------------
app.post("/api/admin/login", async (c) => {
const { email, password } = await c.req.json();

const user = await c.env.DB.prepare(
"SELECT * FROM admins WHERE email = ?"
).bind(email).first();

if (!user || password !== "demo123") {
return c.json({ success: false }, 401);
}

return c.json({
token: btoa(`${email}:${Date.now()}`),
role: user.role,
});
});

// -------------------- FALLBACK SPA --------------------
app.get("*", async (c) => {
return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
