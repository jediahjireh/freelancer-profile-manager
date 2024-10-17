import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  hugeFacebook01,
  hugeFolderLinks,
  hugeGithub01,
  hugeInstagram,
  hugeLinkedin01,
  hugeLinkSquare02,
  hugeMail01,
  hugeNewTwitterRectangle,
  hugeTiktok,
  hugeWhatsapp,
  hugeYoutube,
} from '@ng-icons/huge-icons';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
  providers: [
    provideIcons({
      hugeLinkedin01,
      hugeGithub01,
      hugeMail01,
      hugeLinkSquare02,
      hugeFolderLinks,
      hugeInstagram,
      hugeTiktok,
      hugeNewTwitterRectangle,
      hugeFacebook01,
      hugeYoutube,
      hugeWhatsapp,
    }),
  ],
})
export class SocialLinksComponent {
  @Input() freelancer!: Freelancer;

  // get the social icon based on the platform
  getSocialIcon(platform: string): string {
    if (platform.toLowerCase().includes('linkedin')) {
      return 'hugeLinkedin01';
    }

    if (platform.toLowerCase().includes('github')) {
      return 'hugeGithub01';
    }

    if (platform.toLowerCase().includes('portfolio')) {
      return 'hugeFolderLinks';
    }

    if (platform.toLowerCase().includes('instagram')) {
      return 'hugeInstagram';
    }

    if (platform.toLowerCase().includes('tiktok')) {
      return 'hugeTiktok';
    }

    if (platform.toLowerCase().includes('twitter')) {
      return 'hugeNewTwitterRectangle';
    }

    if (platform.toLowerCase().includes('facebook')) {
      return 'hugeFacebook01';
    }

    if (platform.toLowerCase().includes('whatsapp')) {
      return 'hugeWhatsapp';
    }

    if (platform.toLowerCase().includes('youtube')) {
      return 'hugeYoutube';
    }

    // default external link icon for other platforms
    return 'hugeLinkSquare02';
  }
}
