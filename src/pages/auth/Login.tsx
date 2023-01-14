/* eslint-disable */
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import ErrorField from "../../components/ErrorField";
import appLogo from "../../assets/img/applogo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth, db } from "firebase-config";
import CButton from "components/CButton";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { child, get, ref, set } from "firebase/database";
import UtilsFirebase from "common/utilsFirebase";
import { IUser } from "types/users";

const provider = new GithubAuthProvider();
const providerGoogle = new GoogleAuthProvider();

type Props = {};

interface DataForm {
  email: string;
  password: string;
}

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, _user, loadingEmailAndPassword, _error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DataForm>({ criteriaMode: "all" });

  const checkDataDbAndAddDb = (user: any) => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        const param: IUser = {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        if (snapshot.exists()) {
          // console.log(snapshot.val());
        } else {
          // No data available
          UtilsFirebase.writeUserData(param);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // ...
  };

  const onSubmitForm: SubmitHandler<DataForm> = (data) => {
    signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        checkDataDbAndAddDb(user);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  const signInGithub = () => {
    provider.addScope("repo");
    provider.setCustomParameters({
      allow_signup: "false",
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential: any = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        checkDataDbAndAddDb(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signInGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log("🚀 ~ file: Login.tsx:88 ~ .then ~ token", token);
        // The signed-in user info.
        const user = result.user;
        checkDataDbAndAddDb(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center space-y-8">
        <LazyLoadImage
          effect="blur"
          src={appLogo}
          className="w-20 h-20 mx-auto"
        />

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Sign in to your account
          </h1>
          <p className="mt-5">Start your demo version</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 px-2">
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
          <div>
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
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

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block font-medium cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <div className="flex items-center text-primary hover:text-primary">
              <i className="ri-lock-fill text-base"></i>
              <a href="#" className="font-medium ml-1">
                Forgot your password?
              </a>
            </div>
          </div>
          <CButton
            type="submit"
            loading={loadingEmailAndPassword}
            className="bg-[#5a9200]/80 hover:bg-[#5a9200] text-white"
          >
            Sign In
          </CButton>
        </form>
        <div className="flex gap-2">
          <button
            onClick={() => signInGoogle()}
            type="button"
            className="flex items-center btn-submit text-black bg-gray-100 hover:bg-gray-200 p-2"
          >
            <i className="ri-google-fill mr-2 text-2xl"></i>
            <p>Sign in with Google</p>
          </button>
          {/* <button
            onClick={() => signInGithub()}
            type="button"
            className="flex items-center btn-submit text-black bg-gray-100 hover:bg-gray-200 p-2"
          >
            <i className="ri-github-fill  mr-2 text-2xl"></i>
            <p>Sign in with Github</p>
          </button> */}
        </div>
        <button
          onClick={() => navigate(-1)}
          type="submit"
          className="btn-submit hover:bg-blue-500 bg-blue-400"
        >
          Back
        </button>
        <div className="font-medium text-sm flex items-center justify-center">
          <p>Don't have an account?</p>
          <Link to="/auth/sign-up" className="text-primary ml-1">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
