import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinecraftHomeComponent} from "./minecraft/minecraft-home.component";
import {DatanalyzerComponent} from "./minecraft/components/datanalyzer/datanalyzer.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {AppRoutes} from "./shared/constants/routes";
import {CodaHomeComponent} from "./coda/coda-home.component";

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
        path: AppRoutes.MINECRAFT_DATANALYZER.path,
        title: AppRoutes.MINECRAFT_DATANALYZER.title,
        component: DatanalyzerComponent
      }
    ]
  },
  {
    path: AppRoutes.CODA.path, pathMatch: 'full',
    title: AppRoutes.CODA.title,
    component: CodaHomeComponent
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
