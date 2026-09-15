import * as React from "react"

import taglineImage from "@/assets/tagline.png"

import { cn } from "@/lib/utils"


type TaglineProps = React.ComponentProps<"section">


function Tagline({
    className,
    ...props
}: TaglineProps) {

    return (
        <section
            {...props}
            className={cn("flex min-h-[68] w-full overflow-hidden max-md:flex-col", className)}
        >

            {/* Image */}
            <div
                className="flex w-[clamp(16rem,30%,26.5rem)] shrink-0 items-center justify-center overflow-hidden bg-card-background-secondary px-4 py-8 max-md:h-80 max-md:w-full"
            >
                <img
                    src={taglineImage}
                    alt="Gass Type motorcycle"
                    className="w-[clamp(14rem,25vw,22.5rem)] object-contain animate-in fade-in zoom-in duration-700"
                />
            </div>


            {/* Content */}
            <div
                className="flex flex-1 items-center overflow-hidden bg-[linear-gradient(47deg,#7E3EB1_1%,#351A4B_100%)] px-9 py-8 max-md:px-6 max-md:py-10"
            >

                <div
                    className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-700"
                >

                    <h1
                        className="font-poppins text-[clamp(2rem,4.2vw,3.75rem)] font-medium italic leading-tight text-base-white"
                    >
                        SCRATCH THE LIMIT AND
                        <br />
                        GASS YOUR TYPE
                    </h1>


                    <p
                        className="max-w-4xl font-poppins text-[clamp(0.875rem,1.25vw,1.125rem)] font-normal leading-relaxed text-base-white"
                    >
                        Turn your typing practice into a fun challenge, build your speed and accuracy,
                        <br className="max-md:hidden" />
                        sharpen your English skills, and discover how far you can go with GassType.
                    </p>

                </div>

            </div>

        </section>
    )
}


export {
    Tagline,
}


export type {
    TaglineProps,
}