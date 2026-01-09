import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DownloaderService } from './downloader.service';
import type { Download } from './interfaces/video.interface';

@WebSocketGateway({ cors: true })
export class DownloaderGateway {
  constructor(private readonly downloaderService: DownloaderService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('start-download')
  async handleDownload(
    @MessageBody() payload: Download,
    @ConnectedSocket() client: Socket
  ) {
    await this.downloaderService.downloadVideo(payload, this.server, client.id);
  }
}
