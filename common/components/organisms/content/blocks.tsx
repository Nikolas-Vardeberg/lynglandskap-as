import ReactComment from '@/atoms/react-comment';
import type { Block as BlockType } from '@/types/blocks/blocks.types';
import { clsx } from '@/utils/classes';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const ImageBlock = dynamic(() => import('@/organisms/content/ImageBlock'), {
	ssr: true,
});

export const RenderBlock = ({ block, k: key }: { block: BlockType; k: number }) => {
    switch (block._type) {
        case "image":
            return(
                <ImageBlock {...block} />
            );

        default: {
            //biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const data = block as any;
            console.warn(`Unknown block type "${data._type}"`);

            return(
                <div key={key}>
                    <p>Unknown block type "${data._type ?? "None"}"</p>
                    {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(data, undefined, 2)}</pre>}
                </div>
            )
        }
    }
}

const Blocks = ({ blocks, className }: { blocks: BlockType[], className?: string; }) => {
    return(
        <div className={clsx('flex flex-col items-center gap-5 lg:gap-7', className)}>
            {blocks?.map((block, i) => {
                const key = `${block._key}-${i}`;
                return (
                    <Fragment key={key}>
                        <ReactComment text={`Block of type: ${block._type}`} />
                        <RenderBlock block={block} k={i} />
                    </Fragment>
                )
            })}
        </div>
    )
}