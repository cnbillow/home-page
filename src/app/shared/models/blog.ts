import { Comment } from './comment';

/**
 * 博客
 */
export class Blog {
  _id: string;         // 博客 ID
  title: string;       // 博客主题
  smallImage: string;  // 博客小图片
  largeImage: string;  // 博客大图片
  tags: string[];      // 博客标签
  date: Date;          // 博客日期
  views: number;       // 查看次数
  summary: string;     // 博客概述
  content: string;     // 博客内容（markdown 格式）
  comments: Comment[]; // 博客评论
}