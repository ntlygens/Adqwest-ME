import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  testimonials = [
    {
      text: "Adqwest reduced our content management time by 60%. Our students love the curated content.",
      author: "Dr. Sarah Johnson",
      role: "Principal, Lincoln High School",
      market: "schools"
    },
    {
      text: "Our residents are more engaged than ever. The interface is so easy to use.",
      author: "Michael Chen",
      role: "Facilities Director, Sunrise Senior Living",
      market: "senior_living"
    },
    {
      text: "Guest satisfaction scores increased 40% after implementing Adqwest in our rooms.",
      author: "Jessica Martinez",
      role: "General Manager, Downtown Hilton",
      market: "hotels"
    },
    {
      text: "The automated content curation is a game-changer for our multi-location strategy.",
      author: "Robert Thompson",
      role: "VP Operations, Elite Hotel Groups",
      market: "hotels"
    }
  ];

  getAll() {
    return this.testimonials;
  }
}