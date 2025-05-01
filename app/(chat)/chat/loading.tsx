import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 size="48" className="animate-spin" />
      <p className="text-lg text-gray-500">Loading</p>
    </div>
  );
}

export default Loading;
