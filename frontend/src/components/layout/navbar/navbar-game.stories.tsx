import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavbarGame } from "./navbar-game"


const meta = {
    title: "Layout/Navbar/Game",
    component: NavbarGame,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NavbarGame>


export default meta


type Story = StoryObj<typeof meta>


export const Default: Story = {
    args: {
        activeMenu: "Dashboard",
        level: 12,
        currentXp: 780,
        maxXp: 1000,
    },
}


export const GarageActive: Story = {
    args: {
        activeMenu: "Garage",
        level: 12,
        currentXp: 450,
        maxXp: 1000,
    },
}


export const FriendsActive: Story = {
    args: {
        activeMenu: "Friends",
        level: 15,
        currentXp: 900,
        maxXp: 1000,
    },
}


export const TeamActive: Story = {
    args: {
        activeMenu: "Team",
        level: 20,
        currentXp: 250,
        maxXp: 1000,
    },
}