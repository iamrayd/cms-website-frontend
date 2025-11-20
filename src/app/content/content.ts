import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ContentTab = 'pages' | 'posts' | 'banners';
type ContentStatus = 'Published' | 'Draft' | 'Archived';

interface ContentCard {
  id: string;
  type: ContentTab;
  title: string;
  description: string;
  status: ContentStatus;
  tags: string[];
}

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.html',
  styleUrls: ['./content.scss'],
})
export class ContentListComponent {
  readonly tabs = [
    { label: 'Pages', value: 'pages' as ContentTab },
    { label: 'Posts', value: 'posts' as ContentTab },
    { label: 'Banners', value: 'banners' as ContentTab },
  ];

  readonly tagColorMap: Record<string, string> = {
    '<h1>': 'tag-blue',
    '<p>': 'tag-green',
    '<a>': 'tag-red',
  };

  activeTab: ContentTab = 'pages';
  searchTerm = '';

  readonly cards: ContentCard[] = [
    {
      id: 'page_001',
      type: 'pages',
      title: 'About Us',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing.',
      status: 'Published',
      tags: ['<h1>', '<p>', '<a>'],
    },
    {
      id: 'page_002',
      type: 'pages',
      title: 'Our Mission',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      status: 'Draft',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'page_003',
      type: 'pages',
      title: 'Services Overview',
      description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
      status: 'Published',
      tags: ['<h1>', '<p>', '<a>'],
    },
    {
      id: 'page_004',
      type: 'pages',
      title: 'Leadership Team',
      description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
      status: 'Published',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'page_005',
      type: 'pages',
      title: 'Testimonials',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus.',
      status: 'Archived',
      tags: ['<h1>', '<p>', '<a>'],
    },
    {
      id: 'page_006',
      type: 'pages',
      title: 'Careers',
      description: 'Et harum quidem rerum facilis est et expedita distinctio.',
      status: 'Published',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'page_007',
      type: 'pages',
      title: 'Contact Page',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio.',
      status: 'Draft',
      tags: ['<h1>', '<a>'],
    },
    {
      id: 'page_008',
      type: 'pages',
      title: 'Privacy Policy',
      description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum.',
      status: 'Published',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'post_014',
      type: 'posts',
      title: 'Car Expo 2023',
      description: 'Highlights from our latest automotive expo with partners.',
      status: 'Draft',
      tags: ['<p>', '<a>'],
    },
    {
      id: 'post_015',
      type: 'posts',
      title: 'Tips for Car Maintenance',
      description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      status: 'Published',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'post_016',
      type: 'posts',
      title: 'Winter Maintenance Checklist',
      description: 'Ut enim ad minim veniam quis nostrud exercitation ullamco.',
      status: 'Archived',
      tags: ['<p>'],
    },
    {
      id: 'post_017',
      type: 'posts',
      title: 'Electric Vehicles Q&A',
      description: 'Curated answers to the most common EV questions.',
      status: 'Draft',
      tags: ['<h1>', '<p>'],
    },
    {
      id: 'banner_003',
      type: 'banners',
      title: 'Hero Banner Image',
      description: 'New hero visual for the landing page campaign.',
      status: 'Published',
      tags: ['<p>', '<a>'],
    },
    {
      id: 'banner_004',
      type: 'banners',
      title: 'Mid-season Sale',
      description: 'Homepage highlight for the mid-season sales event.',
      status: 'Draft',
      tags: ['<h1>', '<a>'],
    },
    {
      id: 'banner_005',
      type: 'banners',
      title: 'Newsletter CTA',
      description: 'Footer call-to-action refresh for the newsletter signup.',
      status: 'Archived',
      tags: ['<p>', '<a>'],
    },
  ];

  setTab(tab: ContentTab) {
    if (this.activeTab === tab) {
      return;
    }
    this.activeTab = tab;
    this.searchTerm = '';
  }

  get searchPlaceholder(): string {
    const label = this.tabs.find((tab) => tab.value === this.activeTab)?.label ?? 'Content';
    return `Search ${label}`;
  }

  get filteredCards(): ContentCard[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.cards
      .filter((card) => card.type === this.activeTab)
      .filter((card) => {
        if (!query) {
          return true;
        }

        return (
          card.title.toLowerCase().includes(query) ||
          card.description.toLowerCase().includes(query) ||
          card.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
  }

  tagClass(tag: string): string {
    return this.tagColorMap[tag] ?? 'tag-neutral';
  }

  statusClass(status: ContentStatus): string {
    return `status-${status.toLowerCase()}`;
  }

  goToForm() {
    console.log('Navigate to form for', this.activeTab);
  }

  editItem(item: ContentCard) {
    console.log('Edit item', item);
  }
}
