import { useEffect, useState } from "react";

export const useLocation = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [city, setCity] = useState<string | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              console.log("Latitude:", latitude, "Longitude:", longitude);
              try {
                  const response = await fetch(
                      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const city = data.address?.city || data.address?.town || data.address?.village || "Cidade não encontrada";
                    console.log("Cidade:", city);
                    setCity(city);
                    setLocation({ latitude, longitude });
              } catch (error) {
                console.error("Erro ao obter cidade:", error);
              }
            },
            (error) => {
              console.error("Erro ao obter localização:", error);
            }
          );
        } else {
          console.error("Geolocalização não suportada pelo navegador.");
        }
      }, []);

    return { location, city };
}