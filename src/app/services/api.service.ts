import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  submitDemoRequest(data: any): Observable<any> {
    return this.http.post('/api/demo-request', data);
  }

  getDemoContent(market: string): Observable<any> {
    return this.http.get(`/api/demo-content/${market}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/login', { username, password });
  }
}