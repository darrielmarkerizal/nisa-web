"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Coffee,
  Gift,
  Star,
  Calendar,
  Sparkles,
  Moon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MessageCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  messages: string[];
}

const messageCategories: MessageCategory[] = [
  {
    id: "miss",
    label: "kangen 🥺",
    icon: Heart,
    messages: [
      "sayangggg, aku kangen kamu 🥺",
      "lagi apa? aku pen ketemu 💗",
      "video call yuk, pen liat muka kamu 📱",
      "kamu sibuk ga? aku kangen 💝",
      "udah lama ga ketemu, kangen banget 💕",
      "pen ketemu kamu nih 💝",
      "hari ini kepikiran kamu terus 💭",
      "kapan kita ketemu lagi? 👉👈",
      "rasanya sepi banget ga ada kamu 🥺",
      "kangen suara kamu nih 🎵",
    ],
  },
  {
    id: "help",
    label: "minta bantuan 🙏",
    icon: MessageCircle,
    messages: [
      "sayang, bisa jemput aku ga? 🚗",
      "temenin aku belanja dong 🛍️",
      "aku butuh bantuan kamu nih 🥺",
      "anterin aku ke [tempat] dong 🙏",
      "bisa temenin aku ke dokter ga? 🏥",
      "bantuin aku pilih baju dong 👗",
      "temenin aku ngerjain tugas ya? 📚",
      "bisa anterin aku ke stasiun? 🚉",
      "bantuin aku masak dong 👩‍🍳",
      "temenin aku cari kado buat mama? 🎁",
    ],
  },
  {
    id: "date",
    label: "ajak date 💝",
    icon: Coffee,
    messages: [
      "weekend nanti mau jalan ga? 🥰",
      "makan siang bareng yuk 🍱",
      "nonton film baru yuk! 🎬",
      "main ke [tempat] yuk 💕",
      "cafe hunting yuk? ☕",
      "pen ice cream nih, temenin ya? 🍦",
      "jalan-jalan ke mall yuk 🛍️",
      "mau coba restoran baru ga? 🍽️",
      "piknik di taman yuk? 🌳",
      "karaoke bareng yuk! 🎤",
    ],
  },
  {
    id: "care",
    label: "perhatian 💖",
    icon: Heart,
    messages: [
      "udah makan belum sayang? 🍚",
      "jangan lupa minum air ya 💧",
      "istirahat yang cukup ya 😴",
      "hati-hati di jalan 🚗",
      "jaga kesehatan ya sayangku 🏥",
      "jangan skip makan siang! 🍱",
      "olahraga rutin ya 💪",
      "semangat kerjanya! 📚",
      "jangan tidur terlalu malam 🌙",
      "kabarin aku kalau udah sampai ya 📱",
    ],
  },
];

const specialMessages: MessageCategory[] = [
  {
    id: "morning",
    label: "good morning 🌅",
    icon: Star,
    messages: [
      "selamat pagi sayangku 🌅",
      "udah sarapan belum? 🍚",
      "semangat hari ini ya! 💪",
      "jangan lupa makan ya 💝",
      "pagi sunshine! ☀️",
      "tidurnya nyenyak? 😴",
      "hari ini cerah seperti senyummu 🌞",
      "good morning my love 💕",
      "start your day with smile! 😊",
      "miss you since morning 🥰",
    ],
  },
  {
    id: "night",
    label: "good night 🌙",
    icon: Moon,
    messages: [
      "selamat malam sayangku 🌙",
      "mimpi indah ya cantik 💫",
      "jangan begadang ya 😴",
      "istirahat yang cukup ya 💝",
      "good night my princess 👸",
      "sleep tight honey 🌠",
      "tidur yang nyenyak ya sayang 💤",
      "see you in my dream 💭",
      "besok pagi aku chat lagi ya 📱",
      "met bobo sayangku 🤗",
    ],
  },
  {
    id: "special",
    label: "special days 🎉",
    icon: Sparkles,
    messages: [
      "happy monthsary sayang! 💑",
      "selamat ulang tahun! 🎂",
      "congrats for your achievement! 🎉",
      "proud of you always! 💫",
      "happy anniversary my love! 💘",
      "semoga semua mimpimu tercapai 🌠",
      "kamu hebat banget hari ini! 🏆",
      "selamat atas kelulusannya! 🎓",
      "semoga sukses terus ya 🌟",
      "you deserve all the happiness! ✨",
    ],
  },
  {
    id: "love",
    label: "ungkapan sayang 💝",
    icon: Heart,
    messages: [
      "i love you so much! 💖",
      "kamu segalanya buat aku 💫",
      "makasih udah jadi pacar terbaik 💑",
      "beruntung banget punya kamu 🍀",
      "you're my everything 💘",
      "forever yours 💕",
      "kamu sempurna buat aku 👫",
      "ga bisa hidup tanpa kamu 🥰",
      "you complete me 💞",
      "always grateful for having you 🙏",
    ],
  },
];

