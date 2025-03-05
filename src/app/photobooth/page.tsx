"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    ArrowLeft,
    Camera,
    Download,
    Trash2,
    Heart,
    Sparkles,
    Smile,
    Star,
    Music,
    Save,
    RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

interface PhotoFrame {
    id: string;
    label: string;
    color: string;
    borderWidth: number;
    style: string;
}

interface Sticker {
    id: string;
    emoji: string;
    label: string;
}

interface PhotoStripLayout {
    id: string;
    label: string;
    count: number;
    cols: number;
    rows: number;
}

interface ActiveSticker {
    id: string;
    emoji: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const frames: PhotoFrame[] = [
    {
        id: "simple",
        label: "Simple Pink",
        color: "#FFC0CB",
        borderWidth: 20,
        style: "solid",
    },
    {
        id: "gradient",
        label: "Pink Gradient",
        color: "linear-gradient(to right, #FF8FAB, #FFC0CB)",
        borderWidth: 20,
        style: "gradient",
    },
    {
        id: "hearts",
        label: "Hearts",
        color: "#FFC0CB",
        borderWidth: 20,
        style: "hearts",
    },
    {
        id: "dots",
        label: "Polka Dots",
        color: "#FFC0CB",
        borderWidth: 20,
        style: "dots",
    },
    {
        id: "none",
        label: "No Frame",
        color: "transparent",
        borderWidth: 0,
        style: "none",
    },
];

const stickers: Sticker[] = [
    { id: "heart", emoji: "❤️", label: "Heart" },
    { id: "sparkle", emoji: "✨", label: "Sparkle" },
    { id: "star", emoji: "⭐", label: "Star" },
    { id: "kiss", emoji: "💋", label: "Kiss" },
    { id: "crown", emoji: "👑", label: "Crown" },
    { id: "cat", emoji: "😻", label: "Cat Love" },
    { id: "flower", emoji: "🌸", label: "Flower" },
    { id: "gift", emoji: "🎁", label: "Gift" },
    { id: "rainbow", emoji: "🌈", label: "Rainbow" },
    { id: "butterfly", emoji: "🦋", label: "Butterfly" },
    { id: "love", emoji: "💘", label: "Love Arrow" },
    { id: "ribbon", emoji: "🎀", label: "Ribbon" },
];

const layouts: PhotoStripLayout[] = [
    { id: "2photos", label: "2 Photos", count: 2, cols: 1, rows: 2 },
    { id: "3photos", label: "3 Photos", count: 3, cols: 1, rows: 3 },
    { id: "4photos", label: "4 Photos", count: 4, cols: 2, rows: 2 },
    { id: "6photos", label: "6 Photos", count: 6, cols: 2, rows: 3 },
    { id: "8photos", label: "8 Photos", count: 8, cols: 2, rows: 4 },
];

const Photobooth: React.FC = () => {
    const router = useRouter();
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [activeStickers, setActiveStickers] = useState<ActiveSticker[]>([]);
    const [selectedFrame, setSelectedFrame] = useState<PhotoFrame>(frames[0]);
    const [selectedLayout, setSelectedLayout] = useState<PhotoStripLayout>(
        layouts[0]
    );
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    const [captureMode, setCaptureMode] = useState<"single" | "strip">(
        "single"
    );
    const [photosNeeded, setPhotosNeeded] = useState<number>(
        selectedLayout.count
    );
    const [countdownInterval, setCountdownInterval] =
        useState<NodeJS.Timeout | null>(null);
    const [draggingSticker, setDraggingSticker] = useState<string | null>(null);
    const [dragStartPos, setDragStartPos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [editingSticker, setEditingSticker] = useState<string | null>(null);
    const [isMirror, setIsMirror] = useState<boolean>(true);
    const [autoCapture, setAutoCapture] = useState<boolean>(true);

    // Webcam configuration
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    // Handle capture for individual photos
    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
                return imageSrc;
            }
        }
        return null;
    }, [webcamRef]);

    // Start countdown for photo capture
    const startCountdown = useCallback(() => {
        setCountdown(3);
        setIsCapturing(true);

        const interval = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount !== null && prevCount > 1) {
                    return prevCount - 1;
                } else {
                    clearInterval(interval);
                    // Capture photo when countdown reaches 0
                    const photo = capturePhoto();
                    setIsCapturing(false);
                    setCountdown(null);
                    return null;
                }
            });
        }, 1000);

        setCountdownInterval(interval);
    }, [capturePhoto]);

    // Start strip capture mode
    const startStripCapture = useCallback(() => {
        if (photos.length >= selectedLayout.count) {
            // Reset photos if we already have enough
            setPhotos([]);
        }

        setCaptureMode("strip");
        setPhotosNeeded(selectedLayout.count);

        if (autoCapture) {
            // Automatic capture sequence
            let photosTaken = 0;
            const captureSequence = async () => {
                for (let i = 0; i < selectedLayout.count; i++) {
                    // Start countdown
                    setCountdown(3);
                    setIsCapturing(true);

                    // Wait for countdown
                    await new Promise((resolve) => {
                        const interval = setInterval(() => {
                            setCountdown((prev) => {
                                if (prev !== null && prev > 1) {
                                    return prev - 1;
                                } else {
                                    clearInterval(interval);
                                    resolve(null);
                                    return null;
                                }
                            });
                        }, 1000);
                    });

                    // Capture photo
                    if (webcamRef.current) {
                        const imageSrc = webcamRef.current.getScreenshot();
                        if (imageSrc) {
                            setPhotos((prev) => [...prev, imageSrc]);
                            photosTaken++;
                        }
                    }

                    setIsCapturing(false);

                    // Pause between captures if not the last one
                    if (i < selectedLayout.count - 1) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1500)
                        );
                    }
                }
            };

            captureSequence();
        } else {
            // Manual capture mode - start with the first photo
            startCountdown();
        }
    }, [selectedLayout, photos.length, startCountdown, autoCapture, webcamRef]);

    // Handle strip capture sequence
    useEffect(() => {
        if (
            captureMode === "strip" &&
            !isCapturing &&
            photos.length < photosNeeded
        ) {
            // If we're in strip mode, continue capturing until we have enough photos
            const timeout = setTimeout(() => {
                startCountdown();
            }, 1500); // Pause between captures

            return () => clearTimeout(timeout);
        }
    }, [captureMode, isCapturing, photos.length, photosNeeded, startCountdown]);

    // Clear countdown on unmount
    useEffect(() => {
        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [countdownInterval]);

    // Add a sticker to the canvas
    const addSticker = (stickerId: string) => {
        const sticker = stickers.find((s) => s.id === stickerId);
        if (sticker) {
            const newSticker: ActiveSticker = {
                id: `${sticker.id}-${Date.now()}`,
                emoji: sticker.emoji,
                x: 150,
                y: 150,
                rotation: 0,
                scale: 1,
            };
            setActiveStickers((prev) => [...prev, newSticker]);
            setEditingSticker(newSticker.id);
        }
    };

    // Remove a sticker
    const removeSticker = (stickerId: string) => {
        setActiveStickers((prev) => prev.filter((s) => s.id !== stickerId));
        if (editingSticker === stickerId) {
            setEditingSticker(null);
        }
    };

    // Update sticker position
    const updateStickerPosition = (id: string, x: number, y: number) => {
        setActiveStickers((prev) =>
            prev.map((s) => (s.id === id ? { ...s, x, y } : s))
        );
    };

    // Handle sticker rotation
    const handleStickerRotation = (value: number[]) => {
        if (editingSticker) {
            setActiveStickers((prev) =>
                prev.map((s) =>
                    s.id === editingSticker ? { ...s, rotation: value[0] } : s
                )
            );
        }
    };

    // Handle sticker scale
    const handleStickerScale = (value: number[]) => {
        if (editingSticker) {
            setActiveStickers((prev) =>
                prev.map((s) =>
                    s.id === editingSticker
                        ? { ...s, scale: value[0] / 100 }
                        : s
                )
            );
        }
    };

    // Delete a specific photo
    const deletePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));

        // If we're in strip mode and delete a photo, we need to readjust
        if (captureMode === "strip") {
            setPhotosNeeded((prev) => prev + 1);
        }
    };

    // Handle mouse movement for dragging stickers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (
                draggingSticker &&
                previewContainerRef.current &&
                dragStartPos
            ) {
                const container =
                    previewContainerRef.current.getBoundingClientRect();
                const x = e.clientX - container.left;
                const y = e.clientY - container.top;

                // Update sticker position
                updateStickerPosition(draggingSticker, x, y);
            }
        };

        const handleMouseUp = () => {
            setDraggingSticker(null);
            setDragStartPos(null);
        };

        // Add event listeners when dragging begins
        if (draggingSticker) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        // Clean up event listeners
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggingSticker, dragStartPos]);

    // Enhanced renderFrame function to display the frame style in the preview
    const renderFrameStyle = () => {
        if (selectedFrame.id === "none") return {};

        if (selectedFrame.style === "solid") {
            return {
                borderWidth: `${selectedFrame.borderWidth}px`,
                borderStyle: "solid",
                borderColor: selectedFrame.color,
            };
        }

        if (selectedFrame.style === "gradient") {
            return {
                borderWidth: `${selectedFrame.borderWidth}px`,
                borderStyle: "solid",
                borderImage: `${selectedFrame.color} 1`,
                boxShadow: `0 0 0 ${selectedFrame.borderWidth}px ${selectedFrame.color}`,
            };
        }

        // For hearts and dots, we'll use a basic border and add the decorations with pseudo-elements in CSS
        return {
            borderWidth: `${selectedFrame.borderWidth}px`,
            borderStyle: "solid",
            borderColor: selectedFrame.color,
            position: "relative",
            // The special decorations will be added via class names and CSS
        };
    };

    // Generate and download the photo strip
    const generatePhotoStrip = () => {
        if (!canvasRef.current || photos.length < selectedLayout.count) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions based on layout
        const photoWidth = 300;
        const photoHeight = 225;
        const padding = 20;
        const frameWidth = selectedFrame.borderWidth;

        canvas.width =
            selectedLayout.cols * (photoWidth + padding * 2) + padding * 2;
        canvas.height =
            selectedLayout.rows * (photoHeight + padding * 2) + padding * 2;

        // Fill canvas with a light pink background
        ctx.fillStyle = "#FFF5F7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw a border if needed - AROUND THE ENTIRE STRIP
        if (frameWidth > 0) {
            if (selectedFrame.style === "gradient") {
                const gradient = ctx.createLinearGradient(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                gradient.addColorStop(0, "#FF8FAB");
                gradient.addColorStop(1, "#FFC0CB");
                ctx.strokeStyle = gradient;
            } else {
                ctx.strokeStyle = selectedFrame.color;
            }
            ctx.lineWidth = frameWidth;
            ctx.strokeRect(
                frameWidth / 2,
                frameWidth / 2,
                canvas.width - frameWidth,
                canvas.height - frameWidth
            );
        }

        // If the frame style is hearts or dots, add decorations
        if (
            selectedFrame.style === "hearts" ||
            selectedFrame.style === "dots"
        ) {
            const decoration = selectedFrame.style === "hearts" ? "❤️" : "•";
            const spacing = selectedFrame.style === "hearts" ? 40 : 20;

            ctx.font =
                selectedFrame.style === "hearts" ? "20px Arial" : "15px Arial";
            ctx.fillStyle = "#FF8FAB";

            // Top and bottom borders
            for (let x = padding; x < canvas.width - padding; x += spacing) {
                ctx.fillText(decoration, x, padding);
                ctx.fillText(decoration, x, canvas.height - padding / 2);
            }

            // Left and right borders
            for (
                let y = padding + spacing;
                y < canvas.height - padding;
                y += spacing
            ) {
                ctx.fillText(decoration, padding / 2, y);
                ctx.fillText(decoration, canvas.width - padding, y);
            }
        }

        // Load and draw photos
        const loadedPhotos: HTMLImageElement[] = [];
        let loadedCount = 0;

        photos.slice(0, selectedLayout.count).forEach((photo, index) => {
            const img = new Image();
            img.onload = () => {
                loadedPhotos[index] = img;
                loadedCount++;

                if (
                    loadedCount ===
                    Math.min(photos.length, selectedLayout.count)
                ) {
                    // All photos loaded, draw them to canvas
                    loadedPhotos.forEach((img, i) => {
                        const col = i % selectedLayout.cols;
                        const row = Math.floor(i / selectedLayout.cols);
                        const x =
                            padding +
                            col * (photoWidth + padding * 2) +
                            padding;
                        const y =
                            padding +
                            row * (photoHeight + padding * 2) +
                            padding;

                        // Draw photo directly without individual frames
                        ctx.drawImage(img, x, y, photoWidth, photoHeight);
                    });

                    // Draw stickers
                    activeStickers.forEach((sticker) => {
                        ctx.save();
                        ctx.translate(sticker.x, sticker.y);
                        ctx.rotate((sticker.rotation * Math.PI) / 180);
                        ctx.scale(sticker.scale, sticker.scale);
                        ctx.font = "30px Arial";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(sticker.emoji, 0, 0);
                        ctx.restore();
                    });

                    // Generate and download the image
                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = `love-photobooth-${new Date().getTime()}.png`;
                    link.href = dataUrl;
                    link.click();
                }
            };
            img.src = photo;
        });
    };

    // Clean up and return to capture mode
    const resetPhotos = () => {
        setPhotos([]);
        setActiveStickers([]);
        setCaptureMode("single");
        setEditingSticker(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-2 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <Button
                    variant="ghost"
                    className="mb-2 sm:mb-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                <div className="text-center space-y-2 sm:space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-pink-600">
                        love photobooth 📸
                    </h1>
                    <p className="text-sm sm:text-base text-pink-400">
                        abadikan momen spesial kita berdua
                    </p>
                </div>

                <Tabs defaultValue="capture" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-pink-50">
                        <TabsTrigger
                            value="capture"
                            className="px-1 sm:px-2 text-xs sm:text-sm py-1.5 sm:py-2"
                        >
                            <span className="hidden xs:inline">Ambil Foto</span>
                            <span className="xs:hidden">Foto</span> 📸
                        </TabsTrigger>
                        <TabsTrigger
                            value="layout"
                            disabled={photos.length === 0}
                            className="px-1 sm:px-2 text-xs sm:text-sm py-1.5 sm:py-2"
                        >
                            <span className="hidden xs:inline">
                                Layout & Frame
                            </span>
                            <span className="xs:hidden">Layout</span> 🖼️
                        </TabsTrigger>
                        <TabsTrigger
                            value="stickers"
                            disabled={photos.length === 0}
                            className="px-1 sm:px-2 text-xs sm:text-sm py-1.5 sm:py-2"
                        >
                            <span className="hidden xs:inline">
                                Stiker & Download
                            </span>
                            <span className="xs:hidden">Stiker</span> ✨
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="capture">
                        <Card className="p-3 sm:p-6 overflow-hidden">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="relative w-full rounded-lg overflow-hidden bg-black shadow-lg">
                                    {/* Countdown Overlay */}
                                    {countdown !== null && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                                            <div className="text-8xl font-bold text-white animate-pulse">
                                                {countdown}
                                            </div>
                                        </div>
                                    )}

                                    {/* Webcam Component */}
                                    <div className="relative aspect-video">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                            mirrored={isMirror}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3 sm:space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-pink-600 border-pink-200 hover:bg-pink-50 text-xs sm:text-sm"
                                            onClick={() =>
                                                setIsMirror(!isMirror)
                                            }
                                        >
                                            <RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            {isMirror
                                                ? "Nonaktifkan"
                                                : "Aktifkan"}{" "}
                                            Cermin
                                        </Button>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-pink-600 border-pink-200 hover:bg-pink-50 text-xs sm:text-sm flex-1 sm:flex-auto"
                                                onClick={startCountdown}
                                                disabled={isCapturing}
                                            >
                                                <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                <span className="whitespace-nowrap">
                                                    Ambil 1 Foto
                                                </span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm flex-1 sm:flex-auto"
                                                onClick={startStripCapture}
                                                disabled={isCapturing}
                                            >
                                                <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                <span className="whitespace-nowrap">
                                                    Ambil {selectedLayout.count}{" "}
                                                    Foto
                                                </span>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Auto-capture toggle */}
                                    <div className="flex items-center justify-center gap-2 text-pink-600">
                                        <span>Manual</span>
                                        <button
                                            onClick={() =>
                                                setAutoCapture(!autoCapture)
                                            }
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                                                autoCapture
                                                    ? "bg-pink-500"
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`${
                                                    autoCapture
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                            />
                                        </button>
                                        <span>Otomatis</span>
                                    </div>

                                    {/* Layout selection for strip photos */}
                                    <div className="bg-pink-50 p-2 sm:p-4 rounded-lg space-y-2 sm:space-y-3">
                                        <h3 className="text-sm sm:text-base text-pink-600 font-medium">
                                            Pilih Jumlah Foto:
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                            {layouts.map((layout) => (
                                                <button
                                                    key={layout.id}
                                                    className={`p-2 rounded-lg border text-center text-sm transition-all ${
                                                        selectedLayout.id ===
                                                        layout.id
                                                            ? "bg-pink-200 border-pink-400 text-pink-700"
                                                            : "bg-white border-pink-100 text-pink-500 hover:bg-pink-50"
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedLayout(
                                                            layout
                                                        )
                                                    }
                                                >
                                                    {layout.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Preview of captured photos */}
                                {photos.length > 0 && (
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-pink-600 font-medium">
                                                Foto yang Diambil (
                                                {photos.length}/{photosNeeded}):
                                            </h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-pink-600 hover:bg-pink-50"
                                                onClick={resetPhotos}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Reset
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {photos.map((photo, index) => (
                                                <div
                                                    key={index}
                                                    className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-pink-300 relative group"
                                                >
                                                    <img
                                                        src={photo}
                                                        alt={`Captured photo ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        className="absolute top-2 right-2 bg-pink-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() =>
                                                            deletePhoto(index)
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="layout">
                        <Card className="p-3 sm:p-6">
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-lg sm:text-xl font-semibold text-pink-600">
                                    Pilih Frame & Layout 🖼️
                                </h2>

                                {/* Frame selection */}
                                <div className="space-y-2 sm:space-y-4">
                                    <h3 className="text-sm sm:text-base text-pink-600 font-medium">
                                        Frame:
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                                        {frames.map((frame) => (
                                            <button
                                                key={frame.id}
                                                className={`p-2 sm:p-3 rounded-lg border-2 h-16 sm:h-24 flex items-center justify-center transition-all ${
                                                    selectedFrame.id ===
                                                    frame.id
                                                        ? "border-pink-500"
                                                        : "border-pink-200 hover:border-pink-300"
                                                }`}
                                                style={{
                                                    background:
                                                        frame.style ===
                                                        "gradient"
                                                            ? "linear-gradient(to right, #FF8FAB, #FFC0CB)"
                                                            : frame.color,
                                                    opacity:
                                                        frame.style === "none"
                                                            ? 0.3
                                                            : 1,
                                                }}
                                                onClick={() =>
                                                    setSelectedFrame(frame)
                                                }
                                            >
                                                <span className="bg-white px-2 py-1 rounded text-xs text-pink-600 font-medium">
                                                    {frame.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Layout preview */}
                                <div className="space-y-4">
                                    <h3 className="text-pink-600 font-medium">
                                        Layout Preview:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {layouts.map((layout) => (
                                            <button
                                                key={layout.id}
                                                className={`p-3 rounded-lg border-2 ${
                                                    selectedLayout.id ===
                                                    layout.id
                                                        ? "border-pink-500 bg-pink-50"
                                                        : "border-pink-200 hover:border-pink-300"
                                                }`}
                                                onClick={() =>
                                                    setSelectedLayout(layout)
                                                }
                                            >
                                                <div
                                                    className="aspect-[4/3] bg-pink-100 rounded-lg overflow-hidden grid p-2"
                                                    style={{
                                                        gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                                                        gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
                                                        gap: "4px",
                                                    }}
                                                >
                                                    {Array.from({
                                                        length: layout.count,
                                                    }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="bg-pink-200 rounded"
                                                        ></div>
                                                    ))}
                                                </div>
                                                <p className="text-pink-600 text-center mt-2 text-sm">
                                                    {layout.label}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="stickers">
                        <Card className="p-3 sm:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-4 sm:space-y-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-pink-600">
                                        Tambahkan Stiker ✨
                                    </h2>

                                    {/* Sticker selection */}
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {stickers.map((sticker) => (
                                            <button
                                                key={sticker.id}
                                                className="p-2 sm:p-3 rounded-lg border border-pink-200 hover:bg-pink-50 transition-all text-center"
                                                onClick={() =>
                                                    addSticker(sticker.id)
                                                }
                                            >
                                                <span className="text-xl sm:text-2xl">
                                                    {sticker.emoji}
                                                </span>
                                                <p className="text-[10px] sm:text-xs text-pink-500 mt-1">
                                                    {sticker.label}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Active stickers list */}
                                    {activeStickers.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="text-pink-600 font-medium">
                                                Stiker Aktif:
                                            </h3>
                                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                                {activeStickers.map(
                                                    (sticker) => (
                                                        <div
                                                            key={sticker.id}
                                                            className={`flex items-center justify-between p-3 rounded-lg border ${
                                                                editingSticker ===
                                                                sticker.id
                                                                    ? "border-pink-500 bg-pink-50"
                                                                    : "border-pink-200"
                                                            }`}
                                                            onClick={() =>
                                                                setEditingSticker(
                                                                    sticker.id
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-2xl">
                                                                    {
                                                                        sticker.emoji
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-pink-600">
                                                                    {
                                                                        stickers.find(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                s.id ===
                                                                                sticker.id.split(
                                                                                    "-"
                                                                                )[0]
                                                                        )?.label
                                                                    }
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-pink-600 hover:bg-pink-100"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    removeSticker(
                                                                        sticker.id
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sticker controls */}
                                    {editingSticker && (
                                        <div className="space-y-4 bg-pink-50 p-4 rounded-lg">
                                            <h3 className="text-pink-600 font-medium">
                                                Edit Stiker:
                                            </h3>

                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm text-pink-500">
                                                        Rotasi:
                                                    </label>
                                                    <span className="text-sm text-pink-500">
                                                        {
                                                            activeStickers.find(
                                                                (s) =>
                                                                    s.id ===
                                                                    editingSticker
                                                            )?.rotation
                                                        }
                                                        °
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[
                                                        activeStickers.find(
                                                            (s) =>
                                                                s.id ===
                                                                editingSticker
                                                        )?.rotation || 0,
                                                    ]}
                                                    min={0}
                                                    max={360}
                                                    step={5}
                                                    onValueChange={
                                                        handleStickerRotation
                                                    }
                                                    className="w-full [&>.relative]:bg-pink-100 [&>.relative>div]:bg-pink-500 [&_[role=slider]]:bg-pink-700 [&_[role=slider]]:border-2 [&_[role=slider]]:border-pink-50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm text-pink-500">
                                                        Ukuran:
                                                    </label>
                                                    <span className="text-sm text-pink-500">
                                                        {Math.round(
                                                            (activeStickers.find(
                                                                (s) =>
                                                                    s.id ===
                                                                    editingSticker
                                                            )?.scale || 1) * 100
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[
                                                        Math.round(
                                                            (activeStickers.find(
                                                                (s) =>
                                                                    s.id ===
                                                                    editingSticker
                                                            )?.scale || 1) * 100
                                                        ),
                                                    ]}
                                                    min={50}
                                                    max={200}
                                                    step={10}
                                                    onValueChange={
                                                        handleStickerScale
                                                    }
                                                    className="w-full [&>.relative]:bg-pink-100 [&>.relative>div]:bg-pink-500 [&_[role=slider]]:bg-pink-700 [&_[role=slider]]:border-2 [&_[role=slider]]:border-pink-50"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 sm:space-y-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-pink-600">
                                        Preview & Download 💾
                                    </h2>

                                    {/* Photo strip preview with draggable stickers */}
                                    <div
                                        ref={previewContainerRef}
                                        className="relative bg-white p-4 rounded-lg shadow-md overflow-hidden"
                                        style={{
                                            borderWidth:
                                                selectedFrame.borderWidth,
                                            borderStyle: "solid",
                                            borderColor:
                                                selectedFrame.color !==
                                                "transparent"
                                                    ? selectedFrame.style ===
                                                      "gradient"
                                                        ? "#FFC0CB"
                                                        : selectedFrame.color
                                                    : "transparent",
                                        }}
                                    >
                                        <div
                                            className="grid gap-2 mx-auto"
                                            style={{
                                                gridTemplateColumns: `repeat(${selectedLayout.cols}, 1fr)`,
                                                gridTemplateRows: `repeat(${selectedLayout.rows}, 1fr)`,
                                                aspectRatio:
                                                    selectedLayout.cols /
                                                    selectedLayout.rows,
                                            }}
                                        >
                                            {Array.from({
                                                length: selectedLayout.count,
                                            }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="relative rounded-md overflow-hidden"
                                                >
                                                    {i < photos.length ? (
                                                        <img
                                                            src={photos[i]}
                                                            alt={`Photo ${i + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                                                            <span className="text-pink-400">
                                                                Photo {i + 1}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Preview stickers */}
                                        {activeStickers.map((sticker) => (
                                            <div
                                                key={sticker.id}
                                                className={`absolute cursor-move ${editingSticker === sticker.id ? "ring-2 ring-pink-500" : ""}`}
                                                style={{
                                                    left: `${sticker.x}px`,
                                                    top: `${sticker.y}px`,
                                                    transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                                                    fontSize: "30px",
                                                    userSelect: "none",
                                                }}
                                                onMouseDown={(e) => {
                                                    setEditingSticker(
                                                        sticker.id
                                                    );
                                                    setDraggingSticker(
                                                        sticker.id
                                                    );
                                                    const rect =
                                                        previewContainerRef.current?.getBoundingClientRect();
                                                    if (rect) {
                                                        setDragStartPos({
                                                            x:
                                                                e.clientX -
                                                                rect.left,
                                                            y:
                                                                e.clientY -
                                                                rect.top,
                                                        });
                                                    }
                                                    e.preventDefault();
                                                }}
                                            >
                                                {sticker.emoji}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Canvas for generating the final image */}
                                    <canvas
                                        ref={canvasRef}
                                        style={{ display: "none" }}
                                    />

                                    {/* Download button */}
                                    <Button
                                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 sm:py-3 text-sm sm:text-base"
                                        onClick={generatePhotoStrip}
                                        disabled={
                                            photos.length < selectedLayout.count
                                        }
                                    >
                                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Download Photo Strip
                                    </Button>

                                    {photos.length < selectedLayout.count && (
                                        <p className="text-sm text-pink-400 text-center">
                                            Ambil{" "}
                                            {selectedLayout.count -
                                                photos.length}{" "}
                                            foto lagi untuk mengunduh
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* CSS for frame decorations */}
            <style jsx global>{`
                .frame-hearts::before,
                .frame-hearts::after,
                .frame-dots::before,
                .frame-dots::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }

                .frame-hearts::before {
                    background: repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 18px,
                            #ffc0cb 18px,
                            #ffc0cb 20px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 18px,
                            #ffc0cb 18px,
                            #ffc0cb 20px
                        );
                }

                .frame-hearts::after {
                    content: "❤️";
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px;
                    font-size: 16px;
                    overflow: hidden;
                }

                .frame-dots::before {
                    background: repeating-radial-gradient(
                        #ffc0cb,
                        #ffc0cb 2px,
                        transparent 2px,
                        transparent 15px
                    );
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
};

export default Photobooth;
