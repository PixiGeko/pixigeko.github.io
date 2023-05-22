import {AppRoute} from "../models/route";

export class AppRoutes {
  /* --------------------------------------------- */
  /*                    MISC                       */
  /* --------------------------------------------- */
  static HOME: AppRoute = {
    path: 'home',
    title: 'navigation.home.home',
    tabTitle: 'Home'
  }

  static PAGE_NOT_FOUND: AppRoute = {
    path: '404',
    title: '',
    tabTitle: 'Page not found'
  }

  /* --------------------------------------------- */
  /*                 MINECRAFT                     */
  /* --------------------------------------------- */
  static MINECRAFT: AppRoute = {
    path: 'minecraft',
    title: 'navigation.minecraft.home',
    tabTitle: 'Minecraft'
  }

  static MINECRAFT_DOWNLOAD: AppRoute = {
    path: 'datassets_download',
    title: 'navigation.minecraft.datassets_download',
    parent: AppRoutes.MINECRAFT,
    tabTitle: 'Datassets download'
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
