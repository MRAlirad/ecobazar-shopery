import { ReactNode } from 'react';
import Button, { Props as ButtonProps } from './Button';

interface Props {
	title?: string;
	className?: string;
	children: ReactNode;
	action?: ButtonProps;
}

const Card = ({ title, className = ' ', children, action }: Props) => {
	return (
		<div className={`card grid gap-4 px-6 py-4 h-max ${className}`}>
			{(title || action) && (
				<div className="flex items-center justify-between">
					<h3 className="text-neutral-900 text-sm font-bold">{title}</h3>
					{action && <Button size="small" color="simple" {...action} />}
				</div>
			)}
			{children}
		</div>
	);
};

export default Card;
