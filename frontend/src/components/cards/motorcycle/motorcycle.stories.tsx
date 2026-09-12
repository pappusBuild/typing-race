import type { Meta, StoryObj } from "@storybook/react-vite"

import { Motorcycle } from "./motorcycle"

import neonViper from "@/assets/game/motors/neon/neon-default.svg"
import shadowBolt from "@/assets/game/motors/speedster/speedster-default.svg"
import phantomX from "@/assets/game/motors/phantom/phantom-default.svg"


const meta = {
    title: "Cards/Motorcycle",
    component: Motorcycle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Motorcycle>


export default meta


type Story = StoryObj<typeof meta>


export const Equipped: Story = {
    args: {
        status: "equipped",
        name: "Neon Viper",
        image: (
            <img
                src={neonViper}
                alt="Neon Viper"
                className="h-full w-full object-cover"
            />
        ),
        onAction: () => {
            console.log("equip active")
        },
    },
}


export const Owned: Story = {
    args: {
        status: "owned",
        name: "Shadow Bolt",
        image: (
            <img
                src={shadowBolt}
                alt="Shadow Bolt"
                className="h-full w-full object-cover"
            />
        ),
        onAction: () => {
            console.log("equip motorcycle")
        },
    },
}


export const Locked: Story = {
    args: {
        status: "locked",
        name: "Phantom X",
        image: (
            <img
                src={phantomX}
                alt="Phantom X"
                className="h-full w-full object-cover"
            />
        ),
    },
}