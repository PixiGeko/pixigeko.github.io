export interface AppRoute {
  path: string;
  title: string;

  parent?: AppRoute;
}
