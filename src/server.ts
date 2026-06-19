import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { D1Database, KVNamespace, ExecutionContext } from '@cloudflare/workers-types';

type Env = {
  DB: D1Database;
  SITE_KV: KVNamespace;
  RESEND_API_KEY: string;
  ASSETS: any;
};

// -------------------- ANGULAR SSR --------------------
/// USE this for local staging/testing with wrangler dev (allow all hosts)
const angularApp = new AngularAppEngine({
  allowedHosts: ['*'],
});

// const angularApp = new AngularAppEngine({
//   allowedHosts: [
//     'localhost',
//     'adqwest-me.ntlygens.workers.dev',
//     'adqwestme.com',
//     'www.adqwestme.com',
//   ],
// });

// -------------------- HONO API --------------------
const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

// -------------------- CONTENT --------------------
app.get('/api/content/:page', async (c) => {
  const page = c.req.param('page');

  const cached = await c.env.SITE_KV.get(page);
  if (cached) return c.json(JSON.parse(cached));

  const result = await c.env.DB.prepare(
    'SELECT * FROM page_content WHERE page = ?'
  )
    .bind(page)
    .all();

  const data = result.results;

  await c.env.SITE_KV.put(page, JSON.stringify(data), { expirationTtl: 300 });

  return c.json(data);
});

// -------------------- DEMO REQUEST --------------------
app.post('/api/demo-request', async (c) => {
  const body = await c.req.json();
  const { name, email, company, market, phone, message } = body;

  if (!name || !email || !company || !market) {
    return c.json({ success: false, error: 'Missing required fields' }, 400);
  }

  // const sendEmail = async ({
  //   to,
  //   subject,
  //   html,
  // }: {
  //   to: string;
  //   subject: string;
  //   html: string;
  // }) => {
  //   const resp = await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'Adqwest-ME <noreply@adqwestme.com>',
  //       to,
  //       subject,
  //       html,
  //     }),
  //   });
  //   return resp.ok;
  // };

  const sendEmail = async ({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) => {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Adqwest-ME <noreply@adqwestme.com>', // use verified sender
        to,
        subject,
        html,
      }),
    });

    // FIX: log the actual Resend error instead of swallowing it
    if (!resp.ok) {
      const error = await resp.text();
      console.error(`Resend error ${resp.status}:`, error);
      throw new Error(`Email failed: ${resp.status} — ${error}`);
    }

    return true;
  };

  const insert = await c.env.DB.prepare(
    `INSERT INTO demo_requests (name, email, company, market, phone, message)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(name, email, company, market, phone ?? null, message ?? null)
    .run();

  await sendEmail({
    to: email,
    subject: 'Demo Request Received',
    html: `<h2>Thanks ${name}!</h2>
           <p>We received your demo request and will contact you soon.</p>
           <p><strong>Company:</strong> ${company}</p>
           <p><strong>Market:</strong> ${market}</p>`,
  });

  await sendEmail({
    to: 'info@adqwestme.com',
    subject: `New Demo Request: ${company}`,
    html: `<h2>New Demo Request</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Company:</strong> ${company}</p>
           <p><strong>Market:</strong> ${market}</p>
           <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
           <p><strong>Message:</strong> ${message || 'None'}</p>`,
  });

  // return c.json({ success: true, id: insert.meta.last_row_id });


  try {
    await sendEmail({ to: email, subject: 'Demo Request Received', html: `...` });
    await sendEmail({ to: 'info@adqwestme.com', subject: `New Demo Request: ${company}`, html: `...` });
  } catch (err) {
    // Log it but don't return 500 — the DB insert already succeeded
    console.error('Email send failed:', err);
  }

  return c.json({ success: true, id: insert.meta.last_row_id });
});



// -------------------- ADMIN LOGIN --------------------
app.post('/api/admin/login', async (c) => {
  const { email, password } = await c.req.json();

  const user = await c.env.DB.prepare(
    'SELECT * FROM admins WHERE email = ?'
  )
    .bind(email)
    .first();

  if (!user || password !== 'demo123') {
    return c.json({ success: false }, 401);
  }

  return c.json({
    token: btoa(`${email}:${Date.now()}`),
    role: user['role'],
  });
});

// -------------------- ANGULAR SSR FALLBACK --------------------
// All non-API requests fall through to Angular SSR for rendering
app.get('*', async (c) => {
  const res = await angularApp.handle(c.req.raw);
  return res ?? new Response('Page not found.', { status: 404 });
});

// -------------------- EXPORT --------------------
// Single export — wrangler.jsonc "main" stays as "./dist/server/server.mjs"

// export const reqHandler = createRequestHandler(async (req, env, ctx) => {
//   return app.fetch(req, env, ctx);
// });

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) => app.fetch(req, env, ctx),
};

// export default { fetch: reqHandler };
