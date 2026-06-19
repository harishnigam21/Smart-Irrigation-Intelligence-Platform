import toast from "react-hot-toast";

export interface coordinateType {
  latitude: number;
  longitude: number;
}
export const getCoordinates = (): Promise<coordinateType> => {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = parseFloat(position.coords.latitude.toFixed(9));
          const longitude = parseFloat(position.coords.longitude.toFixed(9));
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error(error);
          toast.error("Failed to fetch location.");
          resolve({ latitude: 0, longitude: 0 });
        },
      );
    } else {
      const msg = "Geolocation is not supported by this browser.";
      console.log(msg);
      toast.error(msg);
      resolve({ latitude: 0, longitude: 0 });
    }
  });
};
