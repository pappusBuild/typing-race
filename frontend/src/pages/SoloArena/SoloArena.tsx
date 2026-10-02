import { useEffect, useRef, useState } from "react";
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

const PARAGRAPHS = [
    "Every morning brings a new chance to move forward, learn something useful, and become better than yesterday. Small steps may seem unimportant at first, but consistent effort can create meaningful progress when you keep going with patience and confidence.",

    "The road ahead does not need to be perfect before you begin. Sometimes the best way to understand your direction is simply to start moving, observe what happens, and make small adjustments while continuing toward your destination.",

    "Technology gives us many tools to create, explore, and solve problems in creative ways. Learning how those tools work takes time, but every mistake provides another opportunity to understand the process and build stronger skills.",

    "A quiet afternoon can become surprisingly productive when distractions are removed and attention is given to one simple task. Progress does not always happen quickly, yet focused work repeated every day can eventually produce something worth being proud of.",
];

type Racer = {
    id: number;
    progress: number;
    speed: number;
    image: string;
    isPlayer: boolean;
};

const INITIAL_RACERS: Racer[] = [
    {
        id: 1,
        progress: 0,
        speed: 0.035,
        image: motor1,
        isPlayer: false,
    },
    {
        id: 2,
        progress: 0,
        speed: 0,
        image: motor2,
        isPlayer: true,
    },
    {
        id: 3,
        progress: 0,
        speed: 0.055,
        image: motor3,
        isPlayer: false,
    },
    {
        id: 4,
        progress: 0,
        speed: 0.045,
        image: motor4,
        isPlayer: false,
    },
];

type SparkleEffect = {
    id: number;
    x: number;
    y: number;
};

