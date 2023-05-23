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
  /*                 PROJECTS                      */
  /* --------------------------------------------- */
  static PROJECTS: AppRoute = {
    path: 'projects',
    title: 'navigation.projects.home',
    tabTitle: 'Projects'
  }

  static PROJECTS_TWITTER: AppRoute = {
    path: 'twitter',
    title: 'navigation.projects.twitter',
    parent: AppRoutes.PROJECTS,
    tabTitle: 'Twitter'
  }

  static PROJECTS_CODA: AppRoute = {
    path: 'coda',
    title: 'navigation.projects.coda',
    parent: AppRoutes.PROJECTS,
    tabTitle: 'Coda'
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
