export interface AppRoute {
  path: string;
  title: string;
  tabTitle?: string;
  parent?: AppRoute;
}
