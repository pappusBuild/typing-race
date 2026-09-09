import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProfileDropdown } from "./profile-dropdown"


const meta = {
    title: "Components/ProfileDropdown",
    component: ProfileDropdown,
    parameters: {
    layout: "centered",
    },
    tags: ["autodocs"],
    } satisfies Meta<typeof ProfileDropdown>


export default meta


type Story = StoryObj<typeof meta>


export const Default: Story = {
    args: {
    username: "Nurul",
    role: "Pro Racer",
    },
    }

export const LongUsername: Story = {
    args: {
    username: "TheFastestKeyboardWarriorEver",
    role: "Kian Santang",
    },
    }