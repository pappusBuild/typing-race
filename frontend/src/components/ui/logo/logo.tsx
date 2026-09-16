import * as React from "react"
import { useState, useRef } from 'react';
import ShinyText from "@/components/effects/ShinyText";


import gass from "@/assets/logo/gass.svg"

import { cn } from "@/lib/utils"
import "shadcn/tailwind.css";

type LogoProps = React.ComponentProps<"div">

function Logo({ className, ...props }: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
        timeoutRef.current = setTimeout(()=>{
        setIsHovered(false);
    }, 2000);
    };
    const handleMouseLeave =() => {
        setIsHovered(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    return (
        <div
            {...props}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group flex items-baseline gap-2 transition-all",
                className
            )}
        >
            {/* Logo Gass dengan animasi blink */}
            <img
                src={gass}
                alt="Gass"
                className="w-48 group-hover:animate-[logo-blink_1s_ease-in-out_1]"
            />

            <div className="relative overflow-hidden w-auto -translate-y-0.5 font-racing text-4xl text-white">
                <ShinyText 
                    text="TYPE"
                    speed={1}
                    delay={0}
                    color="#ffffff"          /* Warna dasar teks putih */
                    shineColor="#38184A"     /* Warna kilauan abu-abu/silver */
                    spread={315}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={!isHovered}    /* 4. Efek MATI jika TIDAK sedang di-hover */
                />
            </div>
        </div>
    )
}


export { Logo }
export type { LogoProps }