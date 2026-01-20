import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
import API_URLS from "../../config"

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi Keluar",
      text: "Apakah kamu yakin ingin keluar dari akun ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-lg",
        confirmButton:
          "bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 ml-3",
      },
    })

    if (!result.isConfirmed) return

    const token = localStorage.getItem("token")

    try {
      if (token) {
        await axios.post(
          `${API_URLS.mencariMusik}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }
    } catch (error) {
      console.error("Logout API error:", error)
    } finally {
      // WAJIB tetap logout frontend
      localStorage.removeItem("token")
      localStorage.removeItem("type_user")
      localStorage.removeItem("last_route")
      localStorage.removeItem("table-column-visibility")

      navigate("/", { replace: true })
    }
  }

  return logout
}
