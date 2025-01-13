"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Heart,
  Brain,
  Puzzle,
  Calendar,
  Map,
  Image,
} from "lucide-react";
import { useRouter } from "next/navigation";

const games = [
  {
    id: "memory-match",
    title: "Memory Match Cinta",
    description: "Cocokkan kartu kenangan kita berdua",
    icon: Heart,
    route: "/mini-games/memory-match",
    difficulty: "Mudah",
    duration: "3-5 menit",
  },
  {
    id: "love-quiz",
    title: "Quiz Romantis",
    description: "Tebak fakta menarik tentang hubungan kita",
    icon: Brain,
    route: "/mini-games/love-quiz",
    difficulty: "Sedang",
    duration: "5-10 menit",
  },
  {
    id: "word-puzzle",
    title: "Puzzle Kata Sayang",
    description: "Susun kata-kata cinta tersembunyi",
    icon: Puzzle,
    route: "/mini-games/word-puzzle",
    difficulty: "Sedang",
    duration: "5-7 menit",
  },
  {
    id: "date-planner",
    title: "Love Date Simulator",
    description: "Rencanakan kencan virtual sempurna",
    icon: Calendar,
    route: "/mini-games/date-planner",
    difficulty: "Mudah",
    duration: "5-8 menit",
  },
  {
    id: "treasure-hunt",
    title: "Berburu Harta Cinta",
    description: "Temukan petunjuk tersembunyi dariku",
    icon: Map,
    route: "/mini-games/treasure-hunt",
    difficulty: "Sulit",
    duration: "10-15 menit",
  },
];

const MiniGamesHub: React.FC = () => {
  const router = useRouter();

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
            mini games hub 🎮
          </h1>
          <p className="text-pink-400">yuk main game seru bareng aku! 🥰</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(game.route)}
            >
              <div className="flex items-start space-x-4">
                <game.icon className="w-8 h-8 text-pink-500" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-pink-600">
                    {game.title}
                  </h3>
                  <p className="text-pink-400 text-sm mb-2">
                    {game.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-pink-500">
                    <span>Tingkat: {game.difficulty}</span>
                    <span>•</span>
                    <span>Durasi: {game.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniGamesHub;
