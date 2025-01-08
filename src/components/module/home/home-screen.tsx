import React from "react";
import { Card } from "@/components/ui/card";
import {
    Heart,
    Calendar,
    Book,
    Smile,
    Gift,
    Image,
    Droplet,
    Bell,
    MessageCircle,
    Brain,
    Target,
    Map,
    ThumbsUp,
    MessageSquare,
    Activity,
    Headphones,
    Clock,
    CheckSquare,
    BookOpen,
    Quote,
} from "lucide-react";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "selamat pagi sayangkuu";
    if (hour >= 12 && hour < 15) return "selamat siang babyyy";
    if (hour >= 15 && hour < 18) return "selamat sore cintakuu";
    return "selamat malam bubuuu";
};

const menuItems = [
    {
        icon: Heart,
        title: "daily love affirmation",
        description: "kata-kata sayang buat kamu setiap hari",
    },
    {
        icon: Calendar,
        title: "period tracker plus",
        description: "pengingat jadwal khusus kamu",
    },
    {
        icon: Book,
        title: "digital prayer companion",
        description: "teman ibadah kita berdua",
    },
    {
        icon: Smile,
        title: "mood journal",
        description: "cerita-cerita perasaan kamu",
    },
    {
        icon: Gift,
        title: "care package creator",
        description: "kirim hadiah spesial buat kamu",
    },
    {
        icon: Image,
        title: "memory archive",
        description: "kenangan-kenangan indah kita",
    },
    {
        icon: Droplet,
        title: "wellness reminder",
        description: "pengingat buat jaga kesehatan",
    },
    {
        icon: Bell,
        title: "emergency sos",
        description: "panggilan darurat ke aku",
    },
    {
        icon: MessageCircle,
        title: "words of affirmation",
        description: "kata-kata penyemangat",
    },
    {
        icon: Brain,
        title: "self-growth guide",
        description: "panduan pengembangan diri",
    },
    {
        icon: Target,
        title: "couple goals",
        description: "target-target kita berdua",
    },
    {
        icon: Map,
        title: "halal date planner",
        description: "rencana kencan yang halal",
    },
    {
        icon: ThumbsUp,
        title: "gratitude box",
        description: "ungkapan rasa syukur",
    },
    {
        icon: MessageSquare,
        title: "comfort messages",
        description: "pesan penghibur saat sedih",
    },
    {
        icon: Activity,
        title: "health assistant",
        description: "asisten kesehatan pribadi",
    },
    {
        icon: Headphones,
        title: "guided meditation",
        description: "meditasi islami & dzikir",
    },
    {
        icon: Clock,
        title: "important dates",
        description: "pengingat tanggal spesial",
    },
    {
        icon: CheckSquare,
        title: "daily task helper",
        description: "pembantu tugas harian",
    },
    {
        icon: BookOpen,
        title: "knowledge sharing",
        description: "berbagi ilmu bareng",
    },
    {
        icon: Quote,
        title: "doa & quote",
        description: "doa dan kata-kata inspiratif",
    },
];

const HomeScreen = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
                        {getGreeting()}
                    </h1>
                    <p className="text-pink-400">
                        semoga hari kamu indah ya sayangkuu 💖
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {menuItems.map((item, index) => (
                        <Card
                            key={index}
                            className="p-4 hover:shadow-lg transition-shadow cursor-pointer hover:bg-pink-50 group"
                        >
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="p-2 rounded-full bg-pink-100 group-hover:bg-pink-200 transition-colors">
                                    <item.icon className="w-6 h-6 text-pink-500" />
                                </div>
                                <h3 className="font-medium text-pink-600">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-pink-400">
                                    {item.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
