"use client";

import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: any) => void;
  className?: string;
  placeholder?: string;
}

export function PlaceAutocomplete({ onPlaceSelect, className, placeholder }: PlaceAutocompleteProps) {
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleLoad = (ac: google.maps.places.Autocomplete) => {
    acRef.current = ac;
  };

  const handlePlaceChanged = () => {
    const ac = acRef.current;
    if (!ac) return;
    const result = ac.getPlace();
    if (!result) return onPlaceSelect(null);

    const loc = result.geometry?.location;
    const lat = loc?.lat ? loc.lat() : undefined;
    const lng = loc?.lng ? loc.lng() : undefined;

    const normalized: any = {
      ...result,
      formattedAddress: (result as any).formatted_address,
      displayName: result.name,
      location: lat != null && lng != null ? { lat: () => lat, lng: () => lng } : undefined,
    };

    onPlaceSelect(normalized);
  };

  return (
    <Autocomplete
      onLoad={handleLoad}
      onPlaceChanged={handlePlaceChanged}
      options={{ fields: ["geometry", "name", "formatted_address"] }}
    >
      <Input placeholder={placeholder} className={className} />
    </Autocomplete>
  );
}
