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
import { FormHTMLAttributes, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyTableData = {
  id: string
  company_name: string
  company_contact: string,
  number_of_deltagare: string,
  deltagare: Array<{ name: string; email: string }>,
  antal_intresserade: string
  ready_for_intern: boolean
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
      return deltagare ? deltagare.length : '0';
    }
  },
  {
    accessorKey: 'antal_intresserade',
    header: 'Antal intresserade',
    cell: ({ row }) => {
      const howMany = row.original.antal_intresserade;
      return howMany ? howMany.length : '0';

    },
  },
  {
    accessorKey: 'ready_for_intern',
    header: 'Redo För Praktikanter',
    cell: ({ row }) => {
      const answer = row.original.ready_for_intern;
      return answer ? 'Ja': 'Nej';

    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [openCompany, setOpenCompany] = useState(false);
      const [wantIntern, setWantIntern] = useState<boolean>(row.original.ready_for_intern ?? false)
      const { company_name } = row.original;
      
      
      

      // Add user to commapny table.
      const addUserSubmit = async (e: { preventDefault: () => void; }) => {

        const initials = (document.getElementById('deltagare-initials') as HTMLInputElement)?.value;

        const userBody = {
          initials,
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
          toast.success(`Deltagare ${initials} tillagd för ${company_name}`);
        } else {
          toast.error('Något gick fel, försök igen.');
        }

        setOpen(false);

      };

      // make company ready for intern
      const makeCompanyReadySubmit = async (e: { preventDefault: () => void;}) => {
          e.preventDefault();
          const updatedCompany = {
            id: row.original.id,
            ready_for_intern: wantIntern
          };

          const response = await (await fetch('/api/admin/company/readiness', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: row.original.id,
                updatedCompany,
            }),
        })).json();

        // toast notification
        if (response.success) {
          toast.success(`${company_name} uppdaterad`);
        } else {
          toast.error('Något gick fel, försök igen.');
        }

        setOpenCompany(false);
      }




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
              Redigera Företag
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Lägg till deltagare i praktik
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenCompany(true)}>
              Ändra Företag "readiness"
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
                  <Label htmlFor="deltagare-name">Deltagare Initialer</Label>
                  <Input type="text" placeholder="Initialer ex. MC101" id="deltagare-initials" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="destructive" onClick={() => setOpen(false)}>No</Button>
                  <Button type="submit">Yes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={openCompany} onOpenChange={setOpenCompany}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Är Företaget redo att ta emot praktikanter?</DialogTitle>
              </DialogHeader>
              <form onSubmit={makeCompanyReadySubmit} className="flex gap-4 flex-col">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Redo för praktik?</FieldLabel>
                    <div className="flex items-center space-x-2">
                      {wantIntern ? '' : <p className="text-red-500">Nej</p>}
                      <Switch
                        id="user-wants-internship"
                        checked={wantIntern}
                        onCheckedChange={setWantIntern}
                      />
                      {wantIntern ? <p className="text-green-500">Ja</p> : ''}
                    </div>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button type="button" variant="destructive" onClick={() => setOpenCompany(false)}>No</Button>
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