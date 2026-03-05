import Link from "next/link";
import { SupabaseLogo } from "./supabase-logo";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

export function Hero() {

  const title = 'Praktikality';


  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
      </div>
      <h1 className="sr-only">{ title }</h1>
      <p className="text-2xl lg:text-7xl font-semibold !leading-tight mx-auto max-w-xl text-center">
        { title }
      </p>
      <p>En hub där man kan hitta sin nya praktplats och hitta rätt projekt för dom.</p>
      <ButtonGroup>
        <Button asChild>
          <Link href="/directory" className="flex items-center gap-2">
            <span>Bläddra i företag</span>
          </Link>
        </Button>
      </ButtonGroup>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
