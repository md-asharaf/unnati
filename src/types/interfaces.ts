export interface FormDialogProps<T, U> {
    open: boolean;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: T) => void;
    initialData?: U;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    data?: T;
    message?: string;
}