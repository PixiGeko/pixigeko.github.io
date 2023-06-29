import {Component} from '@angular/core';
import {Contact} from "../../../models/contacts/contact";
import {Logo} from "../../../models/logo";

@Component({
  selector: 'app-logo-home',
  templateUrl: './contacts-home.component.html',
  styleUrls: ['./contacts-home.component.scss']
})
export class ContactsHomeComponent {
  contacts: Contact[] = [
    {
      name: 'PixiGeko#9645',
      descriptionTK: 'contacts.discord.pixigeko.description',
      image: 'https://cdn.discordapp.com/avatars/207198022319341569/6e7aedc9c268a54a4ff693036ce2a1e2.webp?size=160',
      category: Logo.DISCORD
    },
    {
      name: '@PixiGeko',
      descriptionTK: 'contacts.twitter.pixigeko.description',
      image: 'https://pbs.twimg.com/profile_images/1643724327357956097/QmJpRJv1_400x400.jpg',
      category: Logo.TWITTER,
      url: this.twitterURL('PixiGeko')
    },
    {
      name: '@PixiPointExe',
      descriptionTK: 'contacts.twitter.pixiexe.description',
      image: 'https://pbs.twimg.com/profile_images/1343638939358400512/jhPYu_ix_400x400.jpg',
      category: Logo.TWITTER,
      url: this.twitterURL('PixiPointExe')
    }
  ];

  openURL(account: Contact) {
    window.open(account.url, '_blank');
  }
  
  private twitterURL(name: string) {
    return `https://twitter.com/${name}`;
  }
}
