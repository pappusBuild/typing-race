import * as React from "react"

import { cn } from "@/lib/utils"

type DropdownItemProps = React.ComponentProps<"button"> & {
    icon?: React.ReactNode
}

function DropdownItem({ className, children, icon, type = "button", ...props }: DropdownItemProps) {
    return (
        <button
            type={type}
            className={cn(
                "flex h-12 w-full items-center gap-2.5 px-4 text-left text-sm font-medium text-base-black transition-colors hover:bg-secondary-white focus-visible:bg-secondary-white focus-visible:outline-none",
                className
            )}
            {...props}
        >
            <span>{children}</span>
            {icon}
        </button>
    )
}

export { DropdownItem }
export type { DropdownItemProps }
