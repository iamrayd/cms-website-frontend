import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ActivityLogItem {   // <── renamed
  id: string;
  timestamp: string;
  userName: string;
  action: string;
  contentType: string;
  contentTitle: string;
  contentId: string;
  status: string;
}

type ContentFilter = 'all' | 'page' | 'post' | 'banner' | 'popup' | 'system';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-log.html',
  styleUrls: ['./activity-log.scss'],
})
export class ActivityLog implements OnInit {   // component name ok ra

  logs: ActivityLogItem[] = [];   // <── updated type
  isLoading = true;
  error: string | null = null;

  filter: ContentFilter = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.isLoading = true;
    this.error = null;

    let url = 'https://localhost:7090/api/ActivityLogs?take=50';
    if (this.filter !== 'all') {
      url += `&contentType=${this.filter}`;
    }

    this.http.get<ActivityLogItem[]>(url).subscribe({
      next: data => {
        this.logs = data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load activity logs.';
        this.isLoading = false;
      }
    });
  }

  onFilterChange(event: Event) {                    // <── changed
    const value = (event.target as HTMLSelectElement).value as ContentFilter;
    this.filter = value;
    this.loadLogs();
  }
}
