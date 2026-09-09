import * as React from "react"

import { cn } from "@/lib/utils"
import alert from "@/assets/icons/alert.svg"  

type InputFieldProps = Omit<React.ComponentProps<"input">, "onChange" | "type" | "value"> & {
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
    disabled,
    ...props
}: InputFieldProps) {
    const hasPatternError =
        validationPattern !== undefined &&
        value !== undefined &&
        value.length > 0 &&
        !validationPattern.test(value)

    const hasError = error || hasPatternError

    return (
        <div className={cn("w-full rounded-[26px]", hasError && "bg-[#FF0900]/10")}>
            <div
                className={cn(
                    "flex h-13 w-full items-center gap-3 rounded-full border-[1.5px] bg-card-background-tertiary px-5 transition-colors focus-within:border-divider-tertiary",
                    hasError ? "border-destructive bg-[#FF0900]/10" : "border-divider-secondary bg-card-background-tertiary",
                    disabled && "cursor-not-allowed opacity-50",
                    className   
                )}
            >
                {leftIcon && (
                    <span aria-hidden="true" className="flex size-4.5 shrink-0 items-center justify-center">
                        {leftIcon}
                    </span>
                )}

                <input
                    {...props}
                    type={type}
                    value={value}
                    disabled={disabled}
                    aria-invalid={hasError}
                    aria-describedby={hasError && errorMessage ? "input-error" : undefined}
                    className="min-w-0 flex-1 bg-transparent text-sm text-base-white outline-none placeholder:text-base-white/50 disabled:cursor-not-allowed"
                    onChange={(event) => onChange?.(event.target.value)}
                />

                {rightIcon && (
                    <span aria-hidden="true" className="flex size-4.5    shrink-0 items-center justify-center">
                        {rightIcon}
                    </span>
                )}

            </div>
            {hasError && errorMessage && (  
                <div id="input-error" className="flex items-center gap-2 px-5 pb-4 pt-3 text-sm text-base-white/80">
                    <img src={alert} alt="Alert" className="size-4.5 shrink-0 inline-block align-text-top" />
                    <p className="italic">{errorMessage}</p>
                </div>
            )}
        </div>
    )
}

export { InputField }
export type { InputFieldProps }