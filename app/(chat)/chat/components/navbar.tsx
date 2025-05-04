import CustomSidebarTrigger from "@/components/custom-sidebar-trigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  memberInfo: {
    id: string | null;
    name: string | null;
    imageUrl: string | null;
  }[];
}

function Navbar({ memberInfo }: NavbarProps) {
  return (
    <header className="flex p-4 w-full shadow-sm shadow-b">
      <CustomSidebarTrigger />
      {memberInfo.length === 1 ? (
        <div className="flex gap-2 items-center px-2" key={memberInfo[0].id}>
          <Avatar>
            <AvatarImage
              src={memberInfo[0].imageUrl as string}
              alt={`${memberInfo[0].name} image`}
            />
            <AvatarFallback>
              {memberInfo[0].name?.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
          <span>{memberInfo[0].name}</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <ul className="flex gap-2 items-center">
            {memberInfo.map((member) => (
              <Avatar key={member.id}>
                <AvatarImage
                  src={member.imageUrl as string}
                  alt={`${member.name} image`}
                />
                <AvatarFallback>{member.name}</AvatarFallback>
              </Avatar>
            ))}
          </ul>
          <p className="text-sm text-gray-500">{memberInfo.length} Members</p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
