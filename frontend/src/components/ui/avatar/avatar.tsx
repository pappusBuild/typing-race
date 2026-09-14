import * as React from "react"
import { UserRound, UsersRound, Plus } from "lucide-react"

import { cn } from "@/lib/utils"


type AvatarVariant = "profile" | "team" | "add"


type AvatarProps = React.ComponentProps<"div"> & {
    variant: AvatarVariant
}


function Avatar({
    className,
    variant,
    children,
    ...props
}: AvatarProps) {

    return (
        <div
            data-slot="avatar"
            data-variant={variant}
            className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",

                variant === "profile" && "size-28",

                variant === "team" && "size-24",

                variant === "add" &&
                    "size-24 border-2 border-dashed",

                className,
            )}
            {...props}
        >

            {children ? (
                <div className="size-full overflow-hidden rounded-full">
                    {children}
                </div>
            ) : (
                variant === "profile" ? (
                    <UserRound
                        aria-hidden="true"
                        className="size-1/2 stroke-white"
                        strokeWidth={1.75}
                    />
                ) : variant === "team" ? (
                    <UsersRound
                        aria-hidden="true"
                        className="size-1/2 stroke-white"
                        strokeWidth={1.75}
                    />
                ) : (
                    <Plus
                        aria-hidden="true"
                        className="size-1/2 text-passive-color stroke-white"
                        strokeWidth={1.75}
                    />
                )
            )}

        </div>
    )
}


export { Avatar }
export type { AvatarProps, AvatarVariant }