import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import Link from "next/link";


export default function AdminPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 text-center items-center">
        <div className="space-y-1">
          <h1 className="leading-none text-lg mb-5">Admin Dashboard</h1>
          <div className="w-2/3 mx-auto">
            <p className="text-muted-foreground">Welcome to the admin dashboard. Here you can manage companies and users of Praktikality.</p>
            <Separator className="my-4" />
            <div>
              <p className="text-muted-foreground text-sm">What would you like to do?</p>
              <div className="mt-3">
                <div className="mx-auto flex gap-4 items-center justify-center">
                  <Button size={'default'} variant={'outline'} asChild>
                    <Link href={'/admin/company/new'}>Create Company</Link>
                  </Button>
                  <Button size={'default'} variant={'outline'} asChild>
                    <Link href={'/admin/users'}>Manage Users</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}