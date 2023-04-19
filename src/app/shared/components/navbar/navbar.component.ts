import {Component, Input} from '@angular/core';
import {NavbarItem} from "../../models/navbar";

@Component({
  selector: 'app-navbar[items]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() items?: NavbarItem[];
}
