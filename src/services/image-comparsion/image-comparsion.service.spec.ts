import { Test, TestingModule } from '@nestjs/testing';
import { ImageComparsionService } from './image-comparsion.service';
import Jimp from 'jimp';

jest.mock('jimp');

describe('ImageComparsionService', () => {
  let service: ImageComparsionService;
  let mockImage;

  beforeEach(async () => {
    mockImage = {
      resize: jest.fn().mockReturnThis(),
      blur: jest.fn().mockReturnThis(),
    };

    (Jimp.read as jest.Mock).mockResolvedValue(mockImage);
    (Jimp.distance as jest.Mock).mockReturnValue(0.1);
    (Jimp.diff as jest.Mock).mockReturnValue({ percent: 0.2 });

    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageComparsionService],
    }).compile();

    service = module.get<ImageComparsionService>(ImageComparsionService);
  });

  describe('compareUserToCandidates', () => {
    it('should compare user to candidates', async () => {
      const mainImageUrl = 'mainImageUrl';
      const candidateImagePaths = ['path1', 'path2'];

      const result = await service.compareUserToCandidates(mainImageUrl, candidateImagePaths);
      expect(Jimp.read).toHaveBeenCalledWith(mainImageUrl);
      expect(Jimp.read).toHaveBeenCalledWith(candidateImagePaths[0]);
      expect(Jimp.read).toHaveBeenCalledWith(candidateImagePaths[1]);
      expect(result.length).toBe(candidateImagePaths.length);
      expect(result[0]).toBeCloseTo(0.8);
    });
  });

  describe('createReadForCandidates', () => {
    it('should create read promises for candidates', () => {
      const candidateImagePaths = ['path1', 'path2'];
      const result = service.createReadForCandidates(candidateImagePaths);
      expect(Jimp.read).toHaveBeenCalledWith(candidateImagePaths[0]);
      expect(Jimp.read).toHaveBeenCalledWith(candidateImagePaths[1]);
      expect(result.length).toBe(candidateImagePaths.length);
    });
  });

  describe('compareUserToCandidate', () => {
    it('should compare user to a single candidate', async () => {
      const userImage = mockImage;
      const candidateImagePromise = Jimp.read('candidateImagePath');
      const result = await service.compareUserToCandidate(userImage, candidateImagePromise);
      expect(result).toBeCloseTo(0.8);
    });
  });
});
