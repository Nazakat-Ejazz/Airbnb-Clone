import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    // <div className="text-rose-500 text-3xl flex items-center justify-center italic w-full">
    //   Welcome to Airbnb!
    // </div>

    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          <div className="text-md">
            {listings.map((list: any) => (
              <ListingCard
                key={list.id}
                data={list}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}
