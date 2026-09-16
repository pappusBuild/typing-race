import * as React from "react"
import { motion } from "motion/react"

import speedometer from "@/assets/speedometer.svg"
import { cn } from "@/lib/utils"

type StatItem = {
    label: string
    value: string
}

type StatsProps = React.ComponentProps<"section"> & {
    stats?: StatItem[]
}

const defaultStats: StatItem[] = [
    {
        label: "Words",
        value: "120+",
    },
    {
        label: "Players",
        value: "500+",
    },
    {
        label: "Games Played",
        value: "10,000+",
    },
]

function StatCircle({
    label,
    value,
    index,
}: StatItem & { index: number }) {
    return (
        <motion.div
            initial={{ x: -150, opacity: 0, rotate: -360 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: index * 0.15,
            }}
            className="flex aspect-square w-[clamp(120px,16vw,256px)] flex-col items-center justify-center rounded-full bg-[#7B347E] shadow-[inset_0_-10px_4px_rgba(0,0,0,0.25)]"
        >
            <span
                className="mb-[9%] whitespace-nowrap rounded-full border-[1.5px] border-base-white px-[8%] py-[2%] font-inter text-[clamp(8px,1.2vw,16px)] font-medium text-base-white"
            >
                {label.toUpperCase()}
            </span>

            <span
                className="text-center font-inter text-xl font-normal leading-6 text-base-white"
            >
                {value}
            </span>
        </motion.div>
    )
}

function Stats({
    stats = defaultStats,
    className,
    ...props
}: StatsProps) {

    return (
        <section
            {...props}
            className={cn("flex h-109.5 w-full flex-col overflow-hidden px-8 py-8", 
                className,
            )}
        >
            <h2 className="font-inter text-[48px] font-bold italic leading-9.75 text-avatar-border">
                Stats
            </h2>

            <div className="flex flex-1 h-full items-center justify-between gap-10">
                <div className="flex h-full items-center justify-center gap-6">
                    {stats.map((stat, index) => (
                        <StatCircle
                            key={stat.label}
                            index={index}
                            {...stat}
                        />
                    ))}
                </div>

                <div className="flex w-full justify-center">
                    <motion.img 
                        src={speedometer} 
                        alt="Speedometer result" 
                        className="h-auto w-auto object-contain"

                        initial={{ 
                            opacity: 0,                                   
                            y: 40,                                         
                            scale: 0.9,                                   
                            filter: "drop-shadow(0 0 0px rgba(235, 94, 255, 0))" 
                        }}

                        whileInView={{ 
                            opacity:[0, 1, 1],
                            y:[40, 0 ,0],
                            scale: [0.9, 1, 1],
                            filter: [
                                "drop-shadow(0 0 0px rgba(235, 94, 255, 0))",  
                                "drop-shadow(0 0 40px rgba(235, 94, 255, 1))",  
                                "drop-shadow(0 0 0px rgba(235, 94, 255, 0))"
                            ]
                        }}

                        
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 1,      
                            ease: "easeOut",    
                            times: [0, 0.4, 1]
                        }}
                    />

                </div>
            </div>
        </section>
    )
}

export { Stats }
export type { StatsProps, StatItem }
