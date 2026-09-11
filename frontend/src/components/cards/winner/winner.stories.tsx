import type { Meta, StoryObj } from "@storybook/react-vite"

import { WinnerCard } from "./winner"

import trophyFirst from "@/assets/trophy/trophy-first.png"
import trophySecond from "@/assets/trophy/trophy-second.png"
import trophyThird from "@/assets/trophy/trophy-third.png"
import trophyFourth from "@/assets/trophy/trophy-fourth.png"


const meta = {
    title: "Cards/WinnerCard",
    component: WinnerCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof WinnerCard>


export default meta


type Story = StoryObj<typeof meta>


export const First: Story = {
    args: {
        username: "Viper_X",
        wpm: 72,
        accuracy: 96,
        duration: 23,
        trophy: (
            <img
                src={trophyFirst}
                alt="First trophy"
                className="w-auto"
            />
        ),
    },
}


export const Second: Story = {
    args: {
        username: "Player_Two",
        wpm: 68,
        accuracy: 98,
        duration: 27,
        trophy: (
            <img
                src={trophySecond}
                alt="Second trophy"
                className="w-auto"
            />
        ),
    },
}


export const Third: Story = {
    args: {
        username: "SpeedMaster",
        wpm: 65,
        accuracy: 94,
        duration: 31,
        trophy: (
            <img
                src={trophyThird}
                alt="Third trophy"
                className="w-auto"
            />
        ),
    },
}


export const Fourth: Story = {
    args: {
        username: "FastFinger",
        wpm: 60,
        accuracy: 91,
        duration: 35,
        trophy: (
            <img
                src={trophyFourth}
                alt="Fourth trophy"
                className="w-auto"
            />
        ),
    },
}

