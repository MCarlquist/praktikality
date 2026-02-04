"use client";

import { DataTable } from "@/components/admin/users/data-table/data-table";
import EmptyArea from "@/components/admin/empty-area";
import { Suspense, useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { userColumns } from "@/components/admin/users/data-table/columns";


export default function CompanyAdminPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to fetch users: ${response.status} ${text}`);
            }
            const data = await response.json();
            setUsers(data.users ?? []);
            if (process.env.NODE_ENV !== 'production') {
                console.log('fetched users', data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <h1 className="text-2xl font-bold text-center">Users</h1>
            <div className="flex flex-col items-center justify-center">
                <p>Here you can manage users of Praktikality.</p>
                <ul className="text-sm">
                    <li>- Add Users</li>
                    <li>- Edit Users</li>
                    <li>- Delete Users</li>
                </ul>

            </div>
            <ButtonGroup className="mx-auto">
                <Link href="/admin/users/new">
                    <Button size={'lg'} variant="outline" className="mx-auto flex">Add User</Button>
                </Link>
                <Button size={'lg'} variant="link" className="mx-auto flex">Import from Excel</Button>
            </ButtonGroup>

            {isLoading ? (
                <div> <Spinner className="size-7 mx-auto" /></div>
            ) : users.length > 0 ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <DataTable data={users} columns={userColumns} onUpdate={fetchUsers} />




                </Suspense>
            ) : (
                <EmptyArea
                    title="No Users Yet"
                    description={"You haven't created any users yet. Get started by creating your first user."}
                    cta="Create User"
                />
            )}

            {/* If there are companies, show the data table */}
        </>
    );
}
