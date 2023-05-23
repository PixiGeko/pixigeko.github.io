import { Component } from '@angular/core';
import {NavbarItem} from "../../models/navbar";
import {AppRoutes} from "../../constants/routes";
import {TwitterAccount} from "../../models/projects/twitter";

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

  openTwitterAccount(account: TwitterAccount) {
    window.open(`https://twitter.com/${account.id}`, '_blank');
  }
}
