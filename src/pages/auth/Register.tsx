import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import ErrorField from "components/ErrorField";
import appLogo from "assets/img/applogo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-config";
import UtilsFirebase from "common/utilsFirebase";
import CButton from "components/CButton";
import { toast } from "react-toastify";

type Props = {};

interface DataForm {
  displayName: string;
  email: string;
  password: string;
}

const Register: React.FC<Props> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DataForm>({ criteriaMode: "all" });
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitForm: SubmitHandler<DataForm> = (data) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (response) => {
        // console.log(response);
        const param: any = {
          userId: response.user.uid,
          displayName: data.displayName,
          email: data.email,
          photoURL: `https://ui-avatars.com/api/?name=${data.displayName}&background=152e4d&color=fff`,
        };
        UtilsFirebase.writeUserData(param);
        setLoading(false)
      }
    ).catch(()=> {
      toast.error(`EMAIL EXISTS`, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
      setLoading(false)
    });
    // navigate('/auth', {replace: true})
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        <LazyLoadImage
          effect="blur"
          src={appLogo}
          className="w-20 h-20 mx-auto"
        />

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Join our community
          </h1>
          <p className="mt-5">Start your journey with our product</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 px-2">
          <div>
            <label className="font-semibold" htmlFor="displayName">
              Full name
            </label>
            <input
              id="displayName"
              type="displayName"
              autoComplete="displayName"
              className="text-input"
              {...register("displayName", { required: "DisplayName is required." })}
            />
            <ErrorField errors={errors} name="displayName" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="email-address">
              Email address
            </label>
            <input
              id="email-address"
              type="text"
              autoComplete="email"
              className="text-input"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            <ErrorField errors={errors} name="email" />
          </div>
          <div className="pb-3">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="password"
              className="text-input"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 5,
                  message: "Password must exceed 4 characters.",
                },
              })}
            />
            <ErrorField errors={errors} name="password" />
          </div>

          <CButton loading={loading} type="submit" className="btn-submit">
            Sign Up
          </CButton>
        </form>

        <div className="font-medium text-sm flex items-center justify-center">
          <p>Already have an account?</p>
          <Link to="/auth" className="text-primary ml-1">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
