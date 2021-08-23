import { Button, Heading, useToast, Text, VStack, Box } from "@chakra-ui/react";
import { Logo } from "@Common";
import { useVerifyMutation } from "@dubbie/common/generated";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { IVerifySchema, verifySchema } from "./schemas/verify.schema";
import { useAuthStore } from "./useAuthStore";
import { FieldForm } from "@dubbie/components/form";
import { useRouter } from "next/router";

function VerifyPage() {
  const { page, token } = useAuthStore();
  const { setPage, closeModal } = useAuthStore.getState();
  const mutationVerify = useVerifyMutation();
  const toast = useToast();
  const router = useRouter();
  const onSubmitForm = (
    values: IVerifySchema,
    { setSubmitting }: FormikHelpers<IVerifySchema>
  ) => {
    setSubmitting(true);
    mutationVerify.mutate(
      {
        password: values.password,
        token: token,
      },
      {
        onSuccess: (data) => {
          const source = data.verifyCustomerAccount;
          if ("errorCode" in source) {
            if (source.errorCode == "VERIFICATION_TOKEN_INVALID_ERROR") {
              toast({
                position: "top",
                variant: "error",
                description:
                  "Hemos tenido un error al verificar su cuenta : Token Inválido",
              });
              setPage("register");
            }
          } else {
            toast({
              position: "top",
              variant: "success",
              description: "Su cuenta ha sido verificada con éxito",
            });
            delete router.query.token;
            router.replace(
              {
                pathname: router.pathname,
                query: router.query,
              },
              null
            );
            closeModal();
          }
          setSubmitting(false);
        },
        onError: (err) => {
          console.log("erro was ocurred");
          console.log(err);
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
      display={page == "verify" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Box>
        <Heading fontWeight="black" size="md" textAlign="center">
          Confirmación
        </Heading>
        <Text maxWidth="350px" fontSize="sm" my={2} textAlign="center">
          !Ya casi estamos listos!, Ingresa una contraseña para completar el
          proceso
        </Text>
      </Box>
      <Formik
        validationSchema={verifySchema}
        initialValues={{ password: "", repeatPassword: "" } as IVerifySchema}
        onSubmit={onSubmitForm}
      >
        {({ handleSubmit, isSubmitting }) => (
          // <Form>
          <VStack
            as="form"
            onSubmit={handleSubmit as any}
            mt={2}
            width="80%"
            spacing={5}
          >
            <input type="email" autoComplete="username" hidden />
            <FieldForm
              name="password"
              borderRadius="2px"
              type="password"
              autoComplete="new-password"
              placeholder="Contraseña"
            />

            <FieldForm
              name="repeatPassword"
              borderRadius="2px"
              type="password"
              autoComplete="new-password"
              placeholder="Repetir contraseña"
            />

            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              variant="black"
            >
              Iniciar sesión
            </Button>
          </VStack>
          // </Form>
        )}
      </Formik>
    </VStack>
  );
}

export default VerifyPage;
