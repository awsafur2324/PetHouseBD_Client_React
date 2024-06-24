import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useQueryMyPets from "../../custom hooks/useQueryMyPets";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const MyDonation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = useContext(AuthProvider);
  const axiosSecure = useAxiosSecure();
  const [sorting, setSorting] = useState([]);
  const [count, setCount] = useState(0);
  const {
    myPets,
    refetch,
    myPetsLoading,
    itemParPage,
    currentPage,
    setCurrentPage,
  } = useQueryMyPets("MyDonateDetails");
  //-----------pagination
  useEffect(() => {
    axiosSecure.get(`/MyDonateDetails_Count/${user?.email}`).then((res) => {
      setCount(res.data.count);
    });
  }, [axiosSecure, user?.email]);

  const numberOfPages = Math.ceil(count / itemParPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handelPrav = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handelNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRefund = async (data) => {
    await axiosSecure
      .delete(`/MyDonateDelete/${data._id}`, { data })
      .then(() => {
        toast.success("Refund Done!");
        refetch();
      });
  };

  const columns = [
    {
      header: "NO",
      cell: (info) => currentPage*10+info.row.index + 1,
      className: "text-center",
    },
    {
      accessorKey: "DonationImg",
      header: "Pet Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Pet"
          className="max-h-20 w-full object-cover"
        />
      ),
      className: "max-w-20 ",
    },
    {
      accessorKey: "Petname",
      header: "Pet Name",
      cell: (info) => info.getValue(),
      width: "max-w-96",
    },
    {
      accessorKey: "amount",
      header: "Donate Amount",
      cell: (info) => info.getValue()/100+" $",
      className: "max-w-96 overflow-hidden whitespace-nowrap",
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2 justify-center items-center">
          <button
            onClick={() => handleRefund(info.row.original)}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Ask for refund
          </button>
        </div>
      ),
      className: "",
    },
  ];

  const table = useReactTable({
    data: myPets || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (myPetsLoading) {
    return <>
    <Skeleton height={"50px"} width={"100%"} />
    <Skeleton height={"30px"} width={"100%"} count={14}/>
    </>;
  }

  return (
    <>
       <Helmet>
        <title>Pet House | My Donation</title>
      </Helmet>
      {myPets?.length > 0 ? (
        <>
          <div className="overflow-auto ">
            <table className="w-full divide-y divide-gray-200 overflow-x-scroll mx-auto  text-xs text-nowrap">
              <thead className="bg-gray-50 w-screen min-w-full relative">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${header.column.columnDef.className}`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 relative overflow-hidden w-full">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-6  text-center py-4 whitespace-nowrap ${cell.column.columnDef.className}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {pages.length > 1 && (
            <div className=" flex items-center  gap-2">
              <Button
                variant="text"
                className="flex items-center"
                onClick={handelPrav}
                disabled={currentPage === 0}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
              {pages.map((page) => (
                <div
                  key={page}
                  className="flex items-center gap-1 "
                  onClick={() => setCurrentPage(page - 1)}
                >
                  <IconButton
                    className={`${
                      currentPage == page - 1
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-300 hover:text-blue-900"
                    }  w-8 h-8 border border-gray-600`}
                  >
                    {page}
                  </IconButton>
                </div>
              ))}
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={handelNext}
                disabled={currentPage === pages.length - 1}
              >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-[90vh]">
            <p className="text-3xl font-bold text-gray-500 flex justify-center items-center gap-4">No Donations Found ! Donate First <HiOutlineEmojiHappy /></p>
          </div>
        </>
      )}
    </>
  );
};

export default MyDonation;
