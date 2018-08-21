import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { Injectable } from '@angular/core';

interface ICachedRoute {
  handle: DetachedRouteHandle;
  reuse: Boolean;
}

@Injectable()
export class ReuseStrategy implements RouteReuseStrategy {

  private static routeCache = new Map<string, ICachedRoute>();
  private static waitDelete: string;    // 当前页未进行存储时需要删除
  private static currentDelete: string; // 当前页存储过时需要删除

  /** 进入路由触发，判断是否是同一路由 */
  shouldReuseRoute (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断，这里我判断如果有子组件则不复用 */
  shouldDetach (route: ActivatedRouteSnapshot): boolean {
    return this.shouldReuse(route);
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  store (route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = this.getFullRouteUrl(route);
    const reuse = this.shouldReuse(route);
    if (ReuseStrategy.waitDelete && ReuseStrategy.waitDelete === url) {
      // 如果待删除是当前路由，且未存储过则不存储快照
      ReuseStrategy.waitDelete = null;
      return null;
    } else {
      // 如果待删除是当前路由，且存储过则不存储快照
      if (ReuseStrategy.currentDelete && ReuseStrategy.currentDelete === url) {
        ReuseStrategy.currentDelete = null;
        return null;
      } else {
        ReuseStrategy.routeCache.set(url, { handle, reuse });
        this.addRedirectsRecursively(route);
      }
    }
  }

  /** 若 path 在缓存中有的都认为允许还原路由 */
  shouldAttach (route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullRouteUrl(route);
    return ReuseStrategy.routeCache.has(url);
  }

  /** 从缓存中获取快照，若无则返回 null */
  retrieve (route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const url = this.getFullRouteUrl(route);
    const reuse = this.shouldReuse(route);
    return reuse && ReuseStrategy.routeCache.has(url)
      ? ReuseStrategy.routeCache.get(url).handle
      : null;
  }

  private addRedirectsRecursively (route: ActivatedRouteSnapshot): void {
    const config = route.routeConfig;
    if (config) {
      if (!config.loadChildren) {
        const routeFirstChild = route.firstChild;
        const routeFirstChildUrl = routeFirstChild ? this.getRouteUrlPaths(routeFirstChild).join('/') : '';
        const childConfigs = config.children;
        if (childConfigs) {
          const childConfigWithRedirect = childConfigs.find(c => c.path === '' && !!c.redirectTo);
          if (childConfigWithRedirect) {
            childConfigWithRedirect.redirectTo = routeFirstChildUrl;
          }
        }
      }
      route.children.forEach(childRoute => this.addRedirectsRecursively(childRoute));
    }
  }

  private getFullRouteUrl (route: ActivatedRouteSnapshot): string {
    return this.getFullRouteUrlPaths(route).filter(Boolean).join('/').replace('/', '_');
  }

  private getFullRouteUrlPaths (route: ActivatedRouteSnapshot): string[] {
    const paths = this.getRouteUrlPaths(route);
    return route.parent ? [ ...this.getFullRouteUrlPaths(route.parent), ...paths ] : paths;
  }

  private getRouteUrlPaths (route: ActivatedRouteSnapshot): string[] {
    return route.url.map(urlSegment => urlSegment.path);
  }

  /** 判断路由是否应该复用 */
  private shouldReuse (route: ActivatedRouteSnapshot): boolean {
    // 如果该路由对应的组件没有子组件的话，才可以复用
    return route.routeConfig && !route.routeConfig.children;
  }

  /** 删除路由快照 */
  public static deleteRouteSnapshot (url: string): void {
    if (url[0] === '/') {
      url = url.substring(1);
    }
    url = url.replace('/', '_');
    if (ReuseStrategy.routeCache.has(url)) {
      ReuseStrategy.routeCache.delete(url);
      ReuseStrategy.currentDelete = url;
    } else {
      ReuseStrategy.waitDelete = url;
    }
  }
}