import { createDmSchema } from "@/lib/zod";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { type Dispatch, type SetStateAction } from "react";
import { socket } from "@/lib/socket";
import SingleSelect from "./singleselect";
import { toaster } from "./ui/toaster";
import { queryClient } from "@/lib/router";

interface CreateDmDialog {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateDmDialog({
  isDialogOpen,
  setIsDialogOpen,
}: CreateDmDialog) {
  const form = useForm({
    defaultValues: {
      members: [] as string[],
    },
    validators: {
      onBlur: createDmSchema,
      onSubmit: createDmSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await socket.emitWithAck("create_chat", {
          members: value.members,
          isGroup: false,
        });
        if (response.error) {
          toaster.error({
            title: "Failed to create Direct Message",
            description: response.error,
          });
        } else {
          queryClient.refetchQueries({
            queryKey: ["chats"],
            type: "all",
          });
          toaster.success({
            title: "Created Direct Message successfully",
          });
        }
      } catch (err: any) {
        toaster.error({
          title: "Failed to create Direct Message",
          description: "Something wrong happened",
        });
      }
      setIsDialogOpen(false);
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
              <Dialog.Title>Create DM Chat</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4" width="full">
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
                        <SingleSelect
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
                form="create-dm-form"
                disabled={form.state.isSubmitting}
                type="submit"
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
