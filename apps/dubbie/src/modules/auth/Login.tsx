import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Logo } from "@Common";
import React from "react";
import { useAuthStore } from "./useAuthStore";
import { FieldForm } from "@dubbie/components/form";
import { Formik, Field, FieldProps, FormikHelpers } from "formik";
import { useSignInMutation } from "@dubbie/common/generated";
import { ILogin, loginSchema } from "./schemas/login.schema";
function Login() {
  const { setPage, page } = useAuthStore();
  const signInMutation = useSignInMutation();

  const onSubmitForm = (
    values: ILogin,
    { setSubmitting }: FormikHelpers<ILogin>
  ) => {
    console.log(values);
    setSubmitting(true);
    signInMutation.mutate(
      {
        emailAddress: values.email,
        password: values.password,
        rememberMe: values.rememberme,
      },
      {
        onSuccess: () => {
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <VStack
      spacing={5}
      alignItems="center"
      direction="column"
      justifyContent="center"
      my={2}
      display={page == "loguin" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Heading fontWeight="black" size="md">
        Iniciar sesión
      </Heading>
      <Formik
        initialValues={
          {
            email: "",
            password: "",
            rememberme: false,
          } as ILogin
        }
        onSubmit={onSubmitForm}
        validationSchema={loginSchema}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <VStack
            as="form"
            onSubmit={handleSubmit as any}
            mt={2}
            width="80%"
            spacing={5}
          >
            <FieldForm
              autoComplete="username"
              name="email"
              borderRadius="2px"
              placeholder="Email"
            />
            <FieldForm
              name="password"
              autoComplete="new-password"
              placeholder="password"
              type="password"
              borderRadius="2px"
            />
            {/* 
             TODO: Temporarily fix password autocompletation
            */}
            <input type="password" hidden name="password" />
            <Flex width="100%" justifyContent="space-between">
              <Field name="rememberme">
                {({ field, form, meta }: FieldProps<string, ILogin>) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.rememberme && form.touched.rememberme)
                    }
                  >
                    <Checkbox {...field}>Recordarme</Checkbox>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Link color="blackAlpha.500" fontSize="sm" width="350px">
                ¿Olvidaste tu contraseña?
              </Link>
            </Flex>
            <Button
              variant="black"
              isDisabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              type="submit"
            >
              Iniciar sesión
            </Button>
          </VStack>
        )}
      </Formik>

      <Text color="blackAlpha.400">
        ¿No eres miembro?
        <Link pl={2} color="black" onClick={() => setPage("register")}>
          únete
        </Link>
      </Text>
    </VStack>
  );
}

export default Login;
