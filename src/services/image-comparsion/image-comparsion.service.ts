import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';

enum DEFAULT_IMAGE_DIMENSIONS {
    WIDTH = 128,
    HEIGHT = 128
}

@Injectable()
export class ImageComparsionService {

    async compareUserToCandidates(mainImageUrl: string, candidateImagePaths: string[]): Promise<number[]> {
        const mainImage = await Jimp.read(mainImageUrl);
        mainImage.resize(DEFAULT_IMAGE_DIMENSIONS.WIDTH, DEFAULT_IMAGE_DIMENSIONS.HEIGHT).blur(4);
        const candidateImagePromises = this.createReadForCandidates(candidateImagePaths);
        const ratiosArray = candidateImagePromises.map(candidateImagePromise =>
            this.compareUserToCandidate(mainImage, candidateImagePromise)
        );
        return Promise.all(ratiosArray);
    }

    createReadForCandidates(candidateImagePaths: string[]): Promise<Jimp>[] {
        return candidateImagePaths.map(candidateImagePath => Jimp.read(candidateImagePath));
    }

    async compareUserToCandidate(userImage: Jimp, candidateImagePromise: Promise<Jimp>): Promise<number> {
        const candidateImage = await candidateImagePromise;
        candidateImage.resize(DEFAULT_IMAGE_DIMENSIONS.WIDTH, DEFAULT_IMAGE_DIMENSIONS.HEIGHT);
        const distance = Jimp.distance(userImage, candidateImage);
        const diff = Jimp.diff(userImage, candidateImage);
        const pixelSimilarity = 1 - diff.percent;
        const hashSimilarity = 1 - distance;
        return Math.min(pixelSimilarity, hashSimilarity);
    }

}
