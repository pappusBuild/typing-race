import * as React from "react"

import { Logo } from "@/components/ui/logo/logo"
import { Button } from "@/components/ui/button/button"

import { cn } from "@/lib/utils"

type NavbarPublicProps = React.ComponentProps<"nav"> & {
    onPlay?: () => void
    onLogin?: () => void
}

function NavbarPublic({
    className,
    onPlay,
    onLogin,
    ...props
}: NavbarPublicProps) {
    return (
        <nav
            {...props}
            className={cn(
                "flex w-full flex-wrap items-center justify-between gap-4 overflow-hidden px-8 pb-12 pt-8",
                className
            )}
        >
            <Logo className="shrink-0" />

            <div className="flex flex-wrap items-center gap-4">
                <Button
                    variant="game"
                    color="purple"
                    className="w-48"
                    size="sm"
                    onClick={onPlay}
                >
                    Play Now
                </Button>

                <Button
                    variant="outline"
                    className="w-48"
                    size="sm"
                    onClick={onLogin}
                >
                    Log In
                </Button>
            </div>
        </nav>
    )
}

export { NavbarPublic }
export type { NavbarPublicProps }