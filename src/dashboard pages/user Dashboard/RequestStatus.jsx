import { useContext, useEffect, useState } from "react";
import useQueryMyPets from "../../custom hooks/useQueryMyPets";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const RequestStatus = () => {
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
  } = useQueryMyPets("RequestStatus");
  //-----------pagination
  useEffect(() => {
    axiosSecure.get(`/RequestStatus_Count/${user?.email}`).then((res) => {
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

  const handleCancel = async (data) => {
    const deleteItem = await axiosSecure.delete(
      `/AdoptionRequest_delete/${data._id}`
    );
    if (deleteItem) {
      toast.success("Request Cancelled");
      refetch();
    }
  };

  const columns = [
    {
      header: "#",
      cell: (info) => currentPage*10+info.row.index + 1,
      className: "text-center", // Tailwind class for text alignment
    },
    {
      accessorKey: "PetImg",
      header: "Pet Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Pet"
          className="h-full w-full object-cover"
        />
      ),
      className: "max-w-20 max-h-20",
    },
    {
      accessorKey: "PetName",
      header: "Pet Name",
      cell: (info) => info.getValue(),
      className: "overflow-hidden whitespace-nowrap", // Tailwind classes for text overflow and whitespace handling
    },
    {
      accessorKey: "Author_email",
      header: "Pet Owner Email",
      cell: (info) => (
        <span>
          {info.row.original.Status == "Accepted" ? (
            info.getValue()
          ) : info.row.original.Status == "Rejected" ? (
            <span className="text-red-500">Rejected By Owner</span>
          ) : (
            <span className="text-red-500">Waiting for Accepting Request</span>
          )}
        </span>
      ),
    },
    {
      accessorKey: "Adopt_phone",
      header: "My phone no",
      cell: (info) => info.getValue(),
   
    },
    {
      accessorKey: "Adopt_address",
      header: "My Address",
      cell: (info) => info.getValue(),
      
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: (info) => info.getValue(),
      
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2">
          {info.row.original.Status === "Pending" && (
            <button
              onClick={() => handleCancel(info.row.original)}
              className="px-4 py-2 bg-green-500 text-white rounded "
            >
              Cancel Request
            </button>
          )}
        </div>
      ),
      className: "", // You can add Tailwind classes here if needed
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
        <title>Pet House | Request Status</title>
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
            <p className="text-3xl font-bold text-gray-500 flex justify-center items-center gap-4">No Request Status Found <RiEmotionUnhappyLine /></p>
          </div>
        </>
      )}
    </>
  );
};

export default RequestStatus;
