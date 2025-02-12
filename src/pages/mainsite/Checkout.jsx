import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Page from "../../layout/Page";

const Checkout = () => {
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

    // try {
    //   setError("");
    //   setIsLoading(true);
    //   const data = await authService.login(user, password);
    //   toast.success("Login successful 🔓");

    //   setTimeout(() => {
    //     setUserState(data);
    //     setRedirectToReferrer(true);
    //     setIsLoading(false);
    //   }, 1500);
    // } catch (error) {
    //   setIsLoading(false);
    //   setError(error.response?.data.message);
    // }
  };

  return (
    <Page>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-5 max-w-md bg-white flex flex-col place-items-center shadow-lg rounded-xl mx-2"
      >
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
          {/* {error && (
            <div className="text-xs text-light text-center text-red-500">
              Invalid email or password, check your input again
            </div>
          )} */}
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
      </motion.div>
    </Page>
  );
};

export default Checkout;
