import { useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import API from "../../api/axios.config";
import MainLayout from "../../layout/MainLayout";
import Nav from "../../components/Nav";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] =  useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const { isLoggedIn, setUserState } = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { password, password2, username, name, phone_number } = data;
    setError("");
    if (password === password2) {
      setIsLoading(!isLoading);
      API.post("/auth/signup", {
        username,
        password,
        fullname: name,
        phone_number,
      })
        .then(({ data }) => {
          setError("");
          toast.success("Account created successfully.");
          setTimeout(() => {
            setUserState(data);
            setIsLoading(!isLoading);
          }, 1000);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          // show errors
          for(let key in response?.data?.message){
            toast.error(response?.data?.message[key][0])
          }
          setError(response.data.message);
        });
    } else {
      setError("Password doesn't match ");
    }
  };

  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }
  return (
    <MainLayout>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-screen relative bg-gray pb-10 pt-20 flex justify-center place-items-center"
      >
        {isLoading && (
          <div className="w-full h-screen flex justify-center place-items-center absolute top-0 right-0 bg-white backdrop-blur-sm bg-opacity-20">
            <SyncLoader className="w-20" />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 max-w-md mx-2 bg-white flex flex-col place-items-center shadow-lg rounded-xl"
        >
          <h1 className="text-center text-xl font-bold text-black leading-6 my-5">
            NEW CUSTOMER
          </h1>
          {/* {success && (
            <div className="text-xs text-center mb-2 font-light text-green-500">
              Your account has been registered as a member
            </div>
          )} */}
          {/* username */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...register("username", {
              minLength: {
                value: 4,
                message: "Username must be greater than 3 characters",
              },
              required: "Username is required",
            })}
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          {/* client errors */}
          {errors?.username && (
            <p className="mt-1 italic text-red-500">
              {errors.username.message}
            </p>
          )}
          {/* server errors */}
          {error.username && (
            <p className="mt-1 italic text-red-500">
              {error.username[0]}
            </p>
          )}
          {/* phone number */}
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            {...register("phone_number", {
              minLength: {
                value: 4,
                message: "Username must be greater than 3 characters",
              },
              required: "Phone number is required",
            })}
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          {/* client errors */}
          {errors?.phone_number && (
            <p className="mt-1 italic text-red-500">
              {errors.phone_number.message}
            </p>
          )}
          {/* server errors */}
          {error.phone_number && (
            <p className="mt-1 italic text-red-500">
              {error.phone_number}
            </p>
          )}
          {/* fullname */}
          <input
            type="text"
            placeholder="Fullname"
            name="name"
            {...register("name", {
              required: "Name cannot be empty",
              minLength: {
                value: 6,
                message: "Name must be greater than 5 characters",
              },
            })}
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          {/* client errors */}
          {errors.name && (
            <p className="mt-1 italic text-red-500">
              {errors.name.message}
            </p>
          )}
          {/* server errors */}
          {error.fullname && (
            <p className="mt-1 italic text-red-500">
              {error.fullname[0]}
            </p>
          )}
          {/* password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Password must be greater than 5 characters",
              },
            })}
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          {errors.password && (
            <p className="mt-1 italic text-red-500">
              {errors.password.message}
            </p>
          )}
          {/* confirm password */}
          <input
            // required
            type="password"
            placeholder="Confirm Password"
            name="password2"
            {...register("password2", {
              required: "Password required",
              validate: (value) => value === password.current || "Passwords do not match",
            })}
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          {errors.password2 && (
            <p className="mt-1 italic text-red-500">
              {errors.password2.message}
            </p>
          )}

          <p className="text-xs text-gray-400 my-2 text-center px-6">
            By register, you agree to shop's{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Use</span>.
          </p>
          <button
            type="submit"
            className="bg-black rounded-sm w-full text-white py-2 mt-3"
          >
            JOIN US
          </button>
          <div className="text-xs text-gray-400 mt-5">
            Already have?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </MainLayout>
  );
};

export default Register;