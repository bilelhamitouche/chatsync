import CustomSidebarTrigger from "@/components/custom-sidebar-trigger";

async function Chat() {
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="p-4 shadow-sm shadow-b">
        <CustomSidebarTrigger />
      </header>
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-500">
          Select a chat or create a new one to start messaging.
        </p>
      </div>
    </div>
  );
}

export default Chat;
