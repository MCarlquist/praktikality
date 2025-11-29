import { ArrowUpRightIcon, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
type EmptyAreaProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
};

export default function EmptyArea({ title, description }: EmptyAreaProps) {
    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Building2 />
                    </EmptyMedia>
                    <EmptyTitle>{ title }</EmptyTitle>
                    <EmptyDescription>
                        { description }
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button>Create Project</Button>
                        <Button variant="outline">Import Project</Button>
                    </div>
                </EmptyContent>
                <Button
                    variant="link"
                    asChild
                    className="text-muted-foreground"
                    size="sm"
                >
                    <a href="#">
                        Learn More <ArrowUpRightIcon />
                    </a>
                </Button>
            </Empty>
        </div>
    );
}