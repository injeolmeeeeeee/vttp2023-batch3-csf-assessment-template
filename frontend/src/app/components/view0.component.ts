import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagCount } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-view0',
  templateUrl: './view0.component.html',
  styleUrl: './view0.component.css'
})
export class View0Component implements OnInit, OnDestroy {
    private newsService = inject(NewsService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    timesInMinutes!: number[];
    tags!: TagCount[];
    getTagsSub?: Subscription;
    selectedTime!: number;
  
    ngOnInit() {
      this.timesInMinutes = [5, 15, 30, 45, 60];
      this.selectedTime = Number(this.route.snapshot.queryParamMap.get("time"));
      this.getTags(this.selectedTime || 5);
    }
  
    ngOnDestroy() {
      this.getTagsSub?.unsubscribe();
    }
  
    getTags(timeInMinutes: number) {
      this.selectedTime = timeInMinutes;
      this.getTagsSub = this.newsService.getTags(timeInMinutes)
        .subscribe({
          next: tags => this.tags = tags,
          error: err => console.error(err.message)
        })
    }
  
    onTimeSelect(event: any) {
      this.getTags(event.target.value);
      this.router.navigate([], {
        queryParams: { time: event.target.value }
      })
    }
  }