import { useDeleteAccountMutation } from "@/api/mutations/auth";
import { deleteAccountSchema } from "@/lib/zod";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

export default function DeleteAccountDialog() {
  const deleteAccount = useDeleteAccountMutation();
  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: deleteAccountSchema,
      onChange: deleteAccountSchema,
      onBlur: deleteAccountSchema,
    },
    onSubmit: async ({ value }) => {
      await deleteAccount.mutateAsync({ password: value.password });
    },
  });
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button colorPalette="red" w="fit-content" size="sm">
          Delete Account
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our systems.
              </p>
              <form
                id="delete-account-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <form.Field
                  name="password"
                  children={(field) => (
                    <Field.Root>
                      <Field.Label>Password</Field.Label>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Enter your password"
                      />
                    </Field.Root>
                  )}
                />
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                form="delete-account-form"
                colorPalette="red"
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
