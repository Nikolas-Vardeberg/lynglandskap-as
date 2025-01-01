import RichTextPropsProvider from "@/providers/richtext-provider";
import type { SanityRichtTextType, SizeProps } from "@/types/root.types";
import { clsx } from "@/utils/classes";
import { ReactNode } from "react";
import { PortableText as NativePortableText } from '@portabletext/react';
import { SectionHeading, SubHeading } from "../Heading";
import { slugify } from "@/utils/string";
import type { JSX } from "react";

export type SimpleRichTextProps = {
	blocks: SanityRichtTextType;
	elementClassName?: string;
	wrapperClassName?: string;
	classNameByType?: (type: string) => string;
	spanStart?: SizeProps;
	span?: SizeProps;
	id?: string;
	noMargin?: boolean;
};

export type RichTextProps = {
	blocks: SanityRichtTextType;
	elementClassName?: string;
	wrapperClassName?: string;
	classNameByType?: (type: string) => string;
	spanStart?: SizeProps;
	span?: SizeProps;
	id?: string;
};

export type PortableTextBlockType = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: (props: any) => ReactNode;
};

const types: PortableTextBlockType = {

}

const PortableTextWithComponents = ({ blocks, elementClassName, wrapperClassName, id, ...props }: RichTextProps) => {
    return(
        <div className={clsx('flex flex-col gap-5 lg:gap-7 portable-text', wrapperClassName)}>
            <NativePortableText 
                value={blocks}
                components={{
                    block: {
                        normal: ({ children }) => <p className={clsx('p-p', elementClassName)}>{children}</p>,
                        h2: ({ children, value }) => (
							<SectionHeading
								title={children}
								id={slugify(value.children[0].text ?? '')}
								className={elementClassName}
							/>
						),
						h3: ({ children }) => <SubHeading title={children} className={clsx(elementClassName)} />,
						h4: ({ children }) => <h4 className={clsx('p-h4', elementClassName)}>{children}</h4>,
						h5: ({ children }) => <h5 className={clsx('p-h5', elementClassName)}>{children}</h5>,

						h6: ({ children }) => <h6 className={clsx('p-h6', elementClassName)}>{children}</h6>,
                    },
                    list: {
						bullet: ({ children, value }) => {
							if (value.level > 1) {
								return <ul className={clsx('p-ul', elementClassName)}>{children}</ul>;
							}
							return <ul className={clsx('p-ul', elementClassName)}>{children}</ul>;
						},
						number: ({ children, value }) => {
							if (value.level > 1) {
								return <ul className={clsx('p-ul', elementClassName)}>{children}</ul>;
							}
							return <ol className={clsx('p-ol', elementClassName)}>{children}</ol>;
						},
					},
                    types,
                }}
            />
        </div>
    )
}

export default function RichText({ blocks, elementClassName, wrapperClassName, id, ...props }: RichTextProps) {
    if (!blocks || blocks.length === 0) return null;

	if (blocks[0]?.children && blocks[0]?.children[0]?.text === '') {
		blocks.shift();
	}

	return (
		<RichTextPropsProvider {...props}>
			<div className='items-center justify-center w-full' id={id}>
				<div className="flex px-4 sm:px-5">
					<PortableTextWithComponents
						blocks={blocks}
						elementClassName={elementClassName}
						wrapperClassName={wrapperClassName}
					/>
				</div>
			</div>
		</RichTextPropsProvider>
	);
}

export const RichTextSimple = ({ blocks, elementClassName, wrapperClassName }: SimpleRichTextProps) => {
    return(
        <PortableTextWithComponents
            blocks={blocks}
            elementClassName={elementClassName}
            wrapperClassName={wrapperClassName}
	    />
    )
}
