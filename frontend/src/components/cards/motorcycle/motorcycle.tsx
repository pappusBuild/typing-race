import * as React from "react"

import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/utils"


type MotorcycleStatus = "equipped" | "owned" | "locked"


type MotorcycleProps = React.ComponentProps<"div"> & {
    status?: MotorcycleStatus
    name: string
    image: React.ReactNode
    onAction?: () => void
}


const statusStyle: Record<MotorcycleStatus, string> = {
    equipped:
        "outline-green-500 shadow-[0px_0px_12px_0px_rgba(34,197,94,0.25)]",

    owned:
        "outline-outline-tertiary",

    locked:
        "opacity-40 bg-slate-900 outline-violet-950",
}


const buttonConfig = {
    equipped: {
        label: "EQUIP ACTIVE",
        variant: "outline" as const,
        disabled: false,
        className:
            "border-outline-tertiary text-text-tertiary hover:bg-outline-tertiary hover:border-outline-tertiary/100 active:bg-outline-tertiary active:brightness-85",
    },

    owned: {
        label: "EQUIP",
        variant: "outline" as const,
        disabled: false,
        className:
            "border-button-match-primary text-button-match-primary hover:bg-button-match-primary active:bg-button-match-primary active:brightness-85 ",
    },

    locked: {
        label: "LOCKED",
        variant: "outline" as const,
        disabled: true,
        className:
            "border-gray-700 text-slate-500",
    },
}


function Motorcycle({
    status = "owned",
    name,
    image,
    onAction,
    className,
    ...props
}: MotorcycleProps) {

    const isEquipped = status === "equipped"
    const isLocked = status === "locked"

    const config = buttonConfig[status]


    return (
        <div
            {...props}
            className={cn(
                "flex w-full flex-col items-start gap-3 rounded-xl bg-card-background-tertiary p-3 outline outline-1.outline-offset-[-1.5px]",
                statusStyle[status],
                className,
            )}
        >

            {/* Image */}
            <div className="relative h-28 w-full overflow-hidden rounded-lg">

                <div className="flex h-full w-full items-center justify-center translate-y-6 scale-90 -rotate-15">
                    {image}
                </div>


                {isEquipped && (
                    <div className="absolute left-2 top-2 inline-flex rounded-sm bg-outline-tertiary px-2 py-1">
                        <span className="font-geist-mono text-[9px] font-bold tracking-wide text-slate-950">
                            ACTIVE
                        </span>
                    </div>
                )}


                {isLocked && (
                    <div className="absolute left-2 top-2 inset-0 flex items-center justify-center bg-slate-950/70">
                        <span className="text-xl text-slate-100">
                            🔒
                        </span>
                    </div>
                )}

            </div>


            {/* Name */}
            <div className="flex w-full flex-col gap-1.5 translate-y-2">

                <h3 className="line-clamp-1 font-archivo text-sm font-normal text-slate-100">
                    {name}
                </h3>

            </div>


            {/* Action */}
            <div className="flex w-full justify-center">

                <Button
                    variant={config.variant}
                    size="sm"
                    disabled={config.disabled}
                    onClick={onAction}
                    className={cn(
                        "h-7 w-full rounded-[10px] px-3 font-poppins text-xs font-medium",
                        config.className,
                    )}
                >
                    {config.label}
                </Button>

            </div>

        </div>
    )
}


export { Motorcycle }
export type { MotorcycleProps, MotorcycleStatus }