import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Music, Video, Download } from "lucide-react"
import { useState, useEffect } from "react"
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import axios from "axios";

export default function DetailPeserta() {
  const { id } = useParams();
  const secretKey = API_URLS.secretKey;
  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  const decryptID = decryptData(decodeURIComponent(id), secretKey);
  console.log(decryptID);

  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });


  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  console.log(id);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openAudioIndex, setOpenAudioIndex] = useState(null);
  const [openLyricIndex, setOpenLyricIndex] = useState(null);
  const [openDeskripsiIndex, setOpenDeskripsiIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailPeserta, setDetailPeserta] = useState({});
  const [audio, setAudio] = useState([]);
  const [lyric, setLyric] = useState([]);
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
  const [filterData, setFilterData] = useState({});

  const handleAudioClick = (index) => {
    setOpenAudioIndex(index === openAudioIndex ? null : index);
  };

  const handleLyricClick = (index) => {
    setOpenLyricIndex(index === openLyricIndex ? null : index);
  };

  const handleDeskripsiClick = (index) => {
    setOpenDeskripsiIndex(index === openDeskripsiIndex ? null : index);
  };

  const clearData = () => {
    setDetailPeserta(null);

  }

  // Get Peserta by ID Start


  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const getDetailDataPeserta = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers/${decryptID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data?.status === true) {
          setDetailPeserta(response.data.data ?? null);
        } else {
          clearData();
        }
      } catch (error) {
        clearData();
        console.log("ERROR API:", error);
      }
    };

    getDetailDataPeserta();
  }, [id]);

  // Get Peserta by ID End



  // dummy fallback (kalau user refresh halaman)
  // const peserta = state?.peserta || {
  //     nama: "Mawar",
  //     usia: "25 - 34 Tahun",
  //     email: "mawar@mail.com",
  //     whatsapp: "082142959615",
  //     domisili: "Semarang",
  //     lagu: [
  //         {
  //             judul: "Cinta Tak Direstui",
  //             genre: "Pop",
  //             deskripsi: "Lagu tentang cinta yang terhalang restu Lagu tentang cinta yang terhalang restu Lagu tentang cinta yang terhalang restu Lagu tentang cinta yang terhalang restu Lagu tentang cinta yang terhalang restu Lagu tentang cinta yang terhalang restu",
  //             lirik: "Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam Aku mencintaimu dalam diam",
  //             screenRecord: "/dummy/video.mp4",
  //             fileLagu: "/dummy/audio.mp3",

  //         },
  //         {
  //             judul: "Malam Sunyi",
  //             genre: "Jazz",
  //             deskripsi: "Nuansa malam yang tenang",
  //             lirik: "Di bawah lampu kota...",
  //             screenRecord: "/dummy/video2.mp4",
  //             fileLagu: "/dummy/audio2.mp3",

  //         },
  //     ],
  // }

  const handleDownloadAudio = (url, filename = "lagu") => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  console.log("detailPeserta:", detailPeserta)


  {/* // ===== FILTER DATA KARYA LAGU VALID ===== */ }
  const validMusicWorks =
    detailPeserta?.music_works?.filter((lagu) => {
      const hasTitle = lagu.title?.trim();
      const hasMedia = lagu.audio_link || lagu.work_link;

      return hasTitle && hasMedia;
    }) || [];



  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">
          Detail Peserta
        </h1>
      </div>

      {/* DATA PESERTA */}
      <Card>
        <CardHeader>
          <CardTitle>Data Akun Peserta</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Nama Peserta</p>
            <p className="font-medium break-words whitespace-normal max-w-[15ch] sm:max-w-none">
              {detailPeserta?.name ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Usia</p>
            <p className="font-medium">
              {detailPeserta?.age ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium break-all whitespace-normal max-w-[15ch] sm:max-w-none">
              {detailPeserta?.email ?? "-"}
            </p>
          </div>


          <div>
            <p className="text-muted-foreground">No WhatsApp</p>
            <p className="font-medium">
              {detailPeserta?.whatsapp ?? "-"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-muted-foreground">Alamat</p>
            <p className="font-medium">
              {detailPeserta?.district
                ? `${detailPeserta.district}, ${detailPeserta.city}, ${detailPeserta.province}`
                : "-"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* // ===== RENDER ===== */}
      
        <Card>
          <CardHeader>
            <CardTitle>
              Karya Lagu ({validMusicWorks.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            {validMusicWorks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Belum ada karya lagu yang diunggah.
              </p>
            ) : (
              <div className="space-y-6">
                {validMusicWorks.map((lagu, index) => (
                  <div key={lagu.id} className="space-y-4">

                    {/* JUDUL + STATUS */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-base break-words">
                        {index + 1}. {lagu.title}
                      </h3>

                      <Badge
                        className={`rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap
                  ${lagu.status === "submitted"
                            ? "bg-blue-100 text-blue-700"
                            : lagu.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {lagu.status}
                      </Badge>
                    </div>

                    {/* GENRE */}
                    {lagu.genre && (
                      <Badge className="w-fit bg-green-600 text-white text-xs">
                        {lagu.genre}
                      </Badge>
                    )}

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                      {/* KIRI */}
                      <div className="md:col-span-3 space-y-4 text-sm">

                        {lagu.description && (
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Deskripsi Lagu
                            </p>
                            <p className="whitespace-pre-line break-words line-clamp-2">
                              {lagu.description}
                            </p>
                          </div>
                        )}

                        {lagu.lyrics && (
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Lirik Lagu
                            </p>
                            <p className="whitespace-pre-line break-words line-clamp-3">
                              {lagu.lyrics}
                            </p>
                          </div>
                        )}

                      </div>

                      {/* KANAN */}
                      <div className="flex flex-col items-end gap-2">

                        {/* BUTTON */}
                        <div className="flex gap-2 flex-wrap justify-end">

                          {/* AUDIO */}
                          <Button
                            size="sm"
                            disabled={!lagu.audio_link}
                            onClick={() =>
                              lagu.audio_link &&
                              setOpenAudioIndex(
                                openAudioIndex === index ? null : index
                              )
                            }
                            className="rounded-full text-xs px-2.5 py-1 text-white
                      bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400"
                          >
                            <Music className="h-4 w-4 mr-1" />
                            Musik
                          </Button>

                          {/* VIDEO */}
                          <Button
                            size="sm"
                            disabled={!lagu.work_link}
                            asChild={!!lagu.work_link}
                            className="rounded-full text-xs px-3 py-1 text-white
                      bg-amber-500 hover:bg-amber-500
                      disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {lagu.work_link ? (
                              <a
                                href={lagu.work_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <Video className="h-4 w-4 mr-1" />
                                Video
                              </a>
                            ) : (
                              <span className="flex items-center">
                                <Video className="h-4 w-4 mr-1" />
                                Video
                              </span>
                            )}
                          </Button>
                        </div>

                        {/* AUDIO PLAYER */}
                        {openAudioIndex === index && lagu.audio_link && (
                          <div className="flex items-center gap-2 justify-end">
                            <audio
                              controls
                              controlsList="nodownload"
                              className="max-w-[220px]"
                              src={lagu.audio_link}
                            />
                          </div>
                        )}

                      </div>
                    </div>

                    <Separator />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

  
    </div>
  )
}


