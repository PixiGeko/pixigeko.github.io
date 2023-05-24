export interface Contact {
  name: string;
  descriptionTK: string;
  image: string;
  category: ContactCategory;
  url?: string;
}

export enum ContactCategory {
  TWITTER = 'social/twitter.png',
  DISCORD = 'social/discord.png'
}
