// component React untuk menampilkan tampilan permainan Solo Arena
import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo/logo";
import type { Racer } from "./useSoloGame";

interface SoloArenaViewProps {
    paragraph: string;
    input: string;
    isFinished: boolean;
    isExpired: boolean;
    racers: Racer[];
    sparkles: Array<{ id: number; x: number; y: number }>;
    countdown: number | string | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
    paragraphAnchorRef: React.RefObject<HTMLDivElement | null>;
    hasStartedTypingCorrectly: boolean;
    showFinishLine: boolean;
    hasTypo: boolean;
    assets: {
        start: string;
        finish: string;
        arenaIllustration: string;
        astreaTyping: string;
    };
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (value: string) => void;
    onMainClick: () => void;
}

export function SoloArenaView({
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
    assets,
    onKeyDown,
    onChange,
    onMainClick,
}: SoloArenaViewProps) {
    const racerSlots = ["18%", "38%", "58%", "78%"];

    return (
        <main 
            className="relative min-h-screen overflow-hidden bg-[#210535] text-white select-none"
            onClick={onMainClick}
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
                            {countdown === "GO!" ? "GO!" : countdown}
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
                    src={assets.arenaIllustration}
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
                        src={assets.start}
                        alt="Start"
                        className={cn(
                            "absolute top-0 z-10 h-full w-auto transition-all duration-1000 ease-out will-change-transform",
                            hasStartedTypingCorrectly ? "-translate-x-full opacity-0" : "left-5 opacity-100"
                        )}
                    />
                    <img
                        src={assets.finish}
                        alt="Finish"
                        className={cn(
                            "absolute top-0 z-10 h-full w-auto transition-all duration-700 ease-in-out will-change-transform right-0",
                            showFinishLine ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
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
                    src={assets.astreaTyping}
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
                                    const typedCharacter = input[index];
                                    const isTypo =
                                        typedCharacter !== undefined &&
                                        typedCharacter !== character;
                                    const isCorrect =
                                        typedCharacter !== undefined &&
                                        typedCharacter === character;
                                    const isCurrent =
                                        index === input.length && !hasTypo;
                                    return (
                                        <span
                                            key={`${character}-${index}`}
                                            className={cn(
                                                "relative rounded-none",
                                                isCorrect && "text-black",
                                                isTypo && "bg-red-600 text-white",
                                                isCurrent && "bg-green-500 text-white"
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
                        onKeyDown={onKeyDown}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={() => {
                            if (!isFinished && !isExpired && countdown === null) {
                                setTimeout(() => {
                                    inputRef.current?.focus({ preventScroll: true });
                                }, 50);
                            }
                        }}
                        disabled={isFinished || isExpired || countdown !== null}
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