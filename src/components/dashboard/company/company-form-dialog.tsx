"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, Trash, Upload } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    type Company,
    type CreateCompany,
    createCompanySchema,
    type UpdateCompany,
    updateCompanySchema,
} from "@/schemas";
import { Switch } from "@/components/ui/switch";
import { FormDialogProps } from "@/types/interfaces";

export function CompanyFormDialog({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    isLoading,
}: FormDialogProps<CreateCompany | UpdateCompany, Company>) {
    const logoRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(
        initialData?.logo?.url || null,
    );
    const form = useForm<UpdateCompany | CreateCompany>({
        resolver: zodResolver(
            initialData ? updateCompanySchema : createCompanySchema,
        ),
        defaultValues: {
            name: initialData?.name || "",
            isPremium: initialData?.isPremium || false,
            logo: undefined,
        },
    });

    useEffect(() => {
        return () => {
            if (logoPreview?.startsWith("blob:"))
                URL.revokeObjectURL(logoPreview);
        };
    }, [logoPreview]);

    const handleFileChange = (file: File | undefined) => {
        form.setValue("logo", file as any, { shouldDirty: true });
        if (logoPreview?.startsWith("blob:"))
            URL.revokeObjectURL(logoPreview);
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        } else {
            setLogoPreview(null);
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {initialData ? "Edit Company" : "Create Company"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full"
                    >
                        {/* Left: Fields */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter company name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPremium"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Is Premium *</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Logo *</FormLabel>
                                    <Card className="relative border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                                        <CardContent className="p-6">
                                            {logoPreview ? (
                                                <div className="relative">
                                                    <Image
                                                        src={
                                                            logoPreview ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt="Thumbnail"
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-40 object-cover rounded"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="absolute top-2 right-2"
                                                        onClick={() =>
                                                            handleFileChange(
                                                                undefined,
                                                            )
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-muted-foreground">
                                                            Upload a
                                                            thumbnail
                                                            image for
                                                            your company
                                                            post
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="gap-2 bg-accent"
                                                            onClick={() =>
                                                                logoRef.current?.click()
                                                            }
                                                        >
                                                            <Upload className="h-4 w-4" />
                                                            Choose Image
                                                        </Button>
                                                        <FormControl>
                                                            <Input
                                                                ref={
                                                                    logoRef
                                                                }
                                                                type="file"
                                                                accept="image/*"
                                                                hidden
                                                                onChange={(
                                                                    e,
                                                                ) =>
                                                                    handleFileChange(
                                                                        e
                                                                            .target
                                                                            .files?.[0],
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="secondary" >
                                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : initialData ? "Save" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
