import { ArrowUpRightIcon, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
type EmptyAreaProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    cta?: React.ReactNode;
};

/**
 * Render a styled empty-state area with an icon, title, optional description, and an optional CTA button.
 *
 * @param title - The title content displayed in the empty state.
 * @param description - Optional descriptive content displayed beneath the title.
 * @param cta - Optional call-to-action content rendered inside an outlined Button.
 * @returns The rendered empty-state React element.
 */
export default function EmptyArea({ title, description, cta }: EmptyAreaProps) {
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
                        <Button variant={'outline'}>{ cta }</Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
}