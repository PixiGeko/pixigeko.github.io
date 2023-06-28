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

  static MINECRAFT_WORLD_ANALYZER: AppRoute = {
    path: 'world-analyzer',
    title: 'navigation.minecraft.world_analyzer',
    parent: AppRoutes.MINECRAFT,
    tabTitle: 'World Analyzer'
  }

  static MINECRAFT_PROJECTS: AppRoute = {
    path: 'projects',
    title: 'navigation.minecraft.projects',
    parent: AppRoutes.MINECRAFT,
    tabTitle: 'Projects'
  }

  /* --------------------------------------------- */
  /*                 CONTACTS                      */
  /* --------------------------------------------- */
  static CONTACTS: AppRoute = {
    path: 'contacts',
    title: 'navigation.contacts.home',
    tabTitle: 'Contacts'
  }

  /* --------------------------------------------- */
  /*                 SETTINGS                      */
  /* --------------------------------------------- */
  static SETTINGS: AppRoute = {
    path: 'settings',
    title: 'navigation.settings.home',
    tabTitle: 'Settings'
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
