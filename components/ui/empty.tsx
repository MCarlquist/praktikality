import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Renders a container element for empty states with default layout and styling.
 *
 * @param props - Props forwarded to the underlying `div`. Use `className` to add or override classes.
 * @returns A `div` element that serves as the empty-state container.
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header slot for an empty state.
 *
 * @returns A div element with `data-slot="empty-header"` and centered layout/alignment classes; any provided props are applied to the element.
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders the empty-state media container with selectable variant styling.
 *
 * @param variant - Visual variant for the media container. Supported values: `"default"` (transparent background) and `"icon"` (sized, rounded icon background with centered content).
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @param props - Additional props are spread onto the underlying `div` element.
 * @returns The rendered `div` element for the empty-state media slot.
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the title area for an empty state with preset typography styles.
 *
 * @returns A div element serving as the empty-state title slot.
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Renders the description area for an empty state with muted text and styled links.
 *
 * @returns A div element with data-slot="empty-description" containing the description content and link styling
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Container for empty-state content that centers children and applies layout and typography classes.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @param props - Additional attributes and event handlers forwarded to the root `div`
 * @returns The rendered `div` element used as the empty-state content container
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}