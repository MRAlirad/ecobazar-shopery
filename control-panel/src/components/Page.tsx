import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
	type: 'list' | 'form';
	children: ReactNode;
	className?: string;
}

const Page = ({ type, children, className = '' }: Props) => {
	return (
		<main
			className={classNames({
				'grid gap-6 px-4 md:px-[2%] py-8 h-max animate-fadeInUp': true,
				'xl:px-[14.5%]': type === 'form',
				[className]: className,
			})}
		>
			{children}
		</main>
	);
};

export default Page;
