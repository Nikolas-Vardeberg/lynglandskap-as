import type { ReactNode } from 'react';
import { clsx } from '@/utils/classes';

type HeaderProps = {
	title: string | ReactNode;
	horizontalPadding?: boolean;
	className?: string;
};

const headingClass = 'inline-flex flex-wrap text-forestGreen-500';

export const MainHeading = ({ title, horizontalPadding = false, className }: HeaderProps) => {
	if (!title || (typeof title === 'string' && title.trim() === '')) return null;

	return (
		<h1
			className={clsx(
				headingClass,
				'pt-10 pb-4 lg:pt-20 lg:pb-5',
				horizontalPadding && 'px-4 lg:px-[38px]',
				className,
			)}
		>
			{title}
		</h1>
	);
};

export const SectionHeading = ({ title, id, horizontalPadding = false, className }: HeaderProps & { id?: string }) => {
	if (!title || (typeof title === 'string' && title.trim() === '')) return null;

	return (
		<h2
			id={id}
			className={clsx(headingClass, 'pt-5 pb-3 lg:pt-7', horizontalPadding && 'px-4 lg:px-[38px]', className)}
		>
			{title}
		</h2>
	);
};

export const SubHeading = ({ title, horizontalPadding = false, className }: HeaderProps) => {
	if (!title || (typeof title === 'string' && title.trim() === '')) return null;

	return <h3 className={clsx(headingClass, 'pt-5 pb-3 lg:pt-7', horizontalPadding && 'px-4', className)}>{title}</h3>;
};