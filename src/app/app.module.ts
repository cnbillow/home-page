/** ====================== 导入模块 ====================== */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing/app-routing.module';

/** ====================== 导入组件 ====================== */
import { AppComponent } from './app.component';

import { HeaderComponent } from '@common/header/header.component';
import { FooterComponent } from '@common/footer/footer.component';
import { BlogCardComponent } from '@common/blog-card/blog-card.component';

import { HomeComponent } from '@pages/home/home.component';
import { AboutComponent } from '@pages/home/about/about.component';
import { ExperienceComponent } from '@pages/home/experience/experience.component';
import { ExperienceCardComponent } from '@pages/home/experience/experience-card/experience-card.component';
import { ExperienceDetailComponent } from '@pages/home/experience/experience-detail/experience-detail.component';
import { EducationComponent } from '@pages/home/education/education.component';
import { EducationCardComponent } from '@pages/home/education/education-card/education-card.component';
import { LatestBlogComponent } from '@pages/home/latest-blog/latest-blog.component';

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
    
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ExperienceCardComponent,
    ExperienceDetailComponent,
    EducationComponent,
    EducationCardComponent,
    LatestBlogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
