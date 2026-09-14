import type { Meta, StoryObj } from "@storybook/react-vite"

import { TeamMember } from "./team-member"


const meta = {
    title: "User/TeamMember",
    component: TeamMember,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TeamMember>


export default meta


type Story = StoryObj<typeof meta>


export const OwnerOnline: Story = {
    args: {
        username: "NeonDrifter",
        role: "owner",
        status: "online",
        wpm: 134,
        wins: 89,
    },
}


export const AdminOnline: Story = {
    args: {
        username: "SpeedVixen",
        role: "admin",
        status: "online",
        wpm: 121,
        wins: 64,
    },
}


export const MemberOnline: Story = {
    args: {
        username: "TurboCharge",
        role: "member",
        status: "online",
        wpm: 105,
        wins: 31,
    },
}


export const MemberOffline: Story = {
    args: {
        username: "NitroFuel",
        role: "member",
        status: "offline",
        wpm: 98,
        wins: 12,
    },
}