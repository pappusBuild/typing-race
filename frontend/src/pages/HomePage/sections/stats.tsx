import * as React from "react"

import speedometer from "@/assets/speedometer.svg"
import { cn } from "@/lib/utils"


type StatItem = {
    label: string
    value: string
}


type StatsProps = React.ComponentProps<"section"> & {
    stats?: StatItem[]
}


const defaultStats: StatItem[] = [
    {
        label: "Words",
        value: "120+",
    },
    {
        label: "Players",
        value: "500+",
    },
    {
        label: "Games Played",
        value: "10,000+",
    },
]


function StatCircle({
    label,
    value,
}: StatItem) {
    return (
        <div className="flex aspect-square w-[clamp(120px,16vw,256px)] flex-col items-center justify-center rounded-full bg-[#7B347E] shadow-[inset_0_-10px_4px_rgba(0,0,0,0.25)]">
            <span
                className=" mb-[9%] whitespace-nowrap rounded-full border-[1.5px] border-base-white px-[8%] py-[2%] font-inter text-[clamp(8px,1.2vw,16px)] font-medium text-base-white">
                {label.toUpperCase()}
            </span>

            <span
                className=" text-center font-inter text-xl font-normal leading-6 text-base-white">
                {value}
            </span>
        </div>
    )
}


function Stats({
    stats = defaultStats,
    className,
    ...props
}: StatsProps) {

    return (
        <section
            {...props}
            className={cn("flex h-109.5 w-full flex-col gap-10 overflow-hidden px-8 py-8 ", 
                className,
            )}
        >

            <h2
                className="font-inter text-[48px] font-bold italic leading-9.75 text-avatar-border"
            >
                Stats
            </h2>


            <div className="flex flex-1 items-center justify-between gap-10">
                <div className="flex items-center justify-center gap-6">

                    {stats.map((stat) => (
                        <StatCircle
                            key={stat.label}
                            {...stat}
                        />
                    ))}

                </div>

                <div className="flex w-full justify-center ">
                    <img src={speedometer} alt="Speedometer result" className="h-auto w-auto object-contain"/>
                </div>
            </div>

        </section>
    )
}


export {
    Stats,
}

export type {
    StatsProps,
    StatItem,
}