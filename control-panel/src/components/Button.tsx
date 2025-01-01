import { ReactNode } from 'react';
import Loader from './Loader';
import Icon from './Icon';
import classnames from 'classnames';

interface Props {
	color?: 'default' | 'blue' | 'green' | 'red' | 'blue-outline' | 'green-outline' | 'red-outline';
	text?: string;
	icon?: ReactNode;
	size?: 'small' | 'medium' | 'large';
	type?: 'submit' | 'button';
	fluid?: boolean;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	onClick?: () => void;
}

const Button = ({ color = 'blue', text = '', icon, size = 'medium', fluid = false, disabled = false, loading = false, type = 'submit', className = '', onClick = () => {} }: Props) => {
	return (
		<button
			className={classnames({
				btn: true,
				[color]: true,
				[size]: true,
				disabled: disabled || loading,
				'w-full': fluid,
				[className]: className,
			})}
			disabled={disabled || loading}
			onClick={onClick}
			type={type}
		>
			{loading ? (
				<Loader size="20" />
			) : (
				<>
					{icon && <Icon>{icon}</Icon>}
					{text && <span>{text}</span>}
				</>
			)}
		</button>
	);
};

export default Button;
