import Image from "next/image";
import logo from '@/app/logo.jpg';
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
      </div>
      <Image src={logo} alt="Praktikality logo" width={1500} height={800} className="h-auto w-full drop-shadow-lg shadow-lg rounded" />
      <Button asChild size={'lg'} className="w-auto h-10 p-7">
        <Link href={'/auth/sign-up'}>
          <span className="text-3xl">Kom igång</span>
        </Link>
      </Button>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
