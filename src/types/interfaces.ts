export interface FormDialogProps<T, U> {
    open: boolean;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: T) => void;
    initialData?: U;
}