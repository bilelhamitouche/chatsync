import { Input } from "@/components/ui/input"
import { useQueryState } from "nuqs"

export default function SearchBar() {
  const [search, setSearch] = useQueryState("search");
  return (
    <Input value={search || ""} onChange={(e) => setSearch(e.target.value)} placeholder="Search for chats" />
  )
}
