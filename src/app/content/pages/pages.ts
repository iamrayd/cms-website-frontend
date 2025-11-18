import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pages.html',
  styleUrls: ['./pages.scss'],
})
export class PagesComponent implements OnInit {
  pages: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(): void {
    this.isLoading = true;
    this.error = null;

    this.http.get<any[]>('https://localhost:7090/api/Pages').subscribe({
      next: (data) => {
        console.log('Pages from API:', data);
        this.pages = Array.isArray(data) ? data : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Pages API error:', err);
        this.error = 'Failed to load pages.';
        this.isLoading = false;
      }
    });
  }
}
