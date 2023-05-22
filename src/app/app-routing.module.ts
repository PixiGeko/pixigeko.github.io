import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinecraftHomeComponent} from "./components/minecraft/minecraft-home.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/shared/page-not-found/page-not-found.component";
import {AppRoutes} from "./constants/routes";
import {DatassetsDownloadComponent} from "./components/minecraft/datassets-download/datassets-download.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: AppRoutes.HOME.path
  },
  {
    path: AppRoutes.HOME.path, pathMatch: 'full',
    title: AppRoutes.HOME.title,
    component: HomeComponent
  },
  {
    path: AppRoutes.MINECRAFT.path,
    title: AppRoutes.MINECRAFT.title,
    component: MinecraftHomeComponent,
    children: [
      {
        path: AppRoutes.MINECRAFT_DOWNLOAD.path,
        title: AppRoutes.MINECRAFT_DOWNLOAD.title,
        component: DatassetsDownloadComponent
      }
    ]
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    title: AppRoutes.PAGE_NOT_FOUND.title
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: AppRoutes.PAGE_NOT_FOUND.title
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
