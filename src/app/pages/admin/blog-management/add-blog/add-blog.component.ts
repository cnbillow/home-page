import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Blog } from '@shared/models/blog';

import { BlogService } from '@services/blog.service';
import { MarkdownParserService } from '@services/markdown-parser.service';
import { NzMessageService } from 'ng-zorro-antd';

import { tagOptions } from '@shared/enum';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddBlogComponent implements OnInit, OnDestroy {

  addForm: FormGroup;                // 添加博客表单
  tagOptions: Object[] = tagOptions; // 标签选项
  convertedText: string;             // markdown 解析的内容

  validationMessages: Object = {  // 表格输入的相关错误提示信息
    title: {
      required: '请输入博客标题'
    },
    tags: {
      required: '请选择博客标签'
    },
    summary: {
      required: '请输入博客概述'
    },
    content: {
      required: '请输入博客内容',
    },
  };

  formErrors = { // 记录表单输入错误的对象
    title: '',
    tags: '',
    summary: '',
    content: '',
  };

  // 定义 textarea 的格式
  autosize: Object = {
    minRows: 20,
    maxRows: 30
  };

  btnLoading: boolean = false; // 提交按钮是否加载中

  addSubscription: Subscription;

  constructor (private router: Router,
    private blogService: BlogService,
    private markdownService: MarkdownParserService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.initForm();
  }

  ngOnDestroy () {
    if (this.addSubscription) this.addSubscription.unsubscribe();
  }

  /**
   * 简介：表单初始化的处理函数
   * 
   * @return {void}
   */
  initForm (): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this.addForm.valueChanges
      .subscribe(data => this.onFormChanged(data));
  }

  /**
   * 简介：添加博客表单提交的处理函数
   * 
   * @return {void}
   */
  submitForm (): void {
    this.btnLoading = true;
    const data = this.parseData();
    this.addSubscription = this.blogService.addBlog(data)
      .subscribe(() => {
        this.btnLoading = false;
        this.resetForm();
        this.router.navigate(['/']);
      }, (error: string) => {
        this.btnLoading = false;
        this.messageService.error(error);
      });
  }

  /**
   * 简介：重置评论表单
   * 
   * @return {void}
   */
  resetForm (): void {
    this.addForm.reset({
      title: '',
      tags: '',
      summary: '',
      content: '',
    });
  }

  /**
   * 简介：主要把 location 数组转化成省份、城市两个字段，如果遇到直辖市或特别行政区，则省份与城市一致
   * 
   * @return {Blog}
   */
  parseData (): Blog {
    const data = new Blog();
    data.title = this.addForm.value['title'];
    data.tags = this.addForm.value['tags'];
    data.summary = this.addForm.value['summary'];
    data.content = this.addForm.value['content'];
    return data;
  }

  /**
   * 简介：根据输入的 markdown 解析内容，更新预览
   * 
   * @param  {string} mdText markdown 内容
   * @return {void}
   */
  updatePreview (mdText: string): void {
    this.convertedText = this.markdownService.convert(mdText);
  }

  /**
   * 简介：当表单输入改变时触发的处理函数
   * 
   * @param  {any} data 表单数据
   * @return {void}
   */
  onFormChanged (data?: any): void {

    if (!this.addForm) return;

    const form = this.addForm;
    for (const field in this.formErrors) { // 检查所有 field
      this.formErrors[field] = ''; // 如果之前有错误信息则清空
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (this.formErrors[field].length > 0) {
            this.formErrors[field] += '，';
          }
          this.formErrors[field] += messages[key];
        }
      }
    }
  }
}
