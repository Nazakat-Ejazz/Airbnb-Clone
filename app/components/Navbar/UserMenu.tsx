"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu, AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbBuildingPavilion } from "react-icons/tb";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle, BiUserPlus, BiBookAdd } from "react-icons/bi";
import { BsAirplaneEngines } from "react-icons/bs";

import { signOut } from "next-auth/react";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute rounded-md shadow-md shadow-gray-400  w-[25vw] md:w-2/4 bg-white overflow-hidden right-12 top-12 text-sm first-letter:
        ${currentUser && "md:w-3/4 w-40vw"}
        `}
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My Trips"
                  onClick={() => {
                    router.push("/trips");
                    toggleOpen();
                  }}
                  Icon={BsAirplaneEngines}
                />

                <MenuItem
                  label="My Favorites"
                  onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                  }}
                  Icon={MdOutlineFavoriteBorder}
                />

                <MenuItem
                  label="My Reservations"
                  onClick={() => {
                    router.push("/reservations");
                    toggleOpen();
                  }}
                  Icon={BiBookAdd}
                />

                <MenuItem
                  label="My Properties"
                  onClick={() => {
                    router.push("/properties");
                    toggleOpen();
                  }}
                  Icon={TbBuildingPavilion}
                />

                <MenuItem
                  label="Airbnb My Home"
                  onClick={() => {
                    rentModal.onOpen();
                    toggleOpen();
                  }}
                  Icon={AiOutlineHome}
                />

                <hr />

                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                  Icon={BiLogOutCircle}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={loginModal.onOpen}
                  Icon={IoMdLogIn}
                />

                <MenuItem
                  label="Sign up"
                  onClick={registerModal.onOpen}
                  Icon={BiUserPlus}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
