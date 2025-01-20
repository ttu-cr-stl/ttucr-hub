import { handleLoginComplete } from "@/lib/utils/auth";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "./Spinner";

const LoginBtn: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { login } = useLogin({
    onComplete: async (user) => {
      setLoading(true);
      await handleLoginComplete(user, router, () => setLoading(false));
    },
    onError: (error) => {
      console.error("Login error:", error);
      setLoading(false);
    },
  });

  return (
    <Button className="w-60 bg-gray-900" disabled={loading} onClick={login}>
      {loading ? <Spinner /> : "Login"}
    </Button>
  );
};

export default LoginBtn;
