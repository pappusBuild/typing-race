import * as React from "react"

import { cn } from "@/lib/utils"

type InputFieldProps = Omit<
React.ComponentProps<"input">,
"onChange" | "type" | "value"
> & {
value?: string
onChange?: (value: string) => void
type?: "text" | "password"
leftIcon?: React.ReactNode
rightIcon?: React.ReactNode
validationPattern?: RegExp
error?: boolean
errorMessage?: string
}

function InputField({
className,
error = false,
errorMessage,
leftIcon,
onChange,
rightIcon,
type = "text",
validationPattern,
value,
...props
}: InputFieldProps) {

const hasPatternError =
validationPattern !== undefined &&
value !== undefined &&
value.length > 0 &&
!validationPattern.test(value)

const hasError = error || hasPatternError

return (
<div className="w-full">
    <div
    className={cn(
        "flex h-[52px] w-full items-center gap-3 rounded-full border-[1.5px] bg-card-background-tertiary px-5 transition-colors",
        "focus-within:border-divider-tertiary",
        hasError
        ? "border-destructive"
        : "border-divider-secondary",
        className
    )}
    >

    {leftIcon && (
        <span
        aria-hidden="true"
        className="
            flex size-[18px] shrink-0 items-center justify-center
        "
        >
        {leftIcon}
        </span>
    )}

    <input
        {...props}
        aria-invalid={hasError}
        className="
        min-w-0 flex-1 bg-transparent
        text-sm text-base-white
        outline-none
        placeholder:text-base-white/50
        "
        type={type}
        value={value}
        onChange={(event) =>
        onChange?.(event.target.value)
        }
    />

    {rightIcon && (
        <span
        aria-hidden="true"
        className="
            flex size-[18px] shrink-0 items-center justify-center
        "
        >
        {rightIcon}
        </span>
    )}

    </div>

    {hasError && errorMessage && (
    <p className="mt-2 text-sm text-destructive">
        {errorMessage}
    </p>
    )}
</div>
)
}

export { InputField }
export type { InputFieldProps }