import * as yup from "yup";
import { Asserts } from "yup";
export const registerSchema = yup.object({
  firstName: yup.string().required("Es campo es requerido"),
  lastName: yup.string().required("Es campo es requerido"),
  email: yup.string().email("Email inválido").required("Es campo es requerido"),
});

export interface IRegister extends Asserts<typeof registerSchema> {}
