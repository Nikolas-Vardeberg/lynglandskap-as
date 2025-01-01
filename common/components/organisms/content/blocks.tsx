import RichText, { RichTextSimple } from '@/atoms/content/RichText';
import ReactComment from '@/atoms/react-comment';
import type { Block, Block as BlockType } from '@/types/blocks/blocks.types';
import { RichTextPassThroughProps } from '@/types/root.types';
import { clsx } from '@/utils/classes';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const ImageBlock = dynamic(() => import('@/organisms/content/ImageBlock'), {
	ssr: true,
});

const TransportBlock = dynamic(() => import('./transport/TransportBlock'), {
	ssr: true,
});

export const RenderBlock = ({
	block,
	richTextProps,
	isRichText,
	useFullGrid = false,
}: { block: Block; richTextProps?: RichTextPassThroughProps; isRichText?: boolean; useFullGrid?: boolean }) => {
    if (!block) return null;

    switch (block._type) {
        case "image":
            return(
                <ImageBlock {...block} />
            );

        case "simplerRichText":
            return(
                <div className='flex flex-col px-8 sm:px-20 py-10 max-w-[1400px] mx-auto '> 
                    <RichText id="simple-rich-text" blocks={block.text} {...richTextProps} />
                </div>
            )

        case "transportBlocks":
            return(
                <div className='flex flex-col px-8 sm:px-20 py-10 w-full'>
                    <TransportBlock {...block} isRichText={isRichText} />
                </div>
            )


            default:
                console.warn('missing block:', block);
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                return <p>Missing: {(block as any)?._type}</p>;
    }
}

export default function Blocks({
	blocks,
	richTextProps,
	isRichText,
	className,
	useFullGrid = false,
}: {
	blocks: Block[];
	richTextProps?: RichTextPassThroughProps;
	isRichText?: boolean;
	className?: string;
	useFullGrid?: boolean;
}) {
    if (!blocks || blocks.length === 0) return null;

    return(
        <div className={clsx('flex flex-col items-center gap-5 lg:gap-7', className)}>
        {blocks?.map((block, index) => {
            const key = `${block._type}-${index}`;
            return (
                <Fragment key={key}>
                    <ReactComment text={`Block of type: ${block._type}`} />
                    <RenderBlock
                        block={block}
                        richTextProps={richTextProps}
                        isRichText={isRichText}
                        useFullGrid={useFullGrid}
                    />
                </Fragment>
            );
        })}
    </div>
    )
}