import CustomSidebarTrigger from "@/components/custom-sidebar-trigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavbarProps {
  memberInfo: {
    id: string | null;
    name: string | null;
    imageUrl: string | null;
  }[];
}

function Navbar({ memberInfo }: NavbarProps) {
  return (
    <header className="flex gap-4 p-4 w-full shadow-sm shadow-b">
      <CustomSidebarTrigger />
      {memberInfo.length === 1 ? (
        <div className="flex gap-2 items-center px-2" key={memberInfo[0].id}>
          <Avatar>
            <AvatarImage
              src={memberInfo[0].imageUrl as string}
              className="border border-gray-900"
            />
            <AvatarFallback className="border border-gray-700">
              {memberInfo[0].name?.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
          <span>{memberInfo[0].name}</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <ul className="flex relative gap-2 items-center h-10">
            {memberInfo.map((member, index) => (
              <Tooltip key={member.id}>
                <TooltipTrigger>
                  <Avatar
                    className="absolute top-0"
                    style={{
                      zIndex: memberInfo.length - index,
                      transform: `translateX(${index * 12}px)`,
                    }}
                  >
                    <AvatarImage src={member.imageUrl as string} />
                    <AvatarFallback className="border border-gray-700">
                      {member.name?.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{member.name}</TooltipContent>
              </Tooltip>
            ))}
          </ul>
          <p className="flex gap-1 items-center text-sm text-gray-500">
            {memberInfo.length} Members
          </p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
