"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Smile,
  Cloud,
  Battery,
  Coffee,
  Heart,
  Brain,
  Sun,
  Moon,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MoodCat from "./components/moodcat";

interface MoodAspect {
  id: string;
  label: string;
  value: number;
  icon: React.ElementType;
  description: string;
  weight: number; // Weight for mood calculation
}

const initialMoodAspects: MoodAspect[] = [
  {
    id: "happiness",
    label: "tingkat happy",
    value: 50,
    icon: Smile,
    description: "seberapa seneng kamu hari ini? 😊",
    weight: 1.5, // Higher weight for happiness
  },
  {
    id: "energy",
    label: "energi",
    value: 50,
    icon: Battery,
    description: "level semangat kamu gimana? ⚡",
    weight: 1.0,
  },
  {
    id: "anxiety",
    label: "tingkat overthinking",
    value: 0,
    icon: Cloud,
    description: "seberapa overthinking kamu hari ini? 😥",
    weight: 1.2, // Higher weight for negative emotions
  },
  {
    id: "stress",
    label: "tingkat stress",
    value: 0,
    icon: Coffee,
    description: "level stress kamu seberapa? 😫",
    weight: 1.2,
  },
  {
    id: "focus",
    label: "tingkat fokus",
    value: 50,
    icon: Brain,
    description: "seberapa fokus kamu hari ini? 🎯",
    weight: 0.8,
  },
  {
    id: "motivation",
    label: "motivasi",
    value: 50,
    icon: Zap,
    description: "level motivasi kamu gimana? 💪",
    weight: 1.0,
  },
];

const moodTriggers = {
  positive: [
    "happy bareng temen 😊",
    "seneng banget! 🎉",
    "excited! ✨",
    "berhasil mencapai target! 🎯",
    "dapat apresiasi 🌟",
    "quality time 💫",
    "nonton film bagus 🎬",
    "makan enak 😋",
    "olahraga 🏃‍♂️",
    "produktif banget 💪",
  ],
  neutral: [
    "bosen aja 🥱",
    "ga mood aja 😒",
    "biasa aja 😐",
    "males ngapa-ngapain 😪",
    "cuaca mendung ☁️",
    "pengen jalan-jalan 🚶‍♂️",
    "laper 🍽️",
    "ngantuk 😴",
  ],
  negative: [
    "capek kerja 😴",
    "stress kuliah 📚",
    "overthinking 😥",
    "deadlines menumpuk 📊",
    "kurang tidur 🌙",
    "sakit 🤒",
    "kesepian 😔",
    "kecewa 💔",
    "gagal ujian 📝",
    "masalah keluarga 🏠",
    "konflik teman 🤝",
    "masalah keuangan 💰",
  ],
};

const moodResponses = {
  veryHappy: ["Mood kamu lagi sangat bahagia dan penuh semangat! ⭐️⭐️⭐️"],
  happy: ["Mood kamu lagi happy dan positif! 🌟"],
  neutral: ["Mood kamu lagi biasa aja nih, stabil 😊"],
  sad: ["Sepertinya mood kamu lagi kurang baik nih 🫂"],
  stressed: ["Kamu butuh istirahat dan self-care 💆‍♂️"],
  verySad: ["Mood kamu lagi sangat down, jangan lupa jaga diri ya 🫂"],
};

