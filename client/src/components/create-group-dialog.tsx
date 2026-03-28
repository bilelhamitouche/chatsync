import { createGroupSchema } from "@/lib/zod";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { type Dispatch, type SetStateAction } from "react";
import MultiSelect from "./multiselect";
import { useCreateGroupMutation } from "@/api/mutations/chats";

interface CreateGroupDialog {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateGroupDialog({
  isDialogOpen,
  setIsDialogOpen,
}: CreateGroupDialog) {
  const groupChat = useCreateGroupMutation();
  const form = useForm({
    defaultValues: {
      name: "",
      members: [] as string[],
    },
    validators: {
      onBlur: createGroupSchema,
      onSubmit: createGroupSchema,
    },
    onSubmit: async ({ value }) => {
      await groupChat.mutateAsync({
        members: value.members,
        name: value.name,
        isGroup: true,
      });
    },
  });
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
              <Dialog.Title>Create Group Chat</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4" width="full" asChild>
                <form
                  id="create-group-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  <form.Field
                    name="name"
                    children={(field) => (
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                          name="name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Chat name"
                        />
                      </Field.Root>
                    )}
                  />
                  <form.Field
                    name="members"
                    children={(field) => (
                      <Field.Root>
                        <Field.Label>Members</Field.Label>
                        <MultiSelect
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                        />
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
                form="create-group-form"
                type="submit"
                onClick={() => {
                  if (!groupChat.isError) {
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
