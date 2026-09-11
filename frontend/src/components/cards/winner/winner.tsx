import * as React from "react"

import { cn } from "@/lib/utils"


type WinnerCardProps = React.ComponentProps<"div"> & {
    username: string
    wpm: number
    accuracy: number
    duration: number
    trophy: React.ReactNode
}


function WinnerCard({className,username,wpm,accuracy,duration,trophy,...props
}: WinnerCardProps) {
    return (
        <div
            {...props}
            className={cn(
                "flex h-48 w-full items-center justify-end gap-12 rounded-3xl bg-card-background-quarter p-8",
                className
            )}
        >
            {/* Stats */}
            <div className="flex flex-1 flex-col gap-3.5">
                
                {/* Username */}
                <div className="flex w-full items-center border-b-[3px] pb-1">
                    <h2 className="font-['Poppins'] text-4xl font-light text-base-white">
                        {username}
                    </h2>
                </div>


                {/* Information */}
                <div className="flex items-center gap-10">

                    {/* WPM */}
                    <div className="flex flex-1 flex-col gap-1">
                        <span className="font-['Poppins'] text-[10px] font-bold uppercase text-zinc-400">
                            typing speed
                        </span>

                        <div className="flex items-baseline gap-2.5">
                            <span className="font-['Poppins'] text-4xl font-black leading-10 text-button-solo-primary">
                                {wpm}
                            </span>

                            <span className="font-['Poppins'] text-sm font-bold text-base-white">
                                WPM
                            </span>
                        </div>
                    </div>


                    {/* Divider */}
                    <div className="h-10 w-0.5 bg-purple-800" />


                    {/* Accuracy */}
                    <div className="flex flex-1 flex-col gap-1">
                        <span className="font-['Poppins'] text-[10px] font-semibold uppercase text-zinc-400">
                            accuracy
                        </span>

                        <span className="font-['Poppins'] text-3xl font-extrabold leading-8 text-base-white">
                            {accuracy}%
                        </span>
                    </div>


                    {/* Divider */}
                    <div className="h-10 w-0.5 bg-purple-800" />


                    {/* Duration */}
                    <div className="flex flex-1 flex-col gap-1">
                        <span className="font-['Poppins'] text-[10px] font-semibold uppercase text-zinc-400">
                            duration
                        </span>

                        <div className="flex items-center gap-1.5">
                            <span className="font-['Poppins'] text-3xl font-extrabold leading-8 text-text-primary">
                                {duration}
                            </span>

                            <span className="font-['Poppins'] text-sm font-semibold text-base-white">
                                secs
                            </span>
                        </div>
                    </div>

                </div>
            </div>


            {/* Trophy */}
            <div className="flex h-40 w-32 items-center justify-center">
                {trophy}
            </div>

        </div>
    )
}


export { WinnerCard }
export type { WinnerCardProps }