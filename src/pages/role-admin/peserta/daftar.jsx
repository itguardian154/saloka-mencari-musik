import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Search, Eye, ChevronLeft, ChevronRight, Filter, Download, FileSpreadsheet } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Tooltip } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function DataPeserta() {
  const [DataPeserta, setDataPeserta] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filterShow, setFilterShow] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [pageData, setPageData] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromPage, setFromPage] = useState("");
  const [toPage, setToPage] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [itemPerPage, setItemPerPage] = useState(25);
  const [changeData, setChangeData] = useState(false);
  const [detailPeserta, setDetailPeserta] = useState({});
  const [date, setDate] = useState(undefined)
  const [filterData, setFilterData] = useState({
    provinsi: "",
    kota: "",
    genre: "",
  })

  const wilayah = {
    "Jawa Tengah": ["Semarang", "Solo", "Magelang"],
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor"],
    "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan"],
  }

  const navigate = useNavigate()
  const handleOpenDetailPeserta = (data) => {
    navigate("/admin/daftar-peserta/detail-peserta", {
      state: data, // kirim data peserta (frontend dulu)
    })
  }



  // const handleOpenDetailPeserta = (data) => {
  //   handleOpenModal("detail-peserta");
  //   setDetailPeserta(data);
  // };

  const handleCloseDetailPeserta = () => {
    handleOpenModal(null);
    setDetailPeserta({});
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setPageData(parseInt(pageData) + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPageData(parseInt(pageData) - 1);
    }
  };


  return (
    <>
      <div className="w-full flex flex-col gap-4 py-1 bg-white dark:bg-slate-800 rounded-lg">
        {/* Head Table */}
        <h1 className="font-semibold text-xl m-0">
          Data Peserta
        </h1>

      </div>
      <div className="w-full flex flex-wrap items-center justify-end gap-2 mb-4">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Cari Data Peserta Disini"
            className="w-full max-w-md px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-full focus:outline-none focus:border-primer-60 text-slate-700 dark:text-slate-50 text-sm focus:ring-2 focus:ring-primer-40"
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                 bg-green-600 hover:bg-green-700 
                 flex items-center justify-center
                 transition-colors"
          >
            <Search className="h-4 w-4 text-white" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* FILTER */}
          <Button
            type="button"
            onClick={() => setFilterShow(!filterShow)}
            className="w-fit flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full font-medium text-sm text-white whitespace-nowrap"
          >
            <Filter className="h-4 w-4" />
            Filter Data
          </Button>

          {/* EXPORT */}
          <Button
            type="button"
            className="w-fit xl:w-fit flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium bg-sky-600 hover:bg-sky-500 text-white text-sm whitespace-nowrap"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {filterShow && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 py-4 rounded-lg">

          {/* TANGGAL */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Tanggal</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from
                    ? date.to
                      ? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
                      : format(date.from, "dd/MM/yyyy")
                    : "Pilih range tanggal"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* PROVINSI */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Provinsi</Label>

            <Select
              value={filterData.provinsi}
              onValueChange={(value) =>
                setFilterData({ ...filterData, provinsi: value, kota: "" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Provinsi" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(wilayah).map((prov) => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* KOTA */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Kota</Label>

            <Select
              value={filterData.kota}
              disabled={!filterData.provinsi}
              onValueChange={(value) =>
                setFilterData({ ...filterData, kota: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kota" />
              </SelectTrigger>
              <SelectContent>
                {filterData.provinsi &&
                  wilayah[filterData.provinsi].map((kota) => (
                    <SelectItem key={kota} value={kota}>
                      {kota}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* GENRE */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Genre</Label>

            <Select
              value={filterData.genre}
              onValueChange={(value) =>
                setFilterData({ ...filterData, genre: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="dangdut">Dangdut</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      )}




      <div className="w-full flex flex-wrap items-center justify-between px-4 lg:px-2 py-0.5 gap-2 border-slate-100 dark:border-slate-700">
        {/* Kiri: Rows per page & Page info */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-200">

          {/* Rows per page (DESKTOP SAJA) */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="whitespace-nowrap">Rows per page</span>
            <select
              id="show-entries"
              onChange={(e) => setItemPerPage(e.target.value)}
              value={itemPerPage}
              className="cursor-pointer text-xs dark:bg-slate-800 bg-white border-none rounded-lg focus:ring-0 block w-fit p-2.5 dark:text-white"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Page info (MOBILE & DESKTOP) */}
          <span className="font-semibold whitespace-nowrap">
            Page {currentPage} of {lastPage}
          </span>
        </div>

        {/* Kanan: Pagination Control */}
        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
          <span className="whitespace-nowrap">
            {fromPage || "0"}-{toPage || "0"} of {totalData} Row
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePrevPage()}
              type="button"
              className="cursor-pointer p-1 rounded-md bg-green-50 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => handleNextPage()}
              type="button"
              className="cursor-pointer p-1 rounded-md bg-green-50 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden xl:block w-full bg-white dark:bg-slate-800 overflow-x-auto">
        <table className="w-full">
          <thead className="border-y-2 dark:border-y-gray-600 bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="pl-6 pr-3 py-3 text-xs tracking-wide text-center border-x-2 border-l-0 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                #
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                ID Registrasi
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                Nama Peserta
              </th>

              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                Whatsapp
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                Email
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                rowSpan={2}
              >
                Alamat
              </th>
              <th className="p-3 text-xs tracking-wide text-center border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                colSpan={3}
              >
                Detail Karya
              </th>
              <th className="pr-6 pl-3 py-3 text-xs tracking-wide text-center border-x-2 border-r-0 border-gray-200 dark:border-gray-600"
                rowSpan={2}
              >
                Action
              </th>
            </tr>
            <tr className="border-y-2 dark:border-y-gray-600">
              <th className="p-3 text-xs text-center border-x-2">
                Judul Karya
              </th>
              <th className="p-3 text-xs text-center border-x-2">
                Genre
              </th>
              <th className="p-3 text-xs text-center border-x-2">
                Status
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
                082142959615
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                mawar@mail.com
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Banyubiru
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Aseek
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                Dangdut
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap">
                  Created
                </span>
              </td>
              <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                <div className="w-full flex items-center justify-center gap-2 px-2">
                  <Tooltip title="Detail Peserta">
                    <button
                      type="button"
                      onClick={() => handleOpenDetailPeserta(detailPeserta)}
                      className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 text-sm font-medium  rounded-lg dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-700 dark:hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      {/* mobile view */}
      <div className="block lg:hidden space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">

          {/* HEADER */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Mawar
              </p>
              <p className="text-xs text-gray-500">
                ID: 28122025
              </p>
            </div>

            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Created
            </span>
          </div>

          {/* DATA UTAMA */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">WhatsApp</span>
              <span>082142959615</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="truncate max-w-[160px]">
                mawar@mail.com
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Alamat</span>
              <span>Banyubiru</span>
            </div>
          </div>

          {/* DETAIL KARYA */}
          <div className="mt-4 border-t pt-3 space-y-2 text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Detail Karya
            </p>

            <div className="flex justify-between">
              <span className="text-gray-500">Judul</span>
              <span>Aseek</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Genre</span>
              <span>Dangdut</span>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleOpenDetailPeserta(detailPeserta)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-600 hover:text-white transition"
            >
              <Eye className="w-4 h-4" />
              Detail
            </button>
          </div>

        </div>
      </div>

    </>
  )
}


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
