import SanityImage from "@/atoms/SanityImage";
import { TransportItemProps } from "@/types/blocks/transport.types";
import { clsx } from "@/utils/classes";
import { buildUrl } from "@/utils/url";
import { ArrowRight } from "lucide-react";
import { toPlainText } from "next-sanity";
import Link from "next/link";


const TransportItem = ({ page, block, flex, span, hideImage, compact }: TransportItemProps) => {
    const { teaser, tags, publishedAt, _type } = page;

    return(
        <Link
            href={buildUrl(page) ?? page.url}
            className={clsx(
				'flex flex-col w-full h-full overflow-hidden group !no-underline',
				'hover:bg-forestGreen-100 focus-visible:font-normal focus-visible:border-red-600  focus-visible:!outline-none',
				flex && !hideImage && 'lg:grid lg:grid-cols-2 lg:grid-rows-1',
				span && 'lg:col-span-2 col-span-1',
			)}
        >
            {!hideImage && (
                <div 
                    className={clsx(
                        flex && compact ? 'lg:aspect-square' : 'lg:aspect-auto',
                        flex && block.flipHorizontal && 'lg:order-last',
                        flex && 'h-full',
                        'aspect-auto relative w-full',
                    )}
                >
                    <SanityImage image={teaser.image} width={600} height={400} className='object-cover w-full h-full' />
                </div>
            )}
            <div className='flex flex-col h-full gap-3 p-5 no-text-margin lg:p-6 lg:gap-4'>
                {(_type === 'article' || _type === 'customerCase') && (!!publishedAt || !!teaser.teaserLabel) && (
					<p className='text-small text-secondary'>
						{_type === 'article' && new Date(publishedAt).toLocaleString('nb', { dateStyle: 'short' })}
						{_type === 'customerCase' && <span>{teaser.teaserLabel}</span>}
					</p>
				)}
                <div className='flex flex-col gap-2'>
					<div className='flex items-center w-full justify-between gap-2'>
						<h3 className='line-clamp-2 group-hover:underline group-focus-visible:underline'>
							{teaser?.title}
						</h3>
						{hideImage && <ArrowRight className='size-6 shrink-0' />}
					</div>
					{teaser?.text && (
						<p className={clsx('line-clamp-3', flex && 'lg:line-clamp-6')}>{toPlainText(teaser?.text)}</p>
					)}
				</div>
                {flex && (!hideImage || !teaser.image) && (
					<div className='items-end hidden h-full lg:flex'>
						<div className='flex items-center gap-2 group-hover:underline group-focus-visible:underline'>
							<p>Se mer</p>
							<ArrowRight className='size-4' />
						</div>
					</div>
				)}
            </div>
        </Link>
    )
}

export default TransportItem