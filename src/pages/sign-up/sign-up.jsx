import { mediaBanner } from "@/assets/image/banner";
import { mediaLogo } from "@/assets/image/logo";
import { useEffect, useState } from "react";
import SignUpForm from "./signup-form";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Saloka Mencari Musik";
  });

  const [openDialog, setOpenDialog] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog((prev) => (prev === value ? "" : value));
  };

  return (
    <>
      <section className="w-full min-h-screen h-full bg-gray-50 flex items-center overflow-auto">
        <div className="w-full min-h-screen h-full overflow-auto lg:w-1/2 flex flex-col p-6 md:p-10 lg:h-screen lg:overflow-auto lg:sticky lg:top-0 lg:left-0 bg-white">
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="/"
              className="flex items-center gap-2 font-medium"
            >
              <div className="flex h-auto w-40 items-center justify-center rounded-md">
                <img src={mediaLogo[0]} alt="" />
              </div>
            </a>
          </div>
          <div className="w-full max-w-2xl mx-auto mt-10">
            <SignUpForm
              onClickHandler={() =>
                handleOpenDialog("terms-and-conditions")
              }
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/2 lg:min-h-screen lg:max-h-screen lg:h-full lg:overflow-hidden lg:sticky lg:top-0 lg:left-0">
          <img
            src={mediaBanner[0]}
            alt="Banner Registrasi"
            className="absolute inset-0 h-full w-full object-fill 2xl:object-fill object-center dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </section>
    </>
  );
}
export default SignUpPage