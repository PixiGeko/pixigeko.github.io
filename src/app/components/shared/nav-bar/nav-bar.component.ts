import {Component} from '@angular/core';
import {AppRoutes} from '../../../constants/routes';
import {AppRoute, NavBarElement, NavBarSection} from '../../../models/route';
import {Tag, TAG_BETA} from '../tag/tag.component';

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
        {
          route: AppRoutes.MINECRAFT_DOWNLOAD
        },
        {
          route: AppRoutes.MINECRAFT_WORLD_ANALYZER,
          beta: true
        },
        {
          route: AppRoutes.MINECRAFT_PROJECTS
        },
      ]
    },
    {
      name: 'navigation.others.title',
      elements: [
        {
          route: AppRoutes.CONTACTS
        },
        {
          route: AppRoutes.SETTINGS
        },
      ]
    }
  ];

  getRoute(route: AppRoute) {
    return AppRoutes.routeArray(route);
  }
  
  getTags(element: NavBarElement) {
    const tags: Tag[] = [];
    
    if(element.beta) tags.push(TAG_BETA);
    
    return tags;
  }
}