const MoodJournal: React.FC = () => {
  const [moodAspects, setMoodAspects] = useState(initialMoodAspects);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [overallMood, setOverallMood] = useState<
    "veryHappy" | "happy" | "neutral" | "sad" | "stressed" | "verySad"
  >("neutral");
  const [triggerMood, setTriggerMood] = useState("neutral");
  const router = useRouter();

  const handleMoodChange = (id: string, newValue: number) => {
    setMoodAspects((aspects) =>
      aspects.map((aspect) =>
        aspect.id === id ? { ...aspect, value: newValue } : aspect
      )
    );
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };

  // Advanced mood calculation based on weighted aspects
  const calculateMoodScore = () => {
    const weights = moodAspects.reduce((sum, aspect) => sum + aspect.weight, 0);

    // Calculate positive factors (happiness, energy, focus, motivation)
    const positiveScore =
      ((moodAspects.find((a) => a.id === "happiness")?.value || 0) * 1.5 +
        (moodAspects.find((a) => a.id === "energy")?.value || 0) * 1.0 +
        (moodAspects.find((a) => a.id === "focus")?.value || 0) * 0.8 +
        (moodAspects.find((a) => a.id === "motivation")?.value || 0) * 1.0) /
      (1.5 + 1.0 + 0.8 + 1.0);

    // Calculate negative factors (anxiety, stress)
    const negativeScore =
      ((moodAspects.find((a) => a.id === "anxiety")?.value || 0) * 1.2 +
        (moodAspects.find((a) => a.id === "stress")?.value || 0) * 1.2) /
      (1.2 + 1.2);

    return { positiveScore, negativeScore };
  };

  // Analyze mood based on selected triggers with weighted categories
  useEffect(() => {
    const positiveCount =
      selectedTriggers.filter((trigger) =>
        moodTriggers.positive.includes(trigger)
      ).length * 1.5;
    const negativeCount =
      selectedTriggers.filter((trigger) =>
        moodTriggers.negative.includes(trigger)
      ).length * 1.2;
    const neutralCount = selectedTriggers.filter((trigger) =>
      moodTriggers.neutral.includes(trigger)
    ).length;

    const totalScore =
      (positiveCount - negativeCount) /
      (positiveCount + negativeCount + neutralCount || 1);

    if (totalScore > 0.5) setTriggerMood("veryHappy");
    else if (totalScore > 0.2) setTriggerMood("happy");
    else if (totalScore > -0.2) setTriggerMood("neutral");
    else if (totalScore > -0.5) setTriggerMood("sad");
    else setTriggerMood("verySad");
  }, [selectedTriggers]);

  // Advanced mood analysis based on all factors
  useEffect(() => {
    const { positiveScore, negativeScore } = calculateMoodScore();
    const moodScore = positiveScore - negativeScore;

    if (positiveScore > 80 && negativeScore < 20) setOverallMood("veryHappy");
    else if (positiveScore > 60 && negativeScore < 40) setOverallMood("happy");
    else if (negativeScore > 80) setOverallMood("verySad");
    else if (negativeScore > 60) setOverallMood("stressed");
    else if (positiveScore < 30) setOverallMood("sad");
    else setOverallMood("neutral");
  }, [moodAspects]);

  const getResponse = (mood: string) => {
    return (
      moodResponses[mood as keyof typeof moodResponses]?.[0] ||
      moodResponses.neutral[0]
    );
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
          <h1 className="text-3xl font-bold text-pink-600">mood tracker</h1>
          <p className="text-pink-400">catat mood kamu hari ini</p>
        </div>

        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-pink-50">
            <TabsTrigger value="mood">mood tracker 📊</TabsTrigger>
            <TabsTrigger value="triggers">triggers 💭</TabsTrigger>
          </TabsList>

          <TabsContent value="mood">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-pink-600 mb-6">
                gimana mood kamu hari ini? 🤗
              </h2>

              <div className="space-y-8">
                {moodAspects.map((aspect) => (
                  <div key={aspect.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <aspect.icon className="w-5 h-5 text-pink-500" />
                        <label className="text-pink-600 font-medium">
                          {aspect.label}
                        </label>
                      </div>
                      <span className="text-pink-400">{aspect.value}%</span>
                    </div>
                    <Slider
                      value={[aspect.value]}
                      max={100}
                      step={1}
                      onValueChange={([value]) =>
                        handleMoodChange(aspect.id, value)
                      }
                      className="w-full [&>.relative]:bg-pink-50 [&>.relative>div]:bg-pink-500 [&_[role=slider]]:bg-pink-700 [&_[role=slider]]:border-2 [&_[role=slider]]:border-pink-50"
                    />
                    <p className="text-sm text-pink-400">
                      {aspect.description}
                    </p>
                  </div>
                ))}

                <Card className="p-6 bg-pink-50 mt-6">
                  <div className="text-center">
                    <p className="text-pink-600 font-medium mb-4">
                      Mood kamu sekarang:
                    </p>
                    <MoodCat mood={overallMood} />
                    <p className="text-pink-500 mt-4">
                      {getResponse(overallMood)}
                    </p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="triggers">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-pink-600 mb-6">
                apa yang bikin kamu ngerasa gini? 🤔
              </h2>

              <div className="space-y-6">
                {Object.entries(moodTriggers).map(([category, triggers]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-pink-500 font-medium capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {triggers.map((trigger) => (
                        <Button
                          key={trigger}
                          variant="outline"
                          className={`h-auto p-4 text-left hover:bg-pink-50 ${
                            selectedTriggers.includes(trigger)
                              ? "bg-pink-100 border-pink-300"
                              : ""
                          }`}
                          onClick={() => toggleTrigger(trigger)}
                        >
                          {trigger}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}

                <Card className="p-4 bg-pink-50 mt-6">
                  <p className="text-pink-600 font-medium mb-2">
                    Berdasarkan pilihan:
                  </p>
                  <p className="text-pink-500">{getResponse(triggerMood)}</p>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MoodJournal;
