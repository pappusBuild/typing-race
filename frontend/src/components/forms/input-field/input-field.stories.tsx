import type { Meta, StoryObj } from "@storybook/react-vite"

import { InputField } from "./input-field"

import email from "@/assets/icons/email.svg"
import key from "@/assets/icons/key.svg"
import open_eye from "@/assets/icons/open_eye.svg"


const meta = {
    title: "UI/InputField",
    component: InputField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof InputField>


export default meta


type Story = StoryObj<typeof meta>


export const Default: Story = {
    args: {
        placeholder: "Username atau Email",
    },
}


export const WithEmailIcon: Story = {
    args: {
        placeholder: "Username atau Email",
        leftIcon: (
            <img
                src={email}
                alt=""
            />
        ),
    },
}


export const Password: Story = {
    args: {
        placeholder: "Password",
        type: "password",
        leftIcon: (
            <img
                src={key}
                alt=""
            />
        ),
        rightIcon: (
            <img
                src={open_eye}
                alt=""
            />
        ),
    },
}


export const Error: Story = {
    args: {
        placeholder: "Username",
        value: "user@123!",
        error: true,
        errorMessage:
            "No account found with this username and password",
        leftIcon: (
            <img
                src={email}
                alt=""
            />
        ),
    },
}


export const Disabled: Story = {
    args: {
        placeholder: "Disabled input",
        disabled: true,
    },
}