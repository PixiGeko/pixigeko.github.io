import {Component, Input} from '@angular/core';
import {AppRoutes} from "../../../constants/routes";
import {NavbarItem} from "../../../models/navbar";

@Component({
  selector: 'app-navbar-item[item]',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {
  @Input() item!: NavbarItem;
  @Input() uppercase: boolean = true;

  constructor() {
  }

  get absolutePath() {
    return `/${AppRoutes.absolutePath(this.item.route)}`;
  }
}
