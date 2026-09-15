import { NavbarPublic } from "@/components/layout/navbar/navbar-public"
import { Footer } from "@/components/layout/footer/footer"

import { Tagline } from "@/pages/HomePage/sections/tagline.tsx"
import { Stats } from "@/pages/HomePage/sections/stats"
import { Features } from "@/pages/HomePage/sections/features"
import { HowItWorks } from "@/pages/HomePage/sections/howitworks"



function HomePage() {

    return (
        <main className="min-h-screen bg-app-background">

            <NavbarPublic />


            <div className="flex flex-col">

                <Tagline />

                <Stats />

                <Features />

                <HowItWorks />

            </div>


            <Footer />

        </main>
    )
}


export {
    HomePage,
}