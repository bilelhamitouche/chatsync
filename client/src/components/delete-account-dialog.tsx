import { useDeleteAccountMutation } from "@/api/mutations/auth";
import { currentUserOptions } from "@/api/queries/auth";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toaster } from "./ui/toaster";

export default function DeleteAccountDialog() {
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  const deleteAccount = useDeleteAccountMutation();
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
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                onClick={async () => {
                  await deleteAccount.mutateAsync(currentUser.id);
                  if (deleteAccount.isError) {
                    toaster.create({
                      title: "Failed to delete account",
                      description: deleteAccount.error.message,
                      type: "error",
                    });
                  } else {
                    toaster.create({
                      title: "Account deleted successfully",
                      description: deleteAccount.data,
                      type: "success",
                    });
                  }
                }}
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
