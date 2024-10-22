import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

type LoginInputState = {
  email: string;
  password: string;
};

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(input);
  };
  const loading = false;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <form
          action=""
          onSubmit={loginSubmitHandler}
          className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200  mx-4 "
        >
          <div className="mb-4">
            <h1 className=" font-bold text-2xl">Indian Cousins </h1>
          </div>
          <div className="mb-4">
            <div className=" relative">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="pl-10 focus-visible:ring-1"
                value={input.email}
                onChange={changeEventHandler}
                name="email"
              />
              <Mail className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter Your Password"
                className="pl-10 focus-visible:right-1"
                onChange={changeEventHandler}
                value={input.password}
                name="password"
              />
              <LockKeyhole className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            {loading ? (
              <Button
                disabled
                className="bg-orange hover:bg-hoverOrange w-full "
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                className="bg-orange hover:bg-hoverOrange w-full "
                type="submit"
              >
                Login
              </Button>
            )}
            <div className="mt-4">
              <Link
                to="/forgot-password"
                className="hover:text-blue-500 hover:underline"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          <Separator />
          <p className="mt-2">
            Don't have an account?
            <Link className="text-blue-500 p-2" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
