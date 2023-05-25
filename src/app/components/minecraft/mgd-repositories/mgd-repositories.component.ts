import { Component } from '@angular/core';
import {MinecraftProject} from "../../../models/minecraft/project";
import {Logo} from "../../../models/logo";

@Component({
  selector: 'app-mgd-repositories',
  templateUrl: './mgd-repositories.component.html',
  styleUrls: ['./mgd-repositories.component.scss']
})
export class MgdRepositoriesComponent {
  projects: MinecraftProject[] = [
    {
      name: '@MCRelease',
      descriptionTK: 'minecraft.projects.mcrelease.description',
      url: 'https://twitter.com/MCRelease',
      category: Logo.TWITTER
    },
    {
      name: 'Minecraft-generated-data',
      descriptionTK: 'minecraft.projects.mgd.description',
      url: 'https://github.com/PixiGeko/Minecraft-generated-assets',
      category: Logo.GITHUB
    },
    {
      name: 'Minecraft-default-assets',
      descriptionTK: 'minecraft.projects.mda.description',
      url: 'https://github.com/PixiGeko/Minecraft-default-assets',
      category: Logo.GITHUB
    },
    {
      name: 'Minecraft-default-data',
      descriptionTK: 'minecraft.projects.mdd.description',
      url: 'https://github.com/PixiGeko/Minecraft-default-data',
      category: Logo.GITHUB
    }
  ];

  openURL(project: MinecraftProject) {
    window.open(project.url, '_blank');
  }
}
