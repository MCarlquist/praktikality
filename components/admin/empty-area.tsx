import { Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
type EmptyAreaProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    cta?: React.ReactNode;
};

export default function EmptyArea({ title, description, cta }: EmptyAreaProps) {
    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Building2 />
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                    {description && (
                      <EmptyDescription>{description}</EmptyDescription>
                    )}
                </EmptyHeader>
                {cta && (
                  <EmptyContent>
                    <div className="flex gap-2">
                      <Button variant="outline">{cta}</Button>
                    </div>
                  </EmptyContent>
                )}
            </Empty>
        </div>
    );
}
