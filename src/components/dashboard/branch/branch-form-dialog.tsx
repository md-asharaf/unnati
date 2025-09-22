"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createBranchSchema, CreateBranch, Branch } from "@/schemas";
import { toast } from "sonner";
import { useJsApiLoader } from "@react-google-maps/api";
import { PlaceAutocomplete } from "@/components/location/place-auto-complete";
import { MapPicker } from "@/components/location/map-picker";
import { FormDialogProps } from "@/types/interfaces";
import { Loader2 } from "lucide-react";

export function BranchFormDialog({ open, onOpenChange, onSubmit, initialData,isLoading }: FormDialogProps<CreateBranch, Branch>) {
    const form = useForm<CreateBranch>({
        resolver: zodResolver(createBranchSchema),
        defaultValues: initialData ?? {
            name: "",
            phone: "",
            address: "",
            latitude: 0,
            longitude: 0
        },
    });

    const [selected, setSelected] = useState<{ lat: number; lng: number; address: string; name?: string } | null>(
        initialData ? { lat: initialData.latitude, lng: initialData.longitude, address: initialData.address, name: initialData.name } : null
    );
    const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, libraries: ["places"] as any });
    const onPlaceSelect = (place: any) => {
        if (!place?.location) return toast.error("Could not get location details.");
        const lat = place.location.lat();
        const lng = place.location.lng();
        form.setValue("address", place.formattedAddress || "");
        form.setValue("latitude", lat, { shouldValidate: true });
        form.setValue("longitude", lng, { shouldValidate: true });
        if (!form.getValues("name")) form.setValue("name", place.displayName || "");
        setSelected({ lat, lng, address: place.formattedAddress || "", name: place.displayName || undefined });
    }

    return (
        <>{open && <div className="fixed inset-0 bg-black/50 pointer-events-none z-40" />}
            <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
                <DialogContent
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {initialData ? "Edit Branch" : "Create Branch"}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Branch name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            {/* Hidden form value, managed via autocomplete/map */}
                                            <input type="hidden" {...field} />
                                        </FormControl>
                                        {isLoaded ? (
                                            <>
                                                <div id="auto-complete-container">
                                                    <PlaceAutocomplete
                                                        onPlaceSelect={onPlaceSelect}
                                                        className="w-full rounded-md border px-3 py-2 text-sm bg-background hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                        placeholder="Search address, place, or landmark"
                                                    />
                                                    {selected && (
                                                        <p className="text-xs text-muted-foreground">Selected: {selected.address}</p>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-sm text-muted-foreground">Loading map services...</div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Input type="hidden" {...form.register("latitude", { valueAsNumber: true })} />
                            <Input type="hidden" {...form.register("longitude", { valueAsNumber: true })} />

                            {isLoaded && (
                                <MapPicker
                                    value={selected ? { lat: selected.lat, lng: selected.lng } : null}
                                    onChange={({ lat, lng }) => {
                                        setSelected((prev) => (prev ? { ...prev, lat, lng } : { lat, lng, address: "" }));
                                        form.setValue("latitude", lat, { shouldValidate: true });
                                        form.setValue("longitude", lng, { shouldValidate: true });
                                    }}
                                    onAddress={(address, name) => {
                                        setSelected((prev) => (prev ? { ...prev, address, name } : { lat: 0, lng: 0, address, name }));
                                        form.setValue("address", address || "");
                                        if (name && !form.getValues("name")) form.setValue("name", name);
                                    }}
                                />
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={!form.watch("address")}>Cancel</Button>
                                <Button type="submit" variant="secondary" disabled={!form.watch("address")}>
                                    {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : initialData ? "Save" : "Create"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
