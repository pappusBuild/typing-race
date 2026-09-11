import type { Meta, StoryObj } from "@storybook/react-vite"

import { Achievement } from "./achievement"

import { Zap, Target, Lock, FireExtinguisher, CircleX} from "lucide-react"


const meta = {
    title: "Cards/Achievement",
    component: Achievement,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Achievement>


export default meta


type Story = StoryObj<typeof meta>


export const UnlockedSpeedDemon: Story = {
    args: {
        variant: "unlocked",
        title: "Speed Demon",
        description: "Reached 90+ WPM in a public race.",
        icon: <Zap className="size-6 stroke-(--color-card-icon-bg-secondary)" />,
    },
}


export const UnlockedPerfectionist: Story = {
    args: {
        variant: "unlocked",
        title: "Perfectionist",
        description: "Achieved 100% accuracy in a race.",
        icon: (
            <Target className="size-6 stroke-(--color-card-icon-bg-secondary)"
            />
        ),
    },
}   

export const UnlockedCenturyRacer: Story = {
    args: {
        variant: "unlocked",
        title: "CenturyRacer",
        description: "Complete 100 races.",
        icon: (
            <CircleX className="size-6 stroke-(--color-card-icon-bg-secondary)"
            />
        ),
    },
}   

export const UnlockedWinStreak: Story = {
    args: {
        variant: "unlocked",
        title: "Win Streak",
        description: "Win 5 races in a row.",
        icon: (
            <FireExtinguisher className="size-6 stroke-(--color-card-icon-bg-secondary)"
            />
        ),
    },
}   


export const Locked: Story = {

    args: {
        variant: "locked",
        title: "Road Warrior",
        description: "Race every day for a full week.",
        icon: (
            <Lock className="size-6 text-slate-400"
            />
        ),
    },
}