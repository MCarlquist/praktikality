import { Input } from "@/components/ui/input";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react"


export function SeachBar() {
  return (
    <Field orientation={'horizontal'} className="gap-4 w-full">
        <Input type="text" placeholder="Sök Företag..." className="h-16 text-5xl px-6 flex-1" style={{ fontSize: '30px'}} />
        <Button variant="default" size="default" className="text-md px-8 h-14"><SearchIcon size={64} /></Button>
    </Field>
  );
}