import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useQueryMyPets from "../../custom hooks/useQueryMyPets";
import Swal from "sweetalert2";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const AllPets = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = useContext(AuthProvider);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [count, setCount] = useState();
  const {
    myPets,
    refetch,
    myPetsLoading,
    itemParPage,
    currentPage,
    setCurrentPage,
  } = useQueryMyPets("AllPets");

  //-----------pagination
  useEffect(() => {
    axiosSecure.get(`/AllPetCount`).then((res) => {
      setCount(res.data.count);
    });
  }, [axiosSecure, user?.email]);
  const numberOfPages = Math.ceil(count / itemParPage);
  const pages = [];
  for (let i = 1; i < numberOfPages + 1; i++) {
    pages.push(i);
  }

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
  const handleUpdate = (row) => {
    // Add your update logic here

    navigate(`/dashboard/PetsUpdate/${row._id}`);
  };

  const handleDelete = (row) => {
    // confirmation before delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deletePets/${row._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleAdopt = async (row) => {
    // Add your adopt logic here
    const adopt = Boolean(row.Adopted);
    const res = await axiosSecure.patch(
      `/adoptAllPets/${row._id}?Adopted=${adopt}`
    );
    if (res.data.modifiedCount) {
      refetch();
    }
  };

  const columns = [
    {
      header: "#",
      cell: (info) => currentPage * 10 + info.row.index + 1,
      className: "text-center", // Tailwind class for text alignment
    },
    {
      accessorKey: "petImg",
      header: "Pet Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Pet"
          className="h-full w-full object-cover"
        />
      ),
      className: "w-28 h-28",
    },
    {
      accessorKey: "petName",
      header: "Pet Name",
      cell: (info) => info.getValue(),
      className: "overflow-hidden whitespace-nowrap", // Tailwind classes for text overflow and whitespace handling
    },
    {
      accessorKey: "Author_email",
      header: "Author Email",
      cell: (info) => info.getValue(),
      className: "overflow-hidden whitespace-nowrap", // Tailwind classes for text overflow and whitespace handling
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "Adopted",
      header: "Adoption Status",
      cell: (info) => (info.getValue() ? "Adopted" : "Not Adopted"),
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handleUpdate(info.row.original)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(info.row.original)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>

          <button
            onClick={() => handleAdopt(info.row.original)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {info.row.original.Adopted ? "Not Adopt" : "Adopt"}
          </button>
        </div>
      ),
      className: "", // You can add Tailwind classes here if needed
    },
  ];
  const table = useReactTable({
    data: myPets,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (myPetsLoading) {
    return (
      <>
        <Skeleton height={"50px"} width={"100%"} />
        <Skeleton height={"30px"} width={"100%"} count={14} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pet House | All Pets</title>
      </Helmet>
      {myPets.length > 0 ? (
        <>
          <div className="overflow-auto  ">
            <table className="w-full divide-y divide-gray-200 overflow-x-scroll mx-auto  text-xs text-nowrap">
              <thead className="bg-gray-50 w-screen min-w-full relative">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${header.column.columnDef.width}`}
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
                        className={`px-6 py-4 text-center whitespace-nowrap ${cell.column.columnDef.className}`}
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
        <div className="flex justify-center items-center h-[90vh]">
          <p className="text-3xl font-bold text-gray-500 flex justify-center items-center gap-4">
            You Have No Added Pets <RiEmotionUnhappyLine />
          </p>
        </div>
      )}
    </>
  );
};

export default AllPets;
