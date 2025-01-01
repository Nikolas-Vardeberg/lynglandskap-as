import SanityImage from "@/atoms/SanityImage";
import { TransportItemProps } from "@/types/blocks/transport.types";
import { clsx } from "@/utils/classes";
import { buildUrl } from "@/utils/url";
import { toPlainText } from "next-sanity";
import Link from "next/link";


const TransportItem = ({ page, block, flex, span, hideImage, compact }: TransportItemProps) => {
    const { teaser, tags, publishedAt, _type } = page;

    return(
        <Link
            href={buildUrl(page) ?? page.url}
            className={clsx(
                "flex flex-col w-full h-full overflow-hidden !no-underline",
            )}
        >
            {!hideImage && (
                <div 
                    className={clsx(
                        flex && compact ? 'lg:aspect-square' : 'lg:aspect-video',
                        flex && block.flipHorizontal && 'lg:order-last',
                        flex && 'h-full',
                        'aspect-video relative w-full',
                    )}
                >
                    <SanityImage image={teaser.image} width={600} height={400} className='object-cover h-full' />
                </div>
            )}
            <div className="flex flex-col gap-4 h-full ">
                {(_type === 'article' || _type === 'customerCase') && (!!publishedAt || !!teaser.teaserLabel) && (
					<p className='text-small text-secondary'>
						{_type === 'article' && new Date(publishedAt).toLocaleString('nb', { dateStyle: 'short' })}
						{_type === 'customerCase' && <span>{teaser.teaserLabel}</span>}
					</p>
				)}
                <div className="flex flex-col gap-2">
                    <div className='flex items-center w-full justify-between gap-2 text-forestGreen-500'>
						<h4 className='line-clamp-2 group-hover:underline group-focus-visible:underline'>
							{teaser?.title}
						</h4>
					</div>
                    {teaser?.text && (
						<p className={clsx('line-clamp-3', flex && 'lg:line-clamp-6')}>{toPlainText(teaser?.text)}</p>
					)}
                </div>
            </div>
        </Link>
    )
}

export default TransportItem