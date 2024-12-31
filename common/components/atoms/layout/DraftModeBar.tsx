'use client';
import Link from 'next/link';

const DraftModeBar = () => (
	<>
		<div className={'flex justify-center items-center py-1.5 px-3 bg-orange-500 text-black'}>
			<p className={'!p-0 !m-0'}>
				Du er i preview mode.{' '}
				<Link className='underline underline-offset-2' href='/api/disable-draft'>
					Tilbake
				</Link>
			</p>
		</div>
	</>
);

export default DraftModeBar;