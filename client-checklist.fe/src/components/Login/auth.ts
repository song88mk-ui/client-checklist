import { navigate } from "svelte-routing";
import {
  errorMessage,
  isAuthenticated,
  isLoginLoading,
} from "../../stores/login";
import { setAuth } from "../../stores/auth";

export async function onSubmit(values: any) {
  try {
    isLoginLoading.set(true);
    const response = await fetch(
      "https://preprod-startapi.jmj.bet/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "B4DhSieTYe7AuNAp",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      },
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    isAuthenticated.set(true);
    isLoginLoading.set(false);

    const { accessType, userToken, roleName } = data?.result;

    setAuth({
      accessType,
      userToken,
      role: roleName,
    });

    navigate("/");
  } catch (error: any) {
    errorMessage.set(error.message);
    isLoginLoading.set(false);
  }
}
