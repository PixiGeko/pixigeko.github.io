import {AppRoute} from "../models/route";

export class AppRoutes {
  /* --------------------------------------------- */
  /*                    MISC                       */
  /* --------------------------------------------- */
  static HOME: AppRoute = {
    path: 'home',
    title: 'navigation.home.home'
  }

  static PAGE_NOT_FOUND: AppRoute = {
    path: '404',
    title: ''
  }

  /* --------------------------------------------- */
  /*                 MINECRAFT                     */
  /* --------------------------------------------- */
  static MINECRAFT: AppRoute = {
    path: 'minecraft',
    title: 'navigation.minecraft.home'
  }

  static MINECRAFT_DOWNLOAD: AppRoute = {
    path: 'downloads',
    title: 'navigation.minecraft.datassets_download',
    parent: AppRoutes.MINECRAFT
  }
  
  /* --------------------------------------------- */

  static absolutePath(route: AppRoute) {
    const paths: string[] = [
      route.path
    ];

    while (route.parent) {
      route = route.parent;
      paths.push(route.path);
    }

    return paths.reverse().join('/');
  }
}
