import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Profile } from 'src/interfaces/profile.interface';
import { RequestJson } from 'src/interfaces/request-json.interface';

class ProfileValidators implements Profile {
  @IsNotEmpty()
  profile_pic_url_hd: string;

  @IsNotEmpty()
  pk: string;

  @IsNotEmpty()
  username: string;
}

export class ProfilePictureComparsionPipe implements RequestJson {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProfileValidators)
  user: ProfileValidators;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProfileValidators)
  candidates: ProfileValidators[];
}
