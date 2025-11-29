"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Renders a styled separator line that supports horizontal and vertical orientations.
 *
 * @param className - Optional additional CSS class names to apply to the separator root
 * @param orientation - Layout orientation, either `"horizontal"` or `"vertical"`
 * @param decorative - Whether the separator is decorative; forwarded to the underlying primitive
 * @returns A SeparatorPrimitive.Root element with composed classes, forwarded props, and a `data-slot="separator"` attribute
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }