/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono del marcador
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Límite Bogotá
const BOGOTA_BOUNDS: [[number, number], [number, number]] = [
    [4.47, -74.25],
    [4.83, -73.99]
];

const DEFAULT_POSITION = { lat: 4.7110, lng: -74.0721 };

// Controlador para mover el mapa cuando cambia la posición
function MapController({ position }: any) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, 16);
        }
    }, [position, map]);

    return null;
}

function LocateButton({ fetchGeolocation }: any) {
    const map = useMap();

    const handleLocate = async () => {
        const coords = await fetchGeolocation();
        if (coords && map) {
            map.setView(coords, 13);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLocate}
            className="absolute top-2 right-2 bg-white border rounded-full p-2 shadow z-10"
            title="Volver a mi ubicación"
        >
            📍
        </button>
    );
}

function LocationMarker({ position, handleManualPositionChange }: any) {
    useMapEvents({
        click(e) {
            handleManualPositionChange(e.latlng);
        },
    });

    return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function LocationPickerMap({ initialPosition, onLocationChange }: any) {
    const [position, setPosition] = useState<any>(initialPosition || DEFAULT_POSITION);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchGeolocation = async () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        validateAndSetPosition(coords, true);
                        resolve(coords);
                    },
                    () => {
                        validateAndSetPosition(DEFAULT_POSITION, true);
                        resolve(DEFAULT_POSITION);
                    }
                );
            } else {
                validateAndSetPosition(DEFAULT_POSITION, true);
                resolve(DEFAULT_POSITION);
            }
        });
    };

    useEffect(() => {
        if (!initialPosition) {
            fetchGeolocation().then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const validateAndSetPosition = async (coords: any, isInitial = false) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
            const data = await res.json();

            if (data.address?.city === 'Bogotá' || data.display_name.includes('Bogotá')) {
                setPosition(coords);
                onLocationChange({ position: coords, address: data.display_name });
            } else if (isInitial) {
                setPosition(DEFAULT_POSITION);
                const resDefault = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${DEFAULT_POSITION.lat}&lon=${DEFAULT_POSITION.lng}`);
                const dataDefault = await resDefault.json();
                onLocationChange({ position: DEFAULT_POSITION, address: dataDefault.display_name });
            }
        } catch (err) {
            console.error("Error al validar la dirección:", err);
        }
    };

    // Manejar input con debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (typingTimeout) clearTimeout(typingTimeout);

        setTypingTimeout(setTimeout(() => {
            fetchSuggestions(value);
        }, 500));
    };

    const fetchSuggestions = async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query + ' Bogotá')}`);
            const results = await res.json();
            setSuggestions(results);
        } catch (err) {
            console.error("Error obteniendo sugerencias:", err);
        }
    };

    const handleSelectSuggestion = (suggestion: any) => {
        const coords = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
        validateAndSetPosition(coords);
        setSuggestions([]);
        setSearch(suggestion.display_name);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Cargando ubicación...</p>;
    }

    return (
        <div className="relative">
            {/* Buscador con Autocompletado */}
            <div className="flex flex-col mb-2 relative z-100000">
                <input
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Buscar dirección en Bogotá..."
                    className="border p-2 rounded"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 bg-white border z-10 max-h-40 overflow-y-auto">
                        {suggestions.map((sug, idx) => (
                            <li
                                key={idx}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelectSuggestion(sug)}
                            >
                                {sug.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Mapa */}
            <div className="relative">
                <MapContainer
                    center={position}
                    zoom={13}
                    maxBounds={BOGOTA_BOUNDS}
                    maxBoundsViscosity={1.0}
                    style={{ height: "300px", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker position={position} handleManualPositionChange={validateAndSetPosition} />
                    <LocateButton fetchGeolocation={fetchGeolocation} />
                    <MapController position={position} />
                </MapContainer>
            </div>
        </div>
    );
}
