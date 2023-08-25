import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { PostsService } from '../../services/posts.service';
import { Post } from 'src/app/interfaces/post.interface';

@UntilDestroy()

@Component({
  standalone:true,
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})

export class PostDetailsComponent implements OnInit {

  post:Post;

  constructor(private postsService:PostsService,private route:ActivatedRoute) {}

  public ngOnInit(): void {
    const postId:number = parseFloat(this.route.snapshot.paramMap.get('id'));
    this.postsService.getPostById(postId)
      .pipe(untilDestroyed(this))
      .subscribe(resData => {
        this.post = resData;
      });
  }
}
