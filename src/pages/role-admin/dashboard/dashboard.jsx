import { Users, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { useParams} from "react-router-dom";
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import axios from "axios";


export default function DashboardSalokaMencariMusik() {
  const { id } = useParams();
  const secretKey = API_URLS.secretKey;
  const [loading, setLoading] = useState(false);
  const [dataMusik, setDataMusik] = useState(null);

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
  
  // Encrypt Route End

    useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const getDataMusik = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URLS.mencariMusik}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data?.status === true) {
        setDataMusik(response.data.data);
      } else {
        setDataMusik(null);
      }
    } catch (error) {
      setDataMusik(null);
      console.log("ERROR API:", error);
    } finally {
      setLoading(false);
    }
  };

  getDataMusik();
}, []);


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
                {dataMusik?.total_composer ?? 0}
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
                {dataMusik?.total_composer_upload ?? 0}
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
                {dataMusik?.total_music_work?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
