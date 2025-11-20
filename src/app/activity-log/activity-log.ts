import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ActivityFilter = 'all' | 'pages' | 'posts' | 'banners' | 'popups' | 'system';
type ActivityStatus = 'Success' | 'Complete' | 'Warning';

interface ActivityTimestamp {
  date: string;
  time: string;
}

interface ActivityLogEntry {
  timestamp: ActivityTimestamp;
  user: string;
  action: string;
  contentAffected: string;
  contentId: string;
  status: ActivityStatus;
  contentType: ActivityFilter;
}

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-log.html',
  styleUrls: ['./activity-log.scss'],
})
export class ActivityLog {
  readonly filters = [
    { label: 'All contents', value: 'all' as ActivityFilter },
    { label: 'Pages', value: 'pages' as ActivityFilter },
    { label: 'Posts', value: 'posts' as ActivityFilter },
    { label: 'Banners', value: 'banners' as ActivityFilter },
    { label: 'Popups', value: 'popups' as ActivityFilter },
    { label: 'System', value: 'system' as ActivityFilter },
  ];

  selectedFilter: ActivityFilter = 'all';

  readonly logs: ActivityLogEntry[] = [
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'Jane Doe',
      action: 'Updated',
      contentAffected: 'Page - "About Us"',
      contentId: 'page_001',
      status: 'Success',
      contentType: 'pages',
    },
    {
      timestamp: { date: '2025-10-29', time: '09:05 AM' },
      user: 'Lawrence',
      action: 'Changed Banner Image',
      contentAffected: 'Banner - "Hero_Banner.jpg"',
      contentId: 'banner_003',
      status: 'Success',
      contentType: 'banners',
    },
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'JaMes',
      action: 'Archived',
      contentAffected: 'Post - "Car Expo 2023"',
      contentId: 'post_014',
      status: 'Success',
      contentType: 'posts',
    },
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'Caral',
      action: 'Published',
      contentAffected: 'Post - "Tips for Car Maintenance"',
      contentId: 'post_015',
      status: 'Success',
      contentType: 'posts',
    },
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'Alexia',
      action: 'Added Popup',
      contentAffected: 'Popup - "Subscribe to Newsletter"',
      contentId: 'popup_006',
      status: 'Success',
      contentType: 'popups',
    },
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'Chloe',
      action: 'Auto Backup',
      contentAffected: 'Database Snapshot',
      contentId: 'sys_20251029',
      status: 'Complete',
      contentType: 'system',
    },
    {
      timestamp: { date: '2025-10-29', time: '08:32 AM' },
      user: 'Immanuel',
      action: 'Restored',
      contentAffected: 'Archived Post - "Promo 2024"',
      contentId: 'post_009',
      status: 'Success',
      contentType: 'posts',
    },
  ];

  get filteredLogs(): ActivityLogEntry[] {
    if (this.selectedFilter === 'all') {
      return this.logs;
    }

    return this.logs.filter((log) => log.contentType === this.selectedFilter);
  }

  statusClass(status: ActivityStatus): string {
    const normalized = status.toLowerCase();
    if (normalized === 'complete') {
      return 'status-complete';
    }
    if (normalized === 'warning') {
      return 'status-warning';
    }
    return 'status-success';
  }

  triggerFilter() {
    console.log('Open advanced filters');
  }
}
