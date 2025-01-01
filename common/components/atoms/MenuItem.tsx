import { clsx } from '@/utils/classes';
import { sanitize } from '@/utils/string';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import type { LIIcon } from './icon';

type MenuItemProps = {
	title: string;
	href?: string;
	level?: 1 | 2 | 3;
	hasChildren?: boolean;
	isOpen?: boolean;
	onClick?: () => void;
	iconLeft?: LIIcon;
	iconRight?: LIIcon;
	ariaLabel?: string;
	className?: string;
	tabIndex?: number;
};

const MenuItem = ({
	title,
	href,
	level = 3,
	hasChildren = false,
	isOpen = false,
	onClick,
	iconLeft: IconLeft,
	iconRight: IconRight,
	ariaLabel = title,
	className,
	tabIndex,
	...props
}: MenuItemProps) => {
	const menuItemBaseClass = clsx('block w-full lg:w-fit');
	const buttonClass = clsx(
		menuItemBaseClass,
		'hover:after:bg-red-600 focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:bg-forestGreen-100 disabled:rounded disabled:opacity-60 after:block after:w-[30px] after:h-0.5 after:rounded-full',
	);
	const spanClass = 'flex items-center gap-2';
	const iconClass = 'size-4';

	const sanitizedTitle = sanitize(title);

	const renderItems = () => {
		if (level === 1) {
			const level1Item = clsx(
				menuItemBaseClass,
				'text-base text-forestGreen-700 font-medium leading-7 py-3 px-4 lg:py-2.5 lg:text-lg lg:leading-8',
				'menuitem',
			);
			const level1Button = clsx(
				level1Item,
				buttonClass,
				'after:w-[45px]',
				isOpen && 'after:w-full after:bg-red-600',
			);

			if (href) {
				return (
					<Link href={href} tabIndex={tabIndex} className={clsx(level1Button, className)}>
						<span className={clsx(spanClass, 'mx-[1px]')}>
							{IconLeft && <IconLeft className={iconClass} />}
							{sanitizedTitle}
							{IconRight && <IconRight className={iconClass} />}
						</span>
					</Link>
				);
			}
			if (onClick) {
				return (
					<button
						{...props}
						type='button'
						tabIndex={tabIndex}
						aria-label={sanitize(ariaLabel)}
						aria-expanded={isOpen}
						onClick={onClick}
						className={clsx(level1Button, className)}
					>
						<span className={clsx(spanClass, 'mx-[1px]')}>
							{IconLeft && <IconLeft className={iconClass} />}
							{sanitizedTitle}
							{IconRight ? (
								<IconRight className={iconClass} />
							) : (
								hasChildren &&
								(isOpen ? (
									<ChevronUp className={clsx(iconClass, 'hidden lg:block')} />
								) : (
									<ChevronDown className={clsx(iconClass, 'hidden lg:block')} />
								))
							)}
						</span>
					</button>
				);
			}
			return (
				<span className={clsx(level1Item, spanClass, className, 'mx-[1px]')}>
					{IconLeft && <IconLeft className={iconClass} />}
					{sanitizedTitle}
					{IconRight && <IconRight className={iconClass} />}
				</span>
			);
		}
		if (level === 2) {
			const level2Item = clsx(
				menuItemBaseClass,
				'text-base font-medium leading-7 text-forestGreen-500 py-3 px-4 lg:text-lg lg:leading-8 lg:px-0',
			);
			if (hasChildren) {
				if (onClick) {
					return (
						<button
							{...props}
							type='button'
							tabIndex={tabIndex}
							aria-label={sanitize(ariaLabel)}
							aria-expanded={isOpen}
							onClick={onClick}
							className={clsx(level2Item, buttonClass, className, 'after:w-[45px]')}
						>
							<span className={spanClass}>
								{sanitizedTitle}
								<ArrowRight className={iconClass} />
							</span>
						</button>
					);
				}
				if (href) {
					return (
						<Link
							href={href}
							tabIndex={tabIndex}
							className={clsx(level2Item, buttonClass, className, 'after:w-[45px]')}
						>
							<span className={clsx(spanClass, 'mx-[1px]')}>
								{IconLeft && <IconLeft className={iconClass} />}
								{sanitizedTitle}
								{IconRight && <IconRight className={iconClass} />}
							</span>
						</Link>
					);
				}
			}
			return <span className={clsx(level2Item, spanClass, className)}>{sanitizedTitle}</span>;
		}
		if (level === 3) {
			const level3Item = clsx(
				menuItemBaseClass,
				buttonClass,
				'py-1 m-0 text-sm text-forestGreen-700 font-normal leading-[26px] focus-visible:outline-offset-2 lg:py-0.5 lg:text-base lg:leading-7',
				'menuitem',
				className,
			);
			if (href) {
				return (
					<Link href={href} tabIndex={tabIndex} className={level3Item}>
						<span className={spanClass}>
							{sanitizedTitle}
							{IconRight && <IconRight className={iconClass} />}
						</span>
					</Link>
				);
			}
		}
	};

	return renderItems();
};

export default MenuItem;