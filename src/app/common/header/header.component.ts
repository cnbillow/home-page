import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminAuthService } from '@services/admin-auth.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  adminName: String = undefined; // 管理员名称
  subscription: Subscription;

  constructor (private adminAuthService: AdminAuthService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.adminAuthService.loadCredential(); // 读取管理员认证信息
    this.subscription = this.adminAuthService.getAdminName().subscribe(
      (name: string) => {
        console.log(`name = ${name}`);
        this.adminName = name;
      },
      (error: string) => {
        console.log(`error = ${error}`);
        this.messageService.error(error);
      }
    );
  }

  ngOnDestroy () {
    if (this.subscription) this.subscription.unsubscribe();
  }

  /**
   * 简介：打开登录弹窗
   */
  openLoginModal (): void {
    console.log('openLoginModal');
    this.adminAuthService.loginEvent.emit();
  }

  /**
   * 简介：管理员登出
   * 
   * @return void
   */
  logout (): void {
    this.adminName = undefined;
    this.adminAuthService.logout();
  }
}
