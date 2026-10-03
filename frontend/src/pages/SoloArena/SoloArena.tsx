import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";
import { Logo } from "@/components/ui/logo/logo";
import motor1 from "@/assets/game/motors/neon/neon-default.svg";
import motor2 from "@/assets/game/motors/phantom/phantom-default.svg";
import motor3 from "@/assets/game/motors/speedster/speedster-default.svg";
import motor4 from "@/assets/game/motors/speedster/speedster-level-2.svg";
import start from "@/assets/game/accecories/start.svg";
import finish from "@/assets/game/accecories/finish.svg";
import arenaIllustration from "@/assets/game/accecories/arena-illustration.png";
import astreaTyping from "@/assets/game/accecories/astrea-typing.svg";

const PARAGRAPH =
    "Every morning brings a new chance to move forward, learn something useful, and become better than yesterday. Small steps may seem unimportant at first, but consistent effort can create meaningful progress when you keep going with patience and confidence.";

type Racer = {
    id: number;
    progress: number;
    baseSpeed: number;
    image: string;
    isPlayer: boolean;
};

const INITIAL_RACERS: Racer[] = [
    { id: 1, progress: 6, baseSpeed: 0.05, image: motor1, isPlayer: false },
    { id: 2, progress: 6, baseSpeed: 0, image: motor2, isPlayer: true },
    { id: 3, progress: 6, baseSpeed: 0.042, image: motor3, isPlayer: false },
    { id: 4, progress: 6, baseSpeed: 0.046, image: motor4, isPlayer: false },
];

type SparkleEffect = {
    id: number;
    x: number;
    y: number;
};

