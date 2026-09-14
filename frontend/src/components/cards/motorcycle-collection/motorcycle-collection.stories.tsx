import type { Meta, StoryObj } from "@storybook/react-vite"

import { MotorcycleCollection } from "./motorcycle-collection"


const meta = {
    title: "Garage/MotorcycleCollection",
    component: MotorcycleCollection,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MotorcycleCollection>


export default meta


type Story = StoryObj<typeof meta>


export const Empty: Story = {
    args: {
        motorcycles: [],
    },
}



export const Filled: Story = {
    args: {
        totalOwned: 4,
        totalLocked: 2,

        motorcycles: [
            {
                id: "1",
                name: "Neon Viper",
                status: "equipped",
            },

            {
                id: "2",
                name: "Shadow Bolt",
                status: "owned",
            },

            {
                id: "3",
                name: "Phantom X",
                status: "locked",
            },
        ],
    },
}