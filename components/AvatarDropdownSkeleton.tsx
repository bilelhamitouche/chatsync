import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function AvatarDropdownSkeleton() {
  return (
    <>
      <div className="flex gap-2 w-full">
        <Skeleton className="rounded-full size-8" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-2" />
        </div>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </>
  );
}
