import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "./avatar"


const meta = {
title: "Components/Avatar",
component: Avatar,
parameters: {
layout: "centered",
},
tags: ["autodocs"],
argTypes: {
variant: {
    control: "select",
    options: ["profile", "team", "add"],
},
},
} satisfies Meta<typeof Avatar>

export default meta


type Story = StoryObj<typeof meta>


export const Profile: Story = {
args: {
variant: "profile",
},
}


export const Team: Story = {
args: {
variant: "team",
},
}


export const Add: Story = {
args: {
variant: "add",
},
}