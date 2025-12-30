import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoIcon } from "lucide-react";
import { Navigate } from "react-router-dom";


export default function DataPeserta() {
  const [DataPeserta, setDataPeserta] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [pageData, setPageData] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [itemPerPage, setItemPerPage] = useState(25);
  const [filterData, setFilterData] = useState({});
  const [changeData, setChangeData] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col gap-4 py-6 bg-white dark:bg-slate-800 rounded-lg">
        {/* Head Table */}
        <h1 className="font-semibold text-xl mb-2">
          Data Peserta
        </h1>
        
      </div>

      {/* <div className="w-full bg-white dark:bg-slate-800 overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="border-y-2 dark:border-y-gray-600 bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="pl-6 pr-3 py-3 text-xs tracking-wide text-center border-x-2 border-l-0 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                #
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Id Regristasi 
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Nama Peserta
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Jumlah Lagu
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Genre
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Whatsapp
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Email 
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Alamat
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Status
              </TableHead>
              <TableHead className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

      </div> */}

      <div className="w-full bg-white dark:bg-slate-800 overflow-x-auto">
        <table className="w-full">
          <thead className="border-y-2 dark:border-y-gray-600 bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="pl-6 pr-3 py-3 text-xs tracking-wide text-center border-x-2 border-l-0 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                #
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                ID Registrasi
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Nama Peserta
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Jumlah Lagu
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Genre
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Whatsapp
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Email
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Alamat
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                Status
              </th>
              <th className="pr-6 pl-3 py-3 text-xs tracking-wide text-center border-x-2 border-r-0 border-gray-200 dark:border-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
              <td
                className="pl-6 pr-3 py-3 text-sm tracking-wide text-center border-x-2 border-l-0 border-gray-200 dark:border-gray-600 whitespace-nowrap"> 1 </td>

              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                28122025
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Mawar
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                3
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Dandut
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                082142959615
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                mawar@mail.com
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Banyubiru
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap">
                  Created
                </span>
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">

              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </>
  )
}
