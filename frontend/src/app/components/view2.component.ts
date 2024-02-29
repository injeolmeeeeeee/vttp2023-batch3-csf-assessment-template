import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../news.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrl: './view2.component.css'
})
export class View2Component implements OnInit {

  private fb = inject(FormBuilder)
  protected form!: FormGroup
  private newsService = inject(NewsService);
  createNewsSub?: Subscription;
  private router = inject(Router);
  imageFile!: File;
  tags: string[] = [];
  tagsInput: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control<string>('', [ Validators.required, Validators.minLength(5)]),
      photo: this.fb.control<string>('', [Validators.required]),
      description: this.fb.control<string>('', [ Validators.required, Validators.minLength(5)]),
      tags: this.fb.control<string>('')
    })
  }

  addTag(tag: string) {
    const tags = tag.trim().split(" ");
    this.tags.push(...tags);
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
  

  process() {
    if (!this.imageFile) {
      console.log(this.imageFile)
      alert('Please select an image.');
      
      return;
    }
  
    this.createNewsSub = this.newsService.createNews({
      ...this.form.value,
      photo: this.imageFile,
      tags: this.tags.join(',')
    })
    .subscribe({ //line61
      next: news => {
        this.router.navigate(['/']).then(() => {
          const newsId = (news as any).newsId;
          alert('News created successfully. News ID: ' + newsId);
          this.form.reset();
        });
      },
      error: err => {
        alert('Failed to create news: ' + err.message);
      }
    });
  }
}
