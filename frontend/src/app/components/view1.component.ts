import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../news.service';
import { News } from '../models';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrl: './view1.component.css'
})

export class View1Component implements OnInit, OnDestroy {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);
  tag!: string;
  time!: number;
  news!: News[];
  getNewsSub?: Subscription;

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get("tag")!;
    this.time = Number(this.route.snapshot.queryParamMap.get("time"));
    this.getNewsSub = this.newsService.getNewsByTag(this.tag, this.time)
      .subscribe({
        next: news => this.news = news,
        error: err => console.error(err.message)
      })
  }

  ngOnDestroy() {
    this.getNewsSub?.unsubscribe();
  }

  goBack() {
    (this.location as any).back();
  }
}