import {Logo} from '../logo';

export interface Contact {
  name: string;
  descriptionTK: string;
  image: string;
  category: Logo;
  url?: string;
}
