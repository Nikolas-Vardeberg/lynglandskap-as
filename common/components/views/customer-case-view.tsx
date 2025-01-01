"use client"

import { RichTextSimple } from "@/atoms/content/RichText";
import { SectionHeading } from "@/atoms/Heading";
import SanityImage from "@/atoms/SanityImage";
import Byline from "@/organisms/content/Byline";
import { CustomerCase } from "@/types/pages/customer-case.types";

export default function CustomerCaseView({ data }: { data: CustomerCase }) {
    return(
        <div>
            <div className='flex flex-col gap-7'>
                <div className="flex flex-col px-8 sm:px-20 py-10 gap-8 relative">
                    <div className="flex flex-col items-start justify-start gap-6 w-full sm:w-9/12">
                        <SectionHeading title={data.title} />
                        {data.entry && <RichTextSimple blocks={data.entry ?? []} elementClassName="entry" />}
                    </div>
                    {data.mainImage && (
                        <SanityImage 
                            image={data.mainImage}
                            height={1080}
                            width={1920}
                        />
                    )}
                </div>
            </div>
            {data.editor && <Byline {...data.editor} />}
        </div>
    )
}