"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

type PrayerTime = "Subuh" | "Dzuhur" | "Ashar" | "Maghrib" | "Isya";
type MoodOption = {
    emoji: string;
    text: string;
};

const getCurrentPrayer = (): PrayerTime => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return "Subuh";
    if (hour >= 12 && hour < 15) return "Dzuhur";
    if (hour >= 15 && hour < 18) return "Ashar";
    if (hour >= 18 && hour < 19) return "Maghrib";
    return "Isya";
};

const SplashScreen: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [mood, setMood] = useState<string>("");
    const [prayed, setPrayed] = useState<boolean | null>(null);
    const [showResponse, setShowResponse] = useState(false);
    const currentPrayer = getCurrentPrayer();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const moodOptions: MoodOption[] = [
        { emoji: "🥰", text: "in love sama kamuu" },
        { emoji: "😴", text: "ngantuk nihh" },
        { emoji: "😢", text: "sedih nihh" },
        { emoji: "😤", text: "sebel nihh" },
        { emoji: "😔", text: "demot nihh" },
        { emoji: "🥺", text: "kangen kamuu" },
        { emoji: "🤗", text: "semangat belajar" },
        { emoji: "🎮", text: "main game nihh" },
        { emoji: "🥳", text: "lagi semangat" },
        { emoji: "😌", text: "tenang banget" },
        { emoji: "🤔", text: "lagi bingung" },
        { emoji: "😋", text: "laper nihh" },
        { emoji: "😇", text: "alhamdulillah" },
        { emoji: "🤩", text: "excited banget" },
        { emoji: "😪", text: "capek bangett" },
        { emoji: "🤒", text: "lagi sakit nihh" },
        { emoji: "📚", text: "lagi belajar" },
        { emoji: "🥱", text: "ngantuk bangett" },
        { emoji: "😭", text: "sedih banget" },
        { emoji: "🤪", text: "lagi kocak nihh" },
        { emoji: "😅", text: "agak malu nihh" },
        { emoji: "🎵", text: "dengerin musik" },
        { emoji: "🤯", text: "pusing banget" },
        { emoji: "😱", text: "kaget nihh" },
        { emoji: "🥴", text: "puyeng nihh" },
        { emoji: "📱", text: "main sosmed" },
        { emoji: "🤓", text: "fokus belajar" },
        { emoji: "😎", text: "keren abis" },
        { emoji: "🙏", text: "bersyukur" },
    ];

    const totalPages = Math.ceil(moodOptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMoods = moodOptions.slice(startIndex, endIndex);

    const getMoodResponse = () => {
        if (!mood || prayed === null) return "";

        const responses: Record<string, string> = {
            "happy banget nihh":
                "yaampunn baby lagi happy! aku ikut seneng bangett 🥰",
            "in love sama kamuu": "aaaaa makasih ya sayangku, love you too! 💝",
            "ngantuk nihh": "istirahatt yaa babyyy, jangan lupa berdoa dulu 😴",
            "sedih nihh":
                "cup cup sayangku, ada aku disini siap dengerin cerita kamu 🫂",
            "sebel nihh":
                "sabar ya sayangku, cerita dong sama aku kenapa sebelnya 🫂",
            "demot nihh":
                "semangat babyyy! ingat kata-kata motivasi dari aku: kamu kuat, kamu hebat! 💪",
            "kangen kamuu": "akuu juga kangen sama kamuu sayangg 💝",
            "semangat belajar":
                "wahhh kereen! terus semangat belajarnya yaa 📚",
            "main game nihh":
                "have fun mainnya! tapi inget jangan lupa waktu yaa 🎮",
            "lagi semangat":
                "aku suka liat kamu semangat! jadi ikutan semangat juga 🌟",
            "tenang banget":
                "alhamdulillah kalau kamu lagi tenang, jadi adem dengernya 😌",
            "lagi bingung":
                "kamu bisa cerita ke aku kalau ada yang bikin bingung 🤗",
            "laper nihh": "jangan lupa makan yang bergizi yaa sayangku 🍱",
            alhamdulillah: "masyaAllah, aku seneng denger kamu bersyukur 🙏",
            "excited banget":
                "wahh ada apa nih? cerita dong yang bikin excited 🤩",
            "capek bangett":
                "istirahat dulu ya sayang, jaga kesehatan selalu 💪",
            "lagi sakit nihh":
                "ya Allah semoga cepat sembuh ya sayang, jangan lupa minum obat 🤒",
            "lagi belajar": "semangat belajarnya! ingat ilmu itu cahaya 📚",
            "ngantuk bangett":
                "kalau udah selesai tugasnya boleh tidur, tapi jangan lupa ibadah 😴",
            "sedih banget":
                "kalau mau cerita aku siap dengerin, semoga hati kamu tenang ya 🫂",
            "lagi kocak nihh": "hehe seneng deh liat kamu happy 😄",
            "agak malu nihh":
                "gapapa malu-malu, yang penting tetep jadi diri sendiri ya 😊",
            "dengerin musik":
                "dengerin musik yang positif ya, yang bikin semangat 🎵",
            "pusing banget":
                "istirahat dulu sayang, jangan dipaksain kalau cape 😔",
            "kaget nihh": "tenang ya sayang, tarik nafas pelan-pelan 😱",
            "puyeng nihh":
                "istirahat sebentar ya, minum air putih yang banyak 🥴",
            "main sosmed": "jangan kebanyakan main sosmed ya, inget waktu 📱",
            "fokus belajar": "mantap! semangat belajarnya, kamu pasti bisa 💪",
            "keren abis": "memang keren! tapi tetep rendah hati ya 😎",
            bersyukur: "alhamdulillah, semoga berkah selalu ya sayang 🙏",
        };

        const prayerMessage = prayed
            ? "masyaallah udah sholat, aku makin sayang 🥰"
            : `hey bubuuu, jangan lupa sholat ${currentPrayer} yaa 💕`;

        return `${responses[mood]} ${prayerMessage}`;
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3;
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxVisiblePages) {
            const leftOffset = Math.floor(maxVisiblePages / 2);
            const rightOffset = maxVisiblePages - leftOffset - 1;

            if (currentPage <= leftOffset) {
                endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - rightOffset) {
                startPage = totalPages - maxVisiblePages + 1;
            } else {
                startPage = currentPage - leftOffset;
                endPage = currentPage + rightOffset;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === i}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i);
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (startPage > 1) {
            items.unshift(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        return items;
    };

    const renderMoodButtons = () => {
        if (isMobile && mood) {
            // On mobile, when mood is selected, only show the selected mood
            const selectedMood = moodOptions.find(
                (option) => option.text === mood
            );
            if (!selectedMood) return null;

            return (
                <Button
                    key={selectedMood.text}
                    variant="default"
                    className="h-14 text-base transition-all bg-pink-500 hover:bg-pink-600 flex items-center justify-center"
                    onClick={() => setMood(selectedMood.text)}
                >
                    <span className="text-xl mr-2">{selectedMood.emoji}</span>
                    <span className="text-sm">{selectedMood.text}</span>
                </Button>
            );
        }

        // On desktop or when no mood is selected, show all options
        return (
            <>
                {currentMoods.map((option) => (
                    <Button
                        key={option.text}
                        variant={mood === option.text ? "default" : "outline"}
                        className={cn(
                            "h-14 sm:h-16 md:h-20 text-base sm:text-lg transition-all",
                            "flex items-center justify-center",
                            mood === option.text
                                ? "bg-pink-500 hover:bg-pink-600"
                                : "hover:bg-pink-50"
                        )}
                        onClick={() => setMood(option.text)}
                    >
                        <span className="text-xl sm:text-2xl mr-2">
                            {option.emoji}
                        </span>
                        <span className="text-sm sm:text-base">
                            {option.text}
                        </span>
                    </Button>
                ))}
            </>
        );
    };

    const renderPrayerButtons = () => {
        if (isMobile && prayed !== null) {
            // On mobile, when prayer status is selected, only show the selected status
            return (
                <Button
                    className={cn(
                        "flex-1 h-12",
                        "bg-pink-500 hover:bg-pink-600"
                    )}
                    variant="default"
                >
                    {prayed ? "udah dong! 🥰" : "belum nih 🥺"}
                </Button>
            );
        }

        // On desktop or when no status is selected, show both options
        return (
            <>
                <Button
                    className={cn(
                        "flex-1 h-12 sm:h-14",
                        prayed
                            ? "bg-pink-500 hover:bg-pink-600"
                            : "hover:bg-pink-50"
                    )}
                    variant={prayed ? "default" : "outline"}
                    onClick={() => {
                        setPrayed(true);
                        setShowResponse(true);
                    }}
                >
                    udah dong! 🥰
                </Button>
                <Button
                    className={cn(
                        "flex-1 h-12 sm:h-14",
                        prayed === false
                            ? "bg-pink-500 hover:bg-pink-600"
                            : "hover:bg-pink-50"
                    )}
                    variant={prayed === false ? "default" : "outline"}
                    onClick={() => {
                        setPrayed(false);
                        setShowResponse(true);
                    }}
                >
                    belum nih 🥺
                </Button>
            </>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl p-0 border-0 bg-transparent shadow-none">
                <div className="w-full bg-white rounded-xl shadow-lg">
                    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
                        <div className="text-center space-y-2 md:space-y-3">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600">
                                hai sayangkuu 💖
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-pink-400">
                                gimana mood kamu hari ini?
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {renderMoodButtons()}
                        </div>

                        {(!isMobile || !mood) && (
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1)
                                                    setCurrentPage(
                                                        currentPage - 1
                                                    );
                                            }}
                                        />
                                    </PaginationItem>
                                    {renderPaginationItems()}
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages)
                                                    setCurrentPage(
                                                        currentPage + 1
                                                    );
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}

                        {mood && (
                            <div className="space-y-4">
                                <p className="text-center text-sm sm:text-base md:text-lg text-pink-500">
                                    udah sholat {currentPrayer} belum nih?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    {renderPrayerButtons()}
                                </div>
                            </div>
                        )}

                        {showResponse && (
                            <div className="space-y-4">
                                <div className="p-4 bg-pink-50 rounded-lg">
                                    <p className="text-center text-sm sm:text-base md:text-lg text-pink-600 font-medium">
                                        {getMoodResponse()}
                                    </p>
                                </div>

                                <Button
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    lanjut ke menu utama 💝
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SplashScreen;
