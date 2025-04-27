import classNames from 'classnames';
import Button from './Button.tsx';

interface Props {
	mode: 'ADD' | 'EDIT';
	className?: string;
	onAdd: () => void;
	isAdding: boolean;
	onEdit: () => void;
	isEditing: boolean;
	onDelete: () => void;
	isDeleting: boolean;
}

const PageActionsBox = ({ mode, className = '', onAdd = () => {}, isAdding, onEdit = () => {}, isEditing, onDelete = () => {}, isDeleting }: Props) => {
	return (
		<div
			className={classNames({
				'flex items-center gap-2 flex-row-reverse': true,
				[className]: className,
			})}
		>
			{mode === 'ADD' && (
				<Button
					color="black"
					text="Save"
					type="submit"
					loading={isAdding}
					onClick={onAdd}
				/>
			)}
			{mode === 'EDIT' && (
				<>
					<Button
						color="green"
						text="Edit"
						type="submit"
						loading={isEditing}
						onClick={onEdit}
					/>
					<Button
						color="red-outline"
						text="Delete"
						loading={isDeleting}
						onClick={onDelete}
					/>
				</>
			)}
		</div>
	);
};

export default PageActionsBox;
