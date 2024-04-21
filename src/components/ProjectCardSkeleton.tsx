import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <>
      <Card className="hover:bg-accent hover:cursor-pointer">
        <CardHeader>
          <Skeleton className="h-[32px] w-[220px] rounded-xl" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[230px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="aspect-video mt-4 rounded-xl" />
        </CardContent>
      </Card>
    </>
  );
}
