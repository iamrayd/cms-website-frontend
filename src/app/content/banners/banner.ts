import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss'],
})
export class BannersComponent implements OnInit {
  banners: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners() {
    this.http.get<any[]>('https://localhost:7090/api/Banners').subscribe({
      next: data => {
        this.banners = data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.error = "Failed to load banners.";
        this.isLoading = false;
      }
    });
  }
}
