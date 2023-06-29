import { Component } from '@angular/core';
import {MinecraftProject} from "../../../models/minecraft/project";
import {Logo} from "../../../models/logo";

@Component({
  selector: 'app-mgd-repositories',
  templateUrl: './mc-projects.html',
  styleUrls: ['./mc-projects.scss']
})
export class McProjects {
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
      url: 'https://github.com/PixiGeko/Minecraft-generated-data',
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
