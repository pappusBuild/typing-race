import type { Meta, StoryObj } from "@storybook/react"

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

    },
    }


export const HighLevelPlayer: Story = {
    args: {
    username: "SpeedTyper",
    level: 99,
    },
    }


export const LongUsername: Story = {
    args: {
    username: "TheFastestKeyboardWarriorEver",
    level: 25,
    },
    }