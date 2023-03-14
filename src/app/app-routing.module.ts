import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EarthquakeHomeComponent} from "./earthquake/earthquake-home.component";
import {MinecraftHomeComponent} from "./minecraft/minecraft-home.component";

const routes: Routes = [
  {
    path: 'minecraft',
    component: MinecraftHomeComponent,
    children: []
  },
  {
    path: 'earthquake',
    component: EarthquakeHomeComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
