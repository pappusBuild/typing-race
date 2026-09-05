import * as React from "react"

import { cn } from "@/lib/utils"

type DropdownListProps = React.ComponentProps<"div">

function DropdownList({ className, children, ...props }: DropdownListProps) {
    return (
        <div
            data-slot="dropdown-list"
            className={cn(
                "w-[190px] overflow-hidden rounded-2xl bg-base-white p-0 shadow-lg",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export { DropdownList }
export type { DropdownListProps }
