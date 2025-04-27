import Button, { Props as ButtonProps } from './Button';
import Badge from './Badge';
import { HiOutlineArrowLeft } from 'react-icons/hi';

interface Props {
	title: string;
	backLink?: string;
	badge?: string;
	text?: string;
	action?: ButtonProps;
}

const PageHeader = ({ title, backLink, badge, text, action }: Props) => {
	return (
		<div className="grid gap-2">
			<div className="flex items-center gap-2">
				{backLink && (
					<Button
						color="simple"
						size="small"
						icon={<HiOutlineArrowLeft size={18} />}
						to={backLink}
					/>
				)}
				<div className="flex items-center gap-2">
					<h1 className="text-lg lg:text-2xl line-clamp-1"> {title} </h1>
					{badge && (
						<Badge
							text={badge}
							size="small"
						/>
					)}
				</div>
				{action && (
					<Button
						className="ms-auto"
						{...action}
					/>
				)}
			</div>
			{text && <p className="text-xs text-gray-400 text-justify"> {text} </p>}
		</div>
	);
};

export default PageHeader;
