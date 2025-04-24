import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { appDispatch } from "../store/hooks";
import { doLogout } from "../store/slice/auth/auth-slice";


type OptionType = { label: string; route: string; action?: string };

const GUEST_OPTIONS: OptionType[] = [
  { label: "Home", route: "/" },
  { label: "Property Value Estimator", route: "/estimation" },
  { label: "Property Market Analysis", route: "/analysis" },
];

export default function NavBar() {
  const dispatch = appDispatch();
  const navigation = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionType[]>(GUEST_OPTIONS);

  const handleMenu = () => {
    console.log("_handleMenu");
    if (options.length == 0) {
      navigation("/login");
    }
    setOpenMenu((pre) => !pre);
  };

  const optionHandle = (option: OptionType) => {
    console.log("_optionHandle : " + option.route);
    if (option?.action === "logout") {
      // onLogout();
      dispatch(doLogout());
    }
    if (option.route && option.route !== "") {
      navigation(option.route);
    }
    setOpenMenu((pre) => !pre);
  };

  return (
    <nav
      className="w-full flex relative justify-between items-center mx-auto px-12 h-24 
      border-b-0 border-dashed border-gray-200
      bg-gradient-to-r from-white from-20% via-red-50 to-red-100
      "
    >
      {/* Logo */}

      <div className="inline-flex">
        <a className="_o6689fn">
          <div className="block xm:hidden">
            <img src="/ppp.jpg" alt="Logo" className="logo-image" />
          </div>
          <div className="block md:hidden">
            <img src="/ppp.jpg" alt="Logo" className="logo-image" />
          </div>
        </a>
      </div>

      <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2 w-1/3">
        <div className="text-red-600 text-3xl font-bold mb-0 p-2 m-0 place-self-center">
          <h2> Housing Price Prediction Model</h2>
        </div>
      </div>

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="block w-32 ">
            <div className="inline relative float-end">
              <button
                type="button"
                className="inline-flex items-center relative px-2 rounded-full hover:shadow-lg hover:bg-blue-100 border-2"
                onClick={handleMenu}
              >
                <div className="pl-1">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block fill-none h-8 w-8 stroke-current overflow-visible"
                  >
                    <g fill="none" fillRule="nonzero">
                      <path d="m2 16h28"></path>
                      <path d="m2 24h28"></path>
                      <path d="m2 8h28"></path>
                    </g>
                  </svg>
                </div>

                <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-4 pt-1">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block h-8 w-8 fill-current"
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                  </svg>
                </div>
              </button>
            </div>

            {openMenu && (
              <ul className="absolute z-[1000] right-0 top-12 m-0 list-none overflow-hidden rounded-lg border-none bg-clip-padding text-center text-base shadow-2xl data-[twe-dropdown-show]:block dark:bg-surface-dark w-32 min-w-max bg-blue-100">
                {options.map((option, index) => (
                  <li key={index}>
                    <a
                      className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                      onClick={() => optionHandle(option)}
                    >
                      {option.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>


    </nav>
  );
}
