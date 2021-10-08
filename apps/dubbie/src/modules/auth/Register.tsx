import { Button, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { Logo } from "@Common";
import { useRegisterMutation } from "@dubbie/common/generated";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { IRegister, registerSchema } from "./schemas/register.schema";
import { useAuthStore } from "./useAuthStore";
import { FieldForm } from "@dubbie/components/form";

function Register() {
  const { setPage, page } = useAuthStore();

  const mutateRegister = useRegisterMutation();

  const onSubmitForm = (
    values: IRegister,
    { setSubmitting }: FormikHelpers<IRegister>
  ) => {
    setSubmitting(true);
    mutateRegister.mutate(
      {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          emailAddress: values.email,
        },
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          setPage("beforeConfirm");
          useAuthStore.getState().set({
            preConfirmData: values,
          });
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
      display={page == "register" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Heading fontWeight="black" size="md" width="70%" textAlign="center">
        Convierte en miembro de dubbie
      </Heading>
      <Formik
        validationSchema={registerSchema}
        initialValues={{ firstName: "", lastName: "", email: "" } as IRegister}
        onSubmit={onSubmitForm}
      >
        {({ handleSubmit, isSubmitting, isValid, touched }) => (
          // <Form>
          <VStack
            as="form"
            onSubmit={handleSubmit as any}
            mt={2}
            width="80%"
            spacing={5}
          >
            <FieldForm
              name="firstName"
              borderRadius="2px"
              placeholder="Nombres"
            />

            <FieldForm
              name="lastName"
              borderRadius="2px"
              placeholder="Apellidos"
            />
            <FieldForm
              name="email"
              borderRadius="2px"
              placeholder="Correo electronico"
            />
            {/* <FormControl>
              <Checkbox>
                <Text fontSize="small" color="blackAlpha.500">
                  Recibir correos de dubbie sobre nuevas ofertas, nuevos
                  productos y beneficios para miembros
                </Text>
              </Checkbox>
            </FormControl> */}
            <Text color="blackAlpha.500" fontSize="small" textAlign="center">
              Al registrarte aceptas haber leido nuestras{" "}
              <Link fontWeight="semibold" color="black">
                Política de privacidad
              </Link>{" "}
              y
              <Link fontWeight="semibold" color="black">
                Términos de uso
              </Link>
            </Text>
            <Button
              disabled={isSubmitting || !isValid || !touched}
              isLoading={isSubmitting}
              type="submit"
              variant="black"
            >
              Registrarse
            </Button>
            <Text color="blackAlpha.400">
              ¿Ya eres miembro?
              <Link pl={2} color="black" onClick={() => setPage("loguin")}>
                Iniciar sesión
              </Link>
            </Text>
          </VStack>
          // </Form>
        )}
      </Formik>
    </VStack>
  );
}

export default Register;
