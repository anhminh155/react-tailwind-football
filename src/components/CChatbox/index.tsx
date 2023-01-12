import React, { useEffect, useRef, useState } from "react";
import { Props } from "types/define";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import UtilsFirebase from "common/utilsFirebase";
import { useForm } from "react-hook-form";
import { Competition } from "types/competition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { onValue, ref } from "firebase/database";
import { db } from "firebase-config";

function CChatBox({}: Props) {
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
  const [valueMessage, setValueMessage] = useState<any>({});
  const divForAutoScroll = useRef<any>();

  const onSubmit = async (data: { message: string }) => {
    console.log(data);
    setLoadingForm(true);
    UtilsFirebase.writeUserMessagesData({
      roomId: selectCompetition,
      uid: user.uid,
      message: data.message,
      photoURL: user.photoURL,
      displayName: user.displayName,
    })
      .then(() => {
        console.log("success");

        setLoadingForm(false);
        resetField("message");
      })
      .catch((error) => {
        console.error(error);
        setLoadingForm(false);
      });
  };

  useEffect(() => {
    const starCountRef = ref(db, "messages/" + selectCompetition);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setValueMessage(data);
      // updateStarCount(postElement, data);
    });
  }, [selectCompetition]);

  return (
    <div className="flex h-96 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden rounded-xl">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">All Competitions</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {rootCompetitions.competitions.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-32 overflow-y-auto">
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
                7
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-32 overflow-y-auto">
              {rootCompetitions.competitions.map(
                (competition: Competition, i: number) => {
                  return (
                    <button
                      key={i}
                      className="flex flex-row items-center hover:bg-gray-200 rounded-xl rounded-r-none p-2"
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
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full">
          <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-200 dark:bg-gray-900 h-80 p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {Object.keys(valueMessage).map((key: any, i: number) => {
                    const element = valueMessage[key];
                    if (element?.uid === user?.uid) {
                      return (
                        <div
                          key={i}
                          className="col-start-6 col-end-13 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center ">
                              <LazyLoadImage
                                threshold={50}
                                src={element.photoURL}
                                className="rounded-full h-10 w-10"
                                alt=""
                                effect="blur"
                              />
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 dark:bg-indigo-400 py-2 px-4 shadow rounded-xl">
                              <div>{element.message}</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="col-start-1 col-end-8 p-3 rounded-lg"
                        >
                          <div className="flex flex-row items-center">
                            <div className="">
                              <LazyLoadImage
                                threshold={50}
                                src={element.photoURL}
                                className="rounded-full h-10 w-10"
                                alt=""
                                effect="blur"
                              />
                            </div>
                            <div className="relative ml-3 text-sm bg-white dark:bg-gray-400 py-2 px-4 shadow rounded-xl">
                              <div>{element.message}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              <div>
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
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    disabled={loadingForm}
                    id="message"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 dark:text-gray-700 pl-4 h-10"
                    type="text"
                    autoComplete="false"
                    {...register("message", {
                      required: "Message is required.",
                      maxLength: {
                        value: 100,
                        message: "must be max 100 chars",
                      },
                    })}
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                  </button>
                </div>
              </div>
              <div className="ml-4">
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
      </div>
    </div>
  );
}

export default React.memo(CChatBox);
