import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mediaTermsandConditions } from "@/doc/terms-and-conditions";
import { Checkbox } from "@/components/ui/checkbox";


export function TermsAndConditionsDialog({ openDialog,
  onClose,
  termsAccepted,
  setTermsAccepted, }) {
  return (
    <>
      <Dialog open={openDialog} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Syarat dan Ketentuan</DialogTitle>
            <DialogDescription>
              Syarat dan Ketentuan Saloka Mencari Musik
            </DialogDescription>
          </DialogHeader>
          <section className="w-full max-h-[72vh] overflow-y-auto flex flex-col gap-3 mb-4 px-3">
            {mediaTermsandConditions?.map((item, index) => (
              <div className="w-full flex gap-2" key={index}>
                <span className="text-sm flex-shrink-0">
                  {index + 1}.
                </span>
                <div className="w-full flex-col">
                  <p className="text-sm">{item.text}</p>
                  {item?.data?.map((ket, index) => (
                    <ul
                      className="list-inside list-disc text-sm mt-1"
                      key={index}
                    >
                      <li>{ket?.text}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked === true)
                }
                className="size-4 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <label htmlFor="terms" className="text-sm">
                Saya menyetujui Syarat dan Ketentuan
              </label>
            </div>

            <DialogFooter>
              <Button
                onClick={onClose}
                disabled={!termsAccepted} // 🔥 WAJIB
              >
                Lanjutkan
              </Button>
            </DialogFooter>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
