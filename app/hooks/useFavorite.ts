import axios from "axios";

import { useRouter } from "next/navigation";

import { useCallback, useMemo } from "react";

import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let type = "";
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          type = "delete";
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          type = "add";
        }

        await request();
        // check if is included in favorites or not
        if (type === "add") {
          toast.success("Success : Added to favorites.", {
            position: "bottom-left",
          });
        } else {
          toast.success("Success : Removed from favorites.", {
            position: "bottom-left",
          });
        }
        router.refresh();
      } catch (error) {
        toast.error("Request Failed : Something went wrong!", {
          position: "bottom-left",
        });
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
