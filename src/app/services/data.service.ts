	import { Injectable } from '@angular/core';

	@Injectable({
	providedIn: 'root'
	})
	export class DataService {
	demoContent = {
		schools: [
		{ id: 1, title: 'Live News Feed', description: 'Current events and educational content' },
		{ id: 2, title: 'Curriculum Integration', description: 'Aligned with educational standards' },
		{ id: 3, title: 'Student Announcements', description: 'Campus-wide messaging' }
		],
		senior_living: [
		{ id: 1, title: 'Easy Navigation', description: 'Large buttons, simple interface' },
		{ id: 2, title: 'Health & Wellness', description: 'Curated content for active seniors' },
		{ id: 3, title: 'Community Events', description: 'Facility announcements & schedules' }
		],
		hotels: [
		{ id: 1, title: 'Guest Entertainment', description: 'Premium entertainment packages' },
		{ id: 2, title: 'Local Guides', description: 'Neighborhood info & recommendations' },
		{ id: 3, title: 'Room Controls', description: 'Integrated with room management' }
		]
	};

	getContentByMarket(market: string) {
		return this.demoContent[market as keyof typeof this.demoContent] || [];
	}
	}