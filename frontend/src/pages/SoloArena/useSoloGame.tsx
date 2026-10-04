//hook react untuk mengelola logika permainan Solo Arena
import { useEffect, useRef, useState, useCallback } from "react";

const PARAGRAPH =
    "Every morning brings a new chance to move forward, learn something useful, and become better than yesterday. Small steps may seem unimportant at first, but consistent effort can create meaningful progress when you keep going with patience and confidence.";

export type Racer = {
    id: number;
    progress: number;
    baseSpeed: number;
    image: string;
    isPlayer: boolean;
};

const INITIAL_RACERS: Racer[] = [
    { id: 1, progress: 6, baseSpeed: 0.05, image: "", isPlayer: false },
    { id: 2, progress: 6, baseSpeed: 0, image: "", isPlayer: true },
    { id: 3, progress: 6, baseSpeed: 0.042, image: "", isPlayer: false },
    { id: 4, progress: 6, baseSpeed: 0.046, image: "", isPlayer: false },
];

type SparkleEffect = {
    id: number;
    x: number;
    y: number;
};

interface UseSoloGameProps {
    motorImages: {
        motor1: string;
        motor2: string;
        motor3: string;
        motor4: string;
    };
}

export function useSoloGame({ motorImages }: UseSoloGameProps) {
    const [paragraph] = useState(() => PARAGRAPH);
    const [input, setInput] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    
    const [racers, setRacers] = useState<Racer[]>(() => 
        INITIAL_RACERS.map((racer) => {
            let img = motorImages.motor2;
            if (racer.id === 1) img = motorImages.motor1;
            if (racer.id === 3) img = motorImages.motor3;
            if (racer.id === 4) img = motorImages.motor4;
            return { ...racer, image: img };
        })
    );

    const [sparkles, setSparkles] = useState<SparkleEffect[]>([]);
    const [countdown, setCountdown] = useState<number | string | null>(3);
    const [isIdleBackingOff, setIsIdleBackingOff] = useState(false);
    
    const targetProgressRef = useRef(6);
    const currentProgressRef = useRef(6);
    const lastInputTimeRef = useRef<number>(0);
    const hasBackedOffOnTypoRef = useRef<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const paragraphAnchorRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const lastActivityTimeRef = useRef<number>(0);
    const countdownFinishedTimeRef = useRef<number>(0);

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

    const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
        if (isExpired && event.key === "Enter") {
            window.location.reload();
        }
    }, [isExpired]);

    useEffect(() => {
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    useEffect(() => {
        if (countdown === null) {
            inputRef.current?.focus({ preventScroll: true });
            smoothScrollBy(128, 500);
            const now = performance.now();
            lastActivityTimeRef.current = now;
            countdownFinishedTimeRef.current = now;
            return;
        }
        const timer = window.setTimeout(() => {
            if (countdown === 3) setCountdown(2);
            else if (countdown === 2) setCountdown(1);
            else if (countdown === 1) setCountdown("GO!");
            else if (countdown === "GO!") setCountdown(null);
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [countdown]);

    const triggerSparkle = (currentProg: number) => {
        const id = Date.now();
        const displayX = Math.min(Math.max(currentProg, 6), 90);
        const randomY = 48 + (Math.random() * 10 - 5);
        setSparkles((prev) => [...prev, { id, x: displayX, y: randomY }]);
        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 800);
    };

    const hasTypo =
        input.length > 0 &&
        input[input.length - 1] !==
            paragraph[input.length - 1];

    const isNearEnd = input.length >= paragraph.length - 3;
    const showFinishLine = isFinished || isNearEnd;
    const hasStartedTypingCorrectly = input.length > 0;

    const updateProgressAndInput = useCallback((newInput: string, isTypoError: boolean = false) => {
        if (isFinished || isExpired || countdown !== null) return;
        
        const now = performance.now();
        const timeDiff = now - lastInputTimeRef.current;
        lastInputTimeRef.current = now;

        setInput(newInput);
        lastActivityTimeRef.current = now;
        setIsIdleBackingOff(false);

        const ratio = newInput.length / paragraph.length;

        let estimatedWPM = 50; 
        if (timeDiff > 0 && timeDiff < 2000) {
            const charsPerSec = 1000 / timeDiff;
            estimatedWPM = charsPerSec * 12; 
        }

        let targetBase = 50; 
        if (estimatedWPM > 55) {
            targetBase = 74;
        }

        if (newInput === paragraph) {
            targetBase = 90;
        }

        const calculatedPercent = 6 + ratio * (targetBase - 6);

        if (!isTypoError) {
            hasBackedOffOnTypoRef.current = false;
            targetProgressRef.current = Math.max(targetProgressRef.current, calculatedPercent);
        } else {
            if (!hasBackedOffOnTypoRef.current) {
                const backedOff = Math.max(6, currentProgressRef.current - 1.5);
                targetProgressRef.current = backedOff;
                hasBackedOffOnTypoRef.current = true;
            } else {
                targetProgressRef.current = currentProgressRef.current;
            }
        }

        if (newInput === paragraph) {
            setIsFinished(true);
            targetProgressRef.current = 90;
        } else {
            targetProgressRef.current = Math.min(90, targetProgressRef.current);
        }

        const latestChar = newInput[newInput.length - 1];
        if ([".", "?", "!"].includes(latestChar) || newInput === paragraph) {
            triggerSparkle(targetProgressRef.current);
        }
    }, [countdown, isExpired, isFinished, paragraph]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isFinished || isExpired || countdown !== null) return;
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
                    updateProgressAndInput(correctedInput, false);
                } else {
                    updateProgressAndInput(input, true);
                }
                return;
            }
        }
    };

    const handleChange = (value: string) => {
        if (isFinished || isExpired || countdown !== null) return;
        const previousLength = input.length;
        if (value.length !== previousLength + 1) return;

        const latestChar = value[value.length - 1];
        const expectedChar = paragraph[value.length - 1];
        const isTypoError = latestChar !== expectedChar;

        updateProgressAndInput(value, isTypoError);
    };

    useEffect(() => {
        if (countdown !== null || isFinished || isExpired || input.length === 0 || input === paragraph) return;

        const idleCheckInterval = window.setInterval(() => {
            const now = performance.now();
            const timeSinceLastActivity = now - lastActivityTimeRef.current;

            if (timeSinceLastActivity > 1000 && !isIdleBackingOff) {
                setIsIdleBackingOff(true);
            }
        }, 100);

        return () => window.clearInterval(idleCheckInterval);
    }, [countdown, isFinished, isExpired, input, paragraph, isIdleBackingOff]);

    useEffect(() => {
        if (countdown !== null || isFinished || isExpired) return;

        const runGameLoop = () => {
            const currentTime = performance.now();

            if (input.length === 0) {
                const timeSinceStart = currentTime - countdownFinishedTimeRef.current;
                if (timeSinceStart > 20000) {
                    setIsExpired(true);
                    return;
                }
            } else {
                const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;
                if (timeSinceLastActivity > 20000) {
                    setIsExpired(true);
                    return;
                }
            }

            if (isIdleBackingOff && input.length > 0 && input !== paragraph) {
                targetProgressRef.current = Math.max(6, targetProgressRef.current - 0.15);
            }

            const diff = targetProgressRef.current - currentProgressRef.current;
            const smoothingFactor = 0.08;
            currentProgressRef.current += diff * smoothingFactor;

            const isNearLast25Chars = input.length >= paragraph.length - 25;

            setRacers((currentRacers) => {
                return currentRacers.map((racer) => {
                    if (racer.isPlayer) {
                        return {
                            ...racer,
                            progress: isFinished ? 90 : currentProgressRef.current,
                        };
                    } else {
                        if (isFinished) {
                            const targetEndpoint = 90;
                            const diffFinish = targetEndpoint - racer.progress;
                            return {
                                ...racer,
                                progress: racer.progress + diffFinish * 0.15,
                            };
                        }

                        let speedMultiplier = 0.8 + Math.random() * 0.3;

                        if ((racer.id === 3 || racer.id === 4) && isNearLast25Chars) {
                            speedMultiplier = 0.2;
                        }

                        if (racer.id === 1 && isNearLast25Chars) {
                            speedMultiplier = 1.4;
                        }

                        const nextProg = racer.progress + (racer.baseSpeed * speedMultiplier);
                        const maxLimit = racer.id === 1 ? 105 : 90;
                        return {
                            ...racer,
                            progress: Math.min(maxLimit, nextProg),
                        };
                    }
                });
            });

            animationRef.current = requestAnimationFrame(runGameLoop);
        };

        animationRef.current = requestAnimationFrame(runGameLoop);
        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [countdown, input, input.length, isFinished, isExpired, isIdleBackingOff, paragraph]);

    useEffect(() => {
        if (isFinished) {
            const finishTimer = window.setInterval(() => {
                setRacers((prev) => {
                    const allDone = prev.every((r) => {
                        const target = 90;
                        return Math.abs(r.progress - target) < 0.1;
                    });
                    if (allDone) {
                        window.clearInterval(finishTimer);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return prev;
                    }
                    return prev.map((r) => {
                        const target = 90;
                        return {
                            ...r,
                            progress: r.progress + (target - r.progress) * 0.15,
                        };
                    });
                });
            }, 30);
            return () => window.clearInterval(finishTimer);
        }
    }, [isFinished]);

    return {
        paragraph,
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