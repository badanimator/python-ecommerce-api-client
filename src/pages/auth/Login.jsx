import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "react-feather";
// components
import { useUser } from "../../context/UserContext";
import authService from "../../api/services/auth.service";
import Page from "../../layout/Page";

const Login = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { user, password } = data;

    try {
      setError("");
      setIsLoading(true);
      const data = await authService.login(user, password);
      toast.success("Login successful 🔓");

      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if (redirectToReferrer) return <Navigate to={state?.from || "/"} />;
  if (isLoggedIn) return <Navigate to={state?.from || "/"} />;

  return (
    <Page>
      <div className="w-full min-h-screen relative bg-gray-100 pb-10 flex justify-center place-items-center">
        {isLoading && (
          <div className="w-full h-screen flex justify-center place-items-center absolute top-0 right-0 bg-white backdrop-blur-sm bg-opacity-20">
            <img
              src="https://i.ibb.co/8jP3GyP/Dual-Ball-1-1s-200px.gif"
              className="w-20"
              alt=""
            />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 max-w-md bg-white flex flex-col place-items-center shadow-lg rounded-xl mx-2"
        >
          <Link to="/">
            <Home className="w-20 cursor-pointer" />            
          </Link>
          <h1 className="text-center text-xl font-bold text-black leading-6 my-5">
            YOUR ACCOUNT FOR
            <br />
            EVERYTHING
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="text-xs text-light text-center text-red-500">
                Invalid email or password, check your input again
              </div>
            )}
            <input
              type="text"
              name="user"
              {...register("user", {
                required: true,
                // eslint-disable-next-line no-useless-escape
                // pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              placeholder="Enter a valid username or phone number"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.user && errors?.user.type === "required" && (
              <p className="mt-1 italic text-red-500" valid={false}>
                Email required
              </p>
            )}
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.password && (
              <p className="mt-1 italic text-red-500">
                {errors?.password?.type === "required" && "Password required"}
              </p>
            )}
            <p className="text-xs text-gray-400 my-2 text-center px-6">
              By logging in, you agree to shop's{" "}
              <span className="underline">Privacy Policy</span> and{" "}
              <span className="underline">Terms of Use</span>.
            </p>
            <button
              type="submit"
              className="bg-black rounded-sm w-full text-white py-2 mt-3"
            >
              SIGN IN
            </button>
          </form>
          <div className="text-xs text-gray-400 mt-5">
            Not a member?{" "}
            <Link to="/auth/signup" className="underline">
              Join Us
            </Link>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default Login;
