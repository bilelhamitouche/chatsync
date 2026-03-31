import { membersQueryOptions } from "@/api/queries/members";
import type { Member } from "@/lib/types";
import { formatAvatarName } from "@/utils/formatAvatarName";
import { Avatar, Portal, Select, useListCollection } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
}

export default function MultiSelect({
  value,
  onChange,
  onBlur,
}: MultiSelectProps) {
  const { data, isPending } = useQuery(membersQueryOptions());
  const { collection } = useListCollection({
    initialItems: (data as Pick<Member, "id" | "name" | "avatar">[]) || [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
  });
  useEffect(() => {
    if (data) collection.setItems(data);
  }, [data]);
  return (
    <Select.Root
      multiple
      disabled={isPending}
      collection={collection}
      value={value}
      onValueChange={(e) => onChange(e.value)}
      onBlur={onBlur}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select members" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data?.map((member: any) => (
              <Select.Item
                justifyContent="flex-start"
                item={member}
                key={member.id}
              >
                <Avatar.Root size="xs">
                  <Avatar.Image
                    src={member.avatar}
                    alt={`${member.name} image`}
                  />
                  <Avatar.Fallback>
                    {formatAvatarName(member.name)}
                  </Avatar.Fallback>
                </Avatar.Root>
                {member.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
