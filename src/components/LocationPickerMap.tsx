/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
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
	const { location } = useLocation();
	const [position, setPosition] = useState<[number, number] | null>(
		initialLatitude && initialLongitude
			? [initialLatitude, initialLongitude]
			: null
	);
	const [address, setAddress] = useState<string>("");
	const mapRef = useRef<L.Map | null>(null);

	const reverseGeocode = async (lat: number, lng: number) => {
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
	};

	useEffect(() => {
		if (initialLatitude && initialLongitude) {
			setPosition([initialLatitude, initialLongitude]);
			reverseGeocode(initialLatitude, initialLongitude);
		}
	}, [initialLatitude, initialLongitude]);

	function MapClickHandler() {
		useMapEvents({
			click: (e: any) => {
				const { lat, lng } = e.latlng;
				setPosition([lat, lng]);
				reverseGeocode(lat, lng);
			},
		});
		return null;
	}

	return (
		<div>
			<MapWrapper>
				<MapContainer
					center={position || location}
					zoom={position ? 13 : 11}
					scrollWheelZoom={true}
					whenCreated={(map) => {
						mapRef.current = map;
					}}>
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
