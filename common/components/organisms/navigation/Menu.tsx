"use client"

import Logo from "@/atoms/svg/Logo";
import { useGlobalContext } from "@/providers/global-provider";
import { clsx } from "@/utils/classes";
import { AnimatePresence, motion } from 'framer-motion';
import {  Menu as OpenMenu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);
		return () => window.removeEventListener('resize', updateIsMobile);
	}, []);

	return isMobile;
};

export default function Menu() {
    const { menu } = useGlobalContext();
    const pathname = usePathname();
    const isMobile = useIsMobile();

    const menuButtonRef = useRef<HTMLButtonElement | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

    const headerHeight = 74;
	const iconClass = 'size-6 transition-all duration-300 ease-in-out lg:size-4';

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (mobileMenuOpen) {
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = '';
		}
		return () => {
			document.documentElement.style.overflow = '';
		};
	}, [mobileMenuOpen]);


    return(
        <header className='relative z-10 min-w-full bg-green-400 h-[74px] border-sand-300 lg:h-24 megamenu'>
            <div className='box-content z-10 flex items-center justify-between px-4 py-3 mx-auto gap-1.5 max-w-[1200px] lg:py-5 lg:px-[38px]'>
                <Link href='/' className='flex mr-auto h-[32px] lg:h-[46px]' aria-label='Hjem'>
					<Logo
						name='full'
						className='w-32 transition-all lg:w-[165px]'
						title="'Crayon Consulting logo"
					/>
				</Link>


                <a
					href='/sok'
					aria-label="Søk"
					className={clsx(
						!mobileMenuOpen ? 'inline-flex' : 'hidden',
						'flex-col p-3 text-forestGreen-700 lg:inline-flex lg:px-4 lg:py-2.5',
						'hover:text-forestGreen-500 focus-visible:-outline-offset-2',
						'content-none lg:after:block lg:after:w-4 lg:after:h-0.5 lg:after:rounded-full lg:hover:after:bg-red-600',
					)}
				>
					<span className='flex items-center lg:h-8'>
						<Search />
					</span>
				</a>

                {/* Mobile menu */}
					{isMobile && (
						<>
							<button
								type='button'
								ref={menuButtonRef}
								onClick={toggleMobileMenu}
								aria-expanded={mobileMenuOpen}
								aria-label={`${mobileMenuOpen ? "Lukk" : "Åpne"} ${('Meny').toLowerCase()}`}
								className='block p-3 text-forestGreen-700 hover:text-forestGreen-500'
							>
								<span className='flex items-center'>
									{mobileMenuOpen ? <X className={iconClass} /> : <OpenMenu className={iconClass} />}
								</span>
							</button>
							<AnimatePresence initial={false}>
								<motion.div
									id='mobile-menu'
									aria-hidden={!mobileMenuOpen}
									variants={{
										open: { opacity: 1, height: `calc(100vh - ${headerHeight}px)` },
										closed: { opacity: 0, height: 0 },
									}}
									initial='closed'
									animate={mobileMenuOpen ? 'open' : 'closed'}
									exit='closed'
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									style={{ top: headerHeight }}
									className={clsx(
										'flex absolute inset-x-0 z-20 flex-col justify-between mb-auto overflow-hidden bg-white unicorn-border',
										mobileMenuOpen ? 'border-b-[10px]' : 'pointer-events-none',
									)}
								>
								</motion.div>
							</AnimatePresence>
						</>
					)}
            </div>
        </header>
    )
}