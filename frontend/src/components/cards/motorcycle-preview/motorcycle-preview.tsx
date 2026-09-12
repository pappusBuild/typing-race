import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button/button"
import type { ButtonVariant } from "@/components/ui/button/button"


type MotorcyclePreviewVariant = "equipped" | "selected" | "locked"


type MotorcyclePreviewProps = React.ComponentProps<"div"> & {
    variant?: MotorcyclePreviewVariant
    name: string
    description: string
    image: React.ReactNode
    buttonLabel?: string
    onAction?: () => void
}


function MotorcyclePreview({variant = "locked",name,description,image,buttonLabel,onAction,className,
    ...props
}: MotorcyclePreviewProps) {

    const statusConfig: Record<
        MotorcyclePreviewVariant,
        {
            label: string
            dot: string
            text: string
            buttonVariant: ButtonVariant
            disabled: boolean
        }
    > = {
        equipped: {
            label: "CURRENTLY EQUIPPED",
            dot: "bg-text-tertiary",
            text: "text-text-tertiary",
            buttonVariant: "outline",
            disabled: false,
        },

        selected: {
            label: "SELECTED",
            dot: "bg-divider-tertiary",
            text: "text-divider-tertiary",
            buttonVariant: "primary",
            disabled: false,
        },

        locked: {
            label: "LOCKED",
            dot: "bg-button-solo-primary",
            text: "text-button-solo-primary",
            buttonVariant: "outline",
            disabled: true,
        },
    }


    const config = statusConfig[variant]


    return (
        <div
            {...props}
            className={cn(
                "flex h-80 w-full overflow-hidden rounded-2xl bg-card-background-tertiary outline outline-1.5 outline-divider-primary",
                className,
            )}
        >

            {/* Motorcycle Preview */}
            <div className="relative flex-1">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-0 top-1/2 h-px w-full bg-game-secondary" />
                    <div className="absolute left-45 top-0 h-180 w-px rotate-90 bg-game-secondary" />
                </div>

                <div className="flex h-full items-center justify-center p-6">
                    {image}
                </div>
            </div>


            {/* Info */}
            <div className="flex w-80 flex-col justify-between border-l border-divider-primary p-6">

                <div className="flex flex-col gap-3">

                    {/* Status */}
                    <div className="flex items-center gap-1">
                        <div className={cn("size-1.5 rounded-full", config.dot)} />

                        <span className={cn("font-['Poppins'] text-xs font-semibold", config.text)}>
                            {config.label}
                        </span>
                    </div>


                    {/* Name */}
                    <h2 className="font-['Poppins'] text-3xl font-extrabold text-base-white">
                        {name}
                    </h2>


                    {/* Description */}
                    <p className="font-['Poppins'] text-xs font-normal text-game-secondary">
                        {description}
                    </p>

                </div>


                {/* Action */}
                {buttonLabel && (
                    <Button
                        variant={config.buttonVariant}
                        size="md"
                        disabled={config.disabled}
                        onClick={onAction}
                        className="w-64"
                    >
                        {buttonLabel}
                    </Button>
                )}

            </div>

        </div>
    )
}


export { MotorcyclePreview }
export type { MotorcyclePreviewProps, MotorcyclePreviewVariant }