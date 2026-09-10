import * as React from "react"

import { cn } from "@/lib/utils"

type ButtonVariant = "game" | "primary" | "outline" | "social"
type ButtonSize = "sm" | "md" | "lg"
type ButtonColor = "orange" | "purple"
type IconPosition = "left" | "right"

type ButtonProps = React.ComponentProps<"button"> & {
    variant?: ButtonVariant
    size?: ButtonSize
    color?: ButtonColor
    icon?: React.ReactNode
    iconPosition?: IconPosition
}

function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    color = "orange",
    icon,
    iconPosition = "left",
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50",

                size === "sm" && "h-10 px-5 text-sm",
                size === "md" && "h-12 px-6 text-base",
                size === "lg" && "h-14 px-8 text-lg",

                variant === "game" &&
                    "rounded-2xl text-base-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] active:translate-y-0.5",

                variant === "game" &&
                    color === "orange" &&
                    "bg-button-solo-primary shadow-[inset_3px_-4px_4px_rgba(154,66,0,1)] hover:bg-button-solo-secondary active:shadow-[inset_-3px_4px_4px_rgba(154,66,0,1)]",

                variant === "game" &&
                    color === "purple" &&
                    "bg-button-match-primary shadow-[inset_3px_-4px_4px_rgba(84,0,143,1)] hover:bg-button-game-hover active:shadow-[inset_-3px_4px_4px_rgba(84,0,143,1)]",

                variant === "primary" &&
                    "rounded-2xl bg-base-white text-card-background-secondary shadow-[inset_3px_-4px_4px_rgba(0,0,0,0.25)] hover:bg-secondary-white active:shadow-[inset_-3px_4px_4px_rgba(0,0,0,0.25)]",

                variant === "outline" &&
                    "rounded-2xl border border-base-white bg-transparent text-base-white hover:bg-base-white hover:text-card-background-secondary active:bg-secondary-white",

                variant === "social" &&
                    "rounded-3xl border border-black/20 bg-white/5 text-base-white hover:bg-base-white hover:text-card-background-secondary active:bg-secondary-white",

                disabled && "cursor-not-allowed",
                className
            )}
            {...props}
        >
            {icon && iconPosition === "left" && (
                <span className="mr-3 flex shrink-0 items-center justify-center">
                    {icon}
                </span>
            )}

            <span>{children}</span>

            {icon && iconPosition === "right" && (
                <span className="ml-3 flex shrink-0 items-center justify-center">
                    {icon}
                </span>
            )}
        </button>
    )
}

export { Button }
export type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant, IconPosition }