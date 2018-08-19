import { About } from '@shared/models/about';
import { Experience } from '@shared/models/experience';
import { Education } from '@shared/models/education';
import { Project } from '@shared/models/project';
import { Blog } from '@shared/models/blog';

/**
 * 首页数据
 */
export class HomeData {
  about: About;              // 个人信息
  experiences: Experience[]; // 工作经历
  educations: Education[];   // 教育背景
  projects: Project[];       // 项目经历
  blogs: Blog[];             // 最新博客
}