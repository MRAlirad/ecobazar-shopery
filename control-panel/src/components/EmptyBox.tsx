import EmptyBoxImg from '../../public/pics/EmptyBox.png';
import Button, { Props as ButtonProps } from './Button';

interface Props {
	title?: string;
	text?: string;
	action?: ButtonProps;
}

const EmptyBox = ({ title = 'No item found.', text = '', action }: Props) => {
	return (
		<div className="flex flex-col justify-center items-center space-y-3 py-6">
			<div className="img-box size-40">
				<img
					src={EmptyBoxImg}
					alt="Empty Search"
				/>
			</div>
			<h2 className="text-xl text-gray-700 text-center">{title}</h2>
			{text && <p className="text-gray-500 text-xs text-center">{text}</p>}
			{action && <Button {...action} />}
		</div>
	);
};

export default EmptyBox;
