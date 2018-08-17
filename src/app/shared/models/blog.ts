import { Comment } from './comment';

/**
 * 博客
 */
export class Blog {
  _id: String;         // 博客 ID
  title: String;       // 博客主题
  smallImage: String;  // 博客小图片
  largeImage: String;  // 博客大图片
  tags: String[];      // 博客标签
  date: Date;          // 博客日期
  views: Number;       // 查看次数
  summary: String;     // 博客概述
  content: String;     // 博客内容（markdown 格式）
  comments: Comment[]; // 博客评论
}