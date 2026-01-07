import { useEffect } from "react";
import { DaftarAudio } from "./daftar-audio";
import ProfilePeserta from "./profile";
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";

export default function PesertaMain() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);


  const { id } = useParams();
  const secretKey = API_URLS.secretKey;

  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  const decryptID = decryptData(decodeURIComponent(id), secretKey);
  console.log(decryptID);

  return (
    <div className="relative w-full">
      {/* BACKGROUND FULL HEIGHT */}
      <div className="fixed top-0 left-0 w-full h-full flex -z-10">
        <div className="hidden lg:block w-1/4 h-full bg-gradient-to-b bg-muted shadow-inner" />
        <div className="w-full lg:w-3/4 h-full bg-gradient-to-b" />
      </div>

      {/* CONTENT */}
      <div className="relative grid grid-cols-12 gap-0">
        {/* LEFT - Profile */}
        <div className="col-span-12 lg:col-span-3 p-6">
          <ProfilePeserta 
          id={decryptID}/>
        </div>

        {/* RIGHT - Content */}
        <div className="col-span-12 lg:col-span-9 p-8">
          <DaftarAudio 
          id={decryptID}/>
        </div>
      </div>
    </div>

  )
}