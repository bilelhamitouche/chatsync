import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg">Loading</p>
      <Loader2 size="48" className="animate-spin" />
    </div>
  );
}

export default Loading;
