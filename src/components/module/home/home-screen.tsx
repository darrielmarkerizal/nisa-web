"use client"

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
import { useRouter } from "next/navigation";
import { FloatingBubbles, FloatingHearts, GradientPulse, Sparkles } from "./animation/animation";

const getGreeting = () => {
    const hourNumber = new Date().getHours();
    if (hourNumber >= 4 && hourNumber < 11) return "selamat pagi sayangkuu";
    if (hourNumber >= 11 && hourNumber < 15) return "selamat siang babyyy";
    if (hourNumber >= 15 && hourNumber < 18) return "selamat sore cintakuu";
    if (hourNumber >= 18 && hourNumber < 21) return "selamat malam bubuuu";
    return "selamat tidur sayangkuu";
};

const menuItems = [
    {
        icon: Heart,
        title: "daily love affirmation",
        description: "kata-kata sayang buat kamu setiap hari",
        route: "/daily-affirmation"
    },
    {
        icon: Calendar,
        title: "period tracker plus",
        description: "pengingat jadwal khusus kamu",
        route: "/period-tracker"
    },
    {
        icon: Book,
        title: "digital prayer companion",
        description: "teman ibadah kita berdua",
        route: "/prayer-companion"
    },
    {
        icon: Smile,
        title: "mood journal",
        description: "cerita-cerita perasaan kamu",
        route: "/mood-journal"
    },
    {
        icon: Gift,
        title: "care package creator",
        description: "kirim hadiah spesial buat kamu",
        route: "/care-package"
    },
    {
        icon: Image,
        title: "memory archive",
        description: "kenangan-kenangan indah kita",
        route: "/memories"
    },
    {
        icon: Droplet,
        title: "wellness reminder",
        description: "pengingat buat jaga kesehatan",
        route: "/wellness"
    },
    {
        icon: Bell,
        title: "emergency sos",
        description: "panggilan darurat ke aku",
        route: "/emergency"
    },
    {
        icon: MessageCircle,
        title: "words of affirmation",
        description: "kata-kata penyemangat",
        route: "/affirmations"
    },
    {
        icon: Brain,
        title: "self-growth guide",
        description: "panduan pengembangan diri",
        route: "/self-growth"
    },
    {
        icon: Target,
        title: "couple goals",
        description: "target-target kita berdua",
        route: "/couple-goals"
    },
    {
        icon: Map,
        title: "halal date planner",
        description: "rencana kencan yang halal",
        route: "/date-planner"
    },
    {
        icon: ThumbsUp,
        title: "gratitude box",
        description: "ungkapan rasa syukur",
        route: "/gratitude"
    },
    {
        icon: MessageSquare,
        title: "comfort messages",
        description: "pesan penghibur saat sedih",
        route: "/comfort"
    },
    {
        icon: Activity,
        title: "health assistant",
        description: "asisten kesehatan pribadi",
        route: "/health"
    },
    {
        icon: Headphones,
        title: "guided meditation",
        description: "meditasi islami & dzikir",
        route: "/meditation"
    },
    {
        icon: Clock,
        title: "important dates",
        description: "pengingat tanggal spesial",
        route: "/important-dates"
    },
    {
        icon: CheckSquare,
        title: "daily task helper",
        description: "pembantu tugas harian",
        route: "/tasks"
    },
    {
        icon: BookOpen,
        title: "knowledge sharing",
        description: "berbagi ilmu bareng",
        route: "/knowledge"
    },
    {
        icon: Quote,
        title: "doa & quote",
        description: "doa dan kata-kata inspiratif",
        route: "/quotes"
    },
];

const HomeScreen = () => {
    const router = useRouter();

     return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
            <FloatingHearts />
            <Sparkles />
            <GradientPulse />
            <FloatingBubbles />
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
                            onClick={() => router.push(item.route)}
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

                <footer className="text-center py-4 mt-8">
                    <p className="text-pink-400 text-sm">
                        Dibuat dengan penuh cinta 💝 oleh Darriel Markerizal
                        <br />
                        untuk Nisa Fredlina Mahardika Saputri
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default HomeScreen;