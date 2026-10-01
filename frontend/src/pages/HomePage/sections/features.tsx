import * as React from "react"
import { motion } from "motion/react"

import abcIcon from "@/assets/feature/abc.png"
import bookIcon from "@/assets/feature/book.png"
import progressIcon from "@/assets/feature/progress.png"
import motorIcon from "@/assets/motor.png"

import { cn } from "@/lib/utils"

type FeatureItem = {
    icon: string
    title: string
    description: string
}

type FeaturesProps = React.ComponentProps<"section"> & {
    features?: FeatureItem[]
}

const defaultFeatures: FeatureItem[] = [
    {
        icon: abcIcon,
        title: "Typing Race",
        description: "Compete with other players.",
    },
    {
        icon: bookIcon,
        title: "Learn Vocabulary",
        description: "Discover new English words",
    },
    {
        icon: progressIcon,
        title: "Track Progress",
        description: "Monitor WPM & Accuracy",
    },
]

function FeatureItem({
    icon,
    title,
    description,
    index,
}: FeatureItem & { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 120 }}
            
            whileInView={{ opacity: 1, x: 0 }}
            
            viewport={{ once: true, amount: "some" }}
            
            transition={{
                type: "tween", 
                ease: "easeOut",
                duration: 0.6,        
                delay: index * 0.05,  
            }}
            className="flex w-full items-center gap-7.5 rounded-[19px]"
        >
            <div className="flex h-32.5 w-64 shrink-0 items-center justify-center">
                <img 
                    src={icon} 
                    alt={title} 
                    className="h-32.5 w-42.5 object-contain drop-shadow-[-8px_8px_3px_#000000]" 
                />
            </div>

            <div className="flex flex-1 flex-col items-start">
                <h3 className="font-poppins text-[24px] font-bold text-base-white">
                    {title}
                </h3>

                <p className="font-poppins text-[16px] font-normal text-passive-color">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

function Features({
    features = defaultFeatures,
    className,
    ...props
}: FeaturesProps) {
    return (
        <section {...props} className={cn("flex w-full flex-col gap-8 px-8 py-8", className)}>
            <h2 className="font-inter text-[48px] font-bold italic leading-9.75 text-avatar-border">
                Features
            </h2>

            <div className="flex h-170.5 w-full items-center gap-0">
                <div className="flex h-full w-107 justify-center overflow-hidden">
                    <img src={motorIcon} alt="Feature showcase" className="h-full w-full object-cover" />
                </div>

                <div className="flex h-full flex-1 flex-col justify-center gap-8 rounded-5 bg-card-background-secondary px-15 py-8">
                    {features.map((feature, index) => (
                        <FeatureItem 
                            key={feature.title} 
                            index={index} 
                            {...feature} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export { Features }
export type { FeaturesProps, FeatureItem }
