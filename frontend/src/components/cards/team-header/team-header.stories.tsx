import type { Meta, StoryObj } from "@storybook/react-vite"

import { TeamHeader } from "./team-header"



const meta = {
    title: "Team/TeamHeader",

    component: TeamHeader,

    parameters: {
        layout: "centered",
    },

    tags: ["autodocs"],

} satisfies Meta<typeof TeamHeader>



export default meta


type Story = StoryObj<typeof meta>



export const Empty: Story = {

    args: {

        variant: "empty",

    },

}



export const Default: Story = {

    args: {

        variant: "default",

        teamName: "CREATE YOUR TEAM",

        members: 0,

        wins: 0,

        winRate: 0,

        league: "GASS TYPE PRO LEAGUE",

    },

}