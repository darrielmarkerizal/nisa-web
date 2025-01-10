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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  Calendar as CalendarIcon,
  Smile,
  Moon,
  ActivitySquare,
} from "lucide-react";
import { id } from "date-fns/locale";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

interface reddaySymptom {
  name: string;
  description: string;
  tips: string[];
}

interface MoodEntry {
  emoji: string;
  label: string;
  description: string;
}

interface PMSSymptom {
  id: string;
  category: "physical" | "emotional" | "behavioral";
  name: string;
  description: string;
  intensity: number;
}

const initialPMSSymptoms: PMSSymptom[] = [
  {
    id: "headache",
    category: "physical",
    name: "pusing pusinggg",
    description: "kepalaku berputar-putarr 😵‍💫",
    intensity: 0,
  },
  {
    id: "bloating",
    category: "physical",
    name: "kembungg parahh",
    description: "perutku kaya balonnn 🎈",
    intensity: 0,
  },
  {
    id: "fatigue",
    category: "physical",
    name: "capek bangetttt",
    description: "pen tiduran ajaa nihh 😴",
    intensity: 0,
  },
  {
    id: "mood_swings",
    category: "emotional",
    name: "mood swingsss",
    description: "mood naik turun kaya rollercoaster 🎢",
    intensity: 0,
  },
  {
    id: "anxiety",
    category: "emotional",
    name: "cemasss",
    description: "khawatir meluluu nihh 🥺",
    intensity: 0,
  },
  {
    id: "irritability",
    category: "behavioral",
    name: "gampang btt",
    description: "everything annoying bgttt 😤",
    intensity: 0,
  },
];

const symptoms: reddaySymptom[] = [
  {
    name: "kram perutt",
    description: "sakit perut bagian bawahh sakitt bgttt 😭",
    tips: [
      "kompres perut pake air anget biar ga trllu nyeri yaa sayangkuuu 🥺",
      "minum air putih yg banyakk!! aku gamau km dehidrasi 💗",
      "stretching dikit'' aja yaa, jgn yg berat'' 🤗",
      "hindarin kafein dulu yaa beibii, ntr tambah sakit 😘",
      "makan coklat dikit gpp kok hehe, tp jgn kebanyakan yaa 🍫",
    ],
  },
  {
    name: "mood swingsss",
    description: "baper moodyyy bgt hari inii 😤",
    tips: [
      "istirahatt yg cukupp yaa sayangkuuu 🥺",
      "coba dengerin playlist favoritmu sambil rebahan 🎵",
      "chat aku klo lg btt, aku siap dengerin curhatan km 💌",
      "makan snack kesukaan kamuu, tp inget jgn overr 🍪",
    ],
  },
  {
    name: "pusing & lemes",
    description: "kepala puyeng dan badan lemes bgttt 😫",
    tips: [
      "tidurr yg cukuppp sayangku, minimal 7-8 jam yaa 😴",
      "makan yg bergizi sama buah'' segerr 🍎",
      "minum teh anget, tp jgn yg ada kafeinnya yaa 🫖",
      "jangan skip makan!! ntr makin pusinggg 🍚",
    ],
  },
  {
    name: "jerawatann",
    description: "muka breakout parahh 😭",
    tips: [
      "cuci muka 2x sehari ajaa, jgn kebanyakan 🧴",
      "pake skincare yg lembut yaaa 💆‍♀️",
      "jangan stress in ini yaa, ntr tambah parah 🥺",
      "makan sayur & buah yg banyak vitamin c yaa 🥗",
    ],
  },
  {
    name: "nafsu makan berubahh",
    description: "kadang laper bgt, kadang gak nafsu makan 😫",
    tips: [
      "makan porsi kecil tp seringg yaa sayangku 🍱",
      "pilih makanan yg bergizi & gampang dicerna 🥗",
      "jangan lupa snackss sehat buat energi 🍎",
      "minum teh jahe anget bisa bantuu 🫖",
    ],
  },
  {
    name: "sakit punggunggg",
    description: "pinggangku nyeri bgttt 😭",
    tips: [
      "stretching pelan'' aja yaa sayangg 🧘‍♀️",
      "tidur pake bantal di bawah lutut biar nyaman 🛏️",
      "minta tolong aku pijetin kalo ketemu 🫂",
      "pake koyo hangat bolehh kok 💝",
    ],
  },
  {
    name: "susah tidurr",
    description: "gabisa tidur padahal capek bgttt 😪",
    tips: [
      "dengerin playlist favorit yg slow'' 🎵",
      "hindarin layar hp 1 jam sblm tidur yaa 📱",
      "minum susu anget sebelum bobo 🥛",
      "coba meditation app yg aku rekomend 🧘‍♀️",
    ],
  },
  {
    name: "gampang nangiss",
    description: "nangis mulu hari iniii 🥺",
    tips: [
      "its okay to cry sayanggg, let it outt 💗",
      "dengerin lagu happy biar mood naik 🎵",
      "cerita ke aku kalo butuh temen curhat 💌",
      "nonton film lucu kesukaan kamu 🎬",
    ],
  },
  {
    name: "bloating",
    description: "perut kembung & ga nyamann 😣",
    tips: [
      "hindari makanan yg berminyak duluuu 🍔",
      "makan perlahan & kunyah yg lamaa 🍚",
      "jalan'' santai bisa bantu perut ga kembung 🚶‍♀️",
      "pake celana yg longgar & nyaman yaa 👖",
    ],
  },
  {
    name: "pusing migrain",
    description: "kepala sebelah sakit parahh 😵",
    tips: [
      "istirahat di tempat gelap & tenang yaa 🌙",
      "kompres dingin di kepala bisa bantu 🧊",
      "coba pijat pelipis pelan'' aja 💆‍♀️",
      "kalo udh parah minum obat ya sayanggg 💊",
    ],
  },
];

