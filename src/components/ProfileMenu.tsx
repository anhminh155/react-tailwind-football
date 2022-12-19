import { Transition } from "@tailwindui/react";
import { useState, useRef, useEffect } from "react";
import ConfirmModal from "./modals/ConfirmModal";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Utils from "../common/utils";
import { useDispatchRoot, useSelectorRoot } from "../redux/hooks";
import { setTheme } from "../redux/controller/app.slice";
import { RootState } from "../redux/rootReducer";

const BG_AVATAR = [
  "152e4d",
  "0891b2",
  "2E8B57",
  "8B4513",
  "4B0082",
  "999",
  "000",
];

function ProfileMenu() {
  const [modalOut, showModalOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bgAvatar, setBgAvatar] = useState(BG_AVATAR[0]);
  const { theme } = useSelectorRoot((state: RootState) => state.app);
  const dispatch = useDispatchRoot();

  const navigate = useNavigate();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const userLocal = localStorage.getItem("user");
  const user = userLocal ? JSON.parse(userLocal || "") : null;

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (
        !dropdownOpen ||
        dropdown.current?.contains(target) ||
        trigger.current?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    setBgAvatar(BG_AVATAR[Math.floor(Math.random() * BG_AVATAR.length)]);
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <div className="relative inline-flex items-center">
        <div
          onClick={() => {
            if (theme === "dark") {
              dispatch(setTheme("light"));
              Utils.setLocalStorage("theme", "light");
            } else {
              dispatch(setTheme("dark"));
              Utils.setLocalStorage("theme", "dark");
            }
          }}
          className="pr-3 cursor-pointer select-none dark:text-white"
        >
          {theme === "dark" ? (
            <i className="ri-lightbulb-fill text-xl"/>
          ) : (
            <i className="ri-lightbulb-fill text-xl"/>
          )}
        </div>
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {/* <div className='text-right mr-3'>
                        <h4 className='font-bold'>John Doe</h4>
                        <p>Administrator</p>
                    </div> */}
          <div className="w-10 h-10 mr-1 rounded-full bg-gray-400">
            <LazyLoadImage
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=${bgAvatar}&color=fff`}
              className="rounded-full"
              alt=""
              effect="blur"
            />
          </div>
          <div className="flex items-center truncate">
            <span className="truncate mr-1 font-medium group-hover:text-indigo-600">
              {user?.name}
            </span>
            <i className="ri-arrow-down-s-line font-bold text-xl dark:text-white"></i>
          </div>
        </button>

        {/* {dropdownOpen && */}
        <Transition
          show={dropdownOpen}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="origin-top-right z-10 absolute top-full right-0 w-max bg-white border border-gray-200 py-1.5 px-1 rounded shadow-lg overflow-hidden mt-1"
        >
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
              <div className="font-medium text-gray-800">{"Username"}</div>
              <div className="text-xs text-gray-500 italic">
                {"user?.email"}
              </div>
            </div>
            <ul>
              <li>
                <Link to="/dashboard/profile">
                  <button
                    className="font-medium hover:text-primary rounded flex items-center py-1 px-3"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <i className="ri-user-3-line mr-2"></i>My Profile
                  </button>
                </Link>
              </li>
              <li>
                <button
                  className="font-medium text-red-500 hover:text-primary rounded flex items-center py-1 px-3 w-full"
                  onClick={() => showModalOut(true)}
                >
                  <i className="ri-logout-box-line mr-2"></i>Sign Out
                </button>
              </li>
            </ul>
          </div>
        </Transition>
        {/* } */}
      </div>
      {modalOut && (
        <ConfirmModal
          message="Are you sure to logout?"
          onClose={() => showModalOut(false)}
          onNext={handleLogout}
        />
      )}
    </>
  );
}

export default ProfileMenu;
