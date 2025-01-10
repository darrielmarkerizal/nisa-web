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
} from "lucide-react";
import { useRouter } from "next/navigation";

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
const InteractiveCard: React.FC<InteractiveCardProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Card
      className="p-4 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      style={{
        transform: isHovered ? "translateY(-5px)" : "none",
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
    icon: Bell,
    title: "emergency sos",
    description: "panggilan darurat ke aku",
    route: "/emergency",
  },
  {
    icon: Brain,
    title: "self-growth guide",
    description: "panduan pengembangan diri",
    route: "/self-growth",
  },
  {
    icon: Target,
    title: "couple goals",
    description: "target-target kita berdua",
    route: "/couple-goals",
  },
  {
    icon: Map,
    title: "halal date planner",
    description: "rencana kencan yang halal",
    route: "/date-planner",
  },
  {
    icon: ThumbsUp,
    title: "gratitude box",
    description: "ungkapan rasa syukur",
    route: "/gratitude",
  },
  {
    icon: MessageSquare,
    title: "comfort messages",
    description: "pesan penghibur saat sedih",
    route: "/comfort",
  },
  {
    icon: Activity,
    title: "health assistant",
    description: "asisten kesehatan pribadi",
    route: "/health",
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <InteractiveCard
                key={index}
                item={item}
                onClick={() => router.push(item.route)}
              />
            ))}
          </div>

          <footer className="text-center py-8 mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 to-transparent" />
            <p className="text-pink-400 text-sm relative">
              Dibuat dengan penuh cinta 💝 oleh Darriel Markerizal
              <br />
              untuk Nisa Fredlina Mahardika Saputri
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
