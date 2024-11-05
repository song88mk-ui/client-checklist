import { navigate } from 'svelte-routing';
import { errorMessage, isAuthenticated,isLoginLoading } from '../../stores/login';

export async function onSubmit(values:any) {
  try {
    isLoginLoading.set(true)
    const response = await fetch('https://preprod-startapi.jmj.bet/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        "x-api-key":"B4DhSieTYe7AuNAp",
        "Access-Control-Allow-Origin": "*",
       },
      body: JSON.stringify({ username: values.username, password: values.password })
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    navigate('/')
    // console.log('Login successful:', data);
    isAuthenticated.set(true);
    isLoginLoading.set(false)
    localStorage.setItem('user', JSON.stringify(data?.result));
  } catch (error:any) {
    errorMessage.set(error.message);
    isLoginLoading.set(false)
  }
}

export function handleLogout() {
  isAuthenticated.set(false);
  localStorage.removeItem('user')
}

export function checkAuthentication() {
  const savedToken = localStorage.getItem('user');
  if (savedToken) {
    isAuthenticated.set(true);
  }
}

