import * as React from "react"

import { Avatar } from "@/components/ui/avatar/avatar"
import { cn } from "@/lib/utils"


type TeamMemberRole = "owner" | "admin" | "member"
type TeamMemberStatus = "online" | "offline"


type TeamMemberProps = React.ComponentProps<"div"> & {
    username: string
    avatar?: React.ReactNode

    role: TeamMemberRole
    status: TeamMemberStatus

    wpm: number
    wins: number
}


const roleConfig = {
    owner: {
        label: "OWNER",
        badge:
            "flex flex-center bg-amber-500/10 outline-amber-500 text-amber-500",
        avatar:
            "ring-button-solo-secondary ring-1 outline-avatar-border shadow-[0px_0px_8px_0px_rgba(255,172,0,0.38)]",
    },

    admin: {
        label: "ADMIN",
        badge:
            "flex flex-center bg-purple-500/10 outline-purple-500 text-purple-500",
        avatar:
            "ring-button-match-primary ring-1 outline-purple-500 shadow-[0px_0px_8px_0px_rgba(157,78,221,1)]",
    },

    member: {
        label: "MEMBER",
        badge:
            "flex flex-center bg-indigo-950 outline-indigo-950 text-slate-400",
        avatar:
            "ring-passive-color ring-1 outline-passive-color shadow-[0px_0px_8px_0px_rgba(157,78,221,1)]",
    },
}


const statusConfig = {
    online: {
        label: "ONLINE",
        text: "text-lime-500",
        dot: "bg-lime-500",
    },

    offline: {
        label: "OFFLINE",
        text: "text-slate-400",
        dot: "bg-gray-600",
    },
}


function TeamMember({
    username,
    avatar,
    role,
    status,
    wpm,
    wins,
    className,
    ...props
}: TeamMemberProps) {

    const roleStyle = roleConfig[role]
    const statusStyle = statusConfig[status]


    return (
        <div
            {...props}
            className={cn(
                "flex w-full items-center justify-between rounded-xl border border-indigo-950 border-l-[3px] bg-slate-900 p-4",
                status === "offline" && "opacity-40",
                className,
            )}
        >

            {/* Left */}
            <div className="flex items-center gap-3">

                <Avatar
                    variant="team"
                    className={cn(
                        "size-12 bg-secondary-white/10",
                        roleStyle.avatar,
                    )}
                >
                    {avatar}
                </Avatar>


                <div className="flex flex-col items-start gap-1.5">

                    <h3 className="font-poppins text-base font-extrabold text-base-white">
                        {username}
                    </h3>


                    <div
                        className={cn(
                            "rounded-sm px-2 py-0.5 outline-1 -outline-offset-1",
                            roleStyle.badge,
                        )}
                    >
                        <span className="font-poppins text-[10px] font-extrabold uppercase">
                            {roleStyle.label}
                        </span>
                    </div>

                </div>

            </div>


            {/* Right */}
            <div className="flex flex-col items-end gap-2">

                <div className="flex items-center gap-1.5">

                    <span
                        className={cn(
                            "font-poppins text-xs font-bold",
                            statusStyle.text,
                        )}
                    >
                        {statusStyle.label}
                    </span>


                    <div
                        className={cn(
                            "size-2 rounded-full",
                            statusStyle.dot,
                        )}
                    />

                </div>


                <span className="font-poppins text-xs font-semibold text-slate-400">
                    WPM: {wpm} | Wins: {wins}
                </span>

            </div>

        </div>
    )
}


export { TeamMember }
export type {
    TeamMemberProps,
    TeamMemberRole,
    TeamMemberStatus,
}