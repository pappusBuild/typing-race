import * as React from "react"
// 1. Impor motion dari library pendukung
import { motion } from "motion/react" 
import { cn } from "@/lib/utils"
import askIcon from "@/assets/ask.svg"

import signin from "@/assets/howitworks/signin.svg"
import choose from "@/assets/howitworks/choose.svg"
import start from "@/assets/howitworks/start.svg"
import check from "@/assets/howitworks/check.svg"

type HowItWorksStep = {
    title: string
    bgImage: string
    variant: "signin" | "choose" | "start" | "check"
    marginLeftClass: string
}

type HowItWorksProps = React.ComponentProps<"section"> & {
    steps?: HowItWorksStep[]
}

const defaultSteps: HowItWorksStep[] = [
    {
        title: "Sign in to get started",
        bgImage: signin,
        variant: "signin",
        marginLeftClass: "ml-[8px]",
    },
    {
        title: "Choose your motor",
        bgImage: choose,
        variant: "choose",
        marginLeftClass: "ml-[128px]",
    },
    {
        title: "Start typing",
        bgImage: start,
        variant: "start",
        marginLeftClass: "ml-[248px]",
    },
    {
        title: "Check your score",
        bgImage: check,
        variant: "check",
        marginLeftClass: "ml-[368px]",
    },
]

function HowItWorks({
    steps = defaultSteps,
    className,
    ...props
}: HowItWorksProps) {

    return (
        <section {...props} className={cn("flex min-h-107.5 w-full flex-col items-center justify-center overflow-hidden bg-card-background-secondary px-28 py-12.5", className)}>
            
            <div className="flex w-full max-w-304 flex-col items-center gap-19">
                <div className="relative flex items-baseline justify-center gap-2">
                    <h2 className="font-inter text-[48px] font-medium italic leading-9.75 text-base-white">
                        How it Works
                    </h2>
                    <img src={askIcon} className="h-19.5 w-19.5 object-contain align-bottom ml-3" alt="Ask Icon" />
                </div>

                <div className="flex w-full flex-col justify-start items-start gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={step.title} 
                            initial={{ opacity: 0, x: -120 }}
                            
                            whileInView={{ opacity: 1, x: 0 }}
                            
                            viewport={{ once: true, amount: "some" }}
                            
                            transition={{
                                type: "tween",
                                ease: "easeOut",
                                duration: 0.6,
                                delay: index * 0.05,
                            }}
                            className={cn("relative h-13.75 w-full max-w-155", step.marginLeftClass)}
                        >
                            <img 
                                src={step.bgImage} 
                                alt={step.title} 
                                className="absolute inset-0 h-full w-full object-contain object-left" 
                            />

                            <div className={cn("relative z-10 flex h-full items-center justify-start pl-[32%]")}>
                                <span className="whitespace-nowrap font-poppins text-[24px] font-medium italic leading-5.75 text-[#210535]">
                                    {step.title}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

        </section>
    )
}

export { HowItWorks }
export type { HowItWorksProps, HowItWorksStep }
