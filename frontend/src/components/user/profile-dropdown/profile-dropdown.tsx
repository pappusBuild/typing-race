import * as React from "react"
import logout from "@/assets/icons/logout.svg"

import { Avatar } from "@/components/ui/avatar/avatar"
import { DropdownItem } from "@/components/user/profile-dropdown/dropdown-item"
import { DropdownList } from "@/components/user/profile-dropdown/dropdown-list"
import { cn } from "@/lib/utils"


type ProfileDropdownItem = "View Profile" | "Account" | "Setting" | "Logout"


type ProfileDropdownProps = Omit<React.ComponentProps<"div">, "children"> & {
    username: string
    role: string
    avatar?: React.ReactNode
    onItemSelect?: (item: ProfileDropdownItem) => void
}


const menuItems: ProfileDropdownItem[] = [
    "View Profile",
    "Account",
    "Setting",
    "Logout",
]


function ProfileDropdown({
    username,
    role,
    avatar,
    className,
    onItemSelect,
    ...props
}: ProfileDropdownProps) {

    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)


    React.useEffect(() => {

        function handleOutsideClick(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }


        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }


        document.addEventListener("mousedown", handleOutsideClick)
        document.addEventListener("keydown", handleEscape)


        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            document.removeEventListener("keydown", handleEscape)
        }

    }, [])


    function handleItemSelect(item: ProfileDropdownItem) {
        onItemSelect?.(item)
        setIsOpen(false)
    }


    return (
        <div
            ref={containerRef}
            className={cn("relative inline-flex", className)}
            {...props}
        >

            <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label={`Open profile menu for ${username}`}
                className="flex items-start gap-3 rounded-lg pb-4 text-left outline-none focus-visible:ring-3 focus-visible:ring-avatar-border/50"
                onClick={() => setIsOpen((open) => !open)}
            >

                <span className="flex flex-col items-end gap-0.5 whitespace-nowrap pt-0.5">
                    <span className="text-sm font-bold text-base-white">
                        {username}
                    </span>

                    <span className="text-xs text-avatar-border">
                        {role}
                    </span>
                </span>


                {/* Avatar */}
                <Avatar
                    variant="profile"
                    className="
                        size-12
                        bg-text-primary
                        text-game-primary
                        border-2
                        border-avatar-border
                        shadow-[0_0_5px_var(--avatar-border)]
                    "
                >
                    {avatar}
                </Avatar>

            </button>


            {isOpen && (
                <DropdownList
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2"
                >

                    {menuItems.map((item, index) => (
                        <React.Fragment key={item}>

                            {index === 3 && (
                                <div className="mx-2 h-0.5 rounded-full bg-secondary-white" />
                            )}

                            <DropdownItem
                                role="menuitem"
                                onClick={() => handleItemSelect(item)}
                                icon={
                                    item === "Logout" ? (
                                        <img
                                            src={logout}
                                            alt="Logout"
                                            className="size-5.75"
                                        />
                                    ) : undefined
                                }
                            >
                                {item}
                            </DropdownItem>

                        </React.Fragment>
                    ))}

                </DropdownList>
            )}

        </div>
    )
}


export { ProfileDropdown }
export type { ProfileDropdownItem, ProfileDropdownProps }