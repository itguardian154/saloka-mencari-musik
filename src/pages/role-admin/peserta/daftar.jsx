import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, Search, Eye, ChevronDown, ChevronUp, Edit, ChevronRight, Filter, FileSpreadsheet, RotateCcw, ChevronLeft, ChevronsRight } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns";
import axios from "axios";
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner"
import moment from "moment";


export default function DataPeserta() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);


  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);


  // console.log(detailUser.token);
  const secretKey = API_URLS.secretKey;
  const [dataPeserta, setDataPeserta] = useState([]);
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
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  });
  const [filterData, setFilterData] = useState({
    province: "",
    province_id: "",
    city: "",
    city_id: "",
    genre: "",
    genre_id: "",
  });

  const navigate = useNavigate()
  const [openCombobox, setOpenCombobox] = useState("");

  const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
  };


  const clearData = () => {
    setDataPeserta([]);
    setCurrentPage(1);
    setPageData(1);
    setLastPage(1);
    setTotalData(0);
    setItemPerPage(10);
  };

  const handleOpenCombobox = (index) => {
    setOpenCombobox((prev) => (prev === index ? "" : index));
  };

  useEffect(() => {
    if (!detailUser?.token) return;

    const getDataPeserta = async () => {
      setLoadingData(true);
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers?page=${pageData}&no_pagination=false&search=${searchData}&sortBy=${sortBy}&sortOrder=${sortOrder}&per_page=${itemPerPage}&province=${!filterData.province ? '' : filterData.province}
          &city=${!filterData.city ? '' : filterData.city}&genre=${!filterData.genre ? '' : filterData.genre}&date_start=${date?.from ? moment(date.from).format("YYYY-MM-DD") : ""}
          &date_end=${date?.to ? moment(date.to).format("YYYY-MM-DD") : ""}
          `,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          setDataPeserta(response.data.data.data ?? []);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotalData(response.data.data.total);
          setFromPage(response.data.data.from);
          setToPage(response.data.data.to);
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
    itemPerPage,
    filterData,
    detailUser?.token,
    date
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


  const handleSelectedProvince = (prov) => {
    setFilterData((prev) => ({
      ...prev,
      province: prov.prov_name,
      province_id: prov.prov_id,
      city: "",
      city_id: "",
    }));

    setPageData(1);
    setOpenCombobox("");
  };
  // Get Data Provinsi End

  //Handle Get Data City Start
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    if (!filterData.province_id) {
      setDataCity([]);
      return;
    }

    const getDataCity = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_cities?id_province=${filterData.province_id}`
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
  }, [filterData.province_id]);


  const handleSelectedCity = (city) => {
    setFilterData((prev) => ({
      ...prev,
      city: city.city_name,
      city_id: city.city_id,
    }));

    setPageData(1);
    setOpenCombobox("");
  };
  // Get Data City End

  /* ===================== GENRE ===================== */
  const [dataGenre, setDataGenre] = useState([]);

  useEffect(() => {
    const getDataGenre = async () => {
      try {
        const res = await axios.get(
          `${API_URLS.mencariMusik}/genres`
        );
        if (res.status === 200 && res.data.status === true) {
          setDataGenre(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setDataGenre([]);
      }
    };
    getDataGenre();
  }, []);

  const handleSelectedGenre = (gen) => {
    setFilterData((prev) => ({
      ...prev,
      genre: gen.name,
      genre_id: gen.id,
    }));

    setPageData(1);
    setOpenCombobox("");
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

  // Re generate payment Start
  const handleReGenerate = async (composerId) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URLS.mencariMusik}/music-works`,
        data: {
          composer_id: composerId,
          type_register: "re-generate",
        },
        headers: {
          Authorization: `Bearer ${detailUser.token}`,
        },
      })

      if (response.status === 200 && response.data.status === true) {
        toast.success("Karya berhasil di-generate ulang 🎵")
      } else {
        toast.error(
          response.data?.message || "Gagal melakukan re-generate karya"
        )
      }
    } catch (error) {
      console.error(error)

      toast.error(
        error.response?.data?.message ||
        "Terjadi kesalahan saat re-generate karya"
      )
    }
  }
  // Re generate payment End

  // Export Start
  const getExportQuery = () =>
    `export=excel` +
    `&province=${encodeURIComponent(filterData.province || "")}` +
    `&city=${encodeURIComponent(filterData.city || "")}` +
    `&genre=${encodeURIComponent(filterData.genre || "")}` +
    `&date_start=${encodeURIComponent(date?.from ? moment(date.from).format("YYYY-MM-DD") : "")}` +
    `&date_end=${encodeURIComponent(date?.to ? moment(date.to).format("YYYY-MM-DD") : "")}`;

  const handleExportExcel = async () => {
    const exportUrl = `${API_URLS.mencariMusik}/composers?${getExportQuery()}`;

    try {
      const token = localStorage.getItem("token"); // sesuaikan tempat token kamu
      const res = await axios.get(exportUrl, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      // ambil nama file dari header kalau ada
      const disposition = res.headers["content-disposition"];
      let filename = "composer.xlsx";
      const match = disposition?.match(/filename="?([^"]+)"?/);
      if (match?.[1]) filename = match[1];

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export gagal:", err);
      // optional: tampilkan toast
    }
  };
  // Export End


  const columns = [
    {
      id: "no",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Nama Peserta",
    },
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))

        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      },
    },

    {
      accessorKey: "whatsapp",
      header: "Whatsapp",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "alamat",
      header: "Alamat",
      cell: ({ row }) => (
        <span>
          {row.original.city}, {row.original.province}
        </span>
      ),
    },

    {
      header: "Detail Karya",
      columns: [
        {
          id: "judul",
          header: "Judul Karya",
          cell: ({ row }) => (
            <div className="space-y-4">
              {row.original.music_works?.map((w, i) => (
                <div key={w.id} className="min-h-fit">
                  {i + 1}. {w.title || "-"}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "genre",
          header: "Genre",
          cell: ({ row }) => (
            <div className="space-y-4">
              {row.original.music_works?.map((w, i) => (
                <div key={w.id} className="min-h-[22px]">
                  {i + 1}. {w.genre || "-"}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "invoice",
          header: "Invoice ID",
          cell: ({ row }) => (
            <div className="space-y-4 text-xs">
              {row.original.music_works?.map((w, i) => (
                <div key={w.id} className="min-h-[22px]">
                  {i + 1}. {w.invoice_id || "-"}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "payment",
          header: "Payment Method",
          cell: ({ row }) => (
            <div className="space-y-4 text-xs">
              {row.original.music_works?.map((w, i) => (
                <div key={w.id} className="min-h-[22px]">
                  {i + 1}. {w.payment_method || "-"}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "status",
          header: "Status",
          cell: ({ row }) => (
            <div className="space-y-4">
              {row.original.music_works?.map((w, i) => (
                <div key={w.id} className="min-h-[22px] flex items-center">
                  <span
                    className={`text-xs capitalize px-2 py-0.5 rounded-full
                  ${w.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : w.status === "submitted"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "generate",
          header: "Generate",
          cell: ({ row }) => (
            <div className="space-y-4">
              {row.original.music_works?.map((w) => (
                <div key={w.id} className="min-h-[22px]">
                  {w.status === "draft" &&
                    w.payment_status === "expired" && (
                      <button
                        onClick={() => handleReGenerate(w.composer_id)}
                        className="
                      text-[11px] px-1 py-0
                      border border-sky-300
                      rounded-md
                      bg-sky-600 text-white
                      hover:bg-sky-700
                    "
                      >
                        Re-generate
                      </button>
                    )}
                </div>
              ))}
            </div>
          ),
        },
      ],
    },

    {
      id: "action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => (
        <>
          <div className="flex flex-row gap-2">
            <button
              onClick={() =>
                navigate(
                  `/admin/daftar-peserta/detail-peserta/${encodeURIComponent(
                    encryptData(row.original.id, secretKey)
                  )}`
                )
              }
              className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-600 hover:text-white"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                navigate(
                  `/admin/edit-profile/${encodeURIComponent(
                    encryptData(row.original.id, secretKey)
                  )}`
                )
              }
              className="w-8 h-8 flex items-center justify-center bg-sky-100 text-sky-800 rounded-lg hover:bg-sky-600 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </>
      ),
    },
  ]


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
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
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
            onClick={handleExportExcel}
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
                  className="justify-start text-left font-normal h-11"
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

            <Popover
              open={openCombobox === "province"}
              onOpenChange={() => handleOpenCombobox("province")}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-11"
                >
                  {filterData.province || "Pilih provinsi"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full min-w-full p-0">
                <Command>
                  <CommandInput placeholder="Cari provinsi" className="h-9" />

                  <CommandList>
                    <CommandEmpty>Provinsi tidak ditemukan</CommandEmpty>

                    <CommandGroup>
                      <CommandItem
                        value=""
                        onSelect={() => handleSelectedProvince("")}
                      >
                        SEMUA PROVINSI
                        {!filterData.province && (
                          <Check className="ml-auto opacity-100" />
                        )}
                      </CommandItem>
                      {dataProvince.map((prov) => (
                        <CommandItem
                          key={prov.prov_id}
                          value={prov.prov_name}
                          onSelect={() => handleSelectedProvince(prov)}
                        >
                          {prov.prov_name}
                          {filterData.province_id === prov.prov_id && (
                            <Check className="ml-auto opacity-100" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* KOTA */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Kabupaten / Kota</Label>
            <Popover open={openCombobox === "city"} onOpenChange={() => handleOpenCombobox("city")}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-11"
                  disabled={!filterData.province}
                >
                  {filterData.city || "Pilih kabupaten / kota"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full min-w-80 p-0">
                <Command>
                  <CommandInput placeholder="Cari kabupaten / kota" className="h-9" />
                  <CommandList>
                    <CommandEmpty>Kota tidak ditemukan</CommandEmpty>
                    <CommandGroup>

                      <CommandItem
                        value=""
                        onSelect={() => handleSelectedCity("")}
                      >
                        SEMUA KOTA
                        {!filterData.city && (
                          <Check className="ml-auto opacity-100" />
                        )}
                      </CommandItem>
                      {dataCity.map((city) => (
                        <CommandItem
                          key={city.city_id}
                          onSelect={() => handleSelectedCity(city)}
                        >
                          {city.city_name}
                          {filterData.city_id === city.city_id && (
                            <Check className="ml-auto opacity-100" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium text-sm">Genre</Label>
            <Popover
              open={openCombobox === "genre"}
              onOpenChange={(open) => setOpenCombobox(open ? "genre" : "")}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-11"
                >
                  {filterData.genre || "Pilih genre"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full min-w-80 p-0">
                <Command className="bg-transparent">
                  <CommandInput placeholder="Cari genre" className="h-9" />
                  <CommandList>
                    <CommandEmpty>Genre Tidak Ditemukan</CommandEmpty>

                    <CommandGroup>
                      <CommandItem
                        value=""
                        onSelect={() => handleSelectedGenre("")}
                      >
                        SEMUA GENRE
                        {!filterData.genre && (
                          <Check className="ml-auto opacity-100" />
                        )}
                      </CommandItem>
                      {dataGenre.map((gen) => (
                        <CommandItem
                          key={gen.id}
                          value={gen.name}
                          onSelect={() => handleSelectedGenre(gen)}
                        >
                          {gen.name}
                          {filterData.genre_id === gen.id && (
                            <Check className="ml-auto h-4 w-4 opacity-100" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>

                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* desktop view */}
      <div className="hidden xl:block w-full bg-white dark:bg-slate-800">
        <DataTable
          columns={columns}
          data={dataPeserta}
          currentPage={currentPage}
          lastPage={lastPage}
          fromPage={fromPage}
          toPage={toPage}
          totalData={totalData}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
      {/* mobile view */}
      {/* MOBILE PAGINATION */}
      {!loadingData && totalData > 0 && (
        <div className="flex items-center justify-between px-4 py-3 
    bg-white dark:bg-slate-800 rounded-lg border mt-4 xl:hidden">

          <span className="text-xs text-gray-500">
            {fromPage}–{toPage} of {totalData}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>

            <span className="px-3 text-xs font-medium">
              {currentPage} / {lastPage}
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === lastPage}
              onClick={handleNextPage}
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      <div className="block xl:hidden space-y-4">
        {!loadingData && dataPeserta?.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-xl p-4 shadow-sm space-y-4"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* STATUS */}
              {item?.music_works?.[0]?.status && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize
            ${item.music_works[0].status === "approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.music_works[0].status === "submitted"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                >
                  {item.music_works[0].status}
                </span>
              )}
            </div>

            {/* DATA UTAMA */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">WhatsApp</span>
                <span>{item.whatsapp || "-"}</span>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 shrink-0">Email</span>
                <span className="text-right break-all">
                  {item.email || "-"}
                </span>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 shrink-0">Alamat</span>
                <span className="text-right break-words max-w-[18ch]">
                  {item.city}, {item.province}
                </span>
              </div>
            </div>

            {/* DETAIL KARYA */}
            <div className="border-t pt-3 space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Detail Karya
              </p>

              {item.music_works?.length ? (
                item.music_works.map((w, idx) => (
                  <div
                    key={w.id}
                    className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 text-xs space-y-1"
                  >
                    <p className="font-medium text-sm">
                      {idx + 1}. {w.title || "-"}
                    </p>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Genre</span>
                      <span>{w.genre || "-"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Invoice</span>
                      <span className="break-all">{w.invoice_id || "-"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment</span>
                      <span>{w.payment_method || "-"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Status</span>
                      <span
                        className={`capitalize px-2 py-0.5 rounded-full
                  ${w.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : w.status === "submitted"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {w.status}
                      </span>
                    </div>

                    {/* RE-GENERATE */}
                    {w.status === "draft" && w.payment_status === "expired" && (
                      <button
                        onClick={() => handleReGenerate(w.composer_id)}
                        className="mt-2 w-full text-xs py-1 rounded-md 
                  bg-sky-600 hover:bg-sky-700 text-white"
                      >
                        Re-generate Karya
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">Tidak ada karya</p>
              )}
            </div>

            {/* ACTION */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() =>
                  navigate(
                    `/admin/daftar-peserta/detail-peserta/${encodeURIComponent(
                      encryptData(item.id, secretKey)
                    )}`
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs
          bg-amber-100 text-amber-800 rounded-lg
          hover:bg-amber-600 hover:text-white"
              >
                <Eye className="w-4 h-4" />
                Detail
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/admin/edit-profile/${encodeURIComponent(
                      encryptData(item.id, secretKey)
                    )}`
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs
          bg-sky-100 text-sky-800 rounded-lg
          hover:bg-sky-600 hover:text-white"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>


    </>
  )
}
