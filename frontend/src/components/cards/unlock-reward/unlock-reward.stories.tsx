import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"

import { UnlockReward } from "./unlock-reward"


const meta = {
    title: "Garage/UnlockReward",
    component: UnlockReward,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof UnlockReward>


export default meta


type Story = StoryObj<typeof meta>


const placeholderImage = (
    <div className="size-full bg-indigo-950" />
)


export const Completed: Story = {
    args: {
        status: "completed",
        rewardName: "Thunder Hawk",
        reachedLevel: 15,
        image: placeholderImage,
        onClaim: fn(),
    },
}


export const Progressing: Story = {
    args: {
        status: "progressing",
        rewardName: "Thunder Hawk",
        requiredLevel: 15,
        currentLevel: 12,
        image: placeholderImage,
    },
}