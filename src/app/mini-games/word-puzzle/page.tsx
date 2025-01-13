"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface WordLocation {
  word: string;
  found: boolean;
  start: [number, number];
  end: [number, number];
  direction: string;
  cells: [number, number][];
}

const words = [
  "NISA",
  "FREDLINA",
  "MAHARDIKA",
  "SAPUTRI",
  "DARRIEL",
  "MARKERIZAL",
  "SAYANGKU",
  "CINTAKU",
  "BAYIKU",
];

const generatePuzzle = (size: number, words: string[]) => {
  let grid = Array(size)
    .fill(".")
    .map(() => Array(size).fill("."));
  let locations: WordLocation[] = [];

  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down-right
    [-1, 1], // diagonal up-right
  ];

  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      const [dx, dy] = direction;

      const maxX = dx < 0 ? size - 1 : size - dx * word.length;
      const maxY = dy < 0 ? size - 1 : size - dy * word.length;
      const minX = dx < 0 ? word.length - 1 : 0;
      const minY = dy < 0 ? word.length - 1 : 0;

      const startX = minX + Math.floor(Math.random() * (maxX - minX));
      const startY = minY + Math.floor(Math.random() * (maxY - minY));

      let canPlace = true;
      let cells: [number, number][] = [];

      for (let i = 0; i < word.length; i++) {
        const x = startX + dx * i;
        const y = startY + dy * i;
        if (grid[y][x] !== "." && grid[y][x] !== word[i]) {
          canPlace = false;
          break;
        }
        cells.push([x, y]);
      }

      if (canPlace) {
        cells.forEach(([x, y], i) => {
          grid[y][x] = word[i];
        });

        locations.push({
          word,
          found: false,
          start: [startX, startY],
          end: [
            startX + dx * (word.length - 1),
            startY + dy * (word.length - 1),
          ],
          direction:
            dx === 0
              ? "vertical"
              : dy === 0
                ? "horizontal"
                : dx === dy
                  ? "diagonal-right"
                  : "diagonal-left",
          cells,
        });

        placed = true;
      }
    }
  });

  // Fill remaining spaces with random letters
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === ".") {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, locations };
};

const WordPuzzle: React.FC = () => {
  const router = useRouter();
  const [grid, setGrid] = useState<string[][]>([]);
  const [wordLocations, setWordLocations] = useState<WordLocation[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const { grid, locations } = generatePuzzle(10, words);
    setGrid(grid);
    setWordLocations(locations);
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  const handleMouseDown = (x: number, y: number) => {
    setIsDragging(true);
    setSelectedCells([[x, y]]);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (isDragging) {
      setSelectedCells((prev) => [...prev, [x, y]]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (selectedCells.length > 0) {
      checkWord(selectedCells);
    }
    setSelectedCells([]);
  };

  const checkWord = (selection: [number, number][]) => {
    const selectedWord = selection.map(([x, y]) => grid[y][x]).join("");

    const foundWord = wordLocations.find((loc) => {
      if (loc.found) return false;

      const word = loc.cells.map(([x, y]) => grid[y][x]).join("");
      const reversedWord = [...loc.cells]
        .reverse()
        .map(([x, y]) => grid[y][x])
        .join("");

      const selectedMatches =
        selectedWord === word || selectedWord === reversedWord;

      return selectedMatches;
    });

    if (foundWord) {
      setWordLocations((prev) =>
        prev.map((w) => (w.word === foundWord.word ? { ...w, found: true } : w))
      );
      setScore((prev) => prev + 1);

      if (score + 1 === words.length) {
        setIsGameOver(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          onClick={() => router.push("/mini-games")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Games
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-pink-600">
            Puzzle Kata Sayang 💝
          </h1>
          <p className="text-pink-400">
            Geser untuk menemukan kata tersembunyi! 🥰
          </p>
        </div>

        <Card className="p-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              <div className="text-pink-600">
                <Timer className="inline w-4 h-4 mr-1" />
                {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-pink-600">
                <Heart className="inline w-4 h-4 mr-1" />
                Skor: {score}/{words.length}
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-10 gap-1 mb-4"
            onMouseLeave={() => {
              setIsDragging(false);
              setSelectedCells([]);
            }}
          >
            {grid.map((row, y) =>
              row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  className={`
                          w-8 h-8 sm:w-10 sm:h-10 rounded
                          flex items-center justify-center
                          text-sm sm:text-base font-bold
                          transition-all duration-200
                          ${
                            selectedCells.some(
                              ([sx, sy]) => sx === x && sy === y
                            )
                              ? "bg-pink-500 text-white"
                              : wordLocations.some(
                                    (loc) =>
                                      loc.found &&
                                      loc.cells.some(
                                        ([cx, cy]) => cx === x && cy === y
                                      )
                                  )
                                ? "bg-green-200 text-green-700"
                                : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                          }
                          touch-none select-none
                        `}
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                  onMouseUp={handleMouseUp}
                  onTouchStart={() => handleMouseDown(x, y)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY
                    );
                    const coordinates = element
                      ?.getAttribute("data-coord")
                      ?.split(",");
                    if (coordinates) {
                      handleMouseEnter(
                        parseInt(coordinates[0]),
                        parseInt(coordinates[1])
                      );
                    }
                  }}
                  onTouchEnd={handleMouseUp}
                  data-coord={`${x},${y}`}
                >
                  {cell}
                </button>
              ))
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {wordLocations.map(({ word, found }) => (
              <div
                key={word}
                className={`
                        p-2 rounded text-center
                        ${
                          found
                            ? "bg-green-100 text-green-600"
                            : "bg-pink-100 text-pink-600"
                        }
                      `}
              >
                {word}
              </div>
            ))}
          </div>
        </Card>

        {isGameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="p-6 text-center">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">
                Selamat! 🎉
              </h2>
              <p className="text-pink-400 mb-4">
                Kamu menemukan semua kata dalam {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")}!
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Main Lagi
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPuzzle;
