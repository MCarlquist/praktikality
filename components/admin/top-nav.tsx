import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

/**
 * Render the top navigation for the admin section as a horizontal button group.
 *
 * @returns A JSX element containing a horizontal ButtonGroup with outline-styled buttons linking to `/admin` (Admin Dashboard), `/admin/company` (Company Page), and `/admin/users` (Users)
 */
export async function TopNav() {
    return (
        <ButtonGroup orientation={'horizontal'} className="flex w-full md:max-w-xl mx-4 rounded shadow items-center justify-center">
            <div className="">
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