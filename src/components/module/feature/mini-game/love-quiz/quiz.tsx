"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ScoreTier {
  range: [number, number];
  message: string;
  emoji: string;
  catMood: "love" | "happy" | "sad" | "crying";
}

const scoreTiers: ScoreTier[] = [
  {
    range: [17, 20],
    message:
      "Wahh kamu paham banget tentang aku! Kamu memang yang terbaik dan paling sayang sama aku! 💝",
    emoji: "🥰",
    catMood: "love",
  },
  {
    range: [13, 16],
    message:
      "Kamu sudah cukup mengenal aku dengan baik! Aku senang kamu berusaha memahami aku! 💖",
    emoji: "😊",
    catMood: "happy",
  },
  {
    range: [8, 12],
    message:
      "Masih banyak yang perlu kamu pelajari tentang aku, tapi aku yakin kamu akan lebih memahami aku! 💕",
    emoji: "🙂",
    catMood: "sad",
  },
  {
    range: [0, 7],
    message:
      "Yuk lebih banyak mengobrol dan menghabiskan waktu bersama agar kita bisa lebih saling mengenal! 💌",
    emoji: "🥺",
    catMood: "crying",
  },
];

const questions: Question[] = [
  {
    id: 1,
    question: "Kapan pertama kali kita ketemu?",
    options: ["19 Mei 2024", "20 Mei 2024", "21 Mei 2024", "22 Mei 2024"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Apa makanan favorit aku?",
    options: ["Bakso", "Siomay", "Soto", "Mie Ayam"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Apa warna kesukaan aku?",
    options: ["Pink", "Biru", "Hijau", "Merah"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Dimana tempat makan pertama kali kita?",
    options: ["McDonalds", "KFC", "Sekar Pizza", "Warteg"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Apa minuman favorit aku?",
    options: ["Kopi", "Teh", "Jus", "Soda"],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Apa hobi aku?",
    options: ["Sepak Bola", "Basket", "Voli", "Badminton"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: "Apa cita-cita aku?",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Mobile Developer",
    ],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "Klub sepakbola kesukaan aku?",
    options: ["Real Madrid", "Barcelona", "Manchester United", "Liverpool"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Klub basket kesukaan aku?",
    options: [
      "LA Lakers",
      "Golden State Warriors",
      "Milwaukee Bucks",
      "Boston Celtics",
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "Framework JavaScript yang aku pakai sekarang?",
    options: ["React", "Vue", "Angular", "Svelte"],
    correctAnswer: 0,
  },
  {
    id: 11,
    question: "Bahasa pemrograman favorit aku?",
    options: ["JavaScript/TypeScript", "Python", "Java", "PHP"],
    correctAnswer: 0,
  },
  {
    id: 12,
    question: "Pemain sepakbola favorit aku?",
    options: ["Messi", "Ronaldo", "Neymar", "Mbappe"],
    correctAnswer: 0,
  },
  {
    id: 13,
    question: "Jenis kopi favorit aku?",
    options: ["Americano", "Cappuccino", "Latte", "Espresso"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "Style coding aku lebih suka?",
    options: [
      "Functional Programming",
      "Object Oriented",
      "Procedural",
      "Mixed",
    ],
    correctAnswer: 0,
  },
  {
    id: 15,
    question: "IDE/Text Editor favorit aku?",
    options: ["VS Code", "Sublime Text", "WebStorm", "Atom"],
    correctAnswer: 0,
  },
  {
    id: 16,
    question: "CSS Framework favorit aku?",
    options: ["Tailwind", "Bootstrap", "Material UI", "Chakra UI"],
    correctAnswer: 0,
  },
  {
    id: 17,
    question: "State Management yang aku suka?",
    options: ["Redux", "Zustand", "Context API", "MobX"],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Testing Library yang aku pakai?",
    options: ["Jest", "Vitest", "Cypress", "Mocha"],
    correctAnswer: 0,
  },
  {
    id: 19,
    question: "Database yang aku kuasai?",
    options: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "Version Control yang aku pakai?",
    options: ["GitHub", "GitLab", "Bitbucket", "Azure DevOps"],
    correctAnswer: 0,
  },
];

const LoveQuiz: React.FC = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleAnswer = (selectedOption: number) => {
    const correct = selectedOption === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowAlert(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAlert(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          onClick={() => router.push("/mini-games")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Games
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-pink-600">Quiz Romantis 💝</h1>
          <p className="text-pink-400">
            Tunjukkan seberapa paham kamu tentang aku! 🥰
          </p>
        </div>

        <Card className="p-6">
          {!showResult ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-pink-400 mb-2">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </p>
                <div className="w-full bg-pink-100 rounded-full h-2 mb-4">
                  <div
                    className="bg-pink-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
                <h2 className="text-xl font-medium text-pink-600 mb-6">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start py-6 text-pink-600 hover:bg-pink-50"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <Heart className="w-16 h-16 text-pink-500 mx-auto animate-pulse" />
              <h2 className="text-2xl font-bold text-pink-600">
                Quiz Selesai! 🎉
              </h2>
              <p className="text-xl text-pink-500">
                Skor kamu: {score} dari {questions.length}
              </p>
              <p className="text-pink-400">
                {score === questions.length
                  ? "Wah kamu paham banget tentang aku! 🥰"
                  : score >= questions.length / 2
                    ? "Lumayan juga ya pengetahuanmu! 😊"
                    : "Yuk belajar lebih banyak tentang aku! 💕"}
              </p>
              <Button
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white"
                onClick={restartQuiz}
              >
                Main Lagi
              </Button>
            </div>
          )}
        </Card>

        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <div className="text-center space-y-4">
              {/* Cat Mascot */}
              <div className="relative w-40 h-40 mx-auto">
                <div
                  className={`
                    absolute inset-0
                    transition-all duration-500 transform
                    ${isCorrect ? "scale-110" : "scale-95"}
                  `}
                >
                  {/* Cat Face */}
                  <div className="absolute inset-0 bg-[#F8E6E0] rounded-full">
                    {/* Eyes */}
                    <div
                      className={`
                        absolute left-1/4 top-1/3 w-6 h-${isCorrect ? "3" : "6"}
                        bg-black rounded-full transition-all duration-300
                      `}
                    />
                    <div
                      className={`
                        absolute right-1/4 top-1/3 w-6 h-${isCorrect ? "3" : "6"}
                        bg-black rounded-full transition-all duration-300
                      `}
                    />

                    {/* Blush */}
                    <div className="absolute left-5 top-1/2 w-4 h-2 bg-pink-300 rounded-full opacity-60" />
                    <div className="absolute right-5 top-1/2 w-4 h-2 bg-pink-300 rounded-full opacity-60" />

                    {/* Mouth */}
                    <div
                      className={`
                        absolute left-1/2 top-[55%] -translate-x-1/2
                        w-8 h-4 border-b-2
                        ${isCorrect ? "border-pink-400 rounded-b-full" : "border-gray-400 rounded-t-full"}
                        transition-all duration-300
                      `}
                    />
                  </div>

                  {/* Effects */}
                  {isCorrect && (
                    <>
                      <div className="absolute -top-6 -right-4 text-2xl animate-bounce">
                        ❤️
                      </div>
                      <div className="absolute -top-4 -left-4 text-2xl animate-pulse">
                        ✨
                      </div>
                    </>
                  )}
                </div>
              </div>

              <h3
                className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}
              >
                {isCorrect ? "Yeay Benar! 🎉" : "Oops Salah! 😢"}
              </h3>

              <p className="text-gray-600">
                {isCorrect
                  ? "Kamu memang yang paling paham aku! 💖"
                  : "Gapapa, aku yakin kamu akan lebih paham aku 💝"}
              </p>

              <Button
                className={`
                  w-full mt-4
                  ${isCorrect ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-500 hover:bg-gray-600"}
                  text-white
                `}
                onClick={handleNextQuestion}
              >
                Lanjut
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LoveQuiz;
