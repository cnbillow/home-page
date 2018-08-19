import { Component, OnChanges, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { environment } from '@environments/environment';

import { Blog } from '@shared/models/blog';

import { MarkdownParserService } from '@services/markdown-parser.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BlogContentComponent implements OnChanges, OnInit {

  @Input() blog: Blog; // 从父组件传入的博客对象

  baseUrl: string = environment.baseUrl; // 后端根地址
  convertedText: string;                 // markdown 解析的内容

  constructor (private markdownService: MarkdownParserService) { }

  ngOnChanges () {
    if (this.blog) this.convertedText = this.markdownService.convert(this.blog.content);
  }

  ngOnInit () {

  }

}
