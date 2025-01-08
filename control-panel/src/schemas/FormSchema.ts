export default interface FormSchema<dataSchema, formType> {
	mode: 'ADD' | 'EDIT';
	data?: dataSchema;
	onAdd?: (data: formType) => void;
	isAdding?: boolean;
	onEdit?: (data: formType) => void;
	isEditing?: boolean;
	onDelete?: () => void;
	isDeleting?: boolean;
}
