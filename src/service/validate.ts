import { LoginRequest } from "../features/authApi";

export default function validateForm(formState: LoginRequest) {
  const isValidLogin = /^[a-zA-Z]{2,}$/gm.test(formState.username);
  if (!isValidLogin) {
    return {
      validateError: true,
      errMessage: "Ім'я повинно складатися тільки з букв та без пробелів",
    };
  }
  const isValidPass = /^[a-zA-Z0-9]{3,}$/gm.test(formState.password);
  if (!isValidPass) {
    return {
      validateError: true,
      errMessage: "Пароль повинен бути не меньше 3 символів",
    };
  }
  return { validateError: false, errMessage: "" };
}
