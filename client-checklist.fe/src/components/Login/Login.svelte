<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
  import { type LoginFormType } from "./validationSchema";
  import { setAuth } from "../../stores/auth";
  import { navigate } from "svelte-routing";
  import CompanyLogo from "../CompanyLogo.svelte";
  import Role from "../../types/role";

  let initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  };
  let errorMessage = "";
  let isLoading = false;

  const handleLogin = async (values: LoginFormType) => {
    // isLoading = true;
    // errorMessage = "";
    // try {
    //   const response = await fetch("https://dummyjson.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Login failed");
    //   }

    //   const data = await response.json();
    //   isLoading = true;
    // } catch (error: any) {
    //   errorMessage = error.message;
    // }
    // isLoading = false;
    // $user = { email: "jess@gmail.com" };

    setAuth({
      fullName: "janina mencero",
      email: "jess@gmail.com",
      role: Role.CLIENT,
    });

    navigate("/client");
  };
</script>

<div
  class="shadow bg-white border rounded-md p-6 w-[442px] mx-auto gap-4 flex flex-col"
>
  <div class="flex justify-center">
    <CompanyLogo />
  </div>

  <LoginForm
    error={errorMessage}
    {initialValues}
    onSubmit={handleLogin}
    {isLoading}
  />
</div>
