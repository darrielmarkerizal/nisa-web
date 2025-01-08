"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, RefreshCcw } from "lucide-react";

type MoodAffirmation = {
    mood: string;
    emoji: string;
    affirmations: string[];
};

const moodAffirmations: MoodAffirmation[] = [
    {
        mood: "Happy",
        emoji: "🥰",
        affirmations: [
            "Senyummu adalah hal terindah yang pernah aku lihat, fr fr no cap! ✨",
            "Kamu tuh emang sunshine-nya aku banget sih, ga bohong! 🌞",
            "Liat kamu happy tuh bikin aku ikutan happy juga, real talk! 💝",
        ]
    },
    {
        mood: "Sad",
        emoji: "🥺",
        affirmations: [
            "Hey babyyy, remember you're stronger than you think! Aku selalu ada buat kamu 💪",
            "It's okay not to be okay, but please know that you're never alone 🫂",
            "Kamu tuh precious banget tau, jangan sedih terus ya sayangku 💝",
        ]
    },
    {
        mood: "Tired",
        emoji: "😴",
        affirmations: [
            "Take your time to rest, my love! You deserve it banget! 💆‍♀️",
            "Proud of you for working so hard! Istirahat dulu ya sayang 🌙",
            "You're doing amazing sweetie! Jangan lupa self-care ya 💖",
        ]
    },
    {
        mood: "Motivated",
        emoji: "💪",
        affirmations: [
            "Keep shining bright like you always do! You're literally goals! ⭐",
            "Bismillah for everything you do! You got this babyyy! 🚀",
            "So proud of your progress! Keep going sayangku! 💫",
        ]
    },
    {
        mood: "Anxious",
        emoji: "😰",
        affirmations: [
            "Take deep breaths sayang, everything's gonna be okay 🌸",
            "You've overcome so much before, this too shall pass 🙏",
            "I believe in you more than you know! Kamu kuat! 💕",
        ]
    }
];

const DailyLoveScreen = () => {
    const [selectedMood, setSelectedMood] = useState<MoodAffirmation | null>(null);
    const [currentAffirmation, setCurrentAffirmation] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const generateAffirmation = (mood: MoodAffirmation) => {
        const randomIndex = Math.floor(Math.random() * mood.affirmations.length);
        setCurrentAffirmation(mood.affirmations[randomIndex]);
    };

    const handleMoodSelect = (mood: MoodAffirmation) => {
        setSelectedMood(mood);
        generateAffirmation(mood);
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
                        daily love affirmation 💝
                    </h1>
                    <p className="text-pink-400">
                        kata-kata spesial buat kamu hari ini, my love!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {moodAffirmations.map((mood) => (
                        <Card
                            key={mood.mood}
                            className="p-6 hover:shadow-lg transition-all cursor-pointer hover:bg-pink-50 group"
                            onClick={() => handleMoodSelect(mood)}
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <span className="text-4xl">{mood.emoji}</span>
                                <h3 className="font-medium text-pink-600">
                                    {mood.mood}
                                </h3>
                            </div>
                        </Card>
                    ))}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-[95%] sm:max-w-md md:max-w-lg bg-white rounded-xl p-6">
                        <div className="space-y-6">
                            {selectedMood && (
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        <span className="text-5xl">
                                            {selectedMood.emoji}
                                        </span>
                                    </div>
                                    <p className="text-lg font-medium text-pink-600">
                                        {currentAffirmation}
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <Button
                                            variant="outline"
                                            className="hover:bg-pink-50"
                                            onClick={() => setIsDialogOpen(false)}
                                        >
                                            <Heart className="w-4 h-4 mr-2" />
                                            Thank you!
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="bg-pink-500 hover:bg-pink-600"
                                            onClick={() => selectedMood && generateAffirmation(selectedMood)}
                                        >
                                            <RefreshCcw className="w-4 h-4 mr-2" />
                                            Generate New
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default DailyLoveScreen;