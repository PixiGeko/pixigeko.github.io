import {AppRoute} from "./route";

export interface NavbarItem {
  route: AppRoute;
  title?: string;
  disabled?: boolean;
  hide?: boolean;
  icon?: string;
}
