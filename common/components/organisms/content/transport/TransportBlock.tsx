import { RichTextSimple } from "@/atoms/content/RichText";
import { SectionHeading } from "@/atoms/Heading";
import { ITransportBlock } from "@/types/blocks/transport.types";
import TransportGrid from "./TransportGrid";
import { Page } from "@/types/root.types";



export default function TransportBlock(block: ITransportBlock & { isRichText?: boolean }) {
    if (!block.pages || block.pages.length === 0) return null;

    return (
        <div className="flex flex-col items-start gap-5">
            {(block.title || block.description) && (
                <div className='flex flex-col max-w-[1400px]'>
                    {block.title && <SectionHeading title={block.title} /> }
                    {block.description && ( <RichTextSimple  blocks={block.description} /> )}
                </div>
            )}

            <TransportGrid
                pages={block.pages as Page[]}
                block={block}
                compact={block.isRichText}
                hideImage={block.hideImage}
            />
        </div>
    )
}