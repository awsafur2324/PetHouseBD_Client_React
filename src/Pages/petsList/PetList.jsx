import { Select, Option } from "@material-tailwind/react";
import "./pet.css";
import SearchComponent from "./search/Search";
import PetCard from "./petCard/PetCard";
import useAxios from "../../custom hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../../layouts/Root";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";

const PetList = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const { setPetCategory, PetCategory } = useContext(ThemeContext);

  const useAxiosHook = useAxios();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //-------------------------search option-------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      const response = await useAxiosHook.get("/options");
      setOptions(response.data.map((option) => option.petName));
    };
    fetchOptions();
  }, [useAxiosHook]);

  //-------------------------Infinity Scroll -------------------------
  // Fetch data using react-query
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pets", search, PetCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await useAxiosHook.get(
        `/pets?page=${pageParam}&search=${search}&category=${PetCategory}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  // Intersection observer hook for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // Fetch more data when nearing bottom of the page
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="pb-10 dark:bg-[#1D232A]">
         <Helmet>
        <title>Pet House | Pets</title>
      </Helmet>
      {/* top filter */}
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-5 p-2 xs:p-10 bg-[#00000028]">
        {/* search */}
        <SearchComponent options={options} setSearch={setSearch} />

        {/* dropdown */}
        <div className="w-full max-w-72">
          <Select
            value={PetCategory}
            onChange={(e) => setPetCategory(e)}
            label="Select Version"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <Option value="">All Pets</Option>
            <Option value="Dog">Find Dogs</Option>
            <Option value="Cat">Find Cats</Option>
            <Option value="Bird">Find Birds</Option>
            <Option value="Fish">Find Fish</Option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center place-items-center gap-5 my-10 ">
        {/* card */}
        {isLoading || (isFetchingNextPage && data?.pages.length === 0)
          ? // Display skeletons when loading
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-60 h-72 p-4 flex flex-col justify-center items-center bg-[#fff] shadow-lg rounded-lg"
              >
                <Skeleton
                  height="150px"
                  width="150px"
                  borderRadius="150rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                />
                <br />
                <Skeleton
                  height="10px"
                  width="100px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-2"
                />
                <Skeleton
                  height="10px"
                  width="130px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-1"
                />
                <Skeleton
                  height="10px"
                  width="130px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-2"
                />
              </div>
            ))
          : data?.pages
              .flat()
              .map((pet, index) => <PetCard key={index} pet={pet} />)}
        <div ref={ref}></div> {/* Intersection observer target */}
        {isLoading && (
          <div className="text-center">
            <Skeleton height={300} width={250} />
          </div>
        )}
      </div>
      {isError && (
        <div className="text-center w-full text-sm text-red-500 font-display">
          Error loading data.
        </div>
      )}
      {!hasNextPage && !isLoading && (
        <div className="text-center w-full text-sm font-display">
          No more Pets Available
        </div>
      )}
    </div>
  );
};

export default PetList;
