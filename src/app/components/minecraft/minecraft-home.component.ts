import {Component} from '@angular/core';
import {NavbarItem} from "../../models/navbar";
import {AppRoutes} from "../../constants/routes";

@Component({
  selector: 'app-minecraft-home',
  templateUrl: './minecraft-home.component.html',
  styleUrls: ['./minecraft-home.component.scss']
})
export class MinecraftHomeComponent {
  navBarItems: NavbarItem[] = [
    {
      route: AppRoutes.MINECRAFT_DOWNLOAD
    },
    {
      route: AppRoutes.MINECRAFT_WORLD_ANALYZER
    },
    {
      route: AppRoutes.MINECRAFT_PROJECTS
    }
  ]
}
