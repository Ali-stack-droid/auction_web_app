import { getRequest } from "./index";

export const SignInUser = (payload: SingInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)