const sweetMessages = [
  "kamu lagi ga enak badan ya? aku disini temenin kamu terus kok sayanggg 🥺",
  "jangan lupa minum air putih yaa cintakuuu, aku gamau km sakit 💗",
  "kalo butuh apa'' bilang aku ya! aku siap bantuin kamu kapanpun 🫂",
  "semangatt sayangkuuu! kamu kuat bgt tau gak sihh 💪",
  "jangan lupa makan ya beibii, mau aku ingetin terus kok 🍚",
  "istirahat yg cukup yaa cintakuu, jangan begadang!! 😴",
  "aku bangga bgt sama kamuu, kamu kuat bgt tau gaaak 🥺",
  "jangan lupa senyumm yaa, kamu cantik bgt klo senyumm 💝",
  "kangen pegangan tangan sama kamuuu 🫂",
  "boleh ga rangkul kamu sambil nonton film? 🎬",
];

const moods: MoodEntry[] = [
  { emoji: "🥰", label: "happy bgttt", description: "lagi seneng bgt nihh" },
  { emoji: "😔", label: "sedihh", description: "butuh supportt nihh" },
  { emoji: "😤", label: "btt", description: "btw semuanya nyebelinn" },
  { emoji: "🥱", label: "capek", description: "pengen tidurr ajaa" },
  { emoji: "🤒", label: "sakitt", description: "ga enakk badann" },
  { emoji: "🥺", label: "manja", description: "pen di sayang''in" },
  { emoji: "😋", label: "laperr", description: "pengen ngemil terus" },
  { emoji: "😌", label: "tenang", description: "damai bgt hari ini" },
  { emoji: "🥹", label: "terharu", description: "pen nangis tapi bahagia" },
  { emoji: "🫠", label: "overwhelmed", description: "banyak bgt yg dipikirin" },
  { emoji: "🫂", label: "butuh pelukan", description: "kangen dipeluk kamu" },
  { emoji: "🦋", label: "peaceful", description: "hatiku adem bgt" },
  { emoji: "🎭", label: "drama queen", description: "lagi pengen dramatis" },
  { emoji: "🫡", label: "strong", description: "aku kuatt hari inii" },
  { emoji: "🧸", label: "baby mood", description: "pen dimanja''in" },
  { emoji: "🌸", label: "blooming", description: "cantik & fresh bgttt" },
];

const ReddayTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [reddayEndDate, setreddayEndDate] = useState<Date | undefined>();
  const [nextredday, setNextredday] = useState<Date | undefined>();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const [pmsSymptoms, setPMSSymptoms] =
    useState<PMSSymptom[]>(initialPMSSymptoms);
  const [pmsProbability, setPMSProbability] = useState<number>(0);

  useEffect(() => {
    if (selectedDate) {
      const next = new Date(selectedDate);
      next.setDate(next.getDate() + 28);
      setNextredday(next);

      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 5);
      setreddayEndDate(endDate);
    }
  }, [selectedDate]);

  const calculatePMSProbability = () => {
    const totalIntensity = pmsSymptoms.reduce(
      (sum, symptom) => sum + symptom.intensity,
      0
    );
    const maxPossibleIntensity = pmsSymptoms.length * 100;
    const probability = (totalIntensity / maxPossibleIntensity) * 100;
    setPMSProbability(Math.round(probability));
  };

  const handleSymptomChange = (symptomId: string, newIntensity: number) => {
    setPMSSymptoms((prevSymptoms) =>
      prevSymptoms.map((symptom) =>
        symptom.id === symptomId
          ? { ...symptom, intensity: newIntensity }
          : symptom
      )
    );
  };

  useEffect(() => {
    calculatePMSProbability();
  }, [pmsSymptoms, calculatePMSProbability]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
              redday tracker sayangkuu 💗
            </h1>
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-pink-400">aku pengen jagain kamu terus!! 🥺💝</p>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-pink-50 p-1">
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              kalender
            </TabsTrigger>
            <TabsTrigger
              value="symptoms"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              gejala & tips
            </TabsTrigger>
            <TabsTrigger
              value="mood"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              mood
            </TabsTrigger>
            <TabsTrigger
              value="pms"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              tracking PMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  kalender redday 📅
                </h2>
              </div>

              <Alert className="mb-4 bg-pink-50">
                <AlertDescription>
                  cara pakenya:
                  <br />• klik tanggal pertama kamu dapet redday yaa 📅
                  <br />• nanti aku prediksi redday kamu selanjutnya 💗
                  <br />• kamu bisa track mood & gejala di tab lain 🥰
                </AlertDescription>
              </Alert>

              <div className="flex flex-col items-center gap-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-pink-100"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium text-pink-600",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-pink-50",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-pink-500 rounded-md w-8 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-pink-50",
                    day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-pink-50 hover:text-pink-600",
                    day_selected:
                      "bg-pink-500 text-white hover:bg-pink-600 hover:text-white focus:bg-pink-500 focus:text-white",
                    day_today: "bg-pink-100 text-pink-600",
                    day_outside: "text-pink-300 opacity-50",
                    day_disabled: "text-pink-300 opacity-50",
                    day_range_middle:
                      "aria-selected:bg-pink-50 aria-selected:text-pink-600",
                    day_hidden: "invisible",
                  }}
                />
                {selectedDate && reddayEndDate && nextredday && (
                  <Card className="w-full p-6 bg-pink-50">
                    <div className="space-y-4">
                      {/* Current redday Display */}
                      <div className="text-center">
                        <p className="text-lg font-medium text-pink-600 mb-1">
                          redday kamu sekarang 🌸
                        </p>
                        <p className="text-pink-500">
                          {formatDate(selectedDate)} -{" "}
                          {formatDate(reddayEndDate)}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-pink-200 w-full" />

                      {/* Next redday Prediction */}
                      <div className="text-center">
                        <p className="text-lg font-medium text-pink-600 mb-1">
                          prediksi redday selanjutnya 🗓️
                        </p>
                        <p className="text-pink-500">
                          {formatDate(nextredday)}
                        </p>
                      </div>
                    </div>
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
                  gejala & tips buat kamu 💝
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
                  mood kamu hari ini? 🥺
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

          <TabsContent value="pms">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ActivitySquare className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  tracking pms sayangkuuu 🥺💗
                </h2>
              </div>

              <Alert className="mb-6 bg-pink-50">
                <AlertDescription>
                  geser slider sesuai sama apa yang kamu rasain yaa sayangkuu 🥺
                  aku mau bantuin kamu tracking gejala pms kamu 💝
                </AlertDescription>
              </Alert>

              <div className="space-y-8">
                {/* PMS Probability Indicator */}
                <Card className="p-4 bg-pink-50">
                  <h3 className="text-lg font-medium text-pink-600 mb-2">
                    kemungkinan pms kamu sayangg
                  </h3>
                  <Progress value={pmsProbability} className="h-2 mb-2" />
                  <p className="text-pink-500 text-sm">
                    {pmsProbability < 30
                      ? "gejalanya masih ringann kok sayanggg 🌸"
                      : pmsProbability < 70
                        ? "gejalanya lumayan yaa.. semangatt!! 💪"
                        : "gejalanya kuat bgt yaa.. aku disini temenin kamu terus kok 🥺💝"}{" "}
                    ({pmsProbability}%)
                  </p>
                  <p className="text-pink-400 text-sm mt-2">
                    {
                      sweetMessages[
                        Math.floor(Math.random() * sweetMessages.length)
                      ]
                    }
                  </p>
                </Card>

                {/* Symptoms by Category */}
                {["physical", "emotional", "behavioral"].map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium text-pink-600 capitalize">
                      {category === "physical"
                        ? "gejala fisik kamu 🤒"
                        : category === "emotional"
                          ? "perasaan kamu 🥺"
                          : "tingkah laku kamu 💗"}
                    </h3>
                    <div className="space-y-6">
                      {pmsSymptoms
                        .filter((symptom) => symptom.category === category)
                        .map((symptom) => (
                          <div key={symptom.id} className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-pink-600">
                                {symptom.name}
                              </label>
                              <span className="text-pink-400">
                                {symptom.intensity}% 🥺
                              </span>
                            </div>
                            <Slider
                              defaultValue={[symptom.intensity]}
                              max={100}
                              step={1}
                              className="w-full"
                              onValueChange={([value]) =>
                                handleSymptomChange(symptom.id, value)
                              }
                            />
                            <p className="text-sm text-pink-400">
                              {symptom.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showMessage} onOpenChange={setShowMessage}>
          <DialogContent className="max-w-[95%] sm:max-w-md bg-white rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-pink-600">
                pesan spesial buat kamu 💌
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-pink-500 p-4">{currentMessage}</p>
            <Button
              variant="outline"
              onClick={() => setShowMessage(false)}
              className="w-full mt-4"
            >
              makasiii sayanggg 🥺💗
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReddayTracker;
