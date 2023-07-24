import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { SafeListing } from "@/app/types";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    <ClientOnly>
      <EmptyState />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing!}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default page;
