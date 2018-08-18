import { Component, OnInit, OnDestroy } from '@angular/core';

import { Blog } from '@shared/models/blog';

import { BlogService } from '@services/blog.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.less']
})
export class BlogListComponent implements OnInit, OnDestroy {

  blogs: Blog[];                  // 博客列表数组
  blogSubscription: Subscription; // 博客订阅器

  constructor (private blogService: BlogService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.blogSubscription = this.blogService.getBlogs()
      .subscribe(
        (blogs: Blog[]) => {
          this.blogs = blogs;
        }, 
        (error: string) => {
          this.messageService.error(error);
        }
      );
  }

  ngOnDestroy () {
    if (this.blogSubscription) this.blogSubscription.unsubscribe(); // 取消订阅
  }
}
