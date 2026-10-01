import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo/logo";
import motor1 from "@/assets/game/motors/neon/neon-default.svg";
import motor2 from "@/assets/game/motors/phantom/phantom-default.svg";
import motor3 from "@/assets/game/motors/speedster/speedster-default.svg";
import motor4 from "@/assets/game/motors/speedster/speedster-level-2.svg";
import start from "@/assets/game/accecories/start.svg";
import finish from "@/assets/game/accecories/finish.svg";
import lane from "@/assets/game/accecories/lane.svg"
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
lane: number;
progress: number;
speed: number;
image: string;
isPlayer: boolean;
};

const INITIAL_RACERS: Racer[] = [
{
id: 1,
lane: 0,
progress: 0,
speed: 0.035,
image: motor1,
isPlayer: false,
},
{
id: 2,
lane: 1,
progress: 0,
speed: 0,
image: motor2,
isPlayer: true,
},
{
id: 3,
lane: 2,
progress: 0,
speed: 0.055,
image: motor3,
isPlayer: false,
},
{
id: 4,
lane: 3,
progress: 0,
speed: 0.045,
image: motor4,
isPlayer: false,
},
];

const getRandomParagraph = () =>
PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];

export default function SoloArena() {
const [paragraph, setParagraph] = useState(PARAGRAPHS[0]);
const [input, setInput] = useState("");
const [isStarted, setIsStarted] = useState(false);
const [isFinished, setIsFinished] = useState(false);
const [playerProgress, setPlayerProgress] = useState(0);
const [racers, setRacers] = useState(INITIAL_RACERS);

const inputRef = useRef<HTMLInputElement>(null);
const startTimeRef = useRef<number | null>(null);
const wpmRef = useRef(0);
const animationRef = useRef<number | null>(null);

const startGame = () => {
if (isStarted || isFinished) return;

setParagraph(getRandomParagraph());
setInput("");
setPlayerProgress(0);
setRacers(INITIAL_RACERS);

setIsStarted(true);
startTimeRef.current = performance.now();
wpmRef.current = 0;

requestAnimationFrame(() => {
    inputRef.current?.focus();
});
};

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isStarted || isFinished) return;

    // Backspace tidak digunakan untuk memperbaiki typo.
    if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        return;
    }

    // Kalau karakter terakhir masih typo, karakter berikutnya
    // langsung menggantikan typo tersebut tanpa perlu Backspace.
    if (input.length > 0) {
        const lastIndex = input.length - 1;
        const lastCharacter = input[lastIndex];
        const expectedCharacter = paragraph[lastIndex];

        if (lastCharacter !== expectedCharacter) {
            // Hanya proses tombol karakter biasa.
            if (event.key.length !== 1) {
                event.preventDefault();
                return;
            }

            event.preventDefault();

            if (event.key === expectedCharacter) {
                const correctedInput =
                    input.slice(0, lastIndex) + event.key;

                setInput(correctedInput);

                const elapsedMinutes = startTimeRef.current
                    ? (performance.now() - startTimeRef.current) / 1000 / 60
                    : 0;

                if (elapsedMinutes > 0) {
                    const wpm = correctedInput.length / 5 / elapsedMinutes;
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
    if (!isStarted || isFinished) return;

    const previousLength = input.length;

    // Jangan izinkan paste atau perubahan lebih dari 1 karakter.
    if (value.length !== previousLength + 1) return;

    setInput(value);

    const elapsedMinutes = startTimeRef.current
        ? (performance.now() - startTimeRef.current) / 1000 / 60
        : 0;

    if (elapsedMinutes > 0) {
        const wpm = value.length / 5 / elapsedMinutes;
        wpmRef.current = wpm;
    }

    if (value === paragraph) {
        setIsFinished(true);
    }
};
/*
* GHOST RACERS
*
* Ghost hanya bergerak selama user masih mengetik.
* Mereka tidak menggunakan WPM user.
*/
useEffect(() => {
if (!isStarted || isFinished) return;

const animateGhosts = () => {
    setRacers((currentRacers) =>
    currentRacers.map((racer) => {
        if (racer.isPlayer) return racer;

        return {
        ...racer,
        progress: Math.min(92, racer.progress + racer.speed),
        };
    }),
    );

    animationRef.current = requestAnimationFrame(animateGhosts);
};

animationRef.current = requestAnimationFrame(animateGhosts);

return () => {
    if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    }
};
}, [isStarted, isFinished]);

/*
* PLAYER MOTOR
*
* Kecepatan motor mengikuti WPM.
*/
useEffect(() => {
if (!isStarted || isFinished) return;

const animatePlayer = () => {
    const wpm = wpmRef.current;

    if (wpm > 0) {
    setPlayerProgress((current) => {
        const speed = wpm * 0.0025;

        return Math.min(92, current + speed);
    });
    }

    animationRef.current = requestAnimationFrame(animatePlayer);
};

animationRef.current = requestAnimationFrame(animatePlayer);

return () => {
    if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    }
};
}, [isStarted, isFinished]);

/*
* FINISH SEQUENCE
*
* Begitu typing selesai:
* - ghost tidak ikut
* - player melanjutkan perjalanan
* - player mencapai finish sendirian
*/
useEffect(() => {
if (!isFinished) return;

const finishAnimation = window.setInterval(() => {
    setPlayerProgress((current) => {
    if (current >= 92) {
        window.clearInterval(finishAnimation);
        return 92;
    }

    return Math.min(92, current + 1.5);
    });
}, 30);

return () => window.clearInterval(finishAnimation);
}, [isFinished]);

const resetGame = () => {
setParagraph(getRandomParagraph());
setInput("");
setIsStarted(false);
setIsFinished(false);
setPlayerProgress(0);
setRacers(INITIAL_RACERS);

startTimeRef.current = null;
wpmRef.current = 0;
};

return (
<main className="min-h-screen overflow-hidden bg-[#210535] text-white">
    {/* HEADER */}
    <header className="relative z-20 flex h-20 items-center justify-between border-b border-white/10 px-8">
    <Logo />

    <button className="font-mono text-xl text-cyan-300 transition hover:text-cyan-200">
        {"</>"}
    </button>
    </header>

    {/* ARENA */}
    <section className="relative h-90 overflow-hidden border-y-4 border-cyan-400 bg-[#8a8963]">
    {/* Arena illustration */}
    <img src={arenaIllustration} alt="" className="absolute inset-0 h-full w-full object-cover" />

    {/* Road */}
    <div className="absolute inset-x-0 inset-y-4 bg-[#5b5958]">
        <div className="absolute inset-0 grid grid-rows-4">
        {[0, 1, 2, 3].map((laneIndex) => (
            <div key={laneIndex} className="relative overflow-hidden">
            <img src={lane} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            </div>
        ))}
        </div>
    </div>

    {/* START */}
    <img src={start} alt="Start" className="absolute left-0 top-4 z-10 h-[calc(100%-2rem)] w-auto" />

    {/* FINISH */}
    <img src={finish} alt="Finish" className="absolute right-0 top-4 z-10 h-[calc(100%-2rem)] w-auto" />

    {/* GHOST RIDERS */}
    {!isFinished &&
        racers
        .filter((racer) => !racer.isPlayer)
        .map((racer) => (
            <img
            key={racer.id}
            src={racer.image}
            alt=""
            className={cn(
                "absolute z-10 h-12 w-auto transition-none",
                racer.id === 1 && "opacity-90",
                racer.id === 3 && "opacity-80",
                racer.id === 4 && "opacity-85",
            )}
            style={{
                left: `${Math.min(racer.progress, 92)}%`,
                top: `${racer.lane * 25 + 8}%`,
                transform: "translateX(-50%)",
            }}
            />
        ))}

    {/* PLAYER / MOTOR 2 */}
    <img
        src={motor2}
        alt="Your motor"
        className="absolute z-20 h-12 w-auto transition-none"
        style={{
        left: `${Math.min(playerProgress, 92)}%`,
        top: "33%",
        transform: "translateX(-50%)",
        }}
    />
    </section>

    {/* TYPING AREA */}
    <section className="relative min-h-100 overflow-hidden bg-[#210535]">
    {/* Astrea typing illustration */}
    <img
        src={astreaTyping}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-full max-w-6xl object-contain"
    />

    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-2">
        {/* TYPING DISPLAY */}
        <div className="relative w-full max-w-3xl rounded-[28px] border-8 border-[#555] bg-black p-5 shadow-[0_12px_0_#111]">
        <div className="min-h-32 rounded-2xl bg-white p-6 text-lg leading-8 text-black shadow-inner">
            {paragraph.split("").map((character, index) => {
            const typedCharacter = input[index];

            // Posisi indikator mengikuti karakter yang sedang diperbaiki.
            // Jika karakter terakhir masih typo, indikator tetap berada
            // di bawah karakter typo tersebut.
            const hasTypoAtCurrentPosition =
                typedCharacter !== undefined &&
                typedCharacter !== character;

            const isCurrent =
                index === input.length ||
                (hasTypoAtCurrentPosition && index === input.length - 1);

            return (
                <span
                key={`${character}-${index}`}
                className={cn(
                    "relative",
                    typedCharacter !== undefined &&
                    typedCharacter !== character &&
                    "text-red-600",
                    typedCharacter === character && "text-green-600",
                    isCurrent && "border-b-2 border-cyan-500",
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
        onChange={(event) => handleChange(event.target.value)}
        disabled={isFinished}
        autoComplete="off"
        spellCheck={false}
        className="h-0 w-0 opacity-0"
        aria-label="Type the paragraph"
        />

        {/* START */}
        {!isStarted && !isFinished && (
        <button
            onClick={startGame}
            className="mt-8 rounded-full bg-white px-10 py-3 font-bold uppercase tracking-widest text-[#210535] transition hover:scale-105"
        >
            Start
        </button>
        )}

        {/* FINISHED */}
        {isFinished && (
        <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-2xl font-bold uppercase tracking-widest">
            Finish!
            </p>

            <button
            onClick={resetGame}
            className="rounded-full border border-white/30 px-8 py-3 font-semibold transition hover:bg-white hover:text-[#210535]"
            >
            Race Again
            </button>
        </div>
        )}
    </div>
    </section>
</main>
);
}