import { useUpdateProfileInfoMutation } from "@/api/mutations/auth";
import { currentUserOptions } from "@/api/queries/auth";
import { updateProfileInformationSchema } from "@/lib/zod";
import {
  Avatar,
  Button,
  Field,
  FileUpload,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LuUser } from "react-icons/lu";

export default function UpdateProfileInfoForm() {
  const updateProfileInfo = useUpdateProfileInfoMutation();
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  const form = useForm({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
    validators: {
      onSubmit: updateProfileInformationSchema,
      onChange: updateProfileInformationSchema,
      onBlur: updateProfileInformationSchema,
    },
    onSubmit: async ({ value }) => {
      await updateProfileInfo.mutateAsync({
        name: value.name,
        email: value.email,
      });
    },
  });
  return (
    <Stack
      gap="8"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <HStack gap="4">
        <Avatar.Root size="2xl">
          {currentUser.avatar ? (
            <Avatar.Image
              src={currentUser.avatar}
              alt={`${currentUser.name} image`}
            />
          ) : (
            <Avatar.Icon>
              <LuUser />
            </Avatar.Icon>
          )}
        </Avatar.Root>
        <Stack>
          <FileUpload.Root>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="solid" px="10" size="xs">
                Upload photo
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
          <Text fontSize="sm" color="fg.muted">
            Pick your avatar
          </Text>
        </Stack>
      </HStack>
      <Stack>
        <form.Field
          name="name"
          children={(field) => (
            <Field.Root invalid={!field.state.meta.isValid}>
              <Field.Label>Name</Field.Label>
              <Input
                w={{ base: "xs", md: "sm" }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched && (
                <Field.ErrorText>
                  {field.state.meta.errors[0]?.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <Field.Root invalid={!field.state.meta.isValid}>
              <Field.Label>Email</Field.Label>
              <Input
                w={{ base: "xs", md: "sm" }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched && (
                <Field.ErrorText>
                  {field.state.meta.errors[0]?.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          )}
        />
        <Button type="submit" w="fit-content">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
