import type { Meta, StoryObj } from "@storybook/react-vite"

import { MotorcyclePreview } from "./motorcycle-preview"

import neonViper from "@/assets/game/riders/neon/neon-default.svg"
import shadowBolt from "@/assets/game/riders/speedster/speedster-default.svg"
import phantomX from "@/assets/game/riders/phantom/phantom-default.svg"


const meta = {
    title: "Game/MotorcyclePreview",
    component: MotorcyclePreview,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MotorcyclePreview>


export default meta


type Story = StoryObj<typeof meta>


export const Equipped: Story = {
    args: {
        variant: "equipped",
        name: "Neon Viper",
        description: "The fastest machine in the circuit. Built for champions. Featuring dual plasma exhaust and active traction control systems.",
        image: (
            <img
                src={neonViper}
                alt=""
                className="w-96 object-contain -rotate-15"
            />
        ),
        buttonLabel: "CHANGE MOTORCYCLE",
        onAction: () => console.log("Change motorcycle"),
    },
}


export const Selected: Story = {
    args: {
        variant: "selected",
        name: "Shadow Bolt",
        description: "A sleek predator. Silent but deadly on the track. Optimized for maximum cornering velocity and tight street circuit drifts.",
        image: (
            <img
                src={shadowBolt}
                alt=""
                className="w-96 object-contain -rotate-15"
            />
        ),
        buttonLabel: "EQUIP THIS MOTORCYCLE",
        onAction: () => console.log("Equip motorcycle"),
    },
}


export const Locked: Story = {
    args: {
        variant: "locked",
        name: "Phantom X",
        description: "Unlock at Level 30 to ride this beast. Infused with dark energy core accelerators.",
        image: (
            <img
                src={phantomX}
                alt=""
                className="w-96 object-contain opacity-30 -rotate-15"
            />
        ),
        buttonLabel: "REACH LEVEL 30",
    },
}