type MoodType =
  | "super happy"
  | "happy"
  | "calm"
  | "loving"
  | "need attention"
  | "playful"
  | "romantic";

const moodMessages: Record<MoodType, string[]> = {
  "super happy": [
    "aku seneng banget hari ini! 🥰",
    "everything is perfect! ✨",
    "makasih udah bikin aku happy 💝",
    "hari ini amazing banget! 🌟",
    "you make my day complete! 💫",
  ],
  happy: [
    "hari ini menyenangkan! 😊",
    "mood-ku lagi bagus nih 💫",
    "thanks for today! 💕",
    "senyum terus karena kamu 😘",
    "life is beautiful with you 🌈",
  ],
  calm: [
    "hari ini damai banget 😌",
    "feeling peaceful 🦋",
    "lagi tenang nih 💭",
    "enjoying every moment 🍃",
    "serasa di surga 🌅",
  ],
  loving: [
    "sayang banget sama kamu 🤗",
    "you're the best! 💝",
    "makasih udah ada buat aku 💌",
    "forever yours 💑",
    "you're my everything 💖",
  ],
  "need attention": [
    "kangen kamu nih 🥺",
    "pen di-notice 👉👈",
    "chat aku dong 💭",
    "miss you so much 💔",
    "thinking of you 💭",
  ],
  playful: [
    "pen jail-in kamu nih 😋",
    "main game bareng yuk 🎮",
    "pen cuddle-an 🤗",
    "let's have fun together! 🎪",
    "bikin aku ketawa terus 😆",
  ],
  romantic: [
    "you're my soulmate 💑",
    "always falling for you 💘",
    "my heart is yours 💖",
    "forever and always 💕",
    "can't live without you 🥰",
  ],
};

const LoveExpression: React.FC = () => {
  const [customMessage, setCustomMessage] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const sendToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6285155222564?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    const randomMessage =
      moodMessages[mood][Math.floor(Math.random() * moodMessages[mood].length)];
    sendToWhatsApp(randomMessage);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          onClick={() => router.push("/")}
        >
          ← Kembali
        </Button>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-pink-600">
            love expression hub 💝
          </h1>
          <p className="text-pink-400">
            pilih pesan yang mau kamu kirim ke aku ya sayang 🥰
          </p>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-pink-50">
            <TabsTrigger value="messages">express love 💌</TabsTrigger>
            <TabsTrigger value="special">special msgs 🎉</TabsTrigger>
            <TabsTrigger value="mood">my mood 🌟</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card className="p-4">
              <div className="mb-6">
                <Input
                  placeholder="tulis pesan kamu sendiri disini..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={() => customMessage && sendToWhatsApp(customMessage)}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={!customMessage}
                >
                  kirim pesan kamu 💌
                </Button>
              </div>

              <div className="space-y-6">
                {messageCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <category.icon className="w-5 h-5 text-pink-600" />
                      <h2 className="font-medium text-pink-600">
                        {category.label}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.messages.map((message, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 text-left hover:bg-pink-50"
                          onClick={() => sendToWhatsApp(message)}
                        >
                          {message}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="special">
            <Card className="p-4">
              <div className="space-y-6">
                {specialMessages.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <category.icon className="w-5 h-5 text-pink-600" />
                      <h2 className="font-medium text-pink-600">
                        {category.label}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.messages.map((message, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 text-left hover:bg-pink-50"
                          onClick={() => sendToWhatsApp(message)}
                        >
                          {message}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mood">
            <Card className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(moodMessages).map(([mood]) => (
                  <Button
                    key={mood}
                    variant="outline"
                    className={`h-auto p-4 text-center hover:bg-pink-50 ${
                      selectedMood === mood ? "bg-pink-100" : ""
                    }`}
                    onClick={() => handleMoodSelect(mood as MoodType)}
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoveExpression;
