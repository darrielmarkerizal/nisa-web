"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardEmojis = ["💑", "💝", "💖", "💗", "💓", "💕", "💘", "❤️"];

const MemoryMatch: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [firstPick, setFirstPick] = useState<number | null>(null);
  const [secondPick, setSecondPick] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  const initializeGame = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setMoves(0);
    setScore(0);
    setTime(0);
    setIsGameOver(false);
    setFirstPick(null);
    setSecondPick(null);
  };

  const handleCardClick = (id: number) => {
    if (isGameOver) return;

    const card = cards[id];
    if (card.isMatched || card.isFlipped) return;

    if (firstPick === null) {
      setFirstPick(id);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
    } else if (secondPick === null && firstPick !== id) {
      setSecondPick(id);
      setMoves((prev) => prev + 1);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );

      // Check for match
      if (cards[firstPick].emoji === cards[id].emoji) {
        setScore((prev) => prev + 1);
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstPick || c.id === id ? { ...c, isMatched: true } : c
          )
        );
        setFirstPick(null);
        setSecondPick(null);

        // Check win condition
        if (score + 1 === cardEmojis.length) {
          setIsGameOver(true);
        }
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstPick || c.id === id ? { ...c, isFlipped: false } : c
            )
          );
          setFirstPick(null);
          setSecondPick(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-3 sm:p-8">
      <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="text-sm sm:text-base text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          onClick={() => router.push("/mini-games")}
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Kembali
        </Button>

        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600">
            Memory Match Cinta 💝
          </h1>
          <p className="text-sm sm:text-base text-pink-400">
            Cocokkan semua kartu dengan pasangannya! 🥰
          </p>
        </div>

        {/* Game Board */}
        <Card className="p-3 sm:p-4">
          {/* Game Controls */}
          <div className="flex justify-between items-center mb-3 sm:mb-4 text-sm sm:text-base">
            <div className="flex space-x-2 sm:space-x-4">
              <div className="text-pink-600">
                <Timer className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-pink-600">
                <Sparkles className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Skor: {score}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={initializeGame}
              className="text-pink-600 text-sm"
            >
              Main Lagi
            </Button>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="touch-manipulation"
              >
                <div
                  className={`
                      aspect-square rounded-lg
                      flex items-center justify-center
                      text-xl sm:text-3xl
                      ${card.isFlipped ? "bg-pink-100" : "bg-pink-500"}
                      ${card.isMatched ? "bg-green-100" : ""}
                      transition-all duration-300 transform
                      active:scale-95
                      ${card.isFlipped ? "rotate-y-180" : ""}
                    `}
                >
                  {card.isFlipped ? card.emoji : "💌"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Game Over Modal */}
        {isGameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="p-4 sm:p-6 text-center w-full max-w-xs sm:max-w-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-3 sm:mb-4">
                Selamat! 🎉
              </h2>
              <p className="text-sm sm:text-base text-pink-400 mb-4">
                Kamu menyelesaikan game dalam {moves} langkah!
              </p>
              <Button onClick={initializeGame} className="w-full sm:w-auto">
                Main Lagi
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryMatch;
