import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';

interface Props {
	anchorSelect: string;
	children: React.ReactNode;
	className?: string;
	clickable?: boolean;
	offset?: number;
	openOnClick?: boolean;
	place?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
	position?: {
		x: number;
		y: number;
	};
}

const Popup = ({ anchorSelect, children, className = '', clickable = true, offset = 10, openOnClick = true, place = 'bottom', position }: Props) => {
	return (
		<Tooltip
			{...{
				anchorSelect,
				clickable,
				offset,
				openOnClick,
				place,
				position,
			}}
			opacity={1}
			className={classNames({
				'!bg-white !text-black !text-xs !shadow-lg !rounded-xl !border !border-neutral-200 z-20': true,
				[className]: className,
			})}
			disableStyleInjection={true}
		>
			{children}
		</Tooltip>
	);
};

export default Popup;
