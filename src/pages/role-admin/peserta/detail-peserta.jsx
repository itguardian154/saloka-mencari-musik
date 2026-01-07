import { useLocation, useNavigate } from "react-router-dom"
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
import { useState } from "react"


export default function DetailPeserta() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [openAudioIndex, setOpenAudioIndex] = useState(null);
    const [openLyricIndex, setOpenLyricIndex] = useState(null);
    const [openDeskripsiIndex, setOpenDeskripsiIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [detailpeserta, setDetailPeserta] = useState({});
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
        setPeserta([]);
        setCurrentPage(1);
    }


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
                        <p className="font-medium">{peserta.nama}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Usia</p>
                        <p className="font-medium">{peserta.usia}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">{peserta.email}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">No WhatsApp</p>
                        <p className="font-medium">{peserta.whatsapp}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Alamat</p>
                        <p className="font-medium">{peserta.domisili}</p>
                    </div>
                </CardContent>
            </Card>

            {/* DAFTAR KARYA */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Karya Lagu ({peserta.lagu.length})
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {peserta.lagu.map((lagu, index) => (
                        <div key={index} className="space-y-4">

                            {/* JUDUL */}
                            <h3 className="font-semibold text-base">
                                {lagu.judul}
                            </h3>
                            <div className="flex gap-2 mt-1">
                                <Badge v
                                    ariant="secondary"
                                    className="bg-green-600">
                                    {lagu.genre}
                                </Badge>
                            </div>

                            {/* GRID UTAMA */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                {/* KIRI: DESKRIPSI + LIRIK */}
                                <div className="md:col-span-3 text-sm space-y-3">
                                    <div className="text-sm">
                                        <p className="text-muted-foreground mb-1">
                                            Deskripsi Lagu
                                        </p>

                                        <p
                                            className={`whitespace-pre-line break-words max-w-[80ch] ${openDeskripsiIndex === index ? "" : "line-clamp-2"
                                                }`}
                                        >
                                            {lagu.deskripsi}
                                        </p>


                                        {lagu.deskripsi.length > 200 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenDeskripsiIndex(
                                                        openDeskripsiIndex === index ? null : index
                                                    )
                                                }
                                                className="mt-1 text-sm font-medium text-[#169870] hover:underline"
                                            >
                                                {openDeskripsiIndex === index
                                                    ? "hide"
                                                    : "show more"}
                                            </button>
                                        )}
                                    </div>



                                    <div className="text-sm">
                                        <p className="text-muted-foreground mb-1">
                                            Lirik Lagu
                                        </p>

                                        <p
                                            className={`whitespace-pre-line break-words max-w-[80ch] ${openLyricIndex === index ? "" : "line-clamp-3"
                                                }`}
                                        >
                                            {lagu.lirik}
                                        </p>


                                        {lagu.lirik.length > 200 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenLyricIndex(
                                                        openLyricIndex === index ? null : index
                                                    )
                                                }
                                                className="mt-1 text-sm font-medium text-[#169870] hover:underline"
                                            >
                                                {openLyricIndex === index
                                                    ? "hide"
                                                    : "show more"}
                                            </button>
                                        )}
                                    </div>

                                </div>

                                {/* KANAN: BUTTON + AUDIO */}
                                <div className="flex flex-col gap-2">

                                    {/* BARIS BUTTON */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-fit flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full font-medium text-sm text-white whitespace-nowrap"
                                            size="sm"
                                            onClick={() =>
                                                setOpenAudioIndex(
                                                    openAudioIndex === index ? null : index
                                                )
                                            }
                                        >
                                            <Music className="h-4 w-4" />
                                            Musik
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-fit flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-500 rounded-full font-medium text-sm text-white whitespace-nowrap"
                                            size="sm"
                                            asChild
                                        >
                                            <a
                                                href={lagu.screenRecord}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Video className="h-4 w-4" />
                                                Video
                                            </a>
                                        </Button>
                                    </div>

                                    {/* AUDIO PLAYER (SEJAJAR KOLOM KANAN) */}
                                    {openAudioIndex === index && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <audio
                                                controls
                                                controlsList="nodownload"
                                                className="max-w-[200px]"
                                                src={lagu.fileLagu}
                                            />

                                            <button
                                                onClick={() =>
                                                    handleDownloadAudio(
                                                        lagu.fileLagu,
                                                        `${lagu.judulLagu}.mp3`
                                                    )
                                                }
                                                className="w-10 h-10
                                                flex items-center justify-center
                                                bg-[#169870]
                                                text-white
                                                rounded-full
                                                hover:bg-[#127a5a]
                                                transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}


                                </div>
                            </div>

                            <Separator />
                        </div>
                    ))}


                </CardContent>
            </Card>
        </div>
    )
}
