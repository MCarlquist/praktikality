import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {

  const title= 'Praktikality';


  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
      </div>
      <h1 className="sr-only">{ title }</h1>
      <p className="text-2xl lg:text-7xl font-semibold !leading-tight mx-auto max-w-xl text-center">
        { title }
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
