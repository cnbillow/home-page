import { Injectable } from '@angular/core';

import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownParserService {

  private md;

  constructor () {
    this.md = marked;
    this.md.setOptions({
      gfm: true,
      breaks: true
    });
  }

  /**
   * 简介：解析 markdown 内容为 html
   * 
   * @param  {string} markdown markdown 格式的内容
   * @return {string} markdown 解析后的内容
   */
  convert (markdown: string): string {
    return this.md.parse(markdown);
  }
}
