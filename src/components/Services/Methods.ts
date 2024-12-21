import { getRequest } from "./index";

export const SignInUser = (payload: LogInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)
