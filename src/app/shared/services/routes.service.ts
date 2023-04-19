import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AppRoute} from "../models/route";
import {AppRoutes} from "../constants/routes";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private router: Router) {
  }

  navigate(route: AppRoute, queryParams?: any) {
    return this.router.navigate(
      [
        AppRoutes.absolutePath(route)
      ],
      {
        queryParams: queryParams
      }
    )
  }
}
