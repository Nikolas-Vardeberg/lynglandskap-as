import { clsx } from '@/utils/classes';
import type { ComponentType } from 'react';
import type { LogoProps } from 'sanity';
import { motion, AnimatePresence } from 'framer-motion';

export default function Logo({
	name,
	className,
	useClassName,
	title,
	whiteLogoText = false,
	easterEgg = false,
}: {
	name: LogoOptions;
	className?: string;
	useClassName?: string;
	title?: string;
	whiteLogoText?: boolean;
	easterEgg?: boolean;
}) {
	return (
		<svg className={clsx('stroke-none', className, whiteLogoText && 'text-white')} role='presentation'>
			{title && <title>{title}</title>}
			<AnimatePresence mode='wait'>
				{!easterEgg ? (
					<motion.use
						key='main-logo'
						href={`/svgs/logo.svg#logo-${name}`}
						className={useClassName}
						initial={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					/>
				) : (
					<motion.use
						key='easter-egg'
						href='/svgs/logo.svg#logo-fill-light'
						className={useClassName}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					/>
				)}
			</AnimatePresence>
		</svg>
	);
}

export type LogoOptions = 'full' | 'simple' | 'logo' | 'fill-dark' | 'fill-light';

export const LogoComponent: ComponentType<LogoProps> = () => <Logo name='logo' />;