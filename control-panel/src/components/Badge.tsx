import classNames from 'classnames';
interface Props {
	color?: 'green' | 'blue' | 'gray' | 'red' | 'yellow';
	text: string;
	className?: string;
	size?: 'small' | 'medium' | 'large';
}

const Badge = ({ text, color = 'blue', size = 'medium', className = '' }: Props) => {
	return (
		<span
			className={classNames({
				badge: true,
				[color]: true,
				[size]: true,
				[className]: className,
			})}
		>
			{text}
		</span>
	);
};

export default Badge;
