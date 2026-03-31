import { createDmSchema } from "@/lib/zod";
import {
  Avatar,
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  Select,
  Stack,
  useListCollection,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { membersQueryOptions } from "@/api/queries/members";
import { useCreateDmMutation } from "@/api/mutations/chats";
import { formatAvatarName } from "@/utils/formatAvatarName";
import type { Member } from "@/lib/types";

interface CreateDmDialog {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateDmDialog({
  isDialogOpen,
  setIsDialogOpen,
}: CreateDmDialog) {
  const dmChat = useCreateDmMutation();
  const form = useForm({
    defaultValues: {
      members: [] as string[],
    },
    validators: {
      onBlur: createDmSchema,
      onSubmit: createDmSchema,
    },
    onSubmit: async ({ value }) => {
      await dmChat.mutateAsync({ members: value.members, isGroup: false });
    },
  });
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
    <Dialog.Root
      size="sm"
      open={isDialogOpen}
      onOpenChange={(e) => setIsDialogOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Create DM Chat</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4" width="full" asChild>
                <form
                  id="create-dm-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  <form.Field
                    name="members"
                    children={(field) => (
                      <Field.Root>
                        <Field.Label>Member</Field.Label>
                        <Select.Root
                          closeOnSelect
                          disabled={isPending || dmChat.isPending}
                          collection={collection}
                          value={field.state.value}
                          onValueChange={(e) => field.handleChange(e.value)}
                          onBlur={field.handleBlur}
                        >
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select member" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {data.map((member: any) => (
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
                      </Field.Root>
                    )}
                  />
                </form>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                form="create-dm-form"
                disabled={isPending || dmChat.isPending}
                type="submit"
                onClick={() => {
                  if (!dmChat.isError) {
                    setIsDialogOpen(false);
                  }
                }}
              >
                Create
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
