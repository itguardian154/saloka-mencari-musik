import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  PhoneCall,
  MapPin,
  Cake,
} from "lucide-react"
import { useEffect, useState } from "react";
import API_URLS from "../../../../config";
import axios from "axios";

export default function ProfilePeserta({ id }) {

  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  const clearData = () => {
    setDetailPeserta({});
  };

  // Get Peserta by ID Start
  const [detailPeserta, setDetailPeserta] = useState({});

  useEffect(() => {
    const getDetailDataPeserta = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          if (response.data.data != null) {
            setDetailPeserta(response.data.data);
          } else {
            clearData();
          }
        } else {
          clearData();
        }
      } catch (error) {
        clearData();
        console.log(error);
        console.log(
          error?.response?.data?.message ||
          "Error catching data distribusi manajemen stock"
        );
      }
    };

    if (id && detailUser.token) {
      getDetailDataPeserta();
    }
  }, [id, detailUser.token]);
  // Get Peserta by ID End
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
          <h5 class="flex items-center text-center justify-center gap-2 text-lg font-semibold">{detailPeserta.name}</h5>
        </CardHeader>
        <div className="flex flex-col gap-y-4 p-6">
          <div className="flex items-center gap-3 text-sm">
            <PhoneCall className="size-4 text-muted-foreground" />
            <span>{detailPeserta.whatsapp}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <span>{detailPeserta.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Cake className="size-4 text-muted-foreground" />
            <span>{"< 18 Tahun"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span>{detailPeserta.city}{", "}{detailPeserta.province}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}