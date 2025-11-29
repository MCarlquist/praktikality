"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Render a styled table wrapped in a responsive, horizontally scrollable container.
 *
 * The table receives preset styling and any additional classes are merged with those defaults.
 *
 * @param className - Additional class names to merge with the component's default table classes
 * @param props - All other native table element props are forwarded to the rendered <table>
 * @returns A JSX element containing the table with merged classes inside a responsive container
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header element with predefined header-row styling and a data-slot attribute.
 *
 * @returns A `thead` element with `data-slot="table-header"` and combined header-row classes
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a table body element with predefined styling and a data-slot for targeting.
 *
 * @returns A `tbody` React element with the `data-slot="table-body"` attribute and merged class names (`[_&tr:last-child]:border-0` plus any provided `className`)
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled table footer element.
 *
 * @param className - Additional class names to merge with the component's default footer styles
 * @returns A `tfoot` element with `data-slot="table-footer"` and merged class names
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row (`<tr>`) with preset styling and a `data-slot="table-row"` attribute.
 *
 * Accepts all standard `<tr>` props and forwards them to the rendered element; any provided
 * `className` is merged with the component's default classes.
 *
 * @returns The rendered table row element.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell with predefined styling and a `data-slot` attribute.
 *
 * Forwards all received props to the underlying `th` element and merges any `className` with the component's default classes.
 *
 * @returns The rendered `th` element with `data-slot="table-head"` and merged class names.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table cell element with standardized spacing, alignment, and slot attributes.
 *
 * @param className - Additional class names to merge into the cell's default styling
 * @returns A `td` element with padding, middle alignment, no wrapping, merged `className`, and `data-slot="table-cell"`
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with standardized styling and a `data-slot` attribute for styling hooks.
 *
 * @returns The rendered `caption` element with muted foreground color, top margin, and small text size.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}