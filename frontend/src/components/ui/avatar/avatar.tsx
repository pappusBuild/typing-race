import * as React from "react"
import { UserRound, UsersRound, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type AvatarVariant = "profile" | "team" | "add"

type AvatarProps = React.ComponentProps<"div"> & {
variant: AvatarVariant
}

function Avatar({ className, variant, children, ...props }: AvatarProps) {
return (
<div
    data-slot="avatar"
    data-variant={variant}
    className={cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",

    variant === "profile" &&
        "size-28 bg-text-primary text-game-primary border-3 border-avatar-border",

    variant === "team" &&
        "size-24 bg-game-secondary text-game-primary border-2 border-button-game-hover",

    variant === "add" &&
        "size-24 bg-card-background-tertiary border-2 border-dashed border-button-game-hover",

    className
    )}
    {...props}
>
    {children ??
    (variant === "profile" ? (
        <UserRound
        aria-hidden="true"
        className="size-1/2"
        strokeWidth={1.75}
        />
    ) : variant === "team" ? (
        <UsersRound
        aria-hidden="true"
        className="size-1/2"
        strokeWidth={1.75}
        />
    ) : (
        <Plus
        aria-hidden="true"
        className="size-1/2"
        strokeWidth={1.75}
        color="var(--passive-color)"
        />
    ))}
</div>
)
}

export { Avatar }
export type { AvatarProps, AvatarVariant }