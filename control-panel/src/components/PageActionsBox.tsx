import Button from './Button.tsx';

interface Props {
	mode: 'ADD' | 'EDIT';
	onAdd: () => void;
	isAdding: boolean;
	onEdit: () => void;
	isEditing: boolean;
	onDelete: () => void;
	isDeleting: boolean;
}

const PageActionsBox = ({ mode, onAdd = () => {}, isAdding, onEdit = () => {}, isEditing, onDelete = () => {}, isDeleting }: Props) => {
	return (
		<div className="actions-box">
			{mode === 'ADD' && (
				<Button
					color="blue"
					text="Save"
					type="submit"
					loading={isAdding}
					onClick={onAdd}
				/>
			)}
			{mode === 'EDIT' && (
				<Button
					color="green"
					text="Edit"
					type="submit"
					loading={isEditing}
					onClick={onEdit}
				/>
			)}
			<Button
				color="red-outline"
				text="Delete"
				loading={isDeleting}
				onClick={onDelete}
			/>
		</div>
	);
};

export default PageActionsBox;
