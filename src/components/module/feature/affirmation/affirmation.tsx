"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, RefreshCcw } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

type MoodAffirmation = {
    mood: string;
    emoji: string;
    affirmations: string[];
};

const moodAffirmations: MoodAffirmation[] = [
    {
        "mood": "Lagi Happy",
        "emoji": "🥰",
        "affirmations": [
          "AAAAAAA SENYUM KAMUU GEMESIN BANGETTTT SAYANGKUHHH! ✨",
          "Kamu tuhh literal sunshinee akuuu! naur serius dehh! 🌞",
          "SUMPAH DEHH kamu happy tuh bikin aku auto happy jugaaa! 💝",
          "SENYUM KAMU = MOOD BOOSTER TERBAIK AKU! 💕",
          "Akuuu tuh liat kamu happy langsung semangat juga! 💫",
          "Kamu bahagia? Udah cukup bikin hariku perfect! 🥹",
          "Happy vibes kamu tuh kayak nyebar energi positif ke semua oranggg! 🌈",
          "Kamu tuh paket komplit, gemesin, lucu, ceria, bikin nagih! 🎁",
          "Akuuuu bangga banget liat kamu tetep ceriaa, love you so muchh! 😘",
          "Kamu itu alasan aku tetep senyum tiap hari~ 💖",
          "Pipi kamu tuh makin gemes kalo lagi happy giniii! 😍",
          "Plissss terus happy kayak gini yaaa, aku suka bangettt! 🥺",
          "Banyak banget alasan buat aku jatuh cinta, tapi senyum kamu nomer satu! 💯",
          "Liat kamu ketawa tuh rasanya aku udah menang lotre hidup! 😍",
          "You're my happy pill setiap hariii, serius dehh! 💊",
          "Ngelihat kamu ceria gini tuh auto bikin hati aku anget! 🔥",
          "Kamu tuh kayak sinar matahari pagi, cerahhh bikin fresh seharian! 🌄",
          "Aku tuh ga pernah bosen liat kamu happy, bikin canduu~ 🥰",
          "Jangan lupa, kamu happy tuh adalah kebahagiaan aku jugaaa! 💌",
          "OMG liat kamu bahagia gini tuh priceless banget buat akuuu~ 💎",
          "Stay happy yaa, karena dunia butuh vibes positif kayak kamu! 🌍",
          "Kamu tuh definisi cuteness overload, asli dehh! 🐣",
          "Terus happy yaa sayang, kamu tuh bikin hari aku selalu cerahhh! 🌼",
          "Happy kamu tuh bikin aku merasa jadi orang paling beruntung di dunia! 🏆",
          "Kayaknya aku harus nge-save senyum kamu biar bisa aku replay terus! 📼",
          "Plisss kalo happy jangan setengah-setengah, kasi full senyum dong! 😄",
          "Aku jadi pengen bikin komik tentang kamu, karna happy kamu tuh inspirasi aku! ✍️",
          "Liat kamu happy gini tuh, bikin aku merasa everything\'s gonna be okay! 🌟",
          "Bahagia kamu itu sumber energi aku buat hadapin hari-hari! ⚡",
          "Terus senyum yaa sayang, karna senyum kamu adalah semangat hidupku~ 💪"
        ]
    },
    {
        "mood": "Lagi Sedih",
        "emoji": "🥺",
        "affirmations": [
          "Ayanggg jangan sedih donggg, aku disini temenin terusss kokk! 💝",
          "IHHHH JANGAN SEDIH DONGGG, aku sayang bangetttt sama kamuuu! 🫂",
          "Besok pasti better kokkk sayangkuhhh, aku ga akan tinggalin kamuu! 💕",
          "Sedih boleh, tapi inget ya, aku selalu ada buat kamuuu! 🫶",
          "Kamu kuat bangettt, aku bangga punya kamu sayangg! 💪",
          "Meskipun sekarang lagi berat, kita jalanin bareng-bareng yaaa! 🚶‍♀️",
          "Ayo sini pukpukk duluu, biar sedihnya pelan-pelan ilang~ 🤗",
          "Kamu tuh berharga banget, jadi jangan ngerasa sendirian yaaa! 🌟",
          "Aku tahu kamu capek, tapi aku bakal terus support kamu! 💖",
          "Ga usah mikir sendirian, ada aku kok buat bantu kamu lewat ini semua! 💬",
          "Hari ini emang lagi berat, tapi aku yakin kamu bakal bisa! 🌈",
          "Apapun yang kamu rasain sekarang tuh valid, jangan dipendam sendiri yaaa! 🫂",
          "Aku tahu kamu sedih, tapi inget yaa aku tuh bangga sama kamu selalu! 💗",
          "Sabar sayang, badai pasti berlalu kokkk! 🌤️",
          "Kamu nggak sendirian, aku bakal selalu jadi tempat kamu pulang! 🏡",
          "Jangan takut, ada aku yang selalu genggam tangan kamu di sini! ✋",
          "Kamu boleh cerita kapan aja ke aku, aku selalu dengerin kok! 👂",
          "Ga ada yang salah sama ngerasa sedih, tapi jangan lupa aku sayang kamu yaa! 💕",
          "Kalau kamu lelah, istirahat aja dulu, aku bakal tetep jagain kamuuu! 💤",
          "Pelan-pelan ya sayang, semua bakal baik-baik ajaa! ✨",
          "Aku selalu ada buat bantu kamu bangkit kapanpun kamu siap! 🤝",
          "Jangan lupa, kamuuu tuh kuat banget walaupun kadang lupa sama itu! 🔥",
          "Aku ga bisa janji nyelesaikan masalah kamu, tapi aku janji nemenin terusss! 🌹",
          "Pliss jangan ngerasa gagal, kamu tuh udah hebat banget sampe titik ini! 🌟",
          "Aku tahu kamu udah usaha sekuat tenaga, dan aku proud of you banget! 💖",
          "Inget ya, setiap hari kamu itu berjuang, dan itu keren bangettt! 🌄",
          "Kalau lagi butuh tempat bersandar, sini aku ada buat kamu! 🥰",
          "Aku percaya sama kamu, dan aku yakin kamu bisa melewatinya! 💪",
          "Jangan lupa kasih waktu buat diri kamu sendiri buat healing yaa! 🧘‍♀️",
          "Aku cuma mau bilang, kamu ga perlu jadi sempurna buat aku sayang kamu! 💌"
        ]
    },      
    {
        "mood": "Kangen",
        "emoji": "💘",
        "affirmations": [
          "AAAAA AKU JUGA KANGEN BANGETTT SAMA KAMUUU SAYANGGG! 💝",
          "Pengen quality time sama bebeb akuuu yang paling lucu seduniaa! 🥺",
          "SUMPAH KANGENNYA UDAH GAK KETULUNGANN NIHH! 💖",
          "Kangen ngobrol sama kamu tentang apa aja, apalagi yang receh-receh! 😄",
          "Aku kangen denger cerita random kamu yang selalu seru banget! 💬",
          "Serius deh, kangen vibes kamu yang selalu bikin aku tenang~ ✨",
          "Kayaknya aku butuh waktu lebih banyak bareng kamu biar ga kangen terus! 🕰️",
          "Lagi nginget momen-momen seru kita, bikin kangennya makin kerasa! 🌟",
          "Kamu tuh kayak magnet kangen deh, makin jauh makin kuat rasa kangennya! 🧲",
          "Kangen banget ngobrol sampe lupa waktu, itu momen favorit aku banget! ⏳",
          "Aku ga akan pernah bosen bilang aku kangen kamu terusss! 💌",
          "Kamu jauh, tapi pikiran aku selalu tentang kamu, kangen berat! 🤍",
          "Pengen banget ketemu lagi, biar rasa kangen ini ilang dikit~ 🚀",
          "Bawaannya kangen mulu deh kalo sehari aja ga kontak kamu! 📱",
          "Lagi mikirin semua hal kecil yang bikin aku selalu kangen sama kamu~ 💭",
          "Hari tanpa kamu tuh rasanya ada yang kurang, kangen banget pokoknya! 😢",
          "Nunggu-nunggu waktu biar bisa ketemu lagi sama kamu nih~ ⏳",
          "Aku percaya waktu bakal bikin kita ketemu lagi, semangat yaa! 💪",
          "Kamu tuh ada di pikiran aku terus, kangen banget sumpahhh! 😭",
          "Lagi denger lagu favorit kita, langsung kebayang kamu deh~ 🎶",
          "Aku kangen banget, tapi aku tau nanti kita bakal ketemu lagi kok! 🌈",
          "Kangen ngabisin waktu bareng kamu, beneran deh nggak ada yang ngalahin itu! 🌼",
          "Aku kangen sama caramu bikin suasana jadi seru dan penuh tawa! 😂",
          "Susah banget nahan kangennya, pengen cepet-cepet ngobrol lagi! 💬",
          "Aku inget banget semua hal tentang kamu, makanya kangennya nambah terus~ 🥺",
          "Kangen sama momen-momen random yang cuma kita doang ngerti! 🌸",
          "Lagi nge-scroll chat lama kita, duh kangennya langsung naik level! 📜",
          "Aku percaya kangen ini cuma sementara, nanti juga kita ketemu lagi! 🔜",
          "Kangen banget ngehabisin waktu bareng kamu, nggak ada yang lebih seru dari itu! 🕰️",
          "Serius deh, tiap nginget kamu tuh rasanya campur aduk antara seneng dan kangen! 😍"
        ]
    },
    {
        "mood": "Capek",
        "emoji": "😴",
        "affirmations": [
          "Istirahat dulu ya bebekkuu, jgn lupa minum air putih okayy! 💆‍♀️",
          "PROUD BGT sama kamu udah kerja keras hari inii! virtual pat pat! 🌙",
          "Sini sini aku pengen manjain kamu terus deh pokoknyaa! 💝",
          "Capeknya pasti bakal ilang kok, asal jangan lupa rehat yaa! 💪",
          "Kamu udah keren banget hari ini, aku bangga bgt sama kamu! 🌟",
          "Tenang aja, semua lelah ini bakal terbayar suatu saat nanti~ ✨",
          "Ga perlu buru-buru kok, istirahat yang cukup dulu yaa! 🕰️",
          "Jangan lupa makan yang enak biar energinya balik lagi! 🍽️",
          "Banyak banget loh yang bangga sama kamu, termasuk aku! 💖",
          "Kamu udah melakukan yang terbaik, sekarang waktunya santai dulu~ 🍵",
          "Rehat sebentar juga termasuk produktif kok, jangan lupa ya! 💤",
          "Udah capek? Gapapa kok, kamu hebat banget udah sampai sejauh ini! 🏆",
          "Aku tau kamu capek, tapi aku percaya kamu kuat banget! 🌈",
          "Lelah itu wajar, tapi jangan lupa buat kasih waktu istirahat buat diri sendiri! 🌿",
          "Selalu inget, aku selalu support kamu apa pun kondisinya~ 💌",
          "Gapapa kok kalo kamu mau istirahat dulu, kamu butuh energi buat besok! 🔋",
          "Hari ini mungkin berat, tapi kamu berhasil melaluinya, proud of you! 🎉",
          "Kamu butuh recharge, coba santai sejenak yaa! 🌼",
          "Jangan lupa kasih reward buat diri sendiri karena udah berjuang hari ini! 🎁",
          "Capek itu bukti kamu udah kerja keras, istirahat dulu biar makin kuat! 💥",
          "Aku yakin banget kamu bakal lebih semangat lagi besok! 💫",
          "Cukup tenangin pikiranmu sebentar, biar lelahnya nggak berasa berat~ 🌌",
          "Kamu udah banyak banget melakukan hal baik, sekarang waktunya relax! 🌴",
          "Kalau capek, inget aja kamu ga sendirian, aku selalu ada buat dukung kamu! 👫",
          "Jangan terlalu keras sama diri sendiri, kamu juga butuh santai kok~ 💞",
          "Capek itu bagian dari perjalanan sukses, kamu hebat banget! 🚀",
          "Take your time, semua bakal baik-baik aja kok, aku percaya sama kamu! 🌟",
          "Udah banyak yang kamu lakuin, saatnya kasih waktu buat diri kamu istirahat~ 🌙",
          "Aku tau kamu bisa melewati semua ini, tapi istirahat juga penting yaa! 🌿",
          "Semua proses ini bakal berbuah manis kok, sabar dan jaga energi ya! 🍀"
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

    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <Button
                        variant="ghost"
                        className="hover:bg-pink-50 text-pink-600"
                        onClick={() => router.push('/')}
                    >
                        ← Kembali
                    </Button>
                </div>

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

                <div className="text-center space-y-4 p-6 bg-pink-50/50 rounded-xl">
                    <p className="text-pink-500">
                        Ga ada mood yang cocok? 🤔
                    </p>
                    <Button
                        variant="default"
                        className="bg-pink-500 hover:bg-pink-600"
                        onClick={() => window.open('https://wa.me/6285155222564?text=Sayanggg, aku mau request mood baru nih!')}
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Request Mood Ke Sayang
                    </Button>
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