/* eslint-disable */
import CButton from "components/CButton";
import ErrorField from "components/ErrorField";
import { auth, dbRef, firebaseStorage } from "firebase-config";
import React, { useEffect, useState } from "react";
import {
  useIdToken,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UtilsFirebase from "common/utilsFirebase";
import { IUser } from "types/users";
import { child, get } from "firebase/database";

type Props = {};

const User: React.FC<Props> = () => {
  const [user, _loading, error1] = useIdToken(auth);
  const [sendEmailVerification, sending, error3] =
    useSendEmailVerification(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();
  const [imgUrl, setImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(0);

  // Suggested by Laurent
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    get(child(dbRef, `users/${user?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setProfile(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({ criteriaMode: "all" });

  const onSubmitForm = async (data: any) => {
    setLoading(true);
    const param: IUser = {
      userId: user?.uid!,
      email: user?.email!,
      ...data,
    };
    UtilsFirebase.writeUserData({
      ...param,
      photoURL: imgUrl ? imgUrl : profile.photoURL,
    }).then(() => {
      toast.success(`Save Complete!`, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
      setLoading(false);
    });
  };

  const handleEmailVerification = async () => {
    setCounter(15);
    await sendEmailVerification()
      .then((res) => {
        toast(`Sent email!`, {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const upload = (e: any) => {
    console.log("upload");
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(firebaseStorage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
        if (progress === 100) {
          toast.success(`Uploaded!`, {
            position: toast.POSITION.TOP_RIGHT,
            className: "foo-bar",
          });
        }
      },
      (error) => {
        alert(error);
        toast.error(`Upload failed!`, {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="">
      {user ? (
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="col-span-3">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-white">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        {imgUrl ? (
                          <LazyLoadImage
                            threshold={50}
                            src={imgUrl}
                            className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 w-20 h-20"
                            alt=""
                            effect="blur"
                          />
                        ) : (
                          <LazyLoadImage
                            threshold={50}
                            src={
                              profile?.photoURL
                                ? `${profile.photoURL}`
                                : `https://ui-avatars.com/api/?name=${profile?.email}&background=152e4d&color=fff`
                            }
                            className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 w-20 h-20"
                            alt=""
                            effect="blur"
                          />
                        )}
                        <div className="ml-5">
                          <input
                            type="file"
                            id="photoURL"
                            name="photoURL"
                            onChange={(e: any) => upload(e)}
                            className=" bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          />
                          {progressPercent > 0 ? (
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                              <div
                                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                style={{ width: `${progressPercent}%` }}
                              >
                                {progressPercent}%
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        defaultValue={profile?.displayName!}
                        id="displayName"
                        type="text"
                        autoComplete="text"
                        className="text-input"
                        {...register("displayName", {
                          required: "Name is required.",
                          maxLength: {
                            value: 20,
                            message: "must be max 20 chars",
                          },
                        })}
                      />
                      <ErrorField errors={errors} name="displayName" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        // htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        disabled
                        defaultValue={profile?.email!}
                        className="text-input cursor-not-allowed"
                        // id="email"
                        // type="text"
                        // autoComplete="email"
                        // {...register("email", {
                        //   required: "Email is required.",
                        //   pattern: {
                        //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //     message: "Invalid email address.",
                        //   },
                        // })}
                      />
                      {/* <ErrorField errors={errors} name="email" /> */}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        BirthDay
                      </label>
                      <input
                        defaultValue={profile?.dayOfBirth!}
                        id="dayOfBirth"
                        type="date"
                        autoComplete="text"
                        className="text-input"
                        {...register("dayOfBirth", {
                          required: "BirthDay is required.",
                        })}
                      />
                      <ErrorField errors={errors} name="dayOfBirth" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        defaultValue={profile?.phone!}
                        id="phone"
                        type="number"
                        autoComplete="text"
                        className="text-input"
                        {...register("phone", {
                          required: "Phone is required.",
                          maxLength: {
                            value: 15,
                            message: "must be max 15 chars",
                          },
                        })}
                      />
                      <ErrorField errors={errors} name="phone" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Verified
                      </label>
                      <div className="">
                        {!user?.emailVerified ? (
                          <div className="flex items-center">
                            <div className="bg-red-200 p-2 w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-2">
                              <i className="ri-close-line text-white"></i>
                            </div>
                            {counter === 0 ? (
                              <div
                                onClick={() =>
                                  !sending && handleEmailVerification()
                                }
                                className={`${
                                  sending
                                    ? "cursor-progress text-gray-700"
                                    : "cursor-pointer hover:text-blue-500"
                                } text-sm `}
                              >
                                Check email!
                              </div>
                            ) : (
                              <div className="text-sm cursor-progress text-gray-700">
                                Check email! {`(${counter})`}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-green-600 p-2 w-5 h-5 rounded-full flex items-center justify-center mt-1">
                            <i className="ri-check-line text-white"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <CButton
                    type="submit"
                    loading={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </CButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
            Please Login!!!
          </h3>
          <span
            onClick={() => navigate("/auth/sign-in")}
            className="mt-1 text-sm text-gray-600 dark:text-white cursor-pointer border-b-2 border-transparent hover:border-blue-400 hover:text-blue-400"
          >
            Click here
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(User);
