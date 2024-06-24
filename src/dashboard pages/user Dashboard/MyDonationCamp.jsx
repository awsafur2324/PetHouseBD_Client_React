import { useContext, useEffect, useState } from "react";
import useQueryMyPets from "../../custom hooks/useQueryMyPets";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Progress,
  Typography,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";


const MyDonationCamp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = useContext(AuthProvider);
  const axiosSecure = useAxiosSecure();
  const [sorting, setSorting] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [count, setCount] = useState(0);
  const Navigate = useNavigate();
  const {
    myPets,
    refetch,
    myPetsLoading,
    itemParPage,
    currentPage,
    setCurrentPage,
  } = useQueryMyPets("MyDonation");
  //-----------pagination
  useEffect(() => {
    axiosSecure.get(`/MyDonationCount/${user?.email}`).then((res) => {
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

  //main part

  const handlePause = (row) => {
    const data = { pause: !row.pause };
    axiosSecure.patch(`/MyDonation_Pause/${row._id}`, data).then(() => {
      refetch();
    });
  };

  const handleUpdate = (row) => {
    Navigate(`/dashboard/myDonationUpdate/${row._id}`);
  };
  const [donationInfo, setDonationInfo] = useState({});
  const handleViewDonators = (row) => {
    handleOpen();
    
    axiosSecure.get(`/donateInformation/${row._id}`).then((res) => {
      setDonationInfo(res.data);
    });
  };
  
  const columns = [
    {
      header: "NO",
      cell: (info) => currentPage*10+info.row.index + 1,
      className: "text-center",
    },
    {
      accessorKey: "PetName",
      header: "Pet Name",
      cell: (info) => info.getValue(),
      width: "",
    },
    {
      accessorKey: "MaxDonation",
      header: "Max Donate Amount",
      cell: (info) => info.getValue(),
      className: "overflow-hidden whitespace-nowrap",
    },
    {
      accessorKey: "Progress",
      header: "Donation Progress",
      cell: (info) => (
        <div className="w-full text-xs">
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="blue-gray" variant="h6" className="text-xs">
              Completed
            </Typography>
            <Typography color="blue-gray" variant="h6" className="text-xs">
              {info.getValue()}%
            </Typography>
          </div>
          <Progress value={info.getValue()} />
        </div>
      ),
      className: "",
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(info.row.original)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={() => handlePause(info.row.original)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {/* pause true means stop */}
            {info.row.original.pause ? "Unpause" : "Pause"}
          </button>
          {!info.row.original.Adopted && (
            <button
              onClick={() => handleViewDonators(info.row.original)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              View Donators
            </button>
          )}
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
        <title>Pet House | My Donation Campaigns</title>
      </Helmet>
      {myPets?.length > 0 ? (
        <div>
          <div className="overflow-auto">
            <table className="w-full text-center divide-y divide-gray-200 overflow-x-scroll mx-auto text-xs text-nowrap">
              <thead className="bg-gray-50 w-screen min-w-full relative">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${header.column.columnDef.width}`}
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
                        className={`px-6 py-4 whitespace-nowrap ${cell.column.columnDef.className}`}
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
          {pages.length > 1 && (
            <div className="flex items-center gap-2">
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
                  className="flex items-center gap-1"
                  onClick={() => setCurrentPage(page - 1)}
                >
                  <IconButton
                    className={`${
                      currentPage === page - 1
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-300 hover:text-blue-900"
                    } w-8 h-8 border border-gray-600`}
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
          {/* donate details model */}
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Donate Details.</DialogHeader>
            <DialogBody>
              <table
                border={1}
                className="divide-y divide-gray-200 overflow-x-scroll mx-auto w-full text-xs text-nowrap"
              >
                <thead>
                  <th>Donator Name</th>
                  <th>Donator Email</th>
                  <th>Donate Amount</th>
                </thead>

                <tbody>
                  {Array.isArray(donationInfo) &&
                    donationInfo.map((donator) => (
                      <tr
                        key={donator._id}
                        className="text-center text-black text-sm"
                      >
                        <td>{donator.user_name}</td>
                        <td>{donator.user_email}</td>
                        <td>{donator.amount / 100}$</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </DialogBody>
          </Dialog>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          <p className="text-3xl font-bold text-gray-500 flex justify-center items-center gap-4">
            No Donations Campaign Found <RiEmotionUnhappyLine />
          </p>
        </div>
      )}
    </>
  );
};

export default MyDonationCamp;
