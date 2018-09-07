import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Blog } from '@shared/models/blog';
import { Comment } from '@shared/models/comment';

import { BlogService } from '@services/blog.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.less']
})
export class BlogCommentComponent implements OnInit, OnDestroy {

  @Input() blog: Blog;
  // comments: Comment[] = this.blog.comments;

  commentForm: FormGroup; // 评论表单

  validationMessages: Object = { // 表格输入的相关错误提示信息
    author: {
      required: '请输入您的大名'
    },
    content: {
      required: '请输入评论内容'
    }
  };

  formErrors = { // 记录表单输入错误的对象
    author: '',
    content: ''
  };

  // 定义 textarea 的格式
  autosize: Object = {
    minRows: 3,
    maxRows: 10
  };

  btnLoading: boolean = false; // 提交按钮是否加载中

  commentSubscription: Subscription;

  constructor (private blogService: BlogService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.initForm();
  }

  ngOnDestroy () {
    if (this.commentSubscription) this.commentSubscription.unsubscribe();
  }

  /**
   * 简介：表单初始化的处理函数
   * 
   * @return {void}
   */
  initForm (): void {
    this.commentForm = new FormGroup({
      author: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onFormChanged(data));
  }

  /**
   * 简介：登录表单提交的处理函数
   * 
   * @return {void}
   */
  submitForm (): void {
    this.btnLoading = true;
    const comment = <Comment>this.commentForm.value;
    this.commentSubscription = this.blogService.addComment(comment, this.blog._id).subscribe(
      (blog: Blog) => {
        this.btnLoading = false;
        this.blogService.refreshEvent.emit(blog);
        this.resetForm();
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
    this.commentForm.reset({
      'author': '',
      'content': ''
    });
  }

  /**
   * 简介：当表单输入改变时触发的处理函数
   * 
   * @param  {any} data 表单数据
   * @return {void}
   */
  onFormChanged (data?: any): void {

    if (!this.commentForm) return;

    const form = this.commentForm;
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
