
import { useEffect, useState } from "react";

export default function Exercice6() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000);
    // Cleanup du setInterval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-bold">Heure actuelle :</h2>
      <span className="text-2xl">{currentHour} h</span>
    </div>
  );
}
