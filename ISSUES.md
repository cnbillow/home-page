### 路由复用策略

- [http://www.php.cn/js-tutorial-384111.html](http://www.php.cn/js-tutorial-384111.html)
- [https://www.jianshu.com/p/db24d8225bec](https://www.jianshu.com/p/db24d8225bec)

后来发现当有的组件有子组件时，再次重定向到该组件时会发生错误：

`Cannot reattach ActivatedRouteSnapshot with a different number of children`

经过实践，只有第二个链接中的代码有效，不会出现错误，可以参考 [Github Issue](https://github.com/angular/angular/issues/13869#issuecomment-344403045)

### 后端传的 URL 无法赋值到 iframe src

原因：Angular 中默认将所有输入值视为不受信任。当我们通过 property，attribute，样式，类绑定或插值等方式，将一个值从模板中插入到 DOM 中时，Angular 会自帮我们清除和转义不受信任的值。Angular 抛出此错误是因为 iframe 的 src 属性是资源 URL 安全上下文，因为不可信源可以在用户不知情的情况下执行某些不安全的操作。但如果我们确认资源的 URL 是安全的，要怎么告知 Angular 该 URL 地址是安全的，给我们通行证呢？答案是，我们可以使用 Angular 中提供的 DomSanitizer 服务。

使用方法：

```
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

...

export class AppComponent {
  iframe: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) {
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://segmentfault.com/");       
  }
}
```

具体查阅：[https://segmentfault.com/a/1190000008809095](https://segmentfault.com/a/1190000008809095)

### 如何简化 import 路径

当系统变得复杂的时候，相对路径的引入将会使代码变得繁琐，于是我查阅相关资料去解决简化路径的问题，最终得到[解决方案](https://segmentfault.com/q/1010000010676698)。只需要在 `tsconfig.json` 这文件中更改：

```
"compilerOptions": {
  ......
  "paths": {
    "@components/*": ["./src/app/components/*"],
    "@services/*": ["./src/app/services/*"],
    "@models/*": ["./src/app/models/*"],
    "@util/*": ["./src/app/util/*"]
  },
  ......
}
```

那么，在引入路径的时候只需要这么写就可以：

```
import ... from '@components/......'
```

### 反复进入同一路由造成“多个组件”存在，没有路由复用

实际上这个 bug 我找了很久，最后发现原来是组件在初始化时订阅了某些东西，但是销毁的时候没有取消订阅。所以，开门后要随手关门，这是个好习惯！！！