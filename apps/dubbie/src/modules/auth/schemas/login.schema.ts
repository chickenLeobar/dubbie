import * as yup from "yup";
import type { Asserts } from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Este campo es requerido"),
  password: yup.string().required("Este campo es requerido"),
  rememberme: yup.boolean().required("Este campo es requerido"),
});

export interface ILogin extends Asserts<typeof loginSchema> {}
