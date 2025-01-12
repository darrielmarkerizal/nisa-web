"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Cookie, PlayCircle, Moon, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const penguinAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(1deg); }
    25% { transform: translateY(-5px) rotate(-1deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
    75% { transform: translateY(-3px) rotate(-2deg); }
  }

  @keyframes swim {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(5px) rotate(2deg); }
    50% { transform: translateX(0) rotate(0deg); }
    75% { transform: translateX(-5px) rotate(-2deg); }
  }

  @keyframes wingFlap {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(15deg); }
  }

  @keyframes dialogFloat {
    0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
    50% { transform: translateY(-10px) scale(1.05); opacity: 0.8; }
  }
`;

interface PetStatus {
  happiness: number;
  energy: number;
  hunger: number;
  health: number;
}

const PenguinPet: React.FC = () => {
  const [status, setStatus] = useState<PetStatus>({
    happiness: 100,
    energy: 100,
    hunger: 100,
    health: 100,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 0.5),
        energy: Math.max(0, prev.energy - 0.3),
        happiness: Math.max(0, prev.happiness - 0.2),
      }));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const feed = () => {
    setStatus((prev) => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      health: Math.min(100, prev.health + 5),
    }));
  };

  const play = () => {
    if (status.energy > 20) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
      setStatus((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 15),
      }));
    }
  };

  const sleep = () => {
    setIsSleeping(true);
    setTimeout(() => {
      setIsSleeping(false);
      setStatus((prev) => ({
        ...prev,
        energy: 100,
        health: Math.min(100, prev.health + 10),
      }));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-pink-600">
            penguin kecil kita 🐧
          </h1>
          <p className="text-pink-400">ayo main sama penguin lucu ini! 🥰</p>
        </div>

        <Card className="p-6 border-pink-100">
          <div className="flex flex-col items-center space-y-8">
            <style>
              {`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(1deg); }
      25% { transform: translateY(-5px) rotate(-1deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
      75% { transform: translateY(-3px) rotate(-2deg); }
    }
    @keyframes swim {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      25% { transform: translateX(5px) rotate(2deg); }
      50% { transform: translateX(0) rotate(0deg); }
      75% { transform: translateX(-5px) rotate(-2deg); }
    }
    @keyframes wingFlap {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(15deg); }
    }
    @keyframes dialogFloat {
      0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
      50% { transform: translateY(-10px) scale(1.05); opacity: 0.8; }
    }
  `}
            </style>

            <div className="relative w-full max-w-sm mx-auto">
              {/* Dialog Bubble */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-lg animate-[dialogFloat_3s_ease-in-out_infinite] z-10">
                <p className="text-pink-500 text-sm whitespace-nowrap">
                  Halo kak Nisa yang paling cantik sedunia! 💕
                </p>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
              </div>

              <div className={`w-48 h-56 relative cursor-pointer mx-auto`}>
                {/* Body Base */}
                <div className="absolute inset-x-4 top-8 bottom-0 bg-[#2D3436] rounded-[100%] animate-[float_4s_ease-in-out_infinite]">
                  {/* White Belly */}
                  <div className="absolute inset-x-4 top-8 bottom-2 bg-gradient-to-b from-white to-gray-50 rounded-[100%] transform-gpu transition-all duration-300 hover:scale-105" />
                </div>

                {/* Head */}
                <div className="absolute inset-x-6 top-0 h-20 bg-[#2D3436] rounded-[100%] animate-[swim_6s_ease-in-out_infinite]" />

                {/* Eyes */}
                <div className="absolute top-8 left-12 w-6 h-7 bg-white rounded-[100%] transform -rotate-12">
                  <div className="w-3 h-4 bg-black rounded-full relative top-1 left-1.5">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="absolute top-8 right-12 w-6 h-7 bg-white rounded-[100%] transform rotate-12">
                  <div className="w-3 h-4 bg-black rounded-full relative top-1 left-1.5">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>

                {/* Beak */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-5 bg-[#FF9800] rounded-[100%]" />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-[#FB8C00] rounded-b-[100%]" />
                </div>

                {/* Flippers */}
                <div className="absolute left-2 top-20 w-8 h-16 origin-right animate-[wingFlap_1s_ease-in-out_infinite]">
                  <div className="w-full h-full bg-[#2D3436] rounded-l-[100%]">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#2D3436] to-black rounded-l-[100%]" />
                  </div>
                </div>
                <div className="absolute right-2 top-20 w-8 h-16 origin-left animate-[wingFlap_1s_ease-in-out_infinite_reverse]">
                  <div className="w-full h-full bg-[#2D3436] rounded-r-[100%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2D3436] to-black rounded-r-[100%]" />
                  </div>
                </div>

                {/* Feet */}
                <div className="absolute -bottom-1 left-10 w-6 h-4 bg-[#FF9800] rounded-b-[100%] transform -rotate-12" />
                <div className="absolute -bottom-1 right-10 w-6 h-4 bg-[#FF9800] rounded-b-[100%] transform rotate-12" />

                {/* Status Effects */}
                {isSleeping && (
                  <div className="absolute -top-8 -right-4 text-2xl animate-bounce-slow">
                    💤
                  </div>
                )}
                {status.happiness > 80 && !isSleeping && (
                  <div className="absolute -top-6 -right-4 text-2xl animate-spin-slow">
                    ✨
                  </div>
                )}
                {status.hunger < 30 && !isSleeping && (
                  <div className="absolute -top-6 -left-4 text-xl animate-bounce">
                    🍽️
                  </div>
                )}
                {isPlaying && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xl animate-bounce">
                    🎮
                  </div>
                )}
              </div>
            </div>

            {/* Status Bars with Enhanced Styling */}
            <div className="w-full space-y-3">
              {/* Health Status */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 flex items-center">
                    <Heart className="w-4 h-4 mr-1" /> Kesehatan
                  </span>
                  <span className="text-pink-400">{status.health}%</span>
                </div>
                <Progress value={status.health} className="h-2 bg-pink-100">
                  <div className="bg-pink-500 h-full transition-all" />
                </Progress>
              </div>

              {/* Energy Status */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 flex items-center">
                    <Moon className="w-4 h-4 mr-1" /> Energi
                  </span>
                  <span className="text-pink-400">{status.energy}%</span>
                </div>
                <Progress value={status.energy} className="h-2 bg-pink-100">
                  <div className="bg-pink-500 h-full transition-all" />
                </Progress>
              </div>

              {/* Hunger Status */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 flex items-center">
                    <Cookie className="w-4 h-4 mr-1" /> Lapar
                  </span>
                  <span className="text-pink-400">{status.hunger}%</span>
                </div>
                <Progress value={status.hunger} className="h-2 bg-pink-100">
                  <div className="bg-pink-500 h-full transition-all" />
                </Progress>
              </div>

              {/* Happiness Status */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 flex items-center">
                    <PlayCircle className="w-4 h-4 mr-1" /> Kebahagiaan
                  </span>
                  <span className="text-pink-400">{status.happiness}%</span>
                </div>
                <Progress value={status.happiness} className="h-2 bg-pink-100">
                  <div className="bg-pink-500 h-full transition-all" />
                </Progress>
              </div>
            </div>

            {/* Action Buttons with Enhanced Styling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6">
              <Button
                onClick={feed}
                disabled={status.hunger >= 100}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white"
              >
                <Cookie className="w-4 h-4 mr-2 hidden sm:inline" />
                Kasih Makan
              </Button>
              <Button
                onClick={play}
                disabled={status.energy <= 20 || isSleeping}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white"
              >
                <PlayCircle className="w-4 h-4 mr-2 hidden sm:inline" />
                Main
              </Button>
              <Button
                onClick={sleep}
                disabled={isSleeping || status.energy >= 100}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white"
              >
                <Moon className="w-4 h-4 mr-2 hidden sm:inline" />
                Tidur
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PenguinPet;
