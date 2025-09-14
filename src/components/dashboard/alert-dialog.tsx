"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface CustomAlertDialogProps {
    children: React.ReactNode;
    description?: string;
    title?: string;
    onCancel?: () => void;
    onContinue?: () => void;
}
export const CustomAlertDialog = ({
    children,
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    title = "Are you sure?",
    onCancel = () => {},
    onContinue = () => {},
}: CustomAlertDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
