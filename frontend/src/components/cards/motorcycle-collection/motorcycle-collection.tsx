import * as React from "react"

import { Motorcycle } from "@/components/cards/motorcycle/motorcycle"
import { cn } from "@/lib/utils"


type MotorcycleStatus = "equipped" | "owned" | "locked"


type MotorcycleItem = {
    id: string
    name: string
    status: MotorcycleStatus
    image?: React.ReactNode
}


type MotorcycleCollectionProps = React.ComponentProps<"section"> & {
    motorcycles: MotorcycleItem[]
    totalOwned?: number
    totalLocked?: number
}


function EmptyState() {
    return (
        <div
            className="
                flex h-72 w-full
                flex-col items-center justify-center
                gap-4
                rounded-xl
                border
                border-violet-950
                p-12
            "
        >
            {/* Placeholder icon */}
            <div className="flex size-12 items-center justify-center text-[32px] text-slate-500">
                🏍
            </div>


            <div className="flex flex-col items-center gap-1.5">

                <h3 className="text-center font-archivo-black font-bold text-base text-slate-100">
                    NO MOTORCYCLE UNLOCKED YET
                </h3>

                <p className="text-center font-sora text-xs text-violet-400">
                    Start racing to earn XP and unlock your first high-speed machine.
                </p>

            </div>
        </div>
    )
}


function MotorcycleCollection({
    motorcycles,
    totalOwned,
    totalLocked,
    className,
    ...props
}: MotorcycleCollectionProps) {

    const isEmpty = motorcycles.length === 0


    return (
        <section
            {...props}
            className={cn(
                "flex flex-col gap-5 rounded-2xl border border-violet-950  bg-card-background-tertiary px-8 py-6",
                className,
            )}
        >

            {/* Header */}
            <div className="flex items-center justify-between">

                <h2 className="font-archivo-black font-bold text-lg tracking-wide text-slate-100">
                    YOUR COLLECTION
                </h2>


                {!isEmpty && (
                    <span className="font-geist-mono text-xs text-violet-400">
                        {totalOwned ?? motorcycles.length} OWNED
                        {" · "}
                        {totalLocked ?? 0} LOCKED
                    </span>
                )}

            </div>


            {/* Content */}
            {isEmpty ? (
                <EmptyState />
            ) : (

                <div className="flex flex-wrap gap-4 p-2.5">

                    {motorcycles.map((motorcycle) => (

                        <Motorcycle
                            key={motorcycle.id}
                            status={motorcycle.status}
                            name={motorcycle.name}
                            image={motorcycle.image}
                        />

                    ))}

                </div>

            )}

        </section>
    )
}


export {
    MotorcycleCollection,
}

export type {
    MotorcycleCollectionProps,
    MotorcycleItem,
    MotorcycleStatus,
}