import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarTriggerProps {
  name: string;
  email: string;
  image: string | undefined;
}

export default function AvatarTrigger({
  name,
  email,
  image,
}: AvatarTriggerProps) {
  return (
    <>
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={image as string} alt={`${name} image`} />
          <AvatarFallback>{name.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-xs">{email}</p>
        </div>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </>
  );
}
