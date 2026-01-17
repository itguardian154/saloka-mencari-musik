import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import API_URLS from "../../../../config"
import CryptoJS from "crypto-js"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function EditPeserta() {
  const { id } = useParams()
  const secretKey = API_URLS.secretKey

  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
  }

  const decryptID = decryptData(decodeURIComponent(id), secretKey)
  const navigate = useNavigate()

  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  })

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    })
  }, [])

  const [detailPeserta, setDetailPeserta] = useState(null)
  const [valueForm, setValueForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
  })

  const clearData = () => setDetailPeserta(null)

  // GET Peserta by ID
  useEffect(() => {
    if (!id) return
    const token = localStorage.getItem("token")
    if (!token) return

    const getDetailDataPeserta = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers/${decryptID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (response.status === 200 && response.data?.status === true) {
          setDetailPeserta(response.data.data ?? null)
          // Set valueForm dengan data dari API
          setValueForm({
            name: response.data.data?.name || "",
            email: response.data.data?.email || "",
            whatsapp: response.data.data?.whatsapp || "",
          })
        } else {
          clearData()
        }
      } catch (error) {
        clearData()
        console.log("ERROR API:", error)
      }
    }

    getDetailDataPeserta()
  }, [id])

  // HANDLE SUBMIT EDIT
  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `${API_URLS.mencariMusik}/composers/${decryptID}`,
        {
          name: valueForm.name,
          email: valueForm.email,
          whatsapp: valueForm.whatsapp,
        },
        {
          headers: {
            Authorization: `Bearer ${detailUser.token}`,
          },
        }
      )

      if ([200, 201].includes(response.status) && response.data?.status === true) {
        toast.success("Update profile berhasil 🎉")
        setDetailPeserta((prev) => ({ ...prev, ...valueForm }))
        navigate("/admin/daftar-peserta")
      } else {
        toast.error(response.data?.message || "Update profile gagal")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan saat update profile")
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/admin/daftar-peserta")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Edit Profile Peserta</h1>
      </div>

      {/* DATA PESERTA */}
      <Card>
        <CardHeader>
          <CardTitle>Data Akun Peserta</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitEdit}
            className="max-w-full xl:max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-x-9"
          >
            <div className="w-full flex flex-col gap-3">
              <label htmlFor="nama" className="font-medium text-sm text-left">
                Nama Peserta
              </label>
              <Input
                type="text"
                id="nama"
                value={valueForm.name}
                onChange={(e) => setValueForm({ ...valueForm, name: e.target.value })}
                placeholder="Masukkan nama peserta"
                autoComplete="off"
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <label htmlFor="whatsapp" className="font-medium text-sm text-left">
                Whatsapp
              </label>
              <Input
                type="text"
                id="whatsapp"
                value={valueForm.whatsapp}
                onChange={(e) => setValueForm({ ...valueForm, whatsapp: e.target.value })}
                placeholder="Masukkan whatsapp"
                autoComplete="off"
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <label htmlFor="email" className="font-medium text-sm text-left">
                Email
              </label>
              <Input
                type="text"
                id="email"
                value={valueForm.email}
                onChange={(e) => setValueForm({ ...valueForm, email: e.target.value })}
                placeholder="Masukkan email"
                autoComplete="off"
              />
            </div>

            <div className="w-full flex justify-end mt-4 lg:col-span-2 xl:col-span-2 2xl:col-span-3">
              <Button size="lg" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
