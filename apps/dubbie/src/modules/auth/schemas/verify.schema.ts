import * as yup from "yup";
import type { Asserts } from "yup";

export const verifySchema = yup.object({
  password: yup.string().required("Este campo es requerido"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], (val, ...args) => {
      return "Las contraseñas no coinciden";
    })
    .required("Este campo es requerido"),
});

export interface IVerifySchema extends Asserts<typeof verifySchema> {}
