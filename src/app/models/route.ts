export interface AppRoute {
  path: string;
  title: string;
  tabTitle?: string;
  parent?: AppRoute;
}

export interface NavBarSection {
  name: string;
  elements: NavBarElement[];
}

export interface NavBarElement {
  route: AppRoute;
  beta?: boolean;
}
