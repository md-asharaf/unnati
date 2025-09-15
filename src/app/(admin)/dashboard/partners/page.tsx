"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash, Building2 } from "lucide-react";
import Image from "next/image";
import { PartnerUpload } from "@/components/dashboard/partner-upload";
import { deletePartner, fetchPartners, Partner } from "@/queries/partners";
import { CustomAlertDialog } from "@/components/dashboard/custom-alert-dialog";
import { useState } from "react";

function PremiumPartners() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: partners = [], isLoading } = useQuery({
        queryKey: ["partners"],
        queryFn: fetchPartners,
    });

    const deleteMutation = useMutation({
        mutationFn: deletePartner,
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(["partners"], (old: Partner[] = []) =>
                old.filter((partner) => partner.id !== deletedId),
            );
        },
    });

    return (
        <div className="sm:max-w-6xl mx-auto w-full space-y-8 p-4">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-balance">
                            Premium Partners
                        </h1>
                        <p className="text-muted-foreground text-pretty">
                            Manage and showcase your premium partner logos
                        </p>
                    </div>
                </div>
            </div>

            <PartnerUpload />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Current Partners</h2>
                    <div className="text-sm text-muted-foreground">
                        {partners.length} partner
                        {partners.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="text-center space-y-3">
                            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                            <p className="text-sm text-muted-foreground">
                                Loading partners...
                            </p>
                        </div>
                    </div>
                ) : partners.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                            <div className="p-3 bg-muted rounded-full">
                                <Building2 className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium">No partners yet</h3>
                                <p className="text-sm text-muted-foreground">
                                    Upload your first partner logo to get
                                    started
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {partners.map((partner) => (
                            <Card
                                key={partner.id}
                                className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02] relative"
                            >
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute rounded-full top-2 right-2 z-10 p-2 h-auto opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:group-hover:opacity-100"
                                    disabled={deleteMutation.isPending}
                                    aria-label="Delete partner"
                                    onClick={() => setOpen(true)}
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                                <CustomAlertDialog
                                    isOpen={open}
                                    description="this action cannot be undone"
                                    onCancel={() => setOpen(false)}
                                    onContinue={() =>
                                        deleteMutation.mutate(partner.id)
                                    }
                                />
                                <CardContent className="p-4">
                                    <div className="aspect-[3/2] relative bg-muted/20 rounded-lg overflow-hidden">
                                        <Image
                                            src={
                                                partner.logo ||
                                                "/placeholder.svg"
                                            }
                                            alt={partner.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <p
                                            className="text-sm font-medium truncate"
                                            title={partner.name}
                                        >
                                            {partner.name}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PremiumPartners;
