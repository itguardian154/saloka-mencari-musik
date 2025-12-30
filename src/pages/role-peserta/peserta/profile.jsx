import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  PhoneCall,
  MapPin,
  Cake,
} from "lucide-react"

export default function ProfilePeserta() {
  return (
    <div className="flex w-full max-w-full flex-col gap-6">
      <Card className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage />
              <AvatarFallback className="bg-muted p-1 overflow-hidden">
                <img
                  src="/img/profile.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <h5 class="flex items-center text-center justify-center gap-2 text-lg font-semibold">Antika Lorien</h5>
        </CardHeader>
        <div className="flex flex-col gap-y-4 p-6">
          <div className="flex items-center gap-3 text-sm">
            <PhoneCall className="size-4 text-muted-foreground" />
            <span>085559647683</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <span>antikalorien@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Cake className="size-4 text-muted-foreground" />
            <span>{"< 18 Tahun"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span>Tuntang, Kab. Semarang, Jawa Tengah</span>
          </div>
        </div>
      </Card>
    </div>
  )
}