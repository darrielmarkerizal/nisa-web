import React, { useState, useEffect, useRef } from "react";

// Mendefinisikan tipe untuk properti dan state
interface FlipClockProps {
  startDate: Date;
}

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Komponen untuk menampilkan satu kartu flip dengan animasi
const FlipCard: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => {
  const [flip, setFlip] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlip(true);
      const timer = setTimeout(() => setFlip(false), 600);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center mx-2 my-1">
      <div className="relative h-24 w-20">
        <div
          className={`absolute w-full h-full transition-all duration-500 transform-gpu ${
            flip ? "animate-flip" : ""
          }`}
        >
          <div className="relative h-full w-full bg-gradient-to-b from-pink-500 to-pink-600 rounded-lg shadow-lg overflow-hidden">
            {/* Bagian atas kartu */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-pink-400/20 flex items-center justify-center border-b border-pink-300/30">
              <div className="text-3xl font-bold text-white w-full text-center -translate-y-px">
                {formattedValue}
              </div>
            </div>

            {/* Bagian bawah kartu */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-pink-600/30 flex items-center justify-center">
              <div className="text-3xl font-bold text-white w-full text-center translate-y-px">
                {formattedValue}
              </div>
            </div>

            {/* Efek bayangan untuk kedalaman */}
            <div className="absolute inset-x-0 top-1/2 h-2 bg-gradient-to-b from-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-1/2 h-2 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-pink-600">{label}</span>
    </div>
  );
};

// Fungsi untuk menghitung waktu yang telah berlalu
const calculateTimeElapsed = (startDate: Date): TimeElapsed => {
  const now = new Date();
  const difference = now.getTime() - startDate.getTime();

  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth() + years * 12;

  const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    years: Math.floor(months / 12),
    months: months % 12,
    days: totalDays % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

// Komponen FlipClock utama
const FlipClock: React.FC<FlipClockProps> = ({ startDate }) => {
  const [isClient, setIsClient] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(() => ({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setTimeElapsed(calculateTimeElapsed(startDate));

      const timer = setInterval(() => {
        setTimeElapsed(calculateTimeElapsed(startDate));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isClient, startDate]);

  const containerClasses = `
        w-full py-8 px-4 
        bg-gradient-to-r from-pink-50 via-white to-pink-50 
        rounded-2xl shadow-inner
    `;

  const headerClasses = `
        text-center text-2xl font-bold 
        bg-gradient-to-r from-pink-500 to-pink-600 
        bg-clip-text text-transparent mb-8
    `;

  return (
    <div className={containerClasses}>
      <h2 className={headerClasses}>Waktu Indah Kita Bersama 💑</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <FlipCard value={timeElapsed.years} label="Tahun" />
        <FlipCard value={timeElapsed.months} label="Bulan" />
        <FlipCard value={timeElapsed.days} label="Hari" />
        <FlipCard value={timeElapsed.hours} label="Jam" />
        <FlipCard value={timeElapsed.minutes} label="Menit" />
        <FlipCard value={timeElapsed.seconds} label="Detik" />
      </div>
    </div>
  );
};

export default FlipClock;
