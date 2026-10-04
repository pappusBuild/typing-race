// main container for the Solo Arena page, managing game state and rendering the view
import { useSoloGame } from "./useSoloGame";
import { SoloArenaView } from "./SoloArenaView";

import motor1 from "@/assets/game/motors/neon/neon-default.svg";
import motor2 from "@/assets/game/motors/phantom/phantom-default.svg";
import motor3 from "@/assets/game/motors/speedster/speedster-default.svg";
import motor4 from "@/assets/game/motors/speedster/speedster-level-2.svg";
import start from "@/assets/game/accecories/start.svg";
import finish from "@/assets/game/accecories/finish.svg";
import arenaIllustration from "@/assets/game/accecories/arena-illustration.png";
import astreaTyping from "@/assets/game/accecories/astrea-typing.svg";

export default function SoloArena() {
    const motorImages = { motor1, motor2, motor3, motor4 };
    const assets = { start, finish, arenaIllustration, astreaTyping };

    const gameState = useSoloGame({ motorImages });

    const handleMainClick = () => {
        if (gameState.countdown === null && !gameState.isFinished && !gameState.isExpired) {
            gameState.inputRef.current?.focus({ preventScroll: true });
        }
    };

    return (
        <SoloArenaView
            {...gameState}
            onKeyDown={gameState.handleKeyDown}
            onChange={gameState.handleChange}
            assets={assets}
            onMainClick={handleMainClick}
        />
    );
}