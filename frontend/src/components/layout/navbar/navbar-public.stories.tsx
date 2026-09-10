import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavbarPublic } from "./navbar-public"


const meta = {
    title: "Layout/Navbar/Public",
    component: NavbarPublic,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NavbarPublic>


export default meta


type Story = StoryObj<typeof meta>


export const Default: Story = {
    args: {
        onPlay: () => {},
        onLogin: () => {},
    },
}