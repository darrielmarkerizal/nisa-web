"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Book, Clock, ArrowLeft, ArrowRight, X, Heart } from "lucide-react";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface SurahName {
  transliteration: {
    id: string;
  };
  translation: {
    id: string;
  };
}

interface Verse {
  number: {
    inSurah: number;
  };
  text: {
    arab: string;
  };
  translation: {
    id: string;
  };
}

interface Surah {
  number: number;
  name: SurahName;
  verses?: Verse[];
}

interface Dua {
  id: number;
  judul: string;
  latin: string;
  arab: string;
  terjemah: string;
}

const cities = [
  { value: "Yogyakarta", label: "Yogyakarta" },
  { value: "Kediri", label: "Kediri" },
  { value: "Jakarta", label: "Jakarta" },
];

const PrayerCompanion: React.FC = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("Yogyakarta");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [dailyDuas, setDailyDuas] = useState<Dua[]>([]);
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [isQuranDialogOpen, setIsQuranDialogOpen] = useState(false);
  const [isDuaDialogOpen, setIsDuaDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get<{
          data: {
            timings: PrayerTimes;
          };
        }>(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Indonesia&method=11`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    const fetchSurahs = async () => {
      try {
        const response = await axios.get<{
          data: Surah[];
        }>("https://api.quran.gading.dev/surah");
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };

    const fetchDuas = async () => {
      try {
        const response = await axios.get<Dua[]>(
          "https://open-api.my.id/api/doa"
        );
        setDailyDuas(response.data);
      } catch (error) {
        console.error("Error fetching duas:", error);
      }
    };

    fetchPrayerTimes();
    fetchSurahs();
    fetchDuas();
  }, [selectedCity]);

  const handleSurahClick = async (surahNumber: number) => {
    try {
      const response = await axios.get<{
        data: Surah;
      }>(`https://api.quran.gading.dev/surah/${surahNumber}`);
      setSelectedSurah(response.data.data);
      setIsQuranDialogOpen(true);
    } catch (error) {
      console.error("Error fetching surah details:", error);
    }
  };

  const handleDuaClick = (dua: Dua) => {
    setSelectedDua(dua);
    setIsDuaDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="hover:bg-pink-50 text-pink-600"
            onClick={() => router.push("/")}
          >
            ← Kembali
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
              Assalamualaikum Cintaku
            </h1>
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-pink-400">
            Semoga hari-harimu dipenuhi berkah dan kebaikan ❤️
          </p>
        </div>

        <Tabs defaultValue="prayer-times" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-pink-50 p-1">
            <TabsTrigger
              value="prayer-times"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Jadwal Sholat
            </TabsTrigger>
            <TabsTrigger
              value="quran"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Al-Quran
            </TabsTrigger>
            <TabsTrigger
              value="dua"
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              Doa Sehari-hari
            </TabsTrigger>
          </TabsList>

          {/* Prayer Times Tab */}
          <TabsContent value="prayer-times">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-pink-600" />
                  <h2 className="text-xl font-semibold text-pink-600">
                    Jadwal Sholat
                  </h2>
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Pilih Kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
                {prayerTimes &&
                  Object.entries(prayerTimes)
                    .filter(([name]) =>
                      ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(name)
                    )
                    .map(([name, time]) => (
                      <Card
                        key={name}
                        className="p-3 sm:p-4 text-center bg-pink-50"
                      >
                        <h3 className="font-medium text-pink-600">{name}</h3>
                        <p className="text-pink-500">{time}</p>
                      </Card>
                    ))}
              </div>
            </Card>
          </TabsContent>

          {/* Quran Tab */}
          <TabsContent value="quran">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  Al-Quran
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                {surahs.map((surah) => (
                  <Card
                    key={surah.number}
                    className="p-3 sm:p-4 hover:bg-pink-50 cursor-pointer transition-all"
                    onClick={() => handleSurahClick(surah.number)}
                  >
                    <h3 className="font-medium text-pink-600">
                      {surah.name.transliteration.id}
                    </h3>
                    <p className="text-sm text-pink-400">
                      {surah.name.translation.id}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Dua Tab */}
          <TabsContent value="dua">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-600">
                  Doa Sehari-hari
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                {dailyDuas.map((dua) => (
                  <Card
                    key={dua.id}
                    className="p-3 sm:p-4 hover:bg-pink-50 cursor-pointer transition-all"
                    onClick={() => handleDuaClick(dua)}
                  >
                    <h3 className="font-medium text-pink-600">{dua.judul}</h3>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quran Dialog */}
        <Dialog open={isQuranDialogOpen} onOpenChange={setIsQuranDialogOpen}>
          <DialogContent className="w-[95vw] sm:w-[85vw] h-[90vh] flex flex-col bg-white rounded-xl overflow-hidden">
            <DialogHeader className="p-4 flex-shrink-0">
              <DialogTitle className="text-center text-pink-600 text-lg sm:text-xl md:text-2xl font-semibold">
                {selectedSurah?.name?.transliteration?.id}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-hidden px-4">
              <ScrollArea className="h-full w-full rounded-md border">
                <div className="p-4 space-y-6">
                  {selectedSurah?.verses?.map((verse) => (
                    <div
                      key={verse.number.inSurah}
                      className="space-y-3 p-3 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      <span className="text-pink-500 font-medium text-sm sm:text-base block">
                        Ayat {verse.number.inSurah}
                      </span>
                      <p
                        dir="rtl"
                        className="text-right text-lg sm:text-xl md:text-2xl leading-relaxed"
                      >
                        {verse.text.arab}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {verse.translation.id}
                      </p>
                    </div>
                  ))}
                </div>
                <ScrollBar />
              </ScrollArea>
            </div>

            <div className="p-4 flex justify-between items-center gap-2 flex-shrink-0 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  selectedSurah && handleSurahClick(selectedSurah.number - 1)
                }
                disabled={selectedSurah?.number === 1}
                className="text-xs sm:text-sm flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Sebelumnya</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsQuranDialogOpen(false)}
                className="text-xs sm:text-sm flex items-center"
              >
                <X className="w-4 h-4 mr-1 sm:mr-2" />
                Tutup
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  selectedSurah && handleSurahClick(selectedSurah.number + 1)
                }
                disabled={selectedSurah?.number === 114}
                className="text-xs sm:text-sm flex items-center"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dua Dialog */}
        <Dialog open={isDuaDialogOpen} onOpenChange={setIsDuaDialogOpen}>
          <DialogContent className="max-w-[95%] sm:max-w-[85%] max-h-[90vh] flex flex-col bg-white rounded-xl p-4">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="text-center text-pink-600 text-lg sm:text-xl md:text-2xl font-semibold">
                {selectedDua?.judul}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 w-full rounded-md border my-4 min-h-0">
              <div className="p-4 space-y-8">
                <div className="text-center space-y-6">
                  <p className="text-right text-xl sm:text-2xl md:text-3xl leading-loose">
                    {selectedDua?.arab}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 italic leading-relaxed">
                    {selectedDua?.latin}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-pink-600 leading-relaxed">
                    {selectedDua?.terjemah}
                  </p>
                </div>
              </div>
              <ScrollBar />
            </ScrollArea>

            <div className="flex justify-center mt-2 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsDuaDialogOpen(false)}
                className="text-xs sm:text-sm flex items-center"
              >
                <X className="w-4 h-4 mr-1 sm:mr-2" />
                Tutup
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PrayerCompanion;
