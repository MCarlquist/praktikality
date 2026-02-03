"use client";

import { useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { Toaster } from "@/components/ui/sonner";


export type UserTableData = {
    email: string,
}

function ActionsCell({ row, onUpdate }: { row: any; onUpdate?: () => void }) {
    const [open, setOpen] = useState(false);
    const [wantInternship, setWantInternship] = useState<boolean>(row.original.want_internship ?? false);
    const { email, companies_they_work_at } = row.original;

    console.log(row.original)

    // convert companies_they_work_at (array of JSON strings) into an array of objects
    const companies = (companies_they_work_at || []).map((item: string) => {
        try {
            return JSON.parse(item);
        } catch (e) {
            return { company_name: item };
        }
    });




    const handleEditUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const updatedUser = {
            id: row.original.id,
            want_internship: wantInternship,
        };
        
        const response = await (await fetch('/api/admin/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: row.original.id,
                updatedUser: updatedUser,
            }),
        })).json();

        // toast notification
        if (response.success) {
          toast.success(`successfully updated ${email}`);
          row.original.want_internship = wantInternship;
          onUpdate?.();
        } else {
          toast.error('Något gick fel, försök igen.');
        }

        setOpen(false);
    }



    const deleteUser = async () => {
        const response = await fetch(`/api/admin/users?user=${row.original.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            onUpdate?.();
        }
    }

    return (
        <>
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
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        View user
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={deleteUser}>Delete User</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to {email}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditUser}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Are they ready for internship?</FieldLabel>
                                <div className="flex items-center space-x-2">
                                    {wantInternship ? '' : <p className="text-red-500">No</p>}
                                    <Switch 
                                        id="user-wants-internship" 
                                        checked={wantInternship}
                                        onCheckedChange={setWantInternship}
                                    />
                                    {wantInternship ? <p className="text-green-500">Yes</p> : ''}
                                </div>
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Companies they work at</FieldLabel>
                                <div className="flex flex-col gap-1.5 mt-2">
                                    {companies.length > 0 ? (
                                        companies.map((company: any, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <div className="h-1 w-1 rounded-full bg-current" />
                                                <span>{company.company_name || company.name || "Unknown Company"}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No companies listed</p>
                                    )}
                                </div>
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => setOpen(false)}>No</Button>
                            <Button type="submit">Yes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export const userColumns: ColumnDef<UserTableData>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell row={row} />,
    },
]