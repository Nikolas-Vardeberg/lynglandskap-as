import type { Editor } from '@/types/editor.types';
import ContactCard from '../persons/ContactCard';

const Byline = (editor: Editor) => {
	return (
		<div className='bg-green-500 pb-4 lg:pb-[38px] pt-3 lg:pt-7'>
            <div className='mx-auto container'>
				<div className='flex flex-col gap-3 lg:gap-4'>
					<h3 className='text-center sm:text-start'>Vil du slå av en prat med meg?</h3>
					<ContactCard {...editor} buttonsToRight textToRightMobile />
				</div>
            </div>
		</div>
	);
};
export default Byline;