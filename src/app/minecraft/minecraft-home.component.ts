import { Component } from '@angular/core';
import {NavbarItem} from "../shared/models/navbar";
import {AppRoutes} from "../shared/constants/routes";

@Component({
  selector: 'app-minecraft-home',
  templateUrl: './minecraft-home.component.html',
  styleUrls: ['./minecraft-home.component.scss']
})
export class MinecraftHomeComponent {
  navBarItems: NavbarItem[] = [
    {
      route: AppRoutes.MINECRAFT_DATANALYZER
    }
  ]
}
