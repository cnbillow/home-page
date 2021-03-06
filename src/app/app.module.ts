/** ====================== 导入模块 ====================== */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HighlightModule } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing/app-routing.module';

/** ====================== 导入路由复用策略 ====================== */
import { ReuseStrategy } from './app-routing/reuse-strategy';

/** ====================== 导入组件 ====================== */
import { AppComponent } from './app.component';

import { HeaderComponent } from '@common/header/header.component';
import { FooterComponent } from '@common/footer/footer.component';
import { BlogCardComponent } from '@common/blog-card/blog-card.component';

import { LoginComponent } from '@pages/login/login.component';

import { HomeComponent } from '@pages/home/home.component';
import { AboutComponent } from '@pages/home/about/about.component';
import { ExperienceComponent } from '@pages/home/experience/experience.component';
import { ExperienceCardComponent } from '@pages/home/experience/experience-card/experience-card.component';
import { ExperienceDetailComponent } from '@pages/home/experience/experience-detail/experience-detail.component';
import { EducationComponent } from '@pages/home/education/education.component';
import { EducationCardComponent } from '@pages/home/education/education-card/education-card.component';
import { LatestBlogComponent } from '@pages/home/latest-blog/latest-blog.component';

import { BlogListComponent } from '@pages/blog-list/blog-list.component';

import { BlogDetailComponent } from '@pages/blog-detail/blog-detail.component';
import { BlogContentComponent } from '@pages/blog-detail/blog-content/blog-content.component';
import { BlogCommentComponent } from '@pages/blog-detail/blog-comment/blog-comment.component';

import { AdminComponent } from '@pages/admin/admin.component';
import { BlogManagementComponent } from '@pages/admin/blog-management/blog-management.component';
import { AddBlogComponent } from '@pages/admin/blog-management/add-blog/add-blog.component';

import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';

import { AdminAuthInterceptor, UnauthorizedInterceptor } from '@services/auth.interceptor';

/** ====================== 配置 Angular i18n ====================== */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    BlogCardComponent,
    
    LoginComponent,

    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ExperienceCardComponent,
    ExperienceDetailComponent,
    EducationComponent,
    EducationCardComponent,
    LatestBlogComponent,
    
    BlogListComponent,

    BlogDetailComponent,
    BlogContentComponent,
    BlogCommentComponent,

    AdminComponent,
    BlogManagementComponent,
    AddBlogComponent,

    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HighlightModule.forRoot({ theme: 'vs2015' }),
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: ReuseStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
