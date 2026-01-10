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
import { set } from "date-fns";
import axios from "axios";
import API_URLS from "../../../../config";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";


export default function DataPeserta({ id }) {

  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);


  console.log(detailUser.token);
  const secretKey = API_URLS.secretKey;
  const [dataPeserta, setDataPeserta] = useState([]);
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
  const [filterData, setFilterData] = useState({})
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKota, setListKota] = useState([]);
  const [valueForm, setValueForm] = useState({
    province: "",
    prov_id: "",
    city_id: "",
    city: "",
  });


  const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
  };

  const alertMessage = (type, title, message) => {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const alertLoading = () => {
    Swal.fire({
      title: "Sedang diproses..",
      text: "Jangan tutup halaman web ini.",
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const clearData = () => {
    setDataPeserta([]);
    setCurrentPage(1);
    setPageData(1);
    setLastPage(1);
    setTotalData(0);
    setItemPerPage(10);
  };

  const sortBySortOrder = (sortBy) => {
    setSortBy(sortBy);
    setSortOrder((prev) => (prev == "asc" ? "desc" : "asc"));
  };

  const handleDropdownOpen = (index) => {
    setDropdownOpen((prevDropdownOpen) =>
      prevDropdownOpen === index ? null : index
    );
    setSearchData("");
  };
  // const wilayah = {
  //   "Jawa Tengah": ["Semarang", "Solo", "Magelang"],
  //   "Jawa Barat": ["Bandung", "Bekasi", "Bogor"],
  //   "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan"],
  // }

  const navigate = useNavigate()
  const handleOpenDetailPeserta = (data) => {
    navigate(`/admin/daftar-peserta/detail-peserta/${id}`, {
      state: data, // kirim data peserta (frontend dulu)
    })
  }


  useEffect(() => {
    if (!detailUser?.token) return;

    const getDataPeserta = async () => {
      setLoadingData(true);
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers?page=${pageData}&search=${searchData}&sortBy=${sortBy}&sortOrder=${sortOrder}&itemPerPage=${itemPerPage}&province=${!filterData.province ? '' : filterData.province}
          &city=${!filterData.city ? '' : filterData.city}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          setDataPeserta(response.data.data ?? []);
          setCurrentPage(response.data.current_page);
          setLastPage(response.data.last_page);
          setTotalData(response.data.total);
          setFromPage(response.data.from);
          setToPage(response.data.to);
        } else {
          clearData();
        }
      } catch (error) {
        clearData();
        console.log(
          error?.response?.data?.message || "Error catching get data peserta"
        );
      } finally {
        setLoadingData(false);
      }
    };

    getDataPeserta();
  }, [
    pageData,
    searchData,
    sortBy,
    sortOrder,
    itemPerPage,
    filterData,
    changeData,
    detailUser?.token
  ]);


  //Handle Get Data Provinsi Start
  const [dataProvince, setDataProvince] = useState([]);

  useEffect(() => {
    const getDataProvince = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_provinces`
        );

        if (response.status === 200 && response.data.status === "success") {
          setDataProvince(response.data.data);
        } else {
          setDataProvince([]);
        }
      } catch (error) {
        setDataProvince([]);
        console.log(error);
      }
    };

    getDataProvince();
  }, []);


  const handleSelectedProvice = (prov) => {
    setValueForm((prev) => ({
      ...prev,
      province: prov.prov_name,
      prov_id: prov.prov_id,
    }));

    setOpenCombobox("");
  };
  // Get Data Provinsi End

  //Handle Get Data City Start
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    if (!valueForm.prov_id) {
      setDataCity([]);
      return;
    }

    const getDataCity = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_cities?id_province=${valueForm.prov_id}`
        );

        if (response.status === 200 && response.data.status === "success") {
          setDataCity(response.data.data);
        } else {
          setDataCity([]);
        }
      } catch (error) {
        setDataCity([]);
        console.log(error);
      }
    };

    getDataCity();
  }, [valueForm.prov_id]);

  const handleSelectedCity = (city) => {
    setValueForm((prev) => ({
      ...prev,
      city: city.city_name,
      city_id: city.city_id,
    }));

    setOpenCombobox("");
  };
  // Get Data City End



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
              value={valueForm.prov_id || "all"}
              onValueChange={(value) => {
                if (value === "all") {
                  setValueForm({
                    province: "",
                    prov_id: "",
                    city: "",
                    city_id: "",
                  });
                  return;
                }

                const selectedProv = dataProvince.find(
                  (prov) => prov.prov_id === value
                );

                setValueForm({
                  province: selectedProv?.prov_name || "",
                  prov_id: selectedProv?.prov_id || "",
                  city: "",
                  city_id: "",
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Provinsi" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Semua Provinsi</SelectItem>

                {dataProvince.map((prov) => (
                  <SelectItem key={prov.prov_id} value={prov.prov_id}>
                    {prov.prov_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* KOTA */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Kota</Label>
            <Select
              value={valueForm.city_id || "all"}
              disabled={!valueForm.prov_id}
              onValueChange={(value) => {
                if (value === "all") {
                  setValueForm((prev) => ({
                    ...prev,
                    city: "",
                    city_id: "",
                  }));
                  return;
                }

                const selectedCity = dataCity.find(
                  (city) => city.city_id === value
                );

                setValueForm((prev) => ({
                  ...prev,
                  city: selectedCity?.city_name || "",
                  city_id: selectedCity?.city_id || "",
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Kota" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Semua Kota</SelectItem>

                {dataCity.map((city) => (
                  <SelectItem key={city.city_id} value={city.city_id}>
                    {city.city_name}
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
        <table className="table-auto w-full">
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
          <tbody className="border-b-2 border-gray-200 dark:border-gray-600">
            {loadingData && (
              <tr className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                <td
                  className="p-3 text-sm tracking-wide text-center border-gray-200 dark:border-gray-600"
                  colSpan={11}
                >
                  Proses mengambil data...
                </td>
              </tr>
            )}

            {!loadingData && dataPeserta?.length === 0 && (
              <tr className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                <td
                  className="p-3 text-sm tracking-wide text-center border-gray-200 dark:border-gray-600"
                  colSpan={11}
                >
                  Data saat ini kosong
                </td>
              </tr>
            )}

            {!loadingData &&
              dataPeserta?.map((item, index) => (
                <tr className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                  <td
                    className="pl-6 pr-3 py-3 text-sm tracking-wide text-center border-x-2 border-l-0 border-gray-200 dark:border-gray-600 whitespace-nowrap"
                    key={index}
                  >
                    {index + 1}
                  </td>
                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                    {item?.id}
                  </td>
                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                    {item?.name}
                  </td>
                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                    {item?.whatsapp}
                  </td>
                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                    {item?.email}
                  </td>
                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600 whitespace-nowrap">
                    {item?.district}, {item?.city}, {item?.province}
                  </td>
                  <td className="p-3 text-sm text-left border-x-2 whitespace-nowrap align-top">
                    {item?.music_works
                      ?.filter(work => work.title)
                      .map((work, index) => (
                        <div key={work.id}>
                          {index + 1}. {work.title}
                        </div>
                      ))}
                  </td>

                  <td className="p-3 text-sm text-left border-x-2 whitespace-nowrap align-top">
                    <ol className="list-decimal list-inside space-y-1">
                      {item?.music_works
                        ?.filter(work => work.genre)
                        .map((work, index) => (
                          <li key={work.id}>{work.genre}</li>
                        ))}
                    </ol>
                  </td>

                  <td className="p-3 text-sm text-left border-x-2 whitespace-nowrap align-top">
                    <div className="flex flex-col gap-1 w-fit">
                      {item?.music_works?.map((work, index) => (
                        <span
                          key={index}
                          className={
                            work.status === "submitted"
                              ? "bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap w-fit"
                              : work.status === "approved"
                                ? "bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300 whitespace-nowrap w-fit"
                                : ""
                          }
                        >
                          {work.status === "submitted" && "Submitted"}
                          {work.status === "approved" && "Approved"}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 text-sm tracking-wide text-left border-x-2 border-gray-200 dark:border-gray-600">
                    <div className="w-full flex items-center justify-center gap-2 px-2">
                      <Tooltip title="Detail Peserta">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/admin/daftar-peserta/detail-peserta/${encodeURIComponent(
                              encryptData(item.id, secretKey)
                            )}`)
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 text-sm font-medium  rounded-lg dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-700 dark:hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>

      {/* mobile view */}
      <div className="block lg:hidden space-y-4">
        {!loadingData && dataPeserta?.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
          >

            {/* HEADER */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {item?.name}
                </p>
                <p className="text-xs text-gray-500">
                  ID: 28122025
                </p>
              </div>

              {item?.music_works?.[0]?.status === "submitted" && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  Submitted
                </span>
              )}

              {item?.music_works?.[0]?.status === "approved" && (
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
                  Approved
                </span>
              )}

            </div>

            {/* DATA UTAMA */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">WhatsApp</span>
                <span>{item?.whatsapp}</span>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 shrink-0">Email</span>
                <span className="text-right break-words max-w-[15ch] sm:max-w-none">
                  {item?.email}
                </span>
              </div>


              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 shrink-0">Alamat</span>
                <span className="text-right break-words max-w-[20ch] sm:max-w-none">
                  {item?.district}, {item?.city}, {item?.province}
                </span>
              </div>

            </div>

            {/* DETAIL KARYA */}
            <div className="mt-4 border-t pt-3 space-y-2 text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Detail Karya
              </p>

              <div className="flex justify-between">
                <span className="text-gray-500">Judul</span>
                <span>{item?.music_works?.[0]?.title}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Genre</span>
                <span>{item?.music_works?.[0]?.genre}</span>
              </div>
            </div>

            {/* ACTION */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate(`/admin/daftar-peserta/detail-peserta/${encodeURIComponent(
                    encryptData(item.id, secretKey)
                  )}`)
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-600 hover:text-white transition"
              >
                <Eye className="w-4 h-4" />
                Detail
              </button>
            </div>

          </div>
        ))}
      </div>

    </>
  )
}
