import * as React from "react"

import { Logo } from "@/components/ui/logo/logo"

import { cn } from "@/lib/utils"


type NavbarAuthProps = React.ComponentProps<"nav">


function NavbarAuth({
    className,
    ...props
}: NavbarAuthProps) {
    return (
        <nav
            {...props}
            className={cn(
                "flex w-full justify-center px-8 pt-8",
                className
            )}
        >
            <Logo />
        </nav>
    )
}


export { NavbarAuth }
export type { NavbarAuthProps }