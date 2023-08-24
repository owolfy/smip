import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageComparsionService } from './services/image-comparsion/image-comparsion.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ImageComparsionService],
})
export class AppModule { }
