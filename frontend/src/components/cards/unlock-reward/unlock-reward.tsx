import * as React from "react"

import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/utils"


type UnlockRewardStatus = "completed" | "progressing"


type UnlockRewardProps = React.ComponentProps<"div"> & {
    status: UnlockRewardStatus

    image?: React.ReactNode

    rewardName: string

    reachedLevel?: number
    requiredLevel?: number
    currentLevel?: number

    onClaim?: () => void
}


const statusStyle = {
    completed: {
        title: "Unlocked",
    },

    progressing: {
        title: "Next Unlock",
    },
}



function UnlockReward({
    status,
    image,
    rewardName,
    reachedLevel,
    requiredLevel,
    currentLevel,
    onClaim,
    className,
    ...props
}: UnlockRewardProps) {


    const isCompleted = status === "completed"


    const progress = Math.min(
        ((currentLevel ?? 0) / (requiredLevel ?? 1)) * 100,
        100,
    )


    return (
        <div
            {...props}
            className={cn(
                "flex h-28 w-96 items-center gap-4 overflow-hidden rounded-xl border border-violet-500/30 bg-card-background-tertiary px-4 py-4 shadow-[0px_0px_20px_0px_rgba(139,92,246,0.15)] ",
                className,
            )}
        >

            {/* Image */}
            <div
                className="
                flex size-20 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-lg
                bg-indigo-950
                "
            >
                {image}
            </div>



            {/* Content */}
            <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">


                <h3 className="font-inter text-sm font-bold text-base-white">

                    {isCompleted ? (

                        <>
                            {statusStyle.completed.title}: {rewardName}
                        </>

                    ) : (

                        <>
                            {statusStyle.progressing.title}
                            <br />
                            {rewardName}
                        </>

                    )}

                </h3>



                {isCompleted ? (

                    <p className="font-inter text-xs text-text-tertiary">
                        Level {reachedLevel} Reached!
                    </p>

                ) : (

                    <p className="font-inter text-xs text-violet-400">
                        Required: Level {requiredLevel}
                    </p>

                )}




                {isCompleted ? (

                    <Button
                        size="sm"
                        variant="game"
                        color="orange"
                        onClick={onClaim}
                        className="
                            h-7
                            w-20
                            rounded-[10px]
                            font-poppins
                            text-xs
                            font-semibold
                            tracking-wide
                        "
                    >
                        CLAIM
                    </Button>

                ) : (

                    <div className="flex items-center gap-2">


                        <div
                            className="
                            h-2
                            flex-1
                            overflow-hidden
                            rounded-sm
                            bg-indigo-950
                            "
                        >

                            <div
                                className="
                                h-full
                                rounded-sm
                                bg-violet-500
                                shadow-[0px_0px_8px_0px_rgba(139,92,246,0.60)]
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>



                        <span
                            className="
                            whitespace-nowrap
                            font-inter
                            text-[10px]
                            font-semibold
                            text-violet-400
                            "
                        >
                            Level {currentLevel} / {requiredLevel}
                        </span>


                    </div>

                )}


            </div>


        </div>
    )
}



export {
    UnlockReward,
}


export type {
    UnlockRewardProps,
    UnlockRewardStatus,
}