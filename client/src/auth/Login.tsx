import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const loading = false;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-screen">
        <form
          action=""
          className=" md:p-8 w-full max-w-md rounded-lg md:border border-gray-200  "
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
              />
              <LockKeyhole className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange w-full ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange w-full ">
                Login
              </Button>
            )}
          </div>
          <Separator />
          <p>
            Don't have an account?
            {/* <Link to="/signup">Signup</Link> */}
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
