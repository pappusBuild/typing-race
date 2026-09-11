import * as React from "react"

import { cn } from "@/lib/utils"


type AchievementVariant = "unlocked" | "locked"


type AchievementProps = React.ComponentProps<"div"> & {
    variant?: AchievementVariant
    title: string
    description: string
    icon: React.ReactNode
}


function Achievement({ variant = "unlocked", title, description, icon, className, ...props }: AchievementProps) {
    const isUnlocked = variant === "unlocked"

    return (
        <div
            {...props}
            className={cn(
                "flex w-80 flex-col items-start gap-4 rounded-2xl bg-card-background-quarter p-6 outline outline-1 outline-offset-[-1px]",
                isUnlocked
                    ? "outline-purple-800 shadow-[0px_0px_8px_0px_rgba(126,62,177,0.13)]"
                    : "opacity-50 outline-zinc-900",
                className,
            )}
        >

            {/* Icon */}
            <div
                className={cn(
                    "flex size-12 items-center justify-center rounded-lg",
                    isUnlocked ? "bg-purple-800" : "bg-zinc-900",
                )}
            >
                {icon}
            </div>


            {/* Content */}
            <div className="flex flex-col gap-1">
                <h3
                    className={cn(
                        "font-['Poppins'] text-base font-extrabold leading-5",
                        isUnlocked ? "text-base-white" : "text-slate-400",
                    )}
                >
                    {title}
                </h3>

                <p
                    className={cn(
                        "font-['Poppins'] text-xs font-normal leading-4",
                        isUnlocked ? "text-slate-400" : "text-gray-400",
                    )}
                >
                    {description}
                </p>
            </div>


            {/* Status */}
            <div
                className={cn(
                    "rounded-sm px-2 py-1",
                    isUnlocked ? "bg-lime-500/10" : "bg-white/5",
                )}
            >
                <span
                    className={cn(
                        "font-['Poppins'] text-[10px] font-bold leading-none",
                        isUnlocked ? "text-text-secondary" : "text-slate-400",
                    )}
                >
                    {isUnlocked ? "UNLOCKED" : "LOCKED"}
                </span>
            </div>

        </div>
    )
}


export { Achievement }
export type { AchievementProps, AchievementVariant }