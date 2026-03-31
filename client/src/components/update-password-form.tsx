import { useUpdatePasswordMutation } from "@/api/mutations/auth";
import { updatePasswordSchema } from "@/lib/zod";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

export default function UpdatePasswordForm() {
  const updatePasswordMutation = useUpdatePasswordMutation();
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
    },
    validators: {
      onSubmit: updatePasswordSchema,
      onChange: updatePasswordSchema,
      onBlur: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await updatePasswordMutation.mutateAsync({
        currentPassword: value.currentPassword,
        password: value.password,
      });
    },
  });
  return (
    <Stack
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="currentPassword"
        children={(field) => (
          <Field.Root invalid={!field.state.meta.isValid}>
            <Field.Label>Current Password</Field.Label>
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
        name="password"
        children={(field) => (
          <Field.Root invalid={!field.state.meta.isValid}>
            <Field.Label>New Password</Field.Label>
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
  );
}
