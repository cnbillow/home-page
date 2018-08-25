import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Blog } from '@shared/models/blog';

import { BlogService } from '@services/blog.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.less']
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  blog: Blog;                        // 博客对象
  blogSubscription: Subscription;    // 博客订阅器
  refreshSubscription: Subscription; // 刷新订阅器

  constructor (private route: ActivatedRoute,
    private blogService: BlogService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.blogSubscription = this.route.paramMap // 根据路由参数获取博客详情
      .pipe(
        switchMap((params: ParamMap) => {
          const blogId = params.get('blogId');
          return this.blogService.getBlogById(blogId);
        })
      )
      .subscribe(
        (blog: Blog) => {
          this.blog = blog;
        },
        (error: string) => {
          this.messageService.error(error);
        }
      );
    
    this.refreshSubscription = this.blogService.refreshEvent.subscribe(
      (blog: Blog) => { this.blog = blog; },
      (error: string) => { this.messageService.error(error); }
    );
  }

  ngOnDestroy () {
    if (this.blogSubscription) this.blogSubscription.unsubscribe();
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }
}
