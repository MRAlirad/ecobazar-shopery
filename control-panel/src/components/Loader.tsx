import Icon from './Icon';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
	size?: string;
	className?: string;
}

const Loader = ({ size = '10', className = '' }: Props) => {
	return (
		<div className={`flex items-center justify-center w-full h-full ${className}`}>
			<Icon
				size={size}
				className="animate-spin"
			>
				<BiLoaderAlt />
			</Icon>
		</div>
	);
};

export default Loader;
