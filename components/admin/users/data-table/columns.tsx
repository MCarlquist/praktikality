"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch"
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
import { Input } from "@/components/ui/input";


export type UserTableData = {
    email: string,
}

function ActionsCell({ row }: { row: any }) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<any[]>([]);

    const { want_internship, email, companies_they_work_at } = row.original;


    const deleteUser = async () => {
        const response = await fetch(`/api/admin/users?user=${row.original.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            setUsers(users.filter(user => user.id !== row.original.id));
        }
        
        setUsers(users.filter(user => user.id !== row.original.id));
    }
    
    return (
        <>
            <DropdownMenu>
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
                            Make changes to { email }
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-4">
                            <Label>Do they want to find internship?</Label>
                            {want_internship ? "Yes" : "No"}
                        </div>
                        <div>
                            <Label>Companies they work at</Label>
                            {companies_they_work_at}
                        </div>
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