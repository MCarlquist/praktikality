
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export async function TopNav() {
    return (
        <ButtonGroup orientation={'horizontal'} className="flex w-full md:max-w-xl mx-4 rounded shadow items-center justify-center">
            <div className="gap-1 flex w-full items-center justify-center">
            <Button asChild size={'lg'} variant={"outline"}>
                <Link href="/admin">Admin Dashboard</Link>
            </Button>
            <Button asChild size={'lg'} variant={"outline"}>
                <Link href="/admin/company">Company Page</Link>
            </Button>
            
            <Button asChild size={'lg'} variant={"outline"}>
                <Link href="/admin/users">Users</Link>
            </Button>
        </div>
        </ButtonGroup>
    );
}