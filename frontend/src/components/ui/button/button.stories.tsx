import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"

import google from "@/assets/social-button/google.svg"
import play from "@/assets/icons/play.svg"

const meta = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const PlaySolo: Story = {
    args: {
        children: "Play Solo",
        variant: "game",
        color: "orange",
        size: "sm",
        className: "w-64",
        icon: <img src={play} alt="" className="size-6" />,
    },
}

export const PlayNow: Story = {
    args: {
        children: "Play Now",
        variant: "game",
        color: "purple",
        size: "sm",
        className: "w-64",
        icon: <img src={play} alt="" className="size-6" />,
    },
}

export const Login: Story = {
    args: {
        children: "Log In",
        variant: "primary",
        size: "sm",
        className: "w-64",
    },
}

export const LoginOutline: Story = {
    args: {
        children: "Log In",
        variant: "outline",
        size: "sm",
        className: "w-64",
    },
}

export const Google: Story = {
    args: {
        children: "Continue with Google",
        variant: "social",
        className: "w-80",
        size: "sm",
        icon: <img src={google} alt="" className="size-8" />,
    },
}

export const Disabled: Story = {
    args: {
        children: "Log In",
        variant: "primary",
        className: "w-64",
        disabled: true,
    },
}