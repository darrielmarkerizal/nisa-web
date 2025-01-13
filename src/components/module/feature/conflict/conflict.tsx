"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  MessageCircle,
  Heart,
  ThumbsUp,
  Clock,
  Brain,
  Calendar,
} from "lucide-react";

interface ConflictCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  conflicts: Conflict[];
}

interface Conflict {
  id: string;
  title: string;
  description: string;
  solutions: string[];
  preventiveMeasures: string[];
}

const ConflictResolutionCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("communication");

  const conflictCategories: ConflictCategory[] = [
    {
      id: "communication",
      title: "Masalah Komunikasi",
      icon: <MessageCircle className="w-4 h-4" />,
      conflicts: [
        {
          id: "slow-response",
          title: "Respon Lambat",
          description:
            "Ketika pasangan lambat membalas pesan atau tidak memberi kabar.",
          solutions: [
            "Diskusikan alasan di balik respon yang lambat dengan kepala dingin",
            "Tetapkan waktu khusus untuk komunikasi intensif",
            "Pahami jadwal dan kesibukan masing-masing",
            "Gunakan fitur pesan terjadwal untuk pembaruan penting",
          ],
          preventiveMeasures: [
            "Buat jadwal komunikasi yang disepakati bersama",
            "Bagikan kalender untuk melihat kesibukan masing-masing",
            "Tetapkan kontak darurat untuk situasi penting",
            "Gunakan status WhatsApp untuk memberi informasi kesibukan",
          ],
        },
        {
          id: "misunderstanding",
          title: "Salah Paham dalam Chat",
          description: "Kesalahpahaman karena interpretasi pesan yang berbeda.",
          solutions: [
            "Klarifikasi maksud pesan secara langsung",
            "Gunakan video call untuk komunikasi penting",
            "Hindari mengambil kesimpulan sendiri",
            "Tanyakan maksud pasangan dengan cara yang baik",
          ],
          preventiveMeasures: [
            "Gunakan emoji untuk memperjelas nada pesan",
            "Hindari chat saat emosi tidak stabil",
            "Biasakan konfirmasi pemahaman",
            "Pilih waktu yang tepat untuk diskusi serius",
          ],
        },
        {
          id: "different-schedules",
          title: "Perbedaan Jadwal",
          description:
            "Kesulitan menemukan waktu untuk berkomunikasi karena perbedaan jadwal.",
          solutions: [
            "Buat jadwal komunikasi yang fleksibel",
            "Manfaatkan voice notes untuk pembaruan",
            "Tentukan waktu prioritas untuk komunikasi",
            "Saling menghargai waktu istirahat",
          ],
          preventiveMeasures: [
            "Sinkronisasi kalender untuk melihat waktu luang",
            "Tetapkan ekspektasi ketersediaan waktu",
            "Buat sistem notifikasi khusus",
            "Lakukan peninjauan jadwal secara berkala",
          ],
        },
        {
          id: "quality-time",
          title: "Kurangnya Waktu Berkualitas",
          description: "Merasa kurang berkualitas dalam komunikasi jarak jauh.",
          solutions: [
            "Lakukan malam kencan virtual",
            "Nonton film bersama secara online",
            "Main game online bersama",
            "Baca buku yang sama dan diskusikan",
          ],
          preventiveMeasures: [
            "Jadwalkan aktivitas virtual secara rutin",
            "Eksplorasi platform interaksi baru",
            "Tetapkan waktu khusus untuk pembicaraan mendalam",
            "Buat daftar aktivitas virtual bersama",
          ],
        },
        {
          id: "communication-style",
          title: "Perbedaan Gaya Komunikasi",
          description: "Perbedaan cara mengekspresikan perasaan dan pikiran.",
          solutions: [
            "Pelajari bahasa cinta masing-masing",
            "Adaptasi gaya komunikasi",
            "Berikan ruang untuk berekspresi",
            "Hargai upaya komunikasi pasangan",
          ],
          preventiveMeasures: [
            "Diskusikan preferensi komunikasi",
            "Pelajari bahasa cinta pasangan",
            "Lakukan pemeriksaan komunikasi secara berkala",
            "Latih mendengarkan secara aktif",
          ],
        },
        {
          id: "promises",
          title: "Janji yang Tidak Ditepati",
          description:
            "Ketika salah satu pasangan membuat janji tapi tidak menepatinya, atau merasa tertekan ketika diminta memenuhi janji.",
          solutions: [
            "Komunikasikan dengan tenang perasaan tentang janji tersebut",
            "Berikan waktu dan ruang untuk pasangan menjelaskan situasinya",
            "Buat kesepakatan baru yang lebih realistis",
            "Gunakan pernyataan 'Saya merasa' daripada menyalahkan",
          ],
          preventiveMeasures: [
            "Buat janji yang spesifik dan realistis",
            "Catat janji bersama di kalender digital",
            "Tentukan batas waktu yang fleksibel",
            "Bicarakan ekspektasi sejak awal",
          ],
        },
        {
          id: "update-frequency",
          title: "Frekuensi Pembaruan Keseharian",
          description:
            "Perbedaan ekspektasi dalam frekuensi berbagi cerita keseharian.",
          solutions: [
            "Tentukan ritme pembaruan yang nyaman",
            "Gunakan media yang tepat",
            "Buat format pembaruan yang efektif",
            "Hormati batasan privasi pasangan",
          ],
          preventiveMeasures: [
            "Tetapkan ekspektasi rutinitas pembaruan",
            "Buat template berbagi cerita yang menyenangkan",
            "Gunakan pengingat yang ramah",
            "Lakukan tinjauan rutin kebutuhan pembaruan",
          ],
        },
      ],
    },
    {
      id: "emotional",
      title: "Masalah Emosional",
      icon: <Heart className="w-4 h-4" />,
      conflicts: [
        {
          id: "loneliness",
          title: "Rasa Kesepian",
          description:
            "Merasa kesepian dan rindu karena jarak yang memisahkan.",
          solutions: [
            "Lakukan video call saat waktu senggang",
            "Kirim kejutan berupa hadiah atau pesan manis",
            "Rencanakan malam kencan virtual",
            "Bagikan kegiatan sehari-hari melalui foto atau video pendek",
          ],
          preventiveMeasures: [
            "Jadwalkan video call secara rutin",
            "Buat playlist musik atau film bersama",
            "Mainkan game online bersama",
            "Kirim pesan apresiasi harian",
          ],
        },
        {
          id: "emotional-support",
          title: "Dukungan Emosional",
          description:
            "Merasa kurang mendapat dukungan emosional saat dibutuhkan.",
          solutions: [
            "Ekspresikan kebutuhan dengan jelas",
            "Buat kode khusus untuk situasi darurat",
            "Gunakan video call untuk memberikan dukungan",
            "Bagikan jurnal perasaan",
          ],
          preventiveMeasures: [
            "Lakukan pemeriksaan emosional secara rutin",
            "Buat sistem dukungan darurat",
            "Pelajari tanda-tanda stres pasangan",
            "Kembangkan jaringan dukungan",
          ],
        },
        {
          id: "mood-swings",
          title: "Perubahan Mood",
          description: "Menghadapi perubahan mood pasangan dari jarak jauh.",
          solutions: [
            "Dengarkan tanpa menghakimi",
            "Tawarkan dukungan yang tepat",
            "Berikan ruang saat dibutuhkan",
            "Tetap terhubung meski dalam diam",
          ],
          preventiveMeasures: [
            "Lacak pola perubahan mood",
            "Identifikasi situasi pemicu",
            "Buat playlist yang menenangkan",
            "Kembangkan strategi mengatasi stres",
          ],
        },
        {
          id: "growth-anxiety",
          title: "Kecemasan akan Pertumbuhan",
          description: "Khawatir hubungan tidak berkembang karena LDR.",
          solutions: [
            "Tetapkan pencapaian hubungan",
            "Rayakan pencapaian kecil",
            "Rencanakan masa depan bersama",
            "Lakukan tinjauan rutin hubungan",
          ],
          preventiveMeasures: [
            "Buat peta pertumbuhan hubungan",
            "Tetapkan tujuan belajar bersama",
            "Bagikan perkembangan pribadi",
            "Rencanakan masa depan secara rutin",
          ],
        },
      ],
    },
    {
      id: "trust",
      title: "Masalah Kepercayaan",
      icon: <ThumbsUp className="w-4 h-4" />,
      conflicts: [
        {
          id: "social-media",
          title: "Aktivitas Media Sosial",
          description:
            "Kecemburuan atau ketidaknyamanan terkait aktivitas di media sosial.",
          solutions: [
            "Diskusikan batasan di media sosial",
            "Bagikan password jika sudah sepakat",
            "Posting momen bersama secara rutin",
            "Tag pasangan di postingan yang relevan",
          ],
          preventiveMeasures: [
            "Tetapkan ekspektasi tentang hal pribadi dan publik",
            "Perbarui status hubungan di media sosial",
            "Buat konten pasangan bersama",
            "Rutin berbagi pembaruan harian",
          ],
        },
        {
          id: "new-friends",
          title: "Pertemanan Baru",
          description: "Kekhawatiran tentang pertemanan baru pasangan.",
          solutions: [
            "Kenalkan teman baru melalui video call",
            "Bagikan aktivitas bersama teman",
            "Jaga komunikasi terbuka",
            "Hormati batasan sosial pasangan",
          ],
          preventiveMeasures: [
            "Lakukan pembaruan rutin tentang teman",
            "Tetapkan batasan pertemanan yang jelas",
            "Libatkan pasangan dalam acara bersama",
            "Bangun sistem saling percaya",
          ],
        },
        {
          id: "past-issues",
          title: "Masalah Masa Lalu",
          description: "Masalah kepercayaan dari pengalaman masa lalu.",
          solutions: [
            "Akui luka masa lalu",
            "Usahakan untuk memaafkan",
            "Bangun pola kepercayaan baru",
            "Cari bantuan profesional jika diperlukan",
          ],
          preventiveMeasures: [
            "Lakukan latihan kepercayaan secara rutin",
            "Ciptakan kenangan baru",
            "Biasakan transparansi",
            "Bangun rutinitas penyembuhan",
          ],
        },
        {
          id: "privacy-boundaries",
          title: "Batasan Privasi",
          description: "Menentukan batasan privasi dalam hubungan jarak jauh.",
          solutions: [
            "Diskusikan kebutuhan privasi",
            "Tetapkan batasan yang jelas",
            "Hormati ruang pribadi",
            "Lakukan tinjauan batasan secara rutin",
          ],
          preventiveMeasures: [
            "Buat panduan privasi",
            "Lakukan tinjauan batasan secara berkala",
            "Hormati privasi digital",
            "Buat sistem keamanan bersama",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pink-600">
            Conflict Resolution Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="communication" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {conflictCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {conflictCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.conflicts.map((conflict) => (
                      <AccordionItem key={conflict.id} value={conflict.id}>
                        <AccordionTrigger className="text-pink-600 hover:text-pink-700">
                          {conflict.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 p-4">
                            <p className="text-gray-600">
                              {conflict.description}
                            </p>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full bg-pink-50 hover:bg-pink-100 text-pink-600"
                                >
                                  Lihat Solusi
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Solusi untuk {conflict.title}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold text-pink-600 mb-2">
                                          Solusi Langsung:
                                        </h4>
                                        <ul className="list-disc pl-5 space-y-2">
                                          {conflict.solutions.map(
                                            (solution, idx) => (
                                              <li key={idx}>{solution}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-pink-600 mb-2">
                                          Pencegahan:
                                        </h4>
                                        <ul className="list-disc pl-5 space-y-2">
                                          {conflict.preventiveMeasures.map(
                                            (measure, idx) => (
                                              <li key={idx}>{measure}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Tutup</AlertDialogCancel>
                                  <AlertDialogAction className="bg-pink-500 hover:bg-pink-600">
                                    Simpan Solusi
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConflictResolutionCenter;
