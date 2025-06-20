import classNames from 'classnames';

const Divider = ({ className = '', direction = 'horizontal' }: Props) => {
	return (
		<hr
			className={classNames({
				'bg-neutral-200 border-0': true,
				'h-px w-full': direction === 'horizontal',
				'w-px h-full': direction === 'vertical',
				[className]: true,
			})}
		/>
	);
};

interface Props {
	direction?: 'horizontal' | 'vertical';
	className?: string;
}

export default Divider;
