import * as React from "react"

import { cn } from "@/lib/utils"
import askIcon from "@/assets/ask.svg"


type HowItWorksStep = {
    title: string
    icon?: React.ReactNode
}


type HowItWorksProps = React.ComponentProps<"section"> & {
    steps?: HowItWorksStep[]
}



const defaultSteps: HowItWorksStep[] = [
    {
        title: "Sign in to get started",
    },
    {
        title: "Choose your motor",
    },
    {
        title: "Start typing",
    },
    {
        title: "Check your score",
    },
]



function HowItWorks({
    steps = defaultSteps,
    className,
    ...props
}: HowItWorksProps) {

    return (
        <section
            {...props}
            className={cn(
                "flex h-210 items-center justify-end overflow-hidden bg-card-background-secondary px-23 py-",
                className,
            )}
        >

            <div
                className="flex flex-1 flex-col items-center gap-19"
            >

                {/* Title */}

                <div className="relative flex w-170 items-start justify-start">

                    <h2 className="font-inter text-[48px] font-bold italic leading-10 text-base-white">
                        How it Works?
                    </h2>


                    <img src={ askIcon } className="absolute right-56 -top-14 size-20 ">

                    </img>

                </div>



                {/* Steps */}

                <div className="flex w-full flex-col items-start gap-2.5">

                    {steps.map((step) => (

                        <div
                            key={step.title}
                            className="
                                relative
                                h-14
                                w-fit
                            "
                        >

                            {/* Arrow background */}

                            <div
                                className="
                                    absolute
                                    right-0
                                    top-0
                                    h-13.5
                                    rounded-r-sm
                                    bg-[linear-gradient(270deg,#FA8A00_0%,#FFAD03_52%,#FFC243_100%)]
                                "
                            />


                            {/* Left flame shape placeholder */}

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-2
                                    h-10
                                    w-24
                                    bg-avatar-border
                                "
                            />


                            {/* Text */}

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-full
                                    items-center
                                    justify-center
                                    px-50
                                "
                            >

                                <span className="whitespace-nowrap font-poppins text-[30px] font-medium italic leading-8 text-[#210535]">
                                    {step.title}
                                </span>


                                {step.icon && (
                                    <span className="ml-4">
                                        {step.icon}
                                    </span>
                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}



export {
    HowItWorks,
}


export type {
    HowItWorksProps,
    HowItWorksStep,
}