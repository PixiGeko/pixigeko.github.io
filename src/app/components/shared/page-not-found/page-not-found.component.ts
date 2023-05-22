import {Component} from '@angular/core';
import {RoutesService} from "../../../services/routes.service";
import {AppRoutes} from "../../../constants/routes";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private routesService: RoutesService) {
  }

  navigateToHome() {
    this.routesService.navigate(AppRoutes.HOME)
  }
}
