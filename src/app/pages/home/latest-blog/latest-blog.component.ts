import { Component, OnInit, Input } from '@angular/core';

import { Blog } from '@shared/models/blog';

@Component({
  selector: 'app-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.less']
})
export class LatestBlogComponent implements OnInit {

  @Input() blogs: Blog[]; // 首页组件传入的最新博客数组

  constructor () { }

  ngOnInit () {
  }

}
