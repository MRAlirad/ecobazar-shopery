import classnames from 'classnames';

interface Props {
	color?: 'default' | 'blue' | 'green' | 'red' | 'blue-outline' | 'green-outline' | 'red-outline';
	type?: 'submit' | 'button';
	text?: string;
}

const Button = ({ color = 'blue', type = 'submit', text = '' }: Props) => {
	return (
		<button
			className={classnames({
				btn: true,
				[color]: true,
			})}
			type={type}
		>
			{text}
		</button>
	);
};

export default Button;
