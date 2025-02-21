import { ReactNode } from 'react';
import Loader from './Loader';
import Icon from './Icon';
import classnames from 'classnames';
import { Link } from 'react-router';

export interface Props {
	color?: 'default' | 'indigo'| 'blue' | 'green' | 'red' | 'blue-outline' | 'green-outline' | 'red-outline';
	text?: string;
	to?: string;
	icon?: ReactNode;
	size?: 'small' | 'medium' | 'large' | 'icon';
	type?: 'submit' | 'button';
	fluid?: boolean;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	onClick?: () => void;
}

const Button = ({ color = 'indigo', text = '', to = '', icon, size = 'medium', fluid = false, disabled = false, loading = false, type = 'button', className = '', onClick = () => {} }: Props) => {
	const Tag = to ? Link : 'button';
	return (
		<Tag
			className={classnames({
				btn: true,
				[color]: true,
				[size]: true,
				disabled: disabled || loading,
				'w-full': fluid,
				[className]: className,
			})}
			to={to}
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
		</Tag>
	);
};

export default Button;
