import Navbar from "../components/navbar";
import { getChatMemberInfo, getChatMessages } from "@/lib/queries";
import { getUserInfo } from "@/actions/auth";
import Messages from "../components/Messages";
import ChatForm from "../components/ChatForm";

async function Chat({ params }: { params: Promise<{ chatId: string }> }) {
  const chatParams = await params;
  const initialMessages = await getChatMessages(chatParams.chatId);
  const user = await getUserInfo();
  const memberInfo = await getChatMemberInfo(chatParams.chatId);
  const filteredMemberInfo = memberInfo?.filter(
    (member) => member.id !== user?.id,
  );
  return (
    <div className="grid w-full h-screen grid-rows-[auto_1fr_auto]">
      {filteredMemberInfo != null ? (
        <Navbar memberInfo={filteredMemberInfo} />
      ) : (
        <Navbar memberInfo={[]} />
      )}
      <Messages
        initialMessages={initialMessages ?? []}
        chatId={chatParams.chatId}
      />
      <ChatForm chatId={chatParams.chatId} />
    </div>
  );
}

export default Chat;
