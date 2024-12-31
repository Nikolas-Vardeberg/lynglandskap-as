import SanityImage from '@/atoms/SanityImage';
import type { LynglandskapImage } from '@/types/root.types';
import { clsx } from '@/utils/classes';

const getSizeByAspect = (image?: LynglandskapImage) => {
	if (!image) return { width: 1920, height: 1080 };

	if (image.aspect === 'auto' && image.dimensions) {
		return {
			width: image.dimensions.width,
			height: image.dimensions.height,
		};
	}

	let size = { width: 1920, height: 1080 };

	if (image.aspect === '16:9') size = { width: 1920, height: 1080 };
	if (image.aspect === '4:3') size = { width: 1440, height: 1080 };
	if (image.aspect === '1:1') size = { width: 1080, height: 1080 };

	return size;
};

export default function ImageBlock({ image }: { image: LynglandskapImage }) {
	const size = getSizeByAspect(image);

	return (
		<div className='flex flex-col gap-3'>
			<div
				className={clsx(
					'w-full rounded-xl  ',
					image.aspect && image.aspect !== 'auto' && `aspect-[${image.aspect}]`,
				)}
			>
				<SanityImage image={image} {...size} className='rounded-lg' />
			</div>
			{image.description && <p className='px-6 fotocred text-end'>{image.description}</p>}
		</div>
	);
}