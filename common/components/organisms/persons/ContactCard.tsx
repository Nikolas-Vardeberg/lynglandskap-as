import type { Editor } from '@/types/editor.types';
import { clsx } from '@/utils/classes';
import SanityImage from '@/atoms/SanityImage';

type ContactCardProps = Editor & { buttonsToRight?: boolean; textToRightMobile?: boolean };

const ContactCard = ({
	name,
	image,
	title,
	buttonsToRight = false,
	bookMeetingLink,
	textToRightMobile = false,
}: ContactCardProps) => {

	return (
		<div
			className={clsx(
				'flex flex-col justify-start w-auto gap-4 p-4 rounded-md',
				buttonsToRight && 'lg:flex-row lg:justify-between',
			)}
		>
			<div className={clsx('flex items-center self-stretch gap-4', textToRightMobile && ' flex-col lg:flex-row')}>
				{image && (
					<div className='shrink-0'>
						<SanityImage
							image={image}
							quality={100}
							width={100}
							height={100}
							className='object-cover rounded-full w-[100px] h-[100px]'
						/>
					</div>
				)}
				<div className={clsx('flex flex-col items-center sm:items-start gap-1', textToRightMobile && ' w-full')}>
					<h4 className='font-medium text-forestGreen-500'>{name}</h4>
					<span className='text-secondary'>
						{title ? `${title}` : title}
					</span>
				</div>
			</div>
			<div className='flex flex-col items-center self-stretch justify-center gap-3 lg:gap-4'>
				{bookMeetingLink && (
                    <button className='rounded-full text-center items-center flex border border-black py-2 px-2'>
                        ta kontakt
                    </button>
				)}
			</div>
		</div>
	);
};

export default ContactCard;