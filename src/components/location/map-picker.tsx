"use client";

import { useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

export type LatLng = { lat: number; lng: number };

type Props = {
  value?: LatLng | null;
  onChange: (pos: LatLng) => void;
  onAddress?: (address: string, name?: string) => void;
  height?: number;
  defaultCenter?: LatLng;
};

export function MapPicker({ value, onChange, onAddress, height = 260, defaultCenter = { lat: 20.5937, lng: 78.9629 } }: Props) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const center = value ?? defaultCenter;
  const zoom = value ? 13 : 4;

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat == null || lng == null) return;
    onChange({ lat, lng });
    if (!onAddress) return;
    try {
      const geocoder = new google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location: { lat, lng } });
      const primary = results?.[0];
      onAddress(primary?.formatted_address || "", primary?.address_components?.[0]?.long_name);
    } catch (err) {
      onAddress("");
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <GoogleMap
        onLoad={(m) => { mapRef.current = m; }}
        mapContainerStyle={{ width: "100%", height }}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {value && (
          <Marker
            position={value}
            draggable
            onClick={() => {
              const map = mapRef.current;
              if (map && value) {
                map.panTo(value);
                map.setZoom(16);
              }
            }}
            onDragEnd={(e) => {
              const newLat = e.latLng?.lat();
              const newLng = e.latLng?.lng();
              if (newLat != null && newLng != null) {
                onChange({ lat: newLat, lng: newLng });
              }
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
