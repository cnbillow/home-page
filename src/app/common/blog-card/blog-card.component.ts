import { Component, OnInit, Input } from '@angular/core';

import { Blog } from '@shared/models/blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.less']
})
export class BlogCardComponent implements OnInit {

  @Input() blog: Blog; // 从父组件传入的博客对象

  constructor () { }

  ngOnInit () {
  }

}
