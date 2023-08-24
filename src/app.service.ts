import { Injectable } from '@nestjs/common';
import { RequestJson } from './interfaces/request-json.interface';
import { ImageComparsionService } from './services/image-comparsion/image-comparsion.service';
import { ProfileResult } from './interfaces/profile-result.interface';

@Injectable()
export class AppService {

  constructor(private imageComparsionService: ImageComparsionService) { }

  async profilePictureComparsion(data: RequestJson): Promise<ProfileResult[]> {
    const userImage = data.user.profile_pic_url_hd;
    const candidatesImagePath = data.candidates.map(candidate => candidate.profile_pic_url_hd);
    const ratios = await this.imageComparsionService.compareUserToCandidates(userImage, candidatesImagePath);
    return data.candidates.map((candidate, index) => {
      return { username: candidate.username, pk: candidate.pk, score: ratios[index], profile_pic_url_hd: candidate.profile_pic_url_hd };
    });
  }

}
