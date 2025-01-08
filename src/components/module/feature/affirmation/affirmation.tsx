"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, RefreshCcw } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type MoodAffirmation = {
    mood: string;
    emoji: string;
    affirmations: string[];
};

const moodAffirmations: MoodAffirmation[] = [
    {
        mood: "Lagi Happy",
        emoji: "🥰",
        affirmations: [
            "AAAAAAA SENYUM KAMUU GEMESIN BANGETTTT SAYANGKUHHH! ✨",
            "Kamu tuhh literal sunshinee akuuu! naur serius dehh! 🌞",
            "SUMPAH DEHH kamu happy tuh bikin aku auto happy jugaaa! 💝",
        ]
    },
    {
        mood: "Lagi Sedih",
        emoji: "🥺",
        affirmations: [
            "Ayanggg jangan sedih donggg, aku disini temenin terusss kokk! 💝",
            "IHHHH JANGAN SEDIH DONGGG, aku sayang bangetttt sama kamuuu! 🫂",
            "Besok pasti better kokkk sayangkuhhh, aku ga akan tinggalin kamuu! 💕",
        ]
    },
    {
        mood: "Kangen",
        emoji: "💘",
        affirmations: [
            "AAAAA AKU JUGA KANGEN BANGETTT SAMA KAMUUU SAYANGGG! 💝",
            "Pengen quality time sama bebeb akuuu yang paling lucu seduniaa! 🥺",
            "SUMPAH KANGENNYA UDAH GAK KETULUNGANN NIHH! 💖",
        ]
    },
    {
        mood: "Capek",
        emoji: "😴",
        affirmations: [
            "Istirahat dulu ya bebekkuu, jgn lupa minum air putih okayy! 💆‍♀️",
            "PROUD BGT sama kamu udah kerja keras hari inii! virtual pat pat! 🌙",
            "Sini sini aku pengen manjain kamu terus deh pokoknyaa! 💝",
        ]
    },
    {
        mood: "Semangat",
        emoji: "💪",
        affirmations: [
            "GASKEUN BEBEKKK! literally so proud of youuu! ⭐",
            "Bismillah dulu ya sayangg, aku support 1000% deh pokoknyaa! 🚀",
            "AAAAA KEREN BGT SIH SEMANGATNYAA! auto makin sayang! 💫",
        ]
    },
    {
        mood: "Overthinking",
        emoji: "😰",
        affirmations: [
            "Deep breath ya sayangkuhhh, ada aku yang selalu support kamuuu 🌸",
            "Jangan overthinking bebekkk, everything's gonna be okayy! 🙏",
            "PASTI BISAA LEWATIN INI SEMUAA! aku percaya bgt sama kamu! 💕",
        ]
    },
    {
        mood: "Mager",
        emoji: "🦥",
        affirmations: [
            "Santuy aja dulu sayangkuhhh, tapi nanti semangat lagi yaa! 😘",
            "MAGER MAGER GINI JUGA TETEP GEMESIN BANGETT SIHHH! 💝",
            "Yuk bisa yukk bebebb, dikit dikit lama lama jadi bukit! 💪",
        ]
    },
    {
        mood: "Lagi Bete",
        emoji: "😤",
        affirmations: [
            "GAPAPA BETEE, tapi inget ya kamu tetep number 1 di hati akuu! 💫",
            "Betenya gausah lama-lama ya sayangkuhh, nanti aku sedih! ✨",
            "AKU BAKAL SELALU ADA BUAT SUPPORT KAMUUU! fr fr! 💝",
        ]
    },
    {
        mood: "Lagi Stress",
        emoji: "😫",
        affirmations: [
            "This too shall pass bebekkuu, kamu tuh kuat bgttt! 💪",
            "JANGAN LUPA BREAK YAA KALO CAPEK! aku khawatir! 🌸",
            "BANGGA BGT sama kamu yang tetep strong! literally my hero! ⭐",
        ]
    },
    {
        mood: "Excited",
        emoji: "🤩",
        affirmations: [
            "AAAAA AKU IKUTAN EXCITED BANGETTT! can't wait! ✨",
            "SUMPAH SENENG BGT LIAT KAMU HAPPY GINII! 💫",
            "YUHUUU! mari kita celebrate bareng-bareng nantiiii! 🎉",
        ]
    },
    {
        mood: "Gabut",
        emoji: "🥱",
        affirmations: [
            "Spill aja ke aku gmn hari kamuu, biar ga gabut! 💭",
            "GABUTTT? sini aku temenin sampe ga gabut lagii! 💝",
            "Me time aja dulu ya sayanggg, treat yourself! ⭐",
        ]
    },
    {
        mood: "Anxious",
        emoji: "😨",
        affirmations: [
            "Deep breaths bebekkk, ada aku disini buat support terusss! 💫",
            "YOU'RE NOT ALONE! aku selalu ada buat kamuuu! 🌟",
            "KAMU PASTI BISAAA! aku percaya bgt sama kamuu! 🙏",
        ]
    },
    {
        mood: "Unmotivated",
        emoji: "😮‍💨",
        affirmations: [
            "Take your time sayanggg, no pressure! aku ngerti kok! 🌸",
            "KAMU UDAH KEREN BANGETT TAU GASIHH! proud of you! ⭐",
            "Break dulu gapapa, tapi jangan give up ya bebekkk! 💪",
        ]
    },
    {
        mood: "Proud",
        emoji: "🥳",
        affirmations: [
            "AAAAA AKU JUGA PROUD BANGET SAMA KAMUUU! 🎉",
            "KEREN BANGETTTT SIHH! keep slaying sayanggg! ⭐",
            "Prestasi kamu bikin aku makin falling in love! 💝",
        ]
    },
    {
        mood: "Bingung",
        emoji: "😵‍💫",
        affirmations: [
            "Calm down dulu ya bebekkk, kita pikirin step by step! 💭",
            "BINGUNG? spill aja ke aku sayanggg! 🌟",
            "KITA CARI SOLUSINYA BARENG-BARENG YA CANTIKKK! 💫",
        ]
    },
    {
        mood: "Frustrated",
        emoji: "😤",
        affirmations: [
            "SABAR YA SAYANGGG, pasti ada jalan keluarnyaa! 🙏",
            "YOU GOT THIS BEBEKKK! aku yakin bangett! 💫",
            "JANGAN NYERAHH! aku support kamu 1000%! 💪",
        ]
    },
    {
        mood: "Nervous",
        emoji: "😰",
        affirmations: [
            "TENANG BEBEKKK! kamu udah prepared bangett kok! ⭐",
            "DEEP BREATH YA SAYANGGG! aku hold tangan kamu! 🌟",
            "AKU SELALU SUPPORT KAMUUU! you got this bb! 💝",
        ]
    },
    {
        mood: "Grateful",
        emoji: "🥺",
        affirmations: [
            "AAAAA AKU JUGA GRATEFUL BANGET ADA KAMUUU! 💝",
            "Kamu tuh literally the best blessing ever! ✨",
            "MAKASIH YA UDAH JADI KAMU YANG SEKARANGG! auto sayang! 💫",
        ]
    },
    {
        mood: "Optimistic",
        emoji: "🌟",
        affirmations: [
            "POSITIVE VIBES KAMUU TUH CONTAGIOUS BANGETT! ✨",
            "AAAAA SENENG BGT LIAT KAMU OPTIMIS GINII! 💫",
            "KEEP SHINING YA SAYANGKUHH! you're literally glowing! 💝",
        ]
    },
    {
        mood: "Motivated",
        emoji: "🔥",
        affirmations: [
            "GASS TERUS BEBEKKK! aku support sampe finish line! 💪",
            "AAAAA SEMANGAT KAMU TUH BIKIN AKU INSPIREDDD! ⭐",
            "KEREN BANGETTT MOTIVENYA! literally can't stop won't stop! 🚀",
        ]
    },
    {
        mood: "Relaxed",
        emoji: "😌",
        affirmations: [
            "IYAA GITU DONNGG! self care is important sayanggg! 💆‍♀️",
            "Quality time sama diri sendiri emang the besttt! ⭐",
            "JANGAN LUPA ISTIRAHAT YG CUKUP YAA BB! aku khawatir! 💝",
        ]
    },
    {
        mood: "Insecure",
        emoji: "🥺",
        affirmations: [
            "KAMU TUH LEBIH DARI CUKUP TAUUU! literally perfect! 💫",
            "AKU SUKA KAMU APA ADANYAA! no cap fr! 💝",
            "YOU'RE SPECIAL BANGET DI MATA AKUU! gaslight? never! ⭐",
        ]
    },
    {
        mood: "Ambitious",
        emoji: "🎯",
        affirmations: [
            "AAAAA KAMU PASTI BISA RAIH SEMUANYAA! claim it! 🚀",
            "SEMANGAT PURSUING YOUR DREAMS BB! so proud! ⭐",
            "KEEP DREAMING BIG SAYANGKUHH! the sky is ur limit! 💫",
        ]
    },
    {
        mood: "Peaceful",
        emoji: "🕊️",
        affirmations: [
            "PEACEFUL BANGET YAA MOOD KAMUU! love this for you! 💫",
            "MOMENT TENANG GINI TUH PERLU BANGETT! deserve! ✨",
            "JAGA INNER PEACE YA SAYANGGG! you deserve this sm! 🌸",
        ]
    },
    {
        mood: "Creative",
        emoji: "🎨",
        affirmations: [
            "IDEA KAMU TUH OUT OF THE BOX BANGETT! genius fr! ✨",
            "KEEP EXPLORING YA SAYANGKUHH! ur mind is powerful! 💫",
            "KREATIVITAS KAMU TUH UNLIMITED FR FR! so proud! 🌟",
        ]
    },
    {
        mood: "Playful",
        emoji: "🤪",
        affirmations: [
            "GEMESIN BANGETTTT KALO LAGI HAPPY GINII! 💝",
            "MOOD KAMU TUH BIKIN AKU HAPPY TERUSSS! infectious! ✨",
            "JANGAN BERUBAH YA BB! stay fun like this forever! 💫",
        ]
    },
    {
        mood: "Focused",
        emoji: "🎯",
        affirmations: [
            "KEREN BANGET FOKUSNYAA! in the zone banget! 💪",
            "SEMANGAT YA NGERJAIN TARGETNYAA! you got this! 🚀",
            "BANGGA BGT LIAT KAMU SERIUS GINII! main character energy! ⭐",
        ]
    },
    {
        mood: "Thankful",
        emoji: "🙏",
        affirmations: [
            "AAAAA AKU JUGA THANKFUL BANGET SAMA KAMUUU! 💝",
            "MAKASIH YA UDAH JADI BLESSING BANGET! grateful fr! ✨",
            "BERUNTUNG BANGET BISA KENAL KAMUUU! literally blessed! 💫",
        ]
    },
    {
        mood: "Blessed",
        emoji: "✨",
        affirmations: [
            "KAMU TUH LITERALLY BERKAH TERINDAHH! 💝",
            "ALHAMDULILLAH YA SAYANGGG! grateful always! 🙏",
            "SEMOGA BERKAH TERUS YA KEHIDUPANMUU! manifesting! 💫",
        ]
    },
    {
        mood: "Determined",
        emoji: "💯",
        affirmations: [
            "GASKEUN TARGETNYAA! aku support full! 🎯",
            "KAMU PASTI BISA ACHIEVE SEMUANYAA! claim it! 💪",
            "TEKAD KAMU TUH BIKIN AKU MAKIN KAGUMM! proud af! ⭐",
        ]
    },
    {
        mood: "Lagi Mikir",
        emoji: "🤔",
        affirmations: [
            "JANGAN DIPIKIR SENDIRIANN! aku siap dengerin! 💭",
            "AKU SIAP JADI TEMPAT SHARING KAMUUU! spill tea bb! 💫",
            "KITA PIKIRIN BARENG-BARENG YA SAYANGGG! gotchu! ⭐",
        ]
    },
    {
        mood: "Hopeful",
        emoji: "🌈",
        affirmations: [
            "MANIFESTING YANG TERBAIK YA SAYANGGG! claim it! ✨",
            "MASA DEPAN KAMU TUH BRIGHT BANGETTT! fr fr! 💫",
            "KEEP BELIEVING IN YOURSELF BB! you're that girl! 🌟",
        ]
    },
    {
        mood: "Content",
        emoji: "😊",
        affirmations: [
            "AAAAA SENENG BGT LIAT KAMU BAHAGIAA! deserved! 💝",
            "STAY HAPPY TERUS YA SAYANGKUHH! love this for you! ✨",
            "SENYUM KAMU TUH BIKIN DUNIA LEBIH INDAHH! no cap! 💫",
        ]
    },
    {
        mood: "Productive",
        emoji: "📝",
        affirmations: [
            "SLAYY PRODUKTIFNYAA! getting things done purr! 💪",
            "KEEP UP THE GOOD WORK YA SAYANGGG! literally so proud! ⭐",
            "BANGGA BGT LIAT KAMU SEMANGAT GINII! main character energy! 🚀",
        ]
    },
    {
        mood: "Nostalgic",
        emoji: "🌙",
        affirmations: [
            "MEMORIES KITA TUH SPECIAL BANGET YAAA! precious fr! 💫",
            "AAAAA INGET GA SIH MASA-MASA INDAH KITAA? miss those times! 💝",
            "BERUNTUNG BANGET BISA PUNYA KENANGAN SM KAMUUU! blessed! ✨",
        ]
    },
    {
        mood: "Resilient",
        emoji: "🦾",
        affirmations: [
            "KAMU TUH STRONG BANGET TAUUU! literally my inspiration! 💪",
            "BANGGA BGT LIAT KAMU TETEP KUATT! you're built different! ⭐",
            "KEEP FIGHTING YA SAYANGKUHH! never give up! 💫",
        ]
    },
    {
        mood: "Confident",
        emoji: "💁‍♀️",
        affirmations: [
            "SLAYYY QUEEEN! confidence kamu goals bangett! ⭐",
            "YASSS SERVE CAKES BEBEK! proud of youuu! 💫",
            "AUTO MAKIN SAYANG KALO KAMU PD GINIII! that's my baby! 💝",
        ]
    }
];



const DailyLoveScreen = () => {
    const [selectedMood, setSelectedMood] = useState<MoodAffirmation | null>(null);
    const [currentAffirmation, setCurrentAffirmation] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(moodAffirmations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMoods = moodAffirmations.slice(startIndex, endIndex);

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
                        kata-kata sayang buat kamu 💝
                    </h1>
                    <p className="text-pink-400">
                        pilih mood kamu hari ini ya sayangkuu!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentMoods.map((mood) => (
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

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {Array.from({length: totalPages}).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === i + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(i + 1);
                                    }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

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