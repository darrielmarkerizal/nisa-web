"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Calendar as CalendarIcon, Smile, Moon } from "lucide-react";

interface PeriodSymptom {
  name: string;
  description: string;
  tips: string[];
}

interface MoodEntry {
  emoji: string;
  label: string;
  description: string;
}

const symptoms: PeriodSymptom[] = [
  {
    name: "Kram",
    description: "Sakit perut bagian bawah",
    tips: [
      "Kompres hangat di perut",
      "Minum air putih yang banyak",
      "Olahraga ringan seperti yoga",
      "Hindari kafein",
    ],
  },
  {
    name: "Mood Swings",
    description: "Perubahan suasana hati",
    tips: [
      "Istirahat yang cukup",
      "Meditation dan deep breathing",
      "Makan cokelat hitam",
      "Quality time dengan orang tersayang",
    ],
  },
];

const sweetMessages = [
  "Aku tau kamu lagi gak enak badan, tapi kamu tetep cantik kok sayang 🥺",
  "Jangan lupa minum air putih ya cintaku, aku gak mau kamu dehidrasi 💕",
  "Kalo butuh apa-apa bilang aku ya! Your comfort is my priority bby 🫂",
  "Pengen meluk kamu erat-erat, biar sakitnya berkurang dikit 🤗",
  "You're doing amazing sweetie! Proud of you for being so strong 💪",
];

const moods: MoodEntry[] = [
  { emoji: "😊", label: "Happy", description: "Feeling blessed and grateful" },
  { emoji: "😔", label: "Sad", description: "Need extra love and care" },
  { emoji: "😤", label: "Irritated", description: "Everything is annoying rn" },
  { emoji: "🥱", label: "Tired", description: "Just wanna sleep all day" },
];

const PeriodTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [nextPeriod, setNextPeriod] = useState<Date | undefined>();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const next = new Date(selectedDate);
      next.setDate(next.getDate() + 28);
      setNextPeriod(next);
    }
  }, [selectedDate]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const randomMessage =
      sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
              Period Tracker Cinta
            </h1>
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-pink-400">
            Taking care of you is my number one priority 💝
          </p>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-pink-50 p-1">
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="symptoms"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Symptoms & Tips
            </TabsTrigger>
            <TabsTrigger
              value="mood"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Mood Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  Period Calendar
                </h2>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                {nextPeriod && (
                  <Card className="w-full p-4 bg-pink-50">
                    <p className="text-pink-600 text-center">
                      Prediksi period selanjutnya:{" "}
                      {nextPeriod.toLocaleDateString()}
                    </p>
                  </Card>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  Symptoms & Tips
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {symptoms.map((symptom) => (
                  <Card key={symptom.name} className="p-4 bg-pink-50">
                    <h3 className="font-medium text-pink-600 mb-2">
                      {symptom.name}
                    </h3>
                    <p className="text-pink-400 mb-2">{symptom.description}</p>
                    <div className="space-y-2">
                      {symptom.tips.map((tip, index) => (
                        <p key={index} className="text-sm text-pink-500">
                          • {tip}
                        </p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mood">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  Mood Tracker
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {moods.map((mood) => (
                  <Card
                    key={mood.label}
                    className="p-4 text-center cursor-pointer hover:bg-pink-50 transition-all"
                    onClick={() => handleMoodSelect(mood.label)}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <h3 className="font-medium text-pink-600">{mood.label}</h3>
                    <p className="text-sm text-pink-400">{mood.description}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showMessage} onOpenChange={setShowMessage}>
          <DialogContent className="max-w-[95%] sm:max-w-md bg-white rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-pink-600">
                Special Message For You 💌
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-pink-500 p-4">{currentMessage}</p>
            <Button
              variant="outline"
              onClick={() => setShowMessage(false)}
              className="w-full mt-4"
            >
              Thank you baby! 💕
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PeriodTracker;
