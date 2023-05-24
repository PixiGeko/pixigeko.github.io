import { Component } from '@angular/core';
import {NavbarItem} from "../../models/navbar";
import {AppRoutes} from "../../constants/routes";
import {TwitterAccount} from "../../models/contacts/twitter";
import {DiscordAccount} from "../../models/contacts/discord";

@Component({
  selector: 'app-contacts-home',
  templateUrl: './contacts-home.component.html',
  styleUrls: ['./contacts-home.component.scss']
})
export class ContactsHomeComponent {
  twitterAccounts: TwitterAccount[] = [
    {
      id: 'PixiGeko',
      descriptionTK: 'contacts.twitter.pixigeko.description',
      image: 'https://pbs.twimg.com/profile_images/1643724327357956097/QmJpRJv1_400x400.jpg'
    },
    {
      id: 'PixiPointExe',
      descriptionTK: 'contacts.twitter.pixiexe.description',
      image: 'https://pbs.twimg.com/profile_images/1343638939358400512/jhPYu_ix_400x400.jpg'
    },
    {
      id: 'MCRelease',
      descriptionTK: 'contacts.twitter.mcrelease.description',
      image: 'https://pbs.twimg.com/profile_images/1600921679026438144/aRexvkO8_400x400.jpg'
    }
  ];
  
  discordAccounts: DiscordAccount[] = [
    {
      tag: 'PixiGeko#9645',
      descriptionTK: 'contacts.discord.pixigeko.description',
      image: 'https://cdn.discordapp.com/avatars/207198022319341569/6e7aedc9c268a54a4ff693036ce2a1e2.webp?size=160'
    }
  ];

  openTwitterAccount(account: TwitterAccount) {
    window.open(`https://twitter.com/${account.id}`, '_blank');
  }
}
