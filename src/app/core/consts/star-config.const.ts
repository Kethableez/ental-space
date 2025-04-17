import { StarConfig } from '@models/star-config.model';

export const starConfig: Map<number, StarConfig> = new Map<number, StarConfig>([
	[1, { speed: 0.35, sizeMultiplier: 1.5 }],
	[2, { speed: 0.035, sizeMultiplier: 1 }],
	[3, { speed: 0.0035, sizeMultiplier: 0.5 }]
]);