export default function SoloArena() {
    const [paragraph] = useState(
        () =>
            PARAGRAPHS[
                Math.floor(Math.random() * PARAGRAPHS.length)
            ]
    );

    const [input, setInput] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [playerProgress, setPlayerProgress] = useState(0);
    const [racers, setRacers] = useState<Racer[]>(INITIAL_RACERS);
    const [sparkles, setSparkles] = useState<SparkleEffect[]>([]);
    const [countdown, setCountdown] = useState<number | string | null>(3);

    const inputRef = useRef<HTMLInputElement>(null);

    // Khusus untuk menentukan posisi scroll setelah countdown
    const paragraphAnchorRef = useRef<HTMLDivElement>(null);

    const startTimeRef = useRef<number | null>(null);
    const wpmRef = useRef(0);
    const animationRef = useRef<number | null>(null);

    // COUNTDOWN + AUTO SCROLL
    useEffect(() => {
        if (countdown === null) {
            startTimeRef.current = performance.now();

            const paragraphAnchor =
                paragraphAnchorRef.current;

            if (paragraphAnchor) {
                const anchorRect =
                    paragraphAnchor.getBoundingClientRect();
                
                // Menghitung posisi agar container paragraf berada di 1/4 bagian atas viewport
                const targetY =
                    anchorRect.top +
                    window.scrollY -
                    window.innerHeight / 4;

                window.scrollTo({
                    top: Math.max(0, targetY),
                    behavior: "smooth",
                });
            }

            inputRef.current?.focus();

            return;
        }

        const timer = window.setTimeout(() => {
            if (countdown === 3) {
                setCountdown(2);
            } else if (countdown === 2) {
                setCountdown(1);
            } else if (countdown === 1) {
                setCountdown("GO!");
            } else if (countdown === "GO!") {
                setCountdown(null);
            }
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [countdown]);

    // Trigger sparkle animation helper
    const triggerSparkle = () => {
        const id = Date.now();
        const randomX = Math.min(playerProgress, 92);
        const randomY = 48 + (Math.random() * 10 - 5);

        setSparkles((prev) => [
            ...prev,
            {
                id,
                x: randomX,
                y: randomY,
            },
        ]);

        setTimeout(() => {
            setSparkles((prev) =>
                prev.filter((s) => s.id !== id)
            );
        }, 800);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (isFinished || countdown !== null) return;

        if (
            event.key === "Backspace" ||
            event.key === "Delete"
        ) {
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
                    const correctedInput =
                        input.slice(0, lastIndex) + event.key;

                    setInput(correctedInput);

                    if (
                        [".", "?", "!"].includes(event.key) ||
                        correctedInput === paragraph
                    ) {
                        triggerSparkle();
                    }

                    const elapsedMinutes = startTimeRef.current
                        ? (performance.now() -
                              startTimeRef.current) /
                          1000 /
                          60
                        : 0;

                    if (elapsedMinutes > 0) {
                        const wpm =
                            correctedInput.length /
                            5 /
                            elapsedMinutes;

                        wpmRef.current = wpm;
                    }

                    if (correctedInput === paragraph) {
                        setIsFinished(true);
                    }
                }

                return;
            }
        }
    };

    const handleChange = (value: string) => {
        if (isFinished || countdown !== null) return;

        const previousLength = input.length;

        if (value.length !== previousLength + 1) return;

        setInput(value);

        const latestChar = value[value.length - 1];

        if (
            [".", "?", "!"].includes(latestChar) ||
            value === paragraph
        ) {
            triggerSparkle();
        }

        const elapsedMinutes = startTimeRef.current
            ? (performance.now() -
                  startTimeRef.current) /
              1000 /
              60
            : 0;

        if (elapsedMinutes > 0) {
            const wpm =
                value.length / 5 / elapsedMinutes;

            wpmRef.current = wpm;
        }

        if (value === paragraph) {
            setIsFinished(true);
        }
    };

    // GHOST RIDERS ANIMATION
    useEffect(() => {
        if (isFinished || countdown !== null) return;

        const animateGhosts = () => {
            setRacers((currentRacers) =>
                currentRacers.map((racer) => {
                    if (racer.isPlayer) return racer;

                    return {
                        ...racer,
                        progress: Math.min(
                            92,
                            racer.progress + racer.speed
                        ),
                    };
                })
            );

            animationRef.current =
                requestAnimationFrame(animateGhosts);
        };

        animationRef.current =
            requestAnimationFrame(animateGhosts);

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isFinished, countdown]);

    // PLAYER MOTOR ANIMATION
    useEffect(() => {
        if (isFinished || countdown !== null) return;

        const animatePlayer = () => {
            const wpm = wpmRef.current;

            if (wpm > 0) {
                setPlayerProgress((current) => {
                    const speed = wpm * 0.0025;

                    return Math.min(
                        92,
                        current + speed
                    );
                });
            }

            animationRef.current =
                requestAnimationFrame(animatePlayer);
        };

        animationRef.current =
            requestAnimationFrame(animatePlayer);

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isFinished, countdown]);

    // FINISH ANIMATION
    useEffect(() => {
        if (!isFinished) return;

        const finishAnimation = window.setInterval(() => {
            setPlayerProgress((current) => {
                if (current >= 92) {
                    window.clearInterval(finishAnimation);
                    return 92;
                }

                return Math.min(
                    92,
                    current + 1.5
                );
            });
        }, 30);

        return () => {
            window.clearInterval(finishAnimation);
        };
    }, [isFinished]);

    const hasTypo =
        input.length > 0 &&
        input[input.length - 1] !==
            paragraph[input.length - 1];

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#210535] text-white">

            {/* COUNTDOWN */}
            {countdown !== null && (
                <div className="absolute inset-0 -top-64 z-50 flex items-center justify-center bg-black/60">
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

            {/* HEADER */}
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

            {/* ARENA */}
            <section className="relative h-90 overflow-hidden border-y-4 border-cyan-400 bg-game-primary">
                <div className="absolute inset-x-0 inset-y-4 flex items-center overflow-hidden bg-primary-game">
                    <div className="absolute left-8 flex items-center gap-16 animate-road">
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
                    className="absolute left-0 top-4 z-10 h-[calc(100%-2rem)] w-auto"
                />

                <img
                    src={finish}
                    alt="Finish"
                    className="absolute right-0 top-4 z-10 h-[calc(100%-2rem)] w-auto"
                />

                {/* GHOST RIDERS */}
                {racers
                    .filter((racer) => !racer.isPlayer)
                    .map((racer, index) => (
                        <img
                            key={racer.id}
                            src={racer.image}
                            alt=""
                            className={cn(
                                "absolute z-10 h-12 w-auto transition-none",
                                racer.id === 1 &&
                                    "opacity-90",
                                racer.id === 3 &&
                                    "opacity-80",
                                racer.id === 4 &&
                                    "opacity-85"
                            )}
                            style={{
                                left: `${Math.min(
                                    racer.progress,
                                    92
                                )}%`,
                                top: `${
                                    30 + index * 12
                                }%`,
                                transform:
                                    "translateX(-50%)",
                            }}
                        />
                    ))}

                {/* PLAYER / MOTOR 2 */}
                <img
                    src={motor2}
                    alt="Your motor"
                    className="absolute z-20 h-12 w-auto transition-none"
                    style={{
                        left: `${Math.min(
                            playerProgress,
                            92
                        )}%`,
                        top: "48%",
                        transform:
                            "translateX(-50%)",
                    }}
                />

                {/* SPARKLE EFFECTS */}
                {sparkles.map((sparkle) => (
                    <div
                        key={sparkle.id}
                        className="pointer-events-none absolute z-30 animate-ping text-yellow-300"
                        style={{
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                            transform:
                                "translate(-50%, -50%)",
                        }}
                    >
                        <Sparkles className="h-8 w-8 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                    </div>
                ))}
            </section>

            {/* TYPING AREA */}
            <section className="relative min-h-100 overflow-hidden bg-[#210535]">

                {/* ASTREA */}
                <img
                    src={astreaTyping}
                    alt=""
                    className="pointer-events-none absolute inset-x-0 -bottom-32 z-0 mx-auto w-full object-contain"
                />

                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-2">

                    {/* ANCHOR SCROLL */}
                    <div
                        ref={paragraphAnchorRef}
                        className="absolute -top-5 h-px w-px"
                    />

                    {/* PARAGRAPH CONTAINER */}
                    <div className="relative w-full max-w-3xl rounded-[28px] border-8 border-[#555] bg-black p-5 shadow-[0_12px_0_#111]">

                        {/* PARAGRAPH BOX */}
                        <div className="min-h-32 rounded-2xl bg-white p-6 font-mono text-xl tracking-wide leading-relaxed text-black shadow-inner">
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

                    {/* HIDDEN INPUT */}
                    <input
                        ref={inputRef}
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(event) =>
                            handleChange(
                                event.target.value
                            )
                        }
                        disabled={
                            isFinished ||
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