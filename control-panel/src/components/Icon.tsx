import { ReactNode } from 'react';
import { IconContext } from 'react-icons';

interface Props {
	children: ReactNode;
	color?: string;
	size?: string;
	className?: string;
}

const Icon = ({ color = 'inherit', children, className = '', size = '24' }: Props) => {
	return (
		<IconContext.Provider value={{ size }}>
			<div className={`flex ${color} ${className}`}>{children}</div>
		</IconContext.Provider>
	);
};

export default Icon;
