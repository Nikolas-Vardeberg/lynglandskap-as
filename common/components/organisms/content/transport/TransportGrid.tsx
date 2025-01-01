import type { GridProps, TransportGridProps } from '@/types/blocks/transport.types';
import TransportItem from './TransportItem';

const GRID_LAYOUTS: Record<string, { compact: number[]; default: number[] }> = {
	FEATURED: {
		compact: [1, 3, 5],
		default: [1],
	},
	TWO_COLUMNS: {
		compact: [2, 4],
		default: [2, 4],
	},
	THREE_COLUMNS: {
		compact: [],
		default: [3],
	},
	MIXED: {
		compact: [],
		default: [5],
	},
} as const;

const TwoColumnGrid = ({ pages, block, hideImage }: GridProps) => (
	<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-12'>
		{pages.map((page, i) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<TransportItem key={i} page={page} block={block} hideImage={hideImage} compact />
		))}
	</div>
);

const ThreeColumnGrid = ({ pages, block, hideImage }: GridProps) => (
	<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-12'>
		{pages.map((page, i) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<TransportItem key={i} page={page} block={block} hideImage={hideImage} />
		))}
	</div>
);

const TransportGrid = ({ pages, compact = false, block, hideImage }: TransportGridProps) => {
	if (!pages || pages.length === 0) return null;

	const pagesLength = pages?.length;

	const layoutType = compact ? 'compact' : 'default';

	if (GRID_LAYOUTS.FEATURED[layoutType].includes(pagesLength)) {
		return (
			<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-12 bg-white'>
				<TransportItem
					key={pages[0]._key}
					page={pages[0]}
					flex
					block={block}
					span
					hideImage={hideImage}
					compact={compact}
				/>
				{pages.slice(1).map((page, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TransportItem key={i} page={page} block={block} hideImage={hideImage} />
				))}
			</div>
		);
	}
	if (GRID_LAYOUTS.TWO_COLUMNS[layoutType].includes(pagesLength)) {
		return <TwoColumnGrid pages={pages} block={block} hideImage={hideImage} />;
	}
	if (GRID_LAYOUTS.MIXED[layoutType].includes(pagesLength)) {
		return (
			<>
				<TwoColumnGrid pages={pages.slice(0, 2)} block={block} hideImage={hideImage} />
				<ThreeColumnGrid pages={pages.slice(2)} block={block} hideImage={hideImage} />
			</>
		);
	}
	return compact ? (
		<TwoColumnGrid pages={pages} block={block} hideImage={hideImage} />
	) : (
		<ThreeColumnGrid pages={pages} block={block} hideImage={hideImage} />
	);
};

export default TransportGrid;