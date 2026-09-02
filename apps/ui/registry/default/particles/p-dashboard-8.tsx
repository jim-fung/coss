import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Message flow</CardTitle>
          <CardDescription>
            Telegram messages become records here
          </CardDescription>
        </CardHeader>
        <CardPanel>
          <Empty className="py-6 md:py-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircleIcon />
              </EmptyMedia>
              <EmptyTitle>No messages yet</EmptyTitle>
              <EmptyDescription>
                Connect the farm&apos;s Telegram bot and messages will appear
                here as they arrive.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button size="sm">Connect Telegram</Button>
                <Button size="sm" variant="ghost">
                  View docs
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <p className="text-center text-muted-foreground text-xs">
            parse pending · <span className="italic">nothing to confirm</span>
          </p>
        </CardPanel>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent registrations</CardTitle>
          <CardDescription>Fetching the latest farm activities</CardDescription>
        </CardHeader>
        <CardPanel>
          <div aria-busy="true" aria-label="Loading registrations">
            <div className="flex items-center gap-3 py-3">
              <Skeleton className="size-8 rounded-md" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <div className="flex items-center gap-3 py-3">
              <Skeleton className="size-8 rounded-md" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <div className="flex items-center gap-3 py-3">
              <Skeleton className="size-8 rounded-md" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
        </CardPanel>
      </Card>
    </div>
  );
}
