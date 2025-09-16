import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { uploadPartner } from "@/queries/partners";
import type { Image as Partner } from "@/schemas";
export const PartnerUpload = () => {
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);
    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const { data } = await uploadPartner(file);
            return data.partner;
        },
        onSuccess: (newPartner) => {
            if (!newPartner) return;
            toast.success("Partner uploaded successfully!");
            queryClient.setQueryData(["partners"], (old: Partner[] = []) => [
                ...old,
                newPartner,
            ]);
        },
        onError: (error) => {
            toast.error("Failed to upload partner. Please try again.");
        },
    });
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            await uploadMutation.mutateAsync(file);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };
    return (
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Partner
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative group">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group-hover:border-primary/50">
                        <div className="text-center space-y-2">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
                            <div className="text-sm text-muted-foreground">
                                <span className="font-medium">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </div>
                            <div className="text-xs text-muted-foreground">
                                PNG, JPG, SVG up to 10MB
                            </div>
                        </div>
                    </div>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        id="partner-upload-input"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                {uploading && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading partner logo...
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
