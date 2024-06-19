import { signIn } from "next-auth/react";

function SignInBtn() {
   return <button onClick={() => signIn()}>Sign In</button>;
}

export default SignInBtn;
