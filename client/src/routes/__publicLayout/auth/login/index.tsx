import LogoImage from "@/components/logo-image";
import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/lib/zod";
import { useLoginMutation } from "@/api/mutations/auth";
import { toaster } from "@/components/ui/toaster";

export const Route = createFileRoute("/__publicLayout/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const login = useLoginMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
      if (!login.isError) {
        navigate({ to: "/chats" });
      } else {
        toaster.create({
          title: login.error.name,
          description: login.error.message,
          type: "error",
          closable: true,
        });
      }
    },
  });
  return (
    <Flex
      w="vw"
      h="vh"
      direction="column"
      justify="center"
      align="center"
      gap="8"
      p="md"
    >
      <LogoImage width={250} />
      <Card.Root variant="elevated" boxShadow="lg" width="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Card.Header gap="1">
            <Card.Title>Welcome to ChatSync</Card.Title>
            <Card.Description>
              Enter your credentials to login to your account
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" width="full">
              <form.Field
                name="email"
                children={(field) => (
                  <Field.Root invalid={!field.state.meta.isValid}>
                    <Field.Label>Email Address</Field.Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Your Email"
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
                    <Field.Label>Password</Field.Label>
                    <Input
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Your Password"
                    />
                    {field.state.meta.isTouched && (
                      <Field.ErrorText>
                        {field.state.meta.errors[0]?.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                )}
              />
            </Stack>
          </Card.Body>
          <Card.Footer display="flex" flexDirection="column">
            <Button width="full" type="submit">
              Login
            </Button>
            <Flex gap="2" fontSize="sm">
              <Text>Don&apos;t have an account?</Text>
              <ChakraLink asChild>
                <Link to="/auth/register">Register!</Link>
              </ChakraLink>
            </Flex>
          </Card.Footer>
        </form>
      </Card.Root>
    </Flex>
  );
}
