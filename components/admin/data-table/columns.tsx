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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyTableData = {
  id: string
  company_name: string
  company_contact: string,
  number_of_deltagare: string,
  deltagare: Array<{ name: string; email: string }>,
  antal_intresserade: string
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
    header: 'Antal på praktik',
    cell: ({ row }) => {
      const deltagare = row.original.deltagare;
      return deltagare ? deltagare.length : '-';
    }
  },
  {
    accessorKey: 'antal_intresserade',
    header: 'Antal intresserade'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const { company_name } = row.original;

      // Add user to commapny table.
      const addUserSubmit = async (e: { preventDefault: () => void; }) => {

        const name = (document.getElementById('deltagare-name') as HTMLInputElement)?.value;
        const email = (document.getElementById('deltagare-email') as HTMLInputElement)?.value;

        const userBody = {
          name,
          email
        };
        e.preventDefault();
        const submit = fetch('/api/admin/company', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            company_name: company_name,
            userBody
          })
        });

        const result = (await submit).json();
        const response = await result;

        // toast notification
        if (response.success) {
          toast.success(`Deltagare ${name} tillagd för ${company_name}`);
        } else {
          toast.error('Något gick fel, försök igen.');
        }

        setOpen(false);

      };




      return (
        <DropdownMenu>
          <Toaster position="top-right" />
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
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Lägg till deltagare i praktik
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Lägg till deltagare för {company_name}</DialogTitle>
              </DialogHeader>
              <form onSubmit={addUserSubmit} className="flex gap-4 flex-col">
                <div className="grid gap-4">
                  <Label htmlFor="deltagare-name">Namn</Label>
                  <Input type="text" placeholder="Namn" id="deltagare-name" />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="deltagare-email">E-mail</Label>
                  <Input type="email" placeholder="Email" id="deltagare-email" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="destructive" onClick={() => setOpen(false)}>No</Button>
                  <Button type="submit">Yes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenu>

      )
    },
  },
]