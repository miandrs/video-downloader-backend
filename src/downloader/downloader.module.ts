import { Module } from '@nestjs/common';
import { DownloaderController } from './downloader.controller';
import { DownloaderService } from './downloader.service';
import { DownloaderGateway } from './downloader.gateway';

@Module({
  controllers: [DownloaderController],
  providers: [DownloaderService, DownloaderGateway]
})
export class DownloaderModule {}
