// main file as orchestrator
import { useEffect, useRef, useState } from "react";
import { useTypingHandler } from "./useTypingHandler";
import { useRacerAnimation } from "./userRacerAnimation";

interface UseSoloGameProps {
    motorImages: {
        motor1: string;
        motor2: string;
        motor3: string;
        motor4: string;
    };
}

export function useSoloGame({ motorImages }: UseSoloGameProps) {
    const [paragraph, setParagraph] = useState<string>("");
    const [isLoadingText, setIsLoadingText] = useState<boolean>(true);
    const [isFinished, setIsFinished] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [countdown, setCountdown] = useState<number | string | null>(3);

    const inputRef = useRef<HTMLInputElement>(null);
    const paragraphAnchorRef = useRef<HTMLDivElement>(null);
    const countdownFinishedTimeRef = useRef<number>(0);

    const {
        input,
        sparkles,
        isIdleBackingOff,
        targetProgressRef,
        currentProgressRef,
        lastActivityTimeRef,
        hasTypo,
        isNearEnd,
        hasStartedTypingCorrectly,
        updateProgressAndInput,
    } = useTypingHandler({ paragraph, isFinished, isExpired, countdown });

    const { racers } = useRacerAnimation({
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
        countdownFinishedTimeRef,
        lastActivityTimeRef,
    });

    // Fetch teks dari backend Fastify saat komponen dimuat
    useEffect(() => {
        fetch("http://localhost:3000/texts/random")
            .then((res) => res.json())
            .then((data) => {
                console.log("Data dari backend:", data);
                setParagraph(data.content);
                setIsLoadingText(false);
                setCountdown(3);
            })
            .catch((err) => {
                console.error("Gagal mengambil teks dari backend:", err);
                setIsLoadingText(false);
            });
    }, []);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    const smoothScrollBy = (targetPx: number, duration: number) => {
        const startPosition = window.pageYOffset;
        let startTime: number | null = null;
        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            window.scrollTo(0, Math.round(startPosition + targetPx * ease));
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, startPosition + targetPx);
            }
        };
        requestAnimationFrame(animation);
    };

    // Logika pengurang countdown (3 -> 2 -> 1 -> GO! -> null)
    useEffect(() => {
        if (isLoadingText || countdown === null) return;

        if (countdown === "GO!") {
            const timer = window.setTimeout(() => {
                setCountdown(null);
            }, 1000);
            return () => window.clearTimeout(timer);
        }

        const timer = window.setTimeout(() => {
            if (countdown === 3) setCountdown(2);
            else if (countdown === 2) setCountdown(1);
            else if (countdown === 1) setCountdown("GO!");
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [countdown, isLoadingText]);

    // Efek ketika countdown selesai (berubah jadi null)
    useEffect(() => {
        if (countdown === null && !isLoadingText) {
            inputRef.current?.focus({ preventScroll: true });
            smoothScrollBy(128, 500);
            const now = performance.now();
            lastActivityTimeRef.current = now;
            countdownFinishedTimeRef.current = now;
        }
    }, [countdown, isLoadingText, lastActivityTimeRef]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isFinished || isExpired || countdown !== null || !paragraph) return;
        if (event.key === "Backspace" || event.key === "Delete") {
            event.preventDefault();
            return;
        }
        if (input.length > 0) {
            const lastIndex = input.length - 1;
            const lastCharacter = input[lastIndex];
            const expectedCharacter = paragraph[lastIndex];
            if (lastCharacter !== expectedCharacter) {
                if (event.key.length !== 1) {
                    event.preventDefault();
                    return;
                }
                event.preventDefault();
                if (event.key === expectedCharacter) {
                    const correctedInput = input.slice(0, lastIndex) + event.key;
                    updateProgressAndInput(correctedInput, false, () => setIsFinished(true));
                } else {
                    updateProgressAndInput(input, true, () => setIsFinished(true));
                }
                return;
            }
        }
    };

    const handleChange = (value: string) => {
        if (isFinished || isExpired || countdown !== null || !paragraph) return;
        const previousLength = input.length;
        if (value.length !== previousLength + 1) return;

        const latestChar = value[value.length - 1];
        const expectedChar = paragraph[value.length - 1];
        const isTypoError = latestChar !== expectedChar;

        updateProgressAndInput(value, isTypoError, () => setIsFinished(true));
    };

    const showFinishLine = !isLoadingText && (isFinished || isNearEnd);

    return {
        paragraph,
        isLoadingText,
        input,
        isFinished,
        isExpired,
        racers,
        sparkles,
        countdown,
        inputRef,
        paragraphAnchorRef,
        hasStartedTypingCorrectly,
        showFinishLine,
        hasTypo,
        handleKeyDown,
        handleChange,
    };
}