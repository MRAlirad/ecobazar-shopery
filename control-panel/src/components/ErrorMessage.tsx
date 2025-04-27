import Icon from './Icon';
import { PiWarningCircleBold } from 'react-icons/pi';

interface Props {
	error: string;
}

const ErrorMessage = ({ error = '' }: Props) => {
	return (
		<div className="flex items-center gap-1.5 text-xs text-red-600 ms-1">
			<Icon size="15">
				<PiWarningCircleBold />
			</Icon>
			<span>{error}</span>
		</div>
	);
};

export default ErrorMessage;
