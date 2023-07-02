import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinecraftHomeComponent} from './components/minecraft/minecraft-home.component';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {AppRoutes} from './constants/routes';
import {DatassetsDownloadComponent} from './components/minecraft/datassets-download/datassets-download.component';
import {AppRoute} from './models/route';
import {ContactsHomeComponent} from './components/others/contacts/contacts-home.component';
import {SettingsComponent} from './components/others/settings/settings.component';
import {McProjects} from './components/minecraft/mgd-repositories/mc-projects';
import {WorldAnalyzerComponent} from './components/minecraft/world-analyzer/world-analyzer.component';

const routeTitle = (route: AppRoute) => route.tabTitle ?? route.title;

const routes: Routes = [
  {
    path: AppRoutes.HOME.path, pathMatch: 'full',
    title: routeTitle(AppRoutes.HOME),
    component: HomeComponent
  },
  {
    path: AppRoutes.MINECRAFT.path,
    title: routeTitle(AppRoutes.MINECRAFT),
    component: MinecraftHomeComponent,
    children: [
      {
        path: AppRoutes.MINECRAFT_DOWNLOAD.path,
        title: routeTitle(AppRoutes.MINECRAFT_DOWNLOAD),
        component: DatassetsDownloadComponent
      },
      {
        path: AppRoutes.MINECRAFT_WORLD_ANALYZER.path,
        title: routeTitle(AppRoutes.MINECRAFT_WORLD_ANALYZER),
        component: WorldAnalyzerComponent
      },
      {
        path: AppRoutes.MINECRAFT_PROJECTS.path,
        title: routeTitle(AppRoutes.MINECRAFT_PROJECTS),
        component: McProjects
      }
    ]
  },
  {
    path: AppRoutes.CONTACTS.path,
    title: routeTitle(AppRoutes.CONTACTS),
    component: ContactsHomeComponent
  },
  {
    path: AppRoutes.SETTINGS.path,
    title: routeTitle(AppRoutes.SETTINGS),
    component: SettingsComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    title: routeTitle(AppRoutes.PAGE_NOT_FOUND)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: routeTitle(AppRoutes.PAGE_NOT_FOUND)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
