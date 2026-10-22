// typing logic, typo & riders progress
import { useState, useRef, useCallback } from "react";
import type { SparkleEffect } from "./soloGame.types";

interface UseTypingHandlerProps {
    paragraph: string;
    isFinished: boolean;
    isExpired: boolean;
    countdown: number | string | null;
    ghostRiderDataFromDb?: number[]; // Data progress ghost rider dari database hasil training (opsional)
}

export function useTypingHandler({ paragraph, isFinished, isExpired, countdown, ghostRiderDataFromDb }: UseTypingHandlerProps) {
    const [input, setInput] = useState("");
    const [sparkles, setSparkles] = useState<SparkleEffect[]>([]);
    const [isIdleBackingOff, setIsIdleBackingOff] = useState(false);

    const targetProgressRef = useRef(6);
    const currentProgressRef = useRef(6);
    const lastInputTimeRef = useRef<number>(0);
    const hasBackedOffOnTypoRef = useRef<boolean>(false);
    const lastActivityTimeRef = useRef<number>(0);

    const triggerSparkle = (currentProg: number) => {
        const id = Date.now();
        const displayX = Math.min(Math.max(currentProg, 6), 100);
        const randomY = 48 + (Math.random() * 10 - 5);
        setSparkles((prev) => [...prev, { id, x: displayX, y: randomY }]);
        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 800);
    };

    const hasTypo =
        input.length > 0 &&
        paragraph.length > 0 &&
        input[input.length - 1] !== paragraph[input.length - 1];

    const isNearEnd = paragraph.length > 0 && input.length >= paragraph.length - 3;
    const hasStartedTypingCorrectly = input.length > 0;

    const updateProgressAndInput = useCallback((newInput: string, isTypoError: boolean = false, onFinished: () => void) => {
        if (isFinished || isExpired || countdown !== null || !paragraph) return;
        
        const now = performance.now();
        const timeDiff = now - lastInputTimeRef.current;
        lastInputTimeRef.current = now;

        setInput(newInput);
        lastActivityTimeRef.current = now;
        setIsIdleBackingOff(false);

        const totalChars = paragraph.length; 
        const currentLength = newInput.length;
        
        // Dipatok tepat di 100% agar elemen mentok di ujung batas kanan layar/webpage
        const FINISH_PERCENTAGE = 100; 

        let calculatedPercent: number;

        // Pastikan hanya benar-benar selesai jika string input sama persis dengan paragraph (karakter terakhir benar)
        const isCompleteAndCorrect = newInput === paragraph;

        if (isCompleteAndCorrect) {
            calculatedPercent = FINISH_PERCENTAGE;
            onFinished();
        } else {
            const ratio = currentLength / totalChars;
            let estimatedWPM = 50; 
            if (timeDiff > 0 && timeDiff < 2000) {
                const charsPerSec = 1000 / timeDiff;
                estimatedWPM = charsPerSec * 12; 
            }

            let targetBase = 50;
            if (estimatedWPM >= 50) {
                targetBase = 95; // Dinaikkan agar skema pergerakan cepat mendekati ujung kanan
            } else if (estimatedWPM >= 40) {
                targetBase = 88; 
            }

            calculatedPercent = 6 + ratio * (targetBase - 6);
            
            // Batasi agar sebelum benar-benar tuntas, progress tidak langsung menembus 100%
            if (calculatedPercent >= FINISH_PERCENTAGE) {
                calculatedPercent = FINISH_PERCENTAGE - 0.5;
            }
        }

        if (!isTypoError) {
            hasBackedOffOnTypoRef.current = false;
            targetProgressRef.current = Math.max(targetProgressRef.current, calculatedPercent);
        } else {
            if (!hasBackedOffOnTypoRef.current) {
                targetProgressRef.current = Math.max(6, currentProgressRef.current - 1.5);
                hasBackedOffOnTypoRef.current = true;
            } else {
                targetProgressRef.current = currentProgressRef.current;
            }
        }

        // Batas maksimal target progress berdasarkan status kelengkapan
        targetProgressRef.current = isCompleteAndCorrect ? FINISH_PERCENTAGE : Math.min(FINISH_PERCENTAGE - 0.1, targetProgressRef.current);

        const latestChar = newInput[newInput.length - 1];
        if (isCompleteAndCorrect || ([".", "?", "!"].includes(latestChar) && !hasTypo)) {
            triggerSparkle(targetProgressRef.current);
        }
    }, [countdown, isExpired, isFinished, paragraph, hasTypo]);

    return {
        input,
        setInput,
        sparkles,
        isIdleBackingOff,
        setIsIdleBackingOff,
        targetProgressRef,
        currentProgressRef,
        lastActivityTimeRef,
        hasTypo,
        isNearEnd,
        hasStartedTypingCorrectly,
        updateProgressAndInput,
        ghostRiderDataFromDb,
    };
}