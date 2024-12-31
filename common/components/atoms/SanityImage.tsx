import { urlFor } from '@/sanity/lib/image';
import { LynglandskapImage, Nullable } from '@/types/root.types';
import Image from 'next/image';

type Props = {
	quality?: number;
	image?: LynglandskapImage;
	className?: string;
	sanityFill?: boolean;
} & (
	| {
			width: number;
			height: number;
			fill?: never;
	  }
	| {
			fill: boolean;
			width?: never;
			height?: never;
	  }
);

export default function SanityImage({ image, quality = 80, fill, height, width, sanityFill, ...props }: Props) {
	if (!image || !image.data || !image.asset) return null;

	const alt = image.altTextOverride || ((image?.data as LynglandskapImage)?.altText as Nullable<string> | undefined);

	if (typeof fill !== 'boolean' && (!width || !height)) {
		return null;
	}

	return (
		<Image
			src={
				typeof fill === 'boolean'
					? urlFor(image).quality(quality).url()
					: sanityFill
						? urlFor(image).quality(quality).url()
						: urlFor(image).width(width).height(height).quality(quality).url()
			}
			alt={alt || 'Ingen alternativ tekst'}
			quality={quality}
			fill={fill}
			width={width}
			height={height}
			blurDataURL={image.lqip}
			loading='lazy'
			placeholder='blur'
			{...props}
		/>
	);
}