export interface AddHookProps<T> {
	path: string;
	queryKey: string;
	successToast: string;
	onAdd: (data: T) => void;
	onError?: () => void;
}

export interface AddProps<T> {
	successToast: string;
	onAdd: (data: T) => void;
	onError?: () => void;
}

export interface EditHookProps<T> {
	id: string;
	path: string;
	queryKey: string;
	successToast: string;
	onEdit: (data: T) => void;
	onError?: () => void;
}

export interface EditProps<T> {
	id: string;
	successToast: string;
	onEdit: (data: T) => void;
	onError?: () => void;
}

export interface DeleteHookProps<T> {
	path: string;
	queryKey: string;
	successToast: string;
	onDelete: (data: T) => void;
	onError?: () => void;
}

export interface DeleteProps<T> {
	successToast: string;
	onDelete?: (data: T) => void;
	onError?: () => void;
}

export interface GetHookProps {
	id: string;
	path: string;
	queryKey: string;
}

export interface GetListProps {
	path: string;
	queryKey: string;
}
