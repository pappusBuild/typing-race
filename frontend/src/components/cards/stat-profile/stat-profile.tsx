import * as React from "react"

import { cn } from "@/lib/utils"


type StatProfileVariant = "stat" | "ride"


type StatProfileProps = React.ComponentProps<"div"> & {
    variant?: StatProfileVariant
    title: string
    icon?: React.ReactNode
    value?: string | number
    description?: string
    image?: React.ReactNode
    name?: string
    valueClassName?: string
}


function StatProfile({className,variant = "stat",title,icon,value,description,image,name,valueClassName,...props
}: StatProfileProps) {
    return (
        <div
            {...props}
            className={cn(
                "flex w-96 rounded-[20px] bg-card-background-quarter px-6 pt-5 outline-1 outline-purple-800/20",
                variant === "stat" && "h-56 flex-col gap-4",
                variant === "ride" && "h-56 flex-col gap-3 overflow-hidden",
                className
            )}
        >

            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="font-['Poppins'] text-sm font-bold text-slate-400">
                    {title}
                </span>

                {icon && (
                    <div className="flex size-12 items-center justify-center">
                        {icon}
                    </div>
                )}
            </div>


            {/* Stat Variant */}
            {variant === "stat" && (
                <>
                    <span
                        className={cn(
                            "font-['Poppins'] text-4xl font-extrabold text-base-white pt-9",
                            valueClassName
                        )}
                    >
                        {value}
                    </span>

                    <span className="font-['Poppins'] text-xs font-normal text-slate-400">
                        {description}
                    </span>
                </>
            )}


            {/* Ride Variant */}
            {variant === "ride" && (
                <>
                    <div className="flex h-14 items-center justify-center">
                        {image}
                    </div>

                    <div className="flex flex-col items-end gap-0.5">
                        <span className="font-['Poppins'] text-base font-extrabold text-base-white">
                            {name}
                        </span>

                        <span className="font-['Poppins'] text-xs font-normal text-slate-400">
                            {description}
                        </span>
                    </div>
                </>
            )}

        </div>
    )
}


export { StatProfile }
export type { StatProfileProps, StatProfileVariant }