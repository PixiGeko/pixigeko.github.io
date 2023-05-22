import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinecraftHomeComponent} from "./components/minecraft/minecraft-home.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/shared/page-not-found/page-not-found.component";
import {AppRoutes} from "./constants/routes";
import {DatassetsDownloadComponent} from "./components/minecraft/datassets-download/datassets-download.component";
import {AppRoute} from "./models/route";

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
