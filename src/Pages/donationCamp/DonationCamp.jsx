import { useEffect, useState } from "react";
import Select from "react-select";
import DonationCard from "./donationCard/DonationCard";
import useAxios from "../../custom hooks/useAxios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const DonationCamp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [sort, setSort] = useState("Des"); // Default sort order
  const useAxiosHook = useAxios();

  // React-select options
  const options = [
    { value: "Des", label: "Descending Order" },
    { value: "Asc", label: "Ascending Order" },
  ];

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["donations", sort],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await useAxiosHook.get(
        `/donations?page=${pageParam}&sort=${sort}`
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

  // Handle sort change
  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  return (
    <div className="pb-10">
         <Helmet>
        <title>Pet House | Donation Campaigns</title>
      </Helmet>
      <h1 className="bg-[#00000015] p-10 w-full font-display text-2xl font-semibold text-center">
        Donation Campaigns
      </h1>
      <div className="max-w-96 w-full my-10 mx-auto">
        <Select
          onChange={handleSortChange}
          options={options}
          placeholder="Sort By Donation Last Date"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center place-items-center gap-5 my-10">
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
                  width="240px"
                  borderRadius="0rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                />
                <br />
                <Skeleton
                  height="10px"
                  width="230px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-2"
                />
                <Skeleton
                  height="10px"
                  width="230px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-1"
                />
                <Skeleton
                  height="10px"
                  width="230px"
                  borderRadius="0.5rem"
                  baseColor="#E0E0E0"
                  highlightColor="#F0F0F0"
                  className="mt-2"
                />
              </div>
            ))
          : data?.pages
              .flat()
              .map((camp, index) => <DonationCard key={index} camp={camp} />)}
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
          No more Donation Campaigns found
        </div>
      )}
    </div>
  );
};

export default DonationCamp;
