export interface AddProps<T> {
	path?: string;
	queryKey?: string;
	successToast?: string;
	onAdd?: (data: T) => void;
	onError?: () => void;
}

export interface EditProps<T> {
	id?: string;
	path?: string;
	queryKey?: string;
	successToast?: string;
	onEdit?: (data: T) => void;
	onError?: () => void;
}
export interface DeleteProps<T> {
	path?: string;
	queryKey?: string;
	successToast?: string;
	onDelete?: (data: T) => void;
	onError?: () => void;
}

export interface GetProps {
	id?: string;
	path?: string;
	queryKey?: string;
}

export interface GetListProps {
	path?: string;
	queryKey?: string;
}
