import { useEffect, useState } from "react";
import axios from "axios";

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
                  const response = await axios.get(
                      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = response.data;
                    const city = data.city || "Cidade não encontrada";
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
