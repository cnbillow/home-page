import { Component, OnInit, Input } from '@angular/core';

import { Blog } from '@shared/models/blog';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.less']
})
export class BlogCommentComponent implements OnInit {

  @Input() blog: Blog;

  constructor () { }

  ngOnInit () {
  }

}
