import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavbarAuth } from "./navbar-auth"


const meta = {
    title: "Layout/Navbar/Auth",
    component: NavbarAuth,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NavbarAuth>


export default meta


type Story = StoryObj<typeof meta>


export const Default: Story = {}