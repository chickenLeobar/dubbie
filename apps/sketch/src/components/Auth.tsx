import React, { PropsWithChildren, ReactNode } from "react";
import { useRouter } from "next/router";
type AuthProps = PropsWithChildren<{
  roles: string[];
  redirect?: string | null | undefined;
  fallback: ReactNode;
}>;

const useLogged = () => {
  // context

  return true;
};

function Auth({ children, redirect, fallback }: AuthProps) {
  const router = useRouter();
  const logged = useLogged();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secure = (dd: any) => {
    return dd;
  };
  if (logged) {
    return secure(children);
  }
  if (redirect) {
    router.push(redirect);
    return secure(null);
  }
  if (fallback) {
    return secure(fallback);
  }
  return <div>not autheticated</div>;
}

export default Auth;
