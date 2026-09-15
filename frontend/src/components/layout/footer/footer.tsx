import * as React from "react"

import { cn } from "@/lib/utils"


type FooterProps = React.ComponentProps<"footer">


function Footer({
    className,
    ...props
}: FooterProps) {

    return (
        <footer
            {...props}
            className={cn(" flex w-full items-start justify-between overflow-hidden border-t border-violet-950 bg-card-background-secondary px-8 py-8",
                className,
            )}
        >

            {/* Copyright */}
            <p
                className="
                font-geist-mono
                text-xs
                font-normal
                text-slate-400
                "
            >
                © 2026 GASS TYPE ENGINE INC. ALL RIGHTS RESERVED.
                SPECIFICATIONS SUBJECT TO KEYBOARD STROKE TELEMETRY.
            </p>



            {/* Links */}
            <nav
                className="
                flex
                items-start
                gap-4
                "
            >

                <a
                    href="#"
                    className="
                    font-geist-mono
                    text-xs
                    font-normal
                    text-slate-400
                    transition-colors
                    hover:text-slate-100
                    "
                >
                    Privacy Agreement
                </a>


                <a
                    href="#"
                    className="
                    font-geist-mono
                    text-xs
                    font-normal
                    text-slate-400
                    transition-colors
                    hover:text-slate-100
                    "
                >
                    Championship Rules
                </a>


                <a
                    href="#"
                    className="
                    font-geist-mono
                    text-xs
                    font-normal
                    text-slate-400
                    transition-colors
                    hover:text-slate-100
                    "
                >
                    Exhaust Standards
                </a>

            </nav>

        </footer>
    )
}


export {
    Footer,
}


export type {
    FooterProps,
}