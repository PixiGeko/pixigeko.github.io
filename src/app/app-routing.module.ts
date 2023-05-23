import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinecraftHomeComponent} from "./components/minecraft/minecraft-home.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/shared/page-not-found/page-not-found.component";
import {AppRoutes} from "./constants/routes";
import {DatassetsDownloadComponent} from "./components/minecraft/datassets-download/datassets-download.component";
import {AppRoute} from "./models/route";
import {TwitterProjectsComponent} from "./components/projects/twitter-projects/twitter-projects.component";
import {CodaProjectsComponent} from "./components/projects/coda-projects/coda-projects.component";
import {ProjetsHomeComponent} from "./components/projects/projets-home.component";

const routeTitle = (route: AppRoute) => route.tabTitle ?? route.title;

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: AppRoutes.HOME.path
  },
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
        path: '', pathMatch: 'full',
        redirectTo: AppRoutes.MINECRAFT_DOWNLOAD.path
      }
    ]
  },
  {
    path: AppRoutes.PROJECTS.path,
    title: routeTitle(AppRoutes.PROJECTS),
    component: ProjetsHomeComponent,
    children: [
      {
        path: AppRoutes.PROJECTS_TWITTER.path,
        title: routeTitle(AppRoutes.PROJECTS_TWITTER),
        component: TwitterProjectsComponent
      },
      {
        path: AppRoutes.PROJECTS_CODA.path,
        title: routeTitle(AppRoutes.PROJECTS_CODA),
        component: CodaProjectsComponent
      },
      {
        path: '', pathMatch: 'full',
        redirectTo: AppRoutes.PROJECTS_TWITTER.path
      }
    ]
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
