import classNames from 'classnames';
interface Props {
	color: 'green' | 'red' | 'gray';
	text: string;
}

const Badge = ({ color, text }: Props) => {
	const colorClass = {
		green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
		red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
		gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
	};

	return (
		<span
			className={classNames({
				'text-sm font-medium px-2.5 py-0.5 rounded-full': true,
				[colorClass[color]]: true,
			})}
		>
			{text}
		</span>
	);
};

export default Badge;
