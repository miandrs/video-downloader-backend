import { Test, TestingModule } from '@nestjs/testing';
import { DownloaderGateway } from './downloader.gateway';

describe('DownloaderGateway', () => {
  let gateway: DownloaderGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloaderGateway],
    }).compile();

    gateway = module.get<DownloaderGateway>(DownloaderGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
