"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Router, { RedirectType } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyTableData = {
  id: string
  company_name: string
  company_contact: string,
  number_of_deltagare: string
}



export const columns: ColumnDef<CompanyTableData>[] = [
  {
    accessorKey: "company_name",
    header: "Name",
  },
  {
    accessorKey: "company_contact",
    header: "Contact",
  },
  {
    accessorKey: 'number_of_deltagare',
    header: '# of deltagare'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const { id, company_name } = row.original;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => Router.redirect(`/admin/company/${company_name}`, RedirectType.push)}
            >
              View Company Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]