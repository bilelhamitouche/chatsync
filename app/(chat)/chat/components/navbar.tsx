import CustomSidebarTrigger from "@/components/custom-sidebar-trigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  memberInfo: { imageUrl: string; name: string }[];
}

function Navbar({ memberInfo }: NavbarProps) {
  return (
    <header className="flex p-4 w-full shadow-sm shadow-b">
      <CustomSidebarTrigger />
      {memberInfo.length === 1 ? (
        <div className="flex">
          <Avatar>
            <AvatarImage
              src={memberInfo[0].imageUrl}
              alt={`${memberInfo[0].name} image`}
            />
            <AvatarFallback>{memberInfo[0].name.toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex flex-col">
          <ul className="flex">
            {memberInfo.map((member, index) => (
              <Avatar key={index}>
                <AvatarImage
                  src={member.imageUrl}
                  alt={`${member.name} image`}
                />
                <AvatarFallback>{member.name}</AvatarFallback>
              </Avatar>
            ))}
          </ul>
          <p className="text-sm text-gray-500">{memberInfo.length} members</p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
