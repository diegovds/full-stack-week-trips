import QuickSearch from "./components/QuickSearch";
import RecommendedTrips from "./components/RecommendedTrips";
import TripSearch from "./components/TripSearch";

const Home = () => {
  return (
    <div className="">
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  );
};

export default Home;
