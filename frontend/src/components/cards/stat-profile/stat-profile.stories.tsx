import type { Meta, StoryObj } from "@storybook/react-vite"

import { StatProfile } from "./stat-profile"

import flag from "@/assets/icons/flag.svg"
import trophy from "@/assets/trophy/trophy-first.png"
import bike from "@/assets/game/motors/phantom/phantom-level-4.svg"
import vehicle from "@/assets/icons/vehicle.svg"


const meta = {
    title: "Cards/StatProfile",
    component: StatProfile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof StatProfile>


export default meta


type Story = StoryObj<typeof meta>


export const TotalRaces: Story = {
    args: {
        title: "TOTAL RACES",
        value: 245,
        description: "Active typing sessions",
        icon: <img src={flag} alt="" className="size-5" />,
    },
}


export const Wins: Story = {
    args: {
        title: "WINS",
        value: 180,
        description: "73.4% Win Rate",
        icon: <img src={trophy} alt="" className="w-auto" />,
        valueClassName: "text-avatar-border",
    },
}


export const CurrentRide: Story = {
    args: {
        variant: "ride",
        title: "CURRENT RIDE",
        name: "KMAX SPEEDSTER",
        description: "Class-A Premium Motorcycle",
        icon: <img src={vehicle} alt="" className="w-8 " />,
        image: (
            <img
                src={bike}
                alt=""
                className="h-20 w-40 object-contain -rotate-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            />
        ),
    },
}

