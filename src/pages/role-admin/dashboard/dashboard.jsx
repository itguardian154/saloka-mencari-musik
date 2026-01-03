import { Users, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  // sementara hardcode (nanti bisa dari API)
  const totalPesertaregristrasi = 128
  const totalPesertaUploadkarya = 100
  const totalKarya = 342

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold m-0">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Peserta */}
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-green-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Jumlah Peserta Regristrasi
              </p>
              <p className="text-2xl font-bold">
                {totalPesertaregristrasi}
              </p>
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Jumlah Peserta Upload Karya
              </p>
              <p className="text-2xl font-bold">
                {totalPesertaUploadkarya}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Karya */}
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Music className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Jumlah Karya
              </p>
              <p className="text-2xl font-bold">
                {totalKarya}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