export default function SoloArena() {
    const [paragraph] = useState(() => PARAGRAPH);
    const [input, setInput] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [racers, setRacers] = useState<Racer[]>(INITIAL_RACERS);
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

    useEffect(() => {
        const handleDocumentMouseDown = (e: MouseEvent) => {
            if (countdown === null && !isFinished && !isExpired) {
                const target = e.target as HTMLElement;
                if (target.tagName === 'BUTTON' || target.tagName === 'A') return;
                inputRef.current?.focus({ preventScroll: true });
            }
        };
        document.addEventListener("mousedown", handleDocumentMouseDown);
        return () => document.removeEventListener("mousedown", handleDocumentMouseDown);
    }, [countdown, isFinished, isExpired]);

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

    const racerSlots = ["18%", "38%", "58%", "78%"];

    return (
        <main 
            className="relative min-h-screen overflow-hidden bg-[#210535] text-white select-none"
            onClick={() => {
                if (countdown === null && !isFinished && !isExpired) {
                    inputRef.current?.focus({ preventScroll: true });
                }
            }}
        >
            {countdown !== null && (
                <div className="absolute inset-0 -top-64 z-50 flex items-center justify-center bg-black/60 select-none">
                    <div className="flex flex-col items-center gap-3">
                        <div
                            key={String(countdown)}
                            className={cn(
                                "h-16 w-16 rounded-full transition-all duration-300 animate-bounce",
                                countdown === 3 &&
                                    "bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.9)] scale-110",
                                countdown === 2 &&
                                    "bg-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.9)] scale-110",
                                (countdown === 1 ||
                                    countdown === "GO!") &&
                                    "bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.9)] scale-110"
                            )}
                        />
                        <span className="font-mono text-2xl font-extrabold tracking-widest text-white drop-shadow-md">
                            {countdown === "GO!"
                                ? "GO!"
                                : countdown}
                        </span>
                    </div>
                </div>
            )}

            {isExpired && (
                <div className="absolute inset-0 z-50 -top-48 flex items-center justify-center bg-black/80 select-none">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#3e2723] p-8 border border-white/20 text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-red-400">Match Expired</h2>
                        <p className="text-sm text-gray-300">
                            Time's expired because there is no activity.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-2 rounded-lg bg-cyan-500 px-6 py-2 font-bold text-black transition hover:bg-cyan-400 focus:ring-2 focus:ring-white"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}

            <header className="relative z-20 flex h-20 items-center justify-between overflow-hidden border-b border-white/10 px-8">
                <img
                    src={arenaIllustration}
                    alt=""
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex w-full items-center justify-between">
                    <Logo />
                    <button className="font-mono text-xl text-cyan-300 transition hover:text-cyan-200">
                        {"</>"}
                    </button>
                </div>
            </header>

            <section className="relative h-90 overflow-hidden bg-game-primary">
                <div className="absolute inset-x-0 top-3 bottom-3 bg-game-primary overflow-hidden">
                    <div className="absolute inset-y-0 inset-x-0 flex items-center overflow-hidden">
                        <div 
                            className={cn(
                                "absolute h-32 left-4 flex items-center gap-16 will-change-transform",
                                countdown === null && hasStartedTypingCorrectly && !isFinished && "animate-road"
                            )}
                        >
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-2 w-12 shrink-0 bg-white/40"
                                />
                            ))}
                        </div>
                    </div>
                    <img
                        src={start}
                        alt="Start"
                        className={cn(
                            "absolute top-0 z-10 h-full w-auto transition-all duration-1000 ease-out will-change-transform",
                            hasStartedTypingCorrectly ? "-translate-x-full opacity-0" : "left-[16px] opacity-100"
                        )}
                    />
                    <img
                        src={finish}
                        alt="Finish"
                        className={cn(
                            "absolute top-0 z-10 h-full w-auto transition-all duration-700 ease-in-out will-change-transform right-0",
                            showFinishLine
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 translate-x-12"
                        )}
                    />
                    
                    {racers.map((racer, index) => (
                        <img
                            key={racer.id}
                            src={racer.image}
                            alt=""
                            className={cn(
                                "absolute z-20 h-12 w-auto will-change-transform",
                                !racer.isPlayer && racer.id === 1 && "opacity-90",
                                !racer.isPlayer && racer.id === 3 && "opacity-80",
                                !racer.isPlayer && racer.id === 4 && "opacity-85"
                            )}
                            style={{
                                left: `${racer.isPlayer ? Math.max(6, Math.min(racer.progress, 90)) : racer.progress}%`,
                                top: racerSlots[index],
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ))}

                    {sparkles.map((sparkle) => (
                        <div
                            key={sparkle.id}
                            className="pointer-events-none absolute z-30 animate-ping text-yellow-300"
                            style={{
                                left: `${sparkle.x}%`,
                                top: `${sparkle.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Sparkles className="h-8 w-8 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative min-h-100 overflow-hidden bg-[#210535]">
                <img
                    src={astreaTyping}
                    alt=""
                    className="pointer-events-none absolute inset-x-0 -bottom-32 z-0 mx-auto w-full object-contain"
                />
                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-2">
                    <div
                        ref={paragraphAnchorRef}
                        className="absolute -top-5 h-px w-px"
                    />
                    <div className="relative w-full max-w-3xl rounded-[28px] border-8 border-[#555] bg-black p-5 shadow-[0_12px_0_#111]">
                        <div className="min-h-32 rounded-2xl bg-white p-6 font-mono text-xl tracking-wide leading-relaxed text-black shadow-inner select-none">
                            {paragraph
                                .split("")
                                .map((character, index) => {
                                    const typedCharacter =
                                        input[index];
                                    const isTypo =
                                        typedCharacter !==
                                            undefined &&
                                        typedCharacter !==
                                            character;
                                    const isCorrect =
                                        typedCharacter !==
                                            undefined &&
                                        typedCharacter ===
                                            character;
                                    const isCurrent =
                                        index === input.length &&
                                        !hasTypo;
                                    return (
                                        <span
                                            key={`${character}-${index}`}
                                            className={cn(
                                                "relative rounded-none",
                                                isCorrect &&
                                                    "text-black",
                                                isTypo &&
                                                    "bg-red-600 text-white",
                                                isCurrent &&
                                                    "bg-green-500 text-white"
                                            )}
                                        >
                                            {character}
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                    <input
                        ref={inputRef}
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(event) =>
                            handleChange(
                                event.target.value
                            )
                        }
                        onBlur={() => {
                            if (!isFinished && !isExpired && countdown === null) {
                                setTimeout(() => {
                                    inputRef.current?.focus({ preventScroll: true });
                                }, 50);
                            }
                        }}
                        disabled={
                            isFinished ||
                            isExpired ||
                            countdown !== null
                        }
                        autoComplete="off"
                        spellCheck={false}
                        className="h-0 w-0 opacity-0"
                        aria-label="Type the paragraph"
                    />
                </div>
            </section>
        </main>
    );
}