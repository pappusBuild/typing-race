// bot logic & game loop
import { useEffect, useRef, useState } from "react";
import { INITIAL_RACERS } from "./soloGame.types";
import type { Racer } from "./soloGame.types";

interface UseRacerAnimationProps {
    motorImages: { motor1: string; motor2: string; motor3: string; motor4: string };
    paragraph: string;
    input: string;
    isFinished: boolean;
    isExpired: boolean;
    countdown: number | string | null;
    isIdleBackingOff: boolean;
    currentProgressRef: React.RefObject<number>;
    targetProgressRef: React.RefObject<number>;
    setIsExpired: (expired: boolean) => void;
    // Tambahkan 2 prop ref ini di bawah:
    countdownFinishedTimeRef: React.RefObject<number>;
    lastActivityTimeRef: React.RefObject<number>;
}

export function useRacerAnimation({
    motorImages,
    paragraph,
    input,
    isFinished,
    isExpired,
    countdown,
    isIdleBackingOff,
    currentProgressRef,
    targetProgressRef,
    setIsExpired,
    countdownFinishedTimeRef, // <-- Terima dari props
    lastActivityTimeRef,      // <-- Terima dari props
}: UseRacerAnimationProps) {
    const [racers, setRacers] = useState<Racer[]>(() => 
        INITIAL_RACERS.map((racer) => {
            let img = motorImages.motor2;
            if (racer.id === 1) img = motorImages.motor1;
            if (racer.id === 3) img = motorImages.motor3;
            if (racer.id === 4) img = motorImages.motor4;
            return { ...racer, image: img };
        })
    );

    const animationRef = useRef<number | null>(null);

    // Game loop utama (requestAnimationFrame)
    useEffect(() => {
        if (countdown !== null || isFinished || isExpired) return;

        const runGameLoop = () => {
            const currentTime = performance.now();

            if (input.length === 0) {
                if (currentTime - countdownFinishedTimeRef.current > 4000) {
                    setIsExpired(true);
                    return;
                }
            } else {
                if (currentTime - lastActivityTimeRef.current > 5000) {
                    setIsExpired(true);
                    return;
                }
            }

            if (isIdleBackingOff && input.length > 0 && input !== paragraph) {
                targetProgressRef.current = Math.max(6, targetProgressRef.current - 0.15);
            }

            const diff = targetProgressRef.current - currentProgressRef.current;
            currentProgressRef.current += diff * 0.08;

            const isNearLast25Chars = paragraph.length > 0 && input.length >= paragraph.length - 25;

            setRacers((currentRacers) => {
                return currentRacers.map((racer) => {
                    if (racer.isPlayer) {
                        return { ...racer, progress: isFinished ? 90 : currentProgressRef.current };
                    } else {
                        if (isFinished) {
                            return { ...racer, progress: racer.progress + (90 - racer.progress) * 0.15 };
                        }

                        let speedMultiplier = 0.8 + Math.random() * 0.3;
                        if ((racer.id === 3 || racer.id === 4) && isNearLast25Chars) speedMultiplier = 0.2;
                        if (racer.id === 1 && isNearLast25Chars) speedMultiplier = 1.4;

                        const nextProg = racer.progress + (racer.baseSpeed * speedMultiplier);
                        return { ...racer, progress: Math.min(racer.id === 1 ? 105 : 90, nextProg) };
                    }
                });
            });

            animationRef.current = requestAnimationFrame(runGameLoop);
        };

        animationRef.current = requestAnimationFrame(runGameLoop);
        return () => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
        };
    }, [
        countdown, 
        input, 
        isFinished, 
        isExpired, 
        isIdleBackingOff, 
        paragraph, 
        currentProgressRef, 
        targetProgressRef, 
        setIsExpired,
        countdownFinishedTimeRef,
        lastActivityTimeRef
    ]);

    // Tidak perlu return ref lagi di sini karena sudah dikelola di luar/parent
    return { racers, setRacers };
}