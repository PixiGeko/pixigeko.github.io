import {Component} from '@angular/core';
import {AppRoutes} from '../../../constants/routes';
import {AppRoute} from '../../../models/route';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  sections: NavBarSection[] = [
    {
      name: 'navigation.minecraft.title',
      elements: [
        AppRoutes.MINECRAFT_DOWNLOAD,
        AppRoutes.MINECRAFT_WORLD_ANALYZER,
        AppRoutes.MINECRAFT_PROJECTS,
      ]
    },
    {
      name: 'navigation.others.title',
      elements: [
        AppRoutes.CONTACTS,
        AppRoutes.SETTINGS
      ]
    }
  ];

  getRoute(route: AppRoute) {
    return AppRoutes.routeArray(route);
  }
}

export interface NavBarSection {
  name: string;
  elements: AppRoute[];
}
