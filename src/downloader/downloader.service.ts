import { Injectable } from '@nestjs/common';
import { YtDlp } from 'ytdlp-nodejs';
import { Download } from './interfaces/video.interface';

@Injectable()
export class DownloaderService {
    // Service methods for downloading videos can be added here
    async downloadVideo(payload: Download, io: any, clientId: string): Promise<void> {
        const ytdlp = new YtDlp();

        const process = await ytdlp.exec(payload.url, {
            format: 'best',
            output: './downloads/%(title)s.%(ext)s',
            progress: true, // IMPORTANT
        });

        process.stdout?.on('data', (data) => {
            const output = data.toString();
            //const match = output.match(/(\d+(?:\.\d+)?)%/);

            io.to(clientId).emit('download-progress', {
              downloadId: payload.id,
              content: output,
            });
            console.log(output); // contient la progression
        });

        process.on('close', () => {
          io.to(clientId).emit(`download-complete-${payload.id}`);
        });

        process.stderr?.on('data', (data) => {
          io.to(clientId).emit(`download-failed-${payload.id}`);  
          console.error(data.toString());
        });

        await process;
    }
}
