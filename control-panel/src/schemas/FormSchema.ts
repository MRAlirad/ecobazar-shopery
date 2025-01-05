export default interface FormSchema<T> {
	mode: 'ADD' | 'EDIT';
	data?: T;
	onAdd?: (data: T) => void;
	isAdding?: boolean;
	onEdit?: (data: T) => void;
	isEditing?: boolean;
	onDelete?: () => void;
	isDeleting?: boolean;
}
