"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import Image from "next/image"

function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      onCheckedChange={onCheckedChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCheckedChange?.(!checked);
        }
      }}
      className={cn(
        "peer border-gray-600 data-[state=checked]:bg-blue-500 bg-white data-[state=checked]:border-blue-500 aria-invalid:ring-destructive/20 aria-invalid:border-destructive size-4 shrink-0 rounded-[2px] border shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <Image src="/images/shared/checkmark.svg" alt="Checkmark" width={12} height={12} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
