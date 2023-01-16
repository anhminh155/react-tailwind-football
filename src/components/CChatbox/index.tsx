import React, { useEffect, useRef, useState } from "react";
import { Props } from "types/define";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import UtilsFirebase from "common/utilsFirebase";
import { useForm } from "react-hook-form";
import { Competition } from "types/competition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  endBefore,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { db } from "firebase-config";
import { format, isDate, isToday } from "date-fns";
import { useObject } from "react-firebase-hooks/database";
import { useNavigate } from "react-router-dom";
import ErrorField from "components/ErrorField";

function CChatBox({ ...props }: Props) {
  const { user } = useSelectorRoot((state: RootState) => state.app);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({ criteriaMode: "all" });
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const [selectCompetition, setSelectCompetition] = useState("all");
  const [valueMessage, setValueMessage] = useState<
    | {
        uid: string;
        message: string;
        photoURL: string;
        displayName: string;
        createdAt: number | any;
      }
    | {}
  >({});
  const moreEndRef = useRef<HTMLInputElement | any>(null);
  const [listFollowCompetition] = useObject(
    ref(db, `users/${user?.uid}/football/competition`)
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [viewText, setViewText] = useState<boolean>(true);

  const scrollToBottom = () => {
    moreEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const onSubmit = async (data: { message: string }) => {
    setLoadingForm(true);
    const estimatedServerTimeMs = new Date().getTime();
    UtilsFirebase.writeUserMessagesData({
      roomId: selectCompetition,
      uid: user.uid,
      message: data.message,
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: estimatedServerTimeMs,
    })
      .then(() => {
        setLoadingForm(false);
        resetField("message");
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
        setLoadingForm(false);
      });
  };

  const handleViewMore = () => {
    //done
    if (Object.keys(valueMessage).length >= 10) {
      const starCountRef = query(
        ref(db, "messages/" + selectCompetition),
        orderByChild("createdAt"),
        endBefore(Object.values(valueMessage)[0]?.createdAt),
        limitToLast(10)
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setValueMessage({ ...data, ...valueMessage });
        if (Object.keys(data).length < 10) {
          setViewText(false);
        } else {
          setViewText(true);
        }
      });
    }
  };

  useEffect(() => {
    setViewText(true);
    const starCountRef = query(
      ref(db, "messages/" + selectCompetition),
      limitToLast(10)
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValueMessage(data);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    });
  }, [selectCompetition]);

  return (
    <div {...props}>
      <div className="flex h-96 antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-auto md:overflow-x-hidden rounded-xl">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white dark:bg-gray-700 md:flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold dark:text-white">All Competitions</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {rootCompetitions.competitions.length}
                </span>
              </div>
              <div
                className="flex flex-col space-y-1 mt-4 -mx-2 h-32 overflow-y-auto"
                id="show-scroll"
              >
                <button
                  onClick={() => setSelectCompetition("all")}
                  className={`flex flex-row items-center ${
                    selectCompetition === "all"
                      ? "bg-gray-200 dark:bg-gray-900 dark:text-white"
                      : ""
                  } hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:text-white rounded-xl rounded-r-none p-2`}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    ALL
                  </div>
                  <div className="ml-2 text-sm font-semibold">All</div>
                </button>
                {rootCompetitions.competitions.map(
                  (competition: Competition, i: number) => {
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectCompetition(competition.code)}
                        className={`flex flex-row items-center ${
                          selectCompetition === competition.code
                            ? "bg-gray-200 dark:bg-gray-900 dark:text-white"
                            : ""
                        } hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:text-white rounded-xl rounded-r-none p-2`}
                      >
                        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                          <LazyLoadImage
                            effect="blur"
                            src={competition.emblem}
                            alt=""
                            className="w-6"
                          />
                        </div>
                        <div className="ml-2 text-sm font-semibold">
                          {competition.code}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span className="font-bold">Favorite</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {listFollowCompetition?.val()?.length ?? 0}
                </span>
              </div>
              <div
                className="flex flex-col space-y-1 mt-4 -mx-2 h-32 overflow-y-scroll"
                id="show-scroll"
              >
                {listFollowCompetition
                  ?.val()
                  ?.map((competition: Competition, i: number) => {
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectCompetition(competition.code)}
                        className={`flex flex-row items-center ${
                          selectCompetition === competition.code
                            ? "bg-gray-200 dark:bg-gray-900 dark:text-white"
                            : ""
                        } hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:text-white rounded-xl rounded-r-none p-2`}
                      >
                        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                          <LazyLoadImage
                            effect="blur"
                            src={competition.emblem}
                            alt=""
                            className="w-6"
                          />
                        </div>
                        <div className="ml-2 text-sm font-semibold">
                          {competition.code}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-200 dark:bg-gray-900 h-80 p-4 pr-0 pt-0">
              <div className="py-1 pl-2 bg-white dark:bg-gray-700 dark:text-white mt-2 rounded-lg mr-4">
                {selectCompetition === "all" ? (
                  <div className="">All Competitions</div>
                ) : (
                  <div className="flex items-center">
                    <LazyLoadImage
                      src={
                        rootCompetitions?.competitions?.find(
                          (competition: Competition) =>
                            competition.code === selectCompetition
                        )?.emblem
                      }
                      className="h-4 pr-2"
                      alt=""
                      effect="blur"
                    />
                    {
                      rootCompetitions?.competitions?.find(
                        (competition: Competition) =>
                          competition.code === selectCompetition
                      )?.name
                    }
                  </div>
                )}
              </div>
              <div
                id="show-scroll"
                className="flex flex-col h-full overflow-y-auto mb-4"
              >
                <div className="relative flex flex-col h-full">
                  {viewText &&
                  valueMessage &&
                  Object.keys(valueMessage)?.length >= 10 ? (
                    <div
                      onClick={() => handleViewMore()}
                      className="text-xs italic text-center hover:text-violet cursor-pointer pt-2"
                    >
                      View more history...
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="grid grid-cols-12">
                    {valueMessage &&
                      Object.values(valueMessage).map(
                        (value: any, i: number) => {
                          if (value?.uid === user?.uid) {
                            return (
                              <div
                                key={i}
                                ref={
                                  i + 1 === Object.keys(valueMessage).length
                                    ? moreEndRef
                                    : null
                                }
                                className="col-start-3 col-end-13 pl-3 py-1 rounded-lg mr-3"
                              >
                                {Object.values(valueMessage)[i - 1]?.uid ===
                                Object.values(valueMessage)[i]?.uid ? (
                                  <></>
                                ) : (
                                  <div className="text-xs text-gray-500 text-center pb-2 pt-4">
                                    {isToday(new Date(value.createdAt))
                                      ? format(Number(value.createdAt), "hh:mm")
                                      : format(
                                          Number(value.createdAt),
                                          "dd/MM/yyyy hh:mm"
                                        )}
                                  </div>
                                )}
                                <div className="flex justify-start flex-row-reverse">
                                  {/* {Object.values(valueMessage)[i + 1]?.uid ===
                              Object.values(valueMessage)[i]?.uid ? (
                                <div className="mr-10"></div>
                              ) : (
                                <div className="min-w-fit">
                                  <LazyLoadImage
                                    threshold={50}
                                    src={value.photoURL}
                                    className="rounded-full w-10 h-10"
                                    alt=""
                                    effect="blur"
                                  />
                                </div>
                              )} */}
                                  <div className="relative text-sm bg-indigo-100 dark:bg-indigo-400 py-2 px-4 shadow rounded-xl flex items-center break-all">
                                    {value.message}
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={i}
                                ref={
                                  i + 1 === Object.keys(valueMessage).length
                                    ? moreEndRef
                                    : null
                                }
                                className="col-start-1 col-end-12 px-3 py-1 rounded-lg"
                              >
                                {Object.values(valueMessage)[i - 1]?.uid ===
                                Object.values(valueMessage)[i]?.uid ? (
                                  <></>
                                ) : (
                                  <div className="">
                                    <div className="text-xs text-gray-500 text-center pb-2 pt-4">
                                      {isToday(new Date(value.createdAt))
                                        ? format(
                                            Number(value.createdAt),
                                            "hh:mm"
                                          )
                                        : format(
                                            Number(value.createdAt),
                                            "dd/MM/yyyy hh:mm"
                                          )}
                                    </div>
                                    <div className="ml-12 text-left text-xs text-gray-500 py-1">
                                      {value.displayName}
                                    </div>
                                  </div>
                                )}
                                <div className="flex flex-row items-start">
                                  {Object.values(valueMessage)[i + 1]?.uid ===
                                  Object.values(valueMessage)[i]?.uid ? (
                                    <div className="mr-10"></div>
                                  ) : (
                                    <div className="min-w-fit">
                                      <LazyLoadImage
                                        threshold={50}
                                        src={value.photoURL}
                                        className="rounded-full w-10 h-10 min-w-fit"
                                        alt=""
                                        effect="blur"
                                      />
                                    </div>
                                  )}
                                  <div className="relative ml-3 text-sm bg-white dark:bg-gray-400 py-2 px-4 shadow rounded-xl break-all">
                                    {value.message}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }
                      )}
                  </div>
                </div>
              </div>
              <div className="mr-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative flex flex-row items-center rounded-xl bg-white dark:bg-gray-700 w-full px-1 py-1 z-0"
                >
                  <div
                    className={`absolute bg-gray-300/90 w-full h-full left-0 top-0 rounded-xl flex items-center justify-center ${
                      user ? "hidden" : "visible z-10"
                    }`}
                  >
                    <span
                      className="hover:text-blue-700 cursor-pointer"
                      onClick={() => {
                        navigate("/auth/sign-in");
                      }}
                    >
                      Please login!
                    </span>
                  </div>
                  {/* <div className="">
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div> */}
                  <div className="flex-grow">
                    <div className="relative w-full">
                      <input
                        autoFocus={true}
                        disabled={loadingForm}
                        id="message"
                        className="flex w-full border rounded-xl focus:outline-none dark:bg-gray-600 focus:border-indigo-300 dark:text-gray-200 pl-4 h-8"
                        type="text"
                        autoComplete="off"
                        {...register("message", {
                          // required: "Message is required.",
                          maxLength: {
                            value: 200,
                            message: "must be max 200 chars",
                          },
                        })}
                      />
                      <div className="absolute top-6 left-3">
                        <ErrorField errors={errors} name="message" />
                      </div>

                      {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button> */}
                    </div>
                  </div>
                  <div className="ml-1">
                    <button
                      disabled={loadingForm}
                      onClick={() => {}}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CChatBox);
