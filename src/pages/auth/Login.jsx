import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { motion } from "framer-motion";
import { User, Home } from "react-feather";
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

  if (redirectToReferrer) {
    return <Navigate to={state?.from || "/"} />;
  }
  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  return (
    <Page>
      <div className="w-full min-h-screen relative bg-cusgray pb-10 flex justify-center place-items-center">
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
          <h1 className="text-center text-xl font-bold text-cusblack leading-6 my-5">
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

{/* <div className="flex items-center justify-center m-auto mt-20">
  <form
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2"
    onSubmit={handleSubmit(onSubmit)}
  >
    <h1 className="text-center text-4xl my-4">Continue Shopping</h1>
    <div className="">
      <Label className="block text-grey-darker text-sm font-bold mb-2">
        <span>Email</span>
      </Label>
      <Input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        type="email"
        name="email"
        {...register("email", {
          required: true,
          // eslint-disable-next-line no-useless-escape
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        })}
        placeholder="Enter a valid email"
      />
    </div>
    {errors?.email && errors?.email.type === "required" && (
      <HelperText className="mt-1 italic" valid={false}>
        Email required
      </HelperText>
    )}
    {errors?.email && errors?.email.type === "pattern" && (
      <HelperText className="mt-1 italic" valid={false}>
        Invalid email
      </HelperText>
    )}
    <div className="mt-4">
      <Label className="block text-grey-darker text-sm font-bold mb-2">
        <span>Password</span>
      </Label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        type="password"
        name="password"
        {...register("password", { required: true })}
        placeholder="Enter a valid password"
      />
    </div>
    {errors?.password && (
      <HelperText className="mt-1 italic" valid={false}>
        {errors?.password?.type === "required" && "Password required"}
      </HelperText>
    )}
    {error && (
      <HelperText className="mt-1 italic" valid={false}>
        {error}
      </HelperText>
    )}
    <div className="mt-4">
      <ForgotPasswordModal />
    </div>
    <Button type="submit" disabled={isLoading || isGoogleLoading}>
      {isLoading ? <PulseLoader color={"#0a138b"} size={10} loading /> : "Login"}
    </Button>
    <Button
      type="button"
      layout="link"
      onClick={() => {
        setIsGoogleLoading(true);
        login();
      }}
      disabled={isLoading || isGoogleLoading}
      className="mt-4 hover:bg-white bg-white shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
    >
      <svg
        className="w-4 h-4 mr-2 -ml-1"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      {isGoogleLoading ? (
        <PulseLoader color={"#0a138b"} size={10} loading />
      ) : (
        "Login in with Google"
      )}
    </Button>
    <p className="text-sm mt-4">
      Don&apos;t have an account?{" "}
      <Link to="/auth/signup" className="font-bold">
        Sign Up
      </Link>
    </p>
  </form>
</div> */}