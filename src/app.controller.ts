import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ProfilePictureComparsionPipe } from './pipes/profile-picture-comparsion/profile-picture-comparsion.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async profilePictureComparsion(
    @Body() data: ProfilePictureComparsionPipe,
    @Res() res) {
    try {
      const result = await this.appService.profilePictureComparsion(data);
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error, please contact support');
    }
  }

}
