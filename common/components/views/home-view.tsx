"use client"

import { IHomePage } from "@/types/root.types";
import Blocks from '@/organisms/content/blocks';
import SanityImage from "@/atoms/SanityImage";
import { RichTextSimple } from '@/atoms/content/RichText';
import { SectionHeading } from "@/atoms/Heading";

export default function HomeView({ data }: { data: IHomePage }) {

    const renderHero = () => (
        <div className="flex flex-col px-8 sm:px-20 py-10 gap-8 relative">
            <div className="flex flex-col items-start justify-start gap-6 w-full sm:w-9/12">
                {data.title && <SectionHeading title={data.title} />}
                {data.description && <RichTextSimple blocks={data.description} elementClassName="entry" />}
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
				className={`bg-${section.color} bg-green-400`}
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