"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Calendar,
  Book,
  Smile,
  Gift,
  Bell,
  Brain,
  Target,
  Map,
  ThumbsUp,
  MessageSquare,
  Activity,
  Clock,
  CheckSquare,
  Droplet,
  LucideIcon,
  MessageCircleHeart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FlipClock from "./components/flip";

// Define interfaces for our component props and data structures
interface MenuItem {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
}

interface HeartProps {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}

interface SparkleProps {
  id: number;
  left: number;
  top: number;
}

interface InteractiveCardProps {
  item: MenuItem;
  onClick: () => void;
}

// Tambahkan di bagian interface
interface CatMascotProps {
  reaction: string | null;
}

interface PenguinMascotProps {
  reaction: string | null;
}

interface EnhancedInteractiveCardProps extends InteractiveCardProps {
  index: number;
}

const PenguinMascot: React.FC<PenguinMascotProps> = ({ reaction }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-50 w-28 h-28 transition-all duration-300 group"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Tooltip */}
        <div className="absolute -top-16 left-0 bg-white px-4 py-2 rounded-lg shadow-lg text-pink-500 text-sm whitespace-nowrap animate-bounce">
          kalo aku slow resp{" "}
        </div>

        {/* Click Response */}
        {isClicked && (
          <div className="absolute -top-16 left-0 bg-white px-4 py-2 rounded-lg shadow-lg text-pink-500 text-sm whitespace-nowrap animate-bounce">
            jangan marah yaa beibyy, darel pasti bales kok 💝
          </div>
        )}

        {/* Penguin Body */}
        <div className="relative w-24 h-24 cursor-pointer transition-transform hover:scale-110">
          {/* Main Body */}
          <div className="absolute inset-0 bg-[#2D3436] rounded-[70%] transform -rotate-6">
            {/* White Belly */}
            <div className="absolute inset-x-4 top-7 bottom-3 bg-white rounded-[60%]" />
          </div>

          {/* Wings */}
          <div className="absolute left-0 top-6 w-6 h-12 bg-[#2D3436] rounded-l-full transform -rotate-12" />
          <div className="absolute right-0 top-6 w-6 h-12 bg-[#2D3436] rounded-r-full transform rotate-12" />

          {/* Face */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-14 h-14">
            {/* Eyes */}
            <div className="absolute left-2 top-2 w-3 h-3 bg-black rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <div className="absolute right-2 top-2 w-3 h-3 bg-black rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>

            {/* Beak */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
              <div className="w-5 h-4 bg-[#FF9F1C] rounded-b-xl" />
              <div className="w-5 h-1 bg-[#F76707] rounded-t-xl" />
            </div>
          </div>

          {/* Feet */}
          <div className="absolute -bottom-1 left-3 w-4 h-3 bg-[#FF9F1C] rounded-b-lg transform -rotate-12" />
          <div className="absolute -bottom-1 right-3 w-4 h-3 bg-[#FF9F1C] rounded-b-lg transform rotate-12" />

          {/* Reaction Bubble */}
          {reaction && (
            <div className="absolute -top-8 -right-8 bg-white p-2 rounded-lg shadow-lg transform rotate-12 animate-bounce">
              {reaction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CatMascot: React.FC<CatMascotProps> = ({ reaction }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-28 h-28 transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Tooltips */}
        <div className="absolute -top-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg text-pink-500 text-sm whitespace-nowrap animate-bounce">
          kalo kamu kangen
        </div>

        {isClicked && (
          <div className="absolute -top-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg text-pink-500 text-sm whitespace-nowrap animate-bounce">
            darel juga kangen banget sama kamu 💝
          </div>
        )}

        {/* Cat Body */}
        <div className="w-24 h-24 relative transform hover:scale-110 transition-transform duration-300 cursor-pointer">
          {/* Main Face */}
          <div className="absolute inset-0 bg-[#FFE5EC] rounded-full shadow-lg">
            {/* Inner Ears */}
            <div className="absolute -top-3 -left-1 w-6 h-6 bg-[#FFB7C5] transform rotate-45 rounded-tl-xl" />
            <div className="absolute -top-3 -right-1 w-6 h-6 bg-[#FFB7C5] transform -rotate-45 rounded-tr-xl" />

            {/* Outer Ears */}
            <div className="absolute -top-4 -left-2 w-7 h-7 bg-[#FFE5EC] transform rotate-45 rounded-tl-xl" />
            <div className="absolute -top-4 -right-2 w-7 h-7 bg-[#FFE5EC] transform -rotate-45 rounded-tr-xl" />

            {/* Eyes */}
            <div className="absolute top-7 left-4 w-3 h-3 bg-black rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
            </div>
            <div className="absolute top-7 right-4 w-3 h-3 bg-black rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
            </div>

            {/* Blush Marks */}
            <div className="absolute top-10 left-2 w-4 h-2 bg-pink-200 rounded-full opacity-60" />
            <div className="absolute top-10 right-2 w-4 h-2 bg-pink-200 rounded-full opacity-60" />

            {/* Nose */}
            <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2.5 h-2 bg-pink-300 rounded-full" />

            {/* Whiskers */}
            <div className="absolute top-11 left-2 w-4 h-px bg-gray-400 transform -rotate-15" />
            <div className="absolute top-12 left-2 w-4 h-px bg-gray-400" />
            <div className="absolute top-13 left-2 w-4 h-px bg-gray-400 transform rotate-15" />
            <div className="absolute top-11 right-2 w-4 h-px bg-gray-400 transform rotate-15" />
            <div className="absolute top-12 right-2 w-4 h-px bg-gray-400" />
            <div className="absolute top-13 right-2 w-4 h-px bg-gray-400 transform -rotate-15" />

            {/* Mouth */}
            <div className="absolute top-[3.25rem] left-1/2 transform -translate-x-1/2 w-2 h-2 border-b-2 border-pink-300 rounded-full" />
          </div>

          {/* Tail */}
          <div className="absolute -bottom-2 right-0 w-8 h-12 overflow-hidden">
            <div className="absolute bottom-0 right-2 w-4 h-12 bg-[#FFE5EC] rounded-full transform rotate-12 origin-bottom animate-[wave_2s_ease-in-out_infinite]" />
          </div>

          {/* Reaction Bubble */}
          {reaction && (
            <div className="absolute -top-8 -left-8 bg-white p-2 rounded-lg shadow-lg transform -rotate-12 animate-bounce">
              {reaction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnhancedFooter: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-8 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 to-transparent" />
      <div className="relative space-y-4">
        <div className="flex justify-center space-x-2">
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">
            🌸
          </span>
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">
            💝
          </span>
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">
            🌸
          </span>
        </div>
        <p className="font-pacifico text-lg text-pink-500">
          Dibuat dengan penuh cinta
        </p>
        <p className="font-quicksand text-pink-400">
          oleh Darriel Markerizal
          <br />
          untuk Nisa Fredlina Mahardika Saputri
        </p>
        <div className="pt-4">
          <span className="inline-block bg-pink-100 px-4 py-2 rounded-full text-pink-500 font-quicksand text-sm hover:scale-105 transition-transform">
            💕 Forever Yours 💕
          </span>
        </div>
      </div>
    </footer>
  );
};

// Helper function for time-based greetings
const getGreeting = (): string => {
  const hourNumber = new Date().getHours();
  if (hourNumber >= 4 && hourNumber < 11) return "selamat pagi sayangkuu";
  if (hourNumber >= 11 && hourNumber < 15) return "selamat siang babyyy";
  if (hourNumber >= 15 && hourNumber < 18) return "selamat sore cintakuu";
  if (hourNumber >= 18 && hourNumber < 21) return "selamat malam bubuuu";
  return "selamat tidur sayangkuu";
};

// Floating Hearts Animation Component
const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  const createHeart = (x: number): void => {
    const newHeart: HeartProps = {
      id: Date.now(),
      x,
      y: 100,
      size: Math.random() * 20 + 10,
      animationDuration: Math.random() * 2 + 2,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, newHeart.animationDuration * 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 animate-float"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            animation: `float ${heart.animationDuration}s linear forwards`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

// Enhanced LED Banner Component
const LEDBanner: React.FC = () => {
  const [position, setPosition] = useState<number>(100);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  const message =
    "💝 Darriel Markerizal sayang banget sama Nisa Fredlina Mahardika Saputri 💝";

  useEffect(() => {
    const animate = (): void => {
      setPosition((prev) => (prev <= -200 ? 100 : prev - 0.3));
    };

    const intervalId = setInterval(animate, 30);
    return () => clearInterval(intervalId);
  }, []);

  const createSparkle = (): void => {
    if (isHovered) {
      const newSparkle: SparkleProps = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
      };
      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    }
  };

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(createSparkle, 200);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className="relative bg-gradient-to-r from-pink-950 via-black to-pink-950 py-8 mb-8 overflow-hidden rounded-lg"
      style={{
        boxShadow: isHovered
          ? "0 0 20px #ff1493, 0 0 30px #ff1493, 0 0 40px #ff1493"
          : "0 0 10px #ff1493, 0 0 20px #ff1493",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,transparent_1px,black_1px)] bg-pink-500/5"
        style={{ backgroundSize: "4px 4px" }}
      />

      <div className="relative">
        <div
          className="text-2xl md:text-4xl font-bold whitespace-nowrap transition-all duration-300"
          style={{
            transform: `translateX(${position}%)`,
            color: "#ff1493",
            textShadow: isHovered
              ? "0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493, 0 0 40px #ff69b4"
              : "0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493",
          }}
        >
          {message}
        </div>

        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle text-yellow-300"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

// Love Quote Component
const LoveQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<number>(0);
  const quotes: string[] = [
    "Every love story is beautiful, but ours is my favorite 💑",
    "You're the missing piece to my puzzle 🧩",
    "Together is a wonderful place to be 🏡",
    "You make my heart smile 😊",
    "My favorite place is inside your hug 🤗",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-pink-50 p-4 rounded-lg shadow-inner text-center animate-fade-in">
      <p className="text-pink-600 italic font-medium">{quotes[currentQuote]}</p>
    </div>
  );
};

// Interactive Card Component
const InteractiveCard: React.FC<EnhancedInteractiveCardProps> = ({
  item,
  index,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const rotate = index % 2 === 0 ? "-1deg" : "1deg";

  return (
    <Card
      className="p-4 transition-all duration-300 cursor-pointer group relative overflow-hidden transform"
      style={{
        transform: `${isHovered ? "translateY(-5px)" : "none"} rotate(${rotate})`,
        boxShadow: isHovered ? "0 10px 20px rgba(255, 20, 147, 0.2)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-full bg-pink-100 group-hover:bg-pink-200 transition-colors transform group-hover:scale-110">
          <item.icon className="w-6 h-6 text-pink-500" />
        </div>
        <h3 className="font-medium text-pink-600 group-hover:text-pink-700">
          {item.title}
        </h3>
        <p className="text-sm text-pink-400 group-hover:text-pink-500">
          {item.description}
        </p>
      </div>
    </Card>
  );
};

// Define menu items
const menuItems: MenuItem[] = [
  {
    icon: Heart,
    title: "daily love affirmation",
    description: "kata-kata sayang buat kamu setiap hari",
    route: "/daily-affirmation",
  },
  {
    icon: Calendar,
    title: "period tracker plus",
    description: "pengingat jadwal khusus kamu",
    route: "/period-tracker",
  },
  {
    icon: Book,
    title: "digital prayer companion",
    description: "teman ibadah kita berdua",
    route: "/prayer-companion",
  },
  {
    icon: MessageCircleHeart,
    title: "love expression hub",
    description: "kamu bisa kirim pesan sayang ke aku dengan gampang",
    route: "/love-expression",
  },
  {
    icon: Smile,
    title: "mood journal",
    description: "cerita-cerita perasaan kamu",
    route: "/mood-journal",
  },
  {
    icon: Gift,
    title: "care package creator",
    description: "kirim hadiah spesial buat kamu",
    route: "/care-package",
  },
  {
    icon: Droplet,
    title: "wellness reminder",
    description: "pengingat buat jaga kesehatan",
    route: "/wellness",
  },
  {
    icon: Target,
    title: "couple goals",
    description: "target-target kita berdua",
    route: "/couple-goals",
  },
  {
    icon: ThumbsUp,
    title: "gratitude box",
    description: "ungkapan rasa syukur",
    route: "/gratitude",
  },
  {
    icon: Clock,
    title: "important dates",
    description: "pengingat tanggal spesial",
    route: "/important-dates",
  },
  {
    icon: CheckSquare,
    title: "daily task helper",
    description: "pembantu tugas harian",
    route: "/tasks",
  },
];

// Animation keyframes
const styles = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    @keyframes fade-in {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;

// Main HomeScreen component
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [showHearts, setShowHearts] = useState<boolean>(false);
  const [catReaction, setCatReaction] = useState<string | null>(null);

  const handleMenuClick = (route: string): void => {
    const reactions = ["😻", "💝", "🎀", "✨"];
    setCatReaction(reactions[Math.floor(Math.random() * reactions.length)]);
    setTimeout(() => {
      setCatReaction(null);
      router.push(route);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomX = Math.random() * 100;
        setShowHearts(true);
        setTimeout(() => {
          setShowHearts(false);
        }, 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const startDate = new Date("2024-08-11T20:30:00");

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 p-4 md:p-8">
        <FloatingHearts />

        <div className="max-w-7xl mx-auto space-y-8">
          <LEDBanner />

          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600 animate-fade-in">
              {getGreeting()}
            </h1>
            <p className="text-pink-400 animate-fade-in delay-100">
              semoga hari kamu indah ya sayangkuu 💖
            </p>
            <LoveQuote />
            <FlipClock startDate={startDate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <InteractiveCard
                key={index}
                item={item}
                index={index}
                onClick={() => handleMenuClick(item.route)}
              />
            ))}
          </div>

          {/* SOS Button Section */}
          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <div className="bg-pink-50 p-4 rounded-lg max-w-md text-center">
              <p className="text-pink-500 text-sm mb-2">
                tombol ini buat kamu yang lagi butuh perhatian dariku ya
                sayangkuu 🥺 klik kalau kamu pen dimanja-manjain, kangen, atau
                butuh aku sekarang jugaa!! 💝
              </p>
            </div>

            <a
              href="https://wa.me/6285155222564?text=sayanggg%20aku%20kangen%20banget%20sama%20kamu%20sekarang%20🥺%20aku%20pen%20dimanja-manjain%20samaaa%20kamuuu%20pleasee%20fastrespp%20yaa%20sayangkuu%20aku%20butuh%20kamuuu%20sekarangg%20😭💝"
              target="_blank"
              rel="noopener noreferrer"
              className="relative animate-pulse"
            >
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center space-x-2">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
                <span className="text-xl">🆘</span>
                <span>butuh kamu sekarang!!</span>
              </button>
            </a>
          </div>

          <EnhancedFooter />
        </div>
        <PenguinMascot reaction={catReaction} />
        <CatMascot reaction={catReaction} />
      </div>
    </>
  );
};

export default HomeScreen;
