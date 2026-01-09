import { Controller, Get, Param } from '@nestjs/common';
import { DownloaderService } from './downloader.service';

@Controller('downloader')
export class DownloaderController {
    @Get()
    downloadVideo(): string {
        // Logic to handle video downloading
        
        return 'Video download initiated';
    }
}
