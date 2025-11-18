import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrls: ['./post.scss'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.http.get<any[]>('https://localhost:7090/api/Posts').subscribe({
      next: data => {
        console.log("Posts loaded:", data);
        this.posts = data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load posts.';
        this.isLoading = false;
      }
    });
  }
}
