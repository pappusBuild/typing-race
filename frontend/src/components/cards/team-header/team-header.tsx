import * as React from "react"

import { Avatar } from "@/components/ui/avatar/avatar"
import { cn } from "@/lib/utils"


type TeamHeaderVariant = "empty" | "default"


type TeamHeaderCardProps = React.ComponentProps<"div"> & {
    variant?: TeamHeaderVariant

    teamName?: string

    members?: number
    wins?: number
    winRate?: number

    league?: string
}


const variantStyle = {
    empty: {
        avatar:
            "border-2 border-dashed border-indigo-950 text-slate-400",

        title:
            "text-slate-400",

        stats:
            "text-slate-400",
    },

    default: {
        avatar:
            "border-2 border-purple-500 shadow-[0px_0px_12px_0px_rgba(157,78,221,1)]",

        title:
            "text-base-white",

        stats:
            "text-base-white",
    },
}



function LeagueIcon() {
    return (
        <div className="flex h-10 items-end gap-1">

            <div className="h-3 w-0.75 bg-purple-500 opacity-30" />

            <div className="h-6 w-0.75 bg-purple-500 opacity-60" />

            <div className="h-9 w-0.75 bg-purple-500" />

            <div className="h-4 w-0.75 bg-amber-500" />

        </div>
    )
}



function TeamHeader({
    variant = "empty",

    teamName = "CREATE YOUR TEAM",

    members = 0,
    wins = 0,
    winRate = 0,

    league,

    className,
    ...props
}: TeamHeaderCardProps) {


    const style = variantStyle[variant]


    return (
        <div
            {...props}
            className={cn("flex items-center justify-between rounded-2xl border border-indigo-950 bg-slate-900 p-6",
                className,
            )}
        >

            {/* Left Content */}
            <div className="flex flex-1 items-center gap-6">


                <Avatar
                    variant="add"
                    className={cn(
                        "size-24",
                        style.avatar,
                    )}
                />


                <div className="flex w-125 flex-col items-start gap-3">


                    <h2
                        className={cn("font-inter text-3xl font-black tracking-tight",
                            style.title,
                        )}
                    >
                        {teamName}
                    </h2>



                    <div className="flex items-center gap-4">

                        <Stat
                            label="MEMBERS"
                            value={members}
                            className={style.stats}
                        />


                        <Divider />


                        <Stat
                            label="WINS"
                            value={wins}
                            className={style.stats}
                        />


                        <Divider />


                        <Stat
                            label="WIN RATE"
                            value={`${winRate}%`}
                            className={style.stats}
                        />


                    </div>


                </div>

            </div>



            {/* League */}
            {variant === "default" && league && (

                <div className="flex items-center gap-4">

                    <LeagueIcon />


                    <div
                        className="
                        rounded-lg
                        bg-card-background-quarter
                        px-4
                        py-2
                        "
                    >

                        <span
                            className="
                            font-inter
                            text-sm
                            font-extrabold
                            uppercase
                            tracking-wide
                            text-amber-500
                            "
                        >
                            {league}
                        </span>

                    </div>

                </div>

            )}


        </div>
    )
}



function Stat({
    label,
    value,
    className,
}: {
    label: string
    value: React.ReactNode
    className?: string
}) {

    return (
        <div className="text-sm">

            <span
                className={cn(
                    "font-inter font-normal",
                    className,
                )}
            >
                {label}:{" "}
            </span>


            <span
                className={cn(
                    "font-inter font-bold",
                    className,
                )}
            >
                {value}
            </span>

        </div>
    )
}



function Divider() {
    return (
        <div className="h-3 w-px bg-indigo-950" />
    )
}



export {
    TeamHeader,
}


export type {
    TeamHeaderCardProps,
    TeamHeaderVariant,
}