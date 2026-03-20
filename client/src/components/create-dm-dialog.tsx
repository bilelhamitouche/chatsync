import { createDmSchema } from "@/lib/zod";
import {
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
import { type Dispatch, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { membersQueryOptions } from "@/api/queries/members";

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
      member: [] as string[],
    },
    validators: {
      onBlur: createDmSchema,
      onSubmit: createDmSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  const { data, isPending } = useQuery(membersQueryOptions());
  const { collection } = useListCollection({
    initialItems:
      (data as { id: string; name: string; avatar: string }[]) || [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
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
              <Stack gap="4" width="full" asChild>
                <form
                  id="create-group-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  <form.Field
                    name="member"
                    children={(field) => (
                      <Field.Root>
                        <Field.Label>Member</Field.Label>
                        <Select.Root
                          closeOnSelect
                          disabled={isPending}
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
                                {data.map((item: any) => (
                                  <Select.Item item={item} key={item.id}>
                                    {item.name}
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
              <Button form="create-group-form" type="submit">
                Create
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
