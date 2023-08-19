import { Link, Stack } from "expo-router";
export default function Root() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Home" }} />
      <Link href="/auth/login">Navigate to Login</Link>
    </>
  );
}
