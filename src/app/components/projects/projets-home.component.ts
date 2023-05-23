import { Component } from '@angular/core';
import {NavbarItem} from "../../models/navbar";
import {AppRoutes} from "../../constants/routes";

@Component({
  selector: 'app-projets-home',
  templateUrl: './projets-home.component.html',
  styleUrls: ['./projets-home.component.scss']
})
export class ProjetsHomeComponent {
  navBarItems: NavbarItem[] = [
    {
      route: AppRoutes.PROJECTS_TWITTER
    },
    {
      route: AppRoutes.PROJECTS_CODA
    }
  ]
}
