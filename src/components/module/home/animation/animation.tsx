import { motion } from "framer-motion";
import React from "react";

export const FloatingHearts = () => {
    return (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-200"
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        y: [0, -100],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: i * 0.7,
                    }}
                >
                    💗
                </motion.div>
            ))}
        </motion.div>
    );
};

export const Sparkles = () => {
    return (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-200 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: 0
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}
        </motion.div>
    );
};

export const GradientPulse = () => {
    return (
        <motion.div
            className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-transparent pointer-events-none"
            animate={{
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
};

export const FloatingBubbles = () => {
    return (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-pink-200/20 to-pink-300/20"
                    style={{
                        width: Math.random() * 50 + 20,
                        height: Math.random() * 50 + 20,
                    }}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                    }}
                    animate={{
                        y: [-100, window.innerHeight + 100],
                        x: [null, Math.random() * 100 - 50],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: i * 2,
                    }}
                />
            ))}
        </motion.div>
    );
};