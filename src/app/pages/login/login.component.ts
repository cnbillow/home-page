import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdminAuthService } from '@services/admin-auth.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;       // 登录表单
  showModal: boolean = false; // 弹窗是否显示

  validationMessages: Object = { // 表格输入的相关错误提示信息
    adminName: {
      required: '请输入名称'
    },
    password: {
      required: '请输入密码'
    }
  };

  formErrors = { // 记录表单输入错误的对象
    adminName: '',
    password: ''
  };

  btnLoading: boolean = false; // 提交按钮是否加载中

  modalSubscription: Subscription;
  loginSubscription: Subscription;

  constructor (private adminAuthService: AdminAuthService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.initForm();
    this.modalSubscription = this.adminAuthService.loginEvent.subscribe(
      () => {
        this.showModal = true;
      }
    );
  }

  ngOnDestroy () {
    if (this.modalSubscription) this.modalSubscription.unsubscribe();
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
  }

  /**
   * 简介：表单初始化的处理函数
   * 
   * @return {void}
   */
  initForm (): void {
    this.loginForm = new FormGroup({
      adminName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onFormChanged(data));
  }

  /**
   * 简介：登录表单提交的处理函数
   * 
   * @return {void}
   */
  submitForm (): void {
    this.btnLoading = true;
    const adminName = this.loginForm.value['adminName'];
    const password = this.loginForm.value['password'];
    const hashPwd = CryptoJS.SHA256(password).toString(); // 密码需要经过 SHA256 加密
    this.loginSubscription = this.adminAuthService.login(adminName, hashPwd).subscribe(
      (adminName: string) => {
        this.btnLoading = false;
        this.closeModal();
        this.messageService.success(`Welcome back, ${adminName}`);
      }, (error: string) => {
        this.btnLoading = false;
        this.messageService.error(error);
      });
  }

  /**
   * 简介：当表单输入改变时触发的处理函数
   * 
   * @param  {any} data 表单数据
   * @return {void}
   */
  onFormChanged (data?: any): void {

    if (!this.loginForm) return;

    const form = this.loginForm;
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

  /**
   * 简介：点击关闭弹窗的处理函数
   * 
   * @return {void}
   */
  closeModal (): void {
    this.showModal = false;
  }
}
