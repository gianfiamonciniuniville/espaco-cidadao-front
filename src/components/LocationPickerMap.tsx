/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "../hooks/useLocation";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface LocationPickerMapProps {
	onLocationSelect: (
		latitude: number,
		longitude: number,
		address: string
	) => void;
	initialLatitude?: number | null;
	initialLongitude?: number | null;
}

const MapWrapper = styled.div`
	height: 300px;
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	margin-top: 10px;
	.leaflet-container {
		height: 100%;
		width: 100%;
	}
`;

const SelectedAddress = styled.p`
	margin-top: 10px;
	font-size: 0.9em;
	color: #333;
`;

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
	onLocationSelect,
	initialLatitude,
	initialLongitude,
}) => {
	const { location: userLocation } = useLocation();
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [address, setAddress] = useState<string>("");
	const mapRef = useRef<any>(null);

	const defaultCenter: LatLngExpression = [-26.3044, -48.8461];

	const reverseGeocode = React.useCallback(
		async (lat: number, lng: number) => {
			try {
				const response = await axios.get(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
				);
				const data = response.data;
				let formattedAddress = "Localização desconhecida";
				if (data.display_name) {
					formattedAddress = data.display_name;
				}
				setAddress(formattedAddress);
				onLocationSelect(lat, lng, formattedAddress);
			} catch (error) {
				console.error("Error during reverse geocoding:", error);
				setAddress("Erro ao obter endereço");
				onLocationSelect(lat, lng, "Erro ao obter endereço");
			}
		},
		[onLocationSelect]
	);

	useEffect(() => {
		if (initialLatitude && initialLongitude) {
			const initialPosition: [number, number] = [
				initialLatitude,
				initialLongitude,
			];
			setPosition(initialPosition);
			reverseGeocode(initialLatitude, initialLongitude);
		} else if (userLocation) {
			const { latitude, longitude } = userLocation;
			setPosition([latitude, longitude]);
			reverseGeocode(latitude, longitude);
		}
	}, [initialLatitude, initialLongitude, userLocation, reverseGeocode]);

	const MapClickHandler = () => {
		useMapEvents({
			click: (e: any) => {
				const { lat, lng } = e.latlng;
				setPosition([lat, lng]);
				reverseGeocode(lat, lng);
			},
		});
		return null;
	};

	const center = React.useMemo(() => {
		if (position) {
			return position;
		}
		if (userLocation) {
			return [userLocation.latitude, userLocation.longitude];
		}
		return defaultCenter;
	}, [position, userLocation, defaultCenter]);

	return (
		<div>
			<MapWrapper>
				<MapContainer
					center={center}
					zoom={position ? 13 : 11}
					scrollWheelZoom={true}
					ref={mapRef}>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{position && <Marker position={position}></Marker>}
					<MapClickHandler />
				</MapContainer>
			</MapWrapper>
			{address && (
				<SelectedAddress>Endereço selecionado: {address}</SelectedAddress>
			)}
		</div>
	);
};

export default LocationPickerMap;
