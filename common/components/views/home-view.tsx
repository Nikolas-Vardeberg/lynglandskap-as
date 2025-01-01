"use client"

import { IHomePage } from "@/types/root.types";
import Blocks from '@/organisms/content/blocks';
import SanityImage from "@/atoms/SanityImage";
import { RichTextSimple } from '@/atoms/content/RichText';
import { SectionHeading } from "@/atoms/Heading";

export default function HomeView({ data }: { data: IHomePage }) {

    const renderHero = () => (
        <div className="flex flex-col px-4 sm:px-5 py-10 gap-8 relative">
            <div className="flex flex-col items-start justify-start gap-6 max-w-[1200px]">
                {data.title && <SectionHeading title={data.title} />}
                {data.description && <RichTextSimple blocks={data.description} />}
            </div>
            {data.mainImage && (
                <SanityImage 
                    image={data.mainImage}
                    height={1080}
                    width={1920}
                />
            )}
        </div>
    )

    const renderSections = () =>
		data.sections?.map((section, i) => (
			<div
				key={`${section.color}-${i}`}
				className={`bg-${section.color} pb-10 lg:pb-20 ${i > 0 ? 'pt-5 lg:pt-10' : 'pt-10 lg:pt-20'}`}
			>
				<Blocks
					blocks={section.blocks}
					useFullGrid
					richTextProps={{
						classNameByType: (type) => (type === 'h2' ? '!mt-0' : ''),
					}}
				/>
			</div>
		));


    return(
        <div className="">
            <div className='flex flex-col'>
                {renderHero()}
                {renderSections()}
            </div>
        </div>
    )
}