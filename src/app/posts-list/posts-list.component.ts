import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { PostsService } from '../services/posts.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { Post } from '../interfaces/post.interface';

@UntilDestroy()

@Component({
  standalone: true,
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    PostDetailsComponent
  ]
})

export class PostsListComponent implements OnInit {

  posts:Post[];

  @ViewChild('drawerPost') drawer:MatDrawer;
  @ViewChild('table') table:ElementRef;
  
  constructor(private postsService:PostsService, private router:Router) {}

  public ngOnInit(): void {
    this.postsService.getAllPosts()
      .pipe(untilDestroyed(this))
      .subscribe(resData => {
        this.posts = resData;
      })
  }

  public openDrawer(id:number): void {
    this.router.navigate(['posts/', id]);
    this.drawer.open();
  }

  public close(): void {
    this.router.navigate(['../']);
    this.drawer.close();
  }

  public scrollToTop(): void {
    this.table.nativeElement.scrollTo({top:0,behavior:'smooth'});
  }
}
