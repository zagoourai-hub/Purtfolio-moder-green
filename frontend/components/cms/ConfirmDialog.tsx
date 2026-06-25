import Swal from "sweetalert2";

interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
}

export const confirmDelete = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmText = "Yes, delete it!",
  cancelText = "Cancel",
}: ConfirmOptions = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7c3aed", // violet-600
    cancelButtonColor: "#27272a",  // zinc-800
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    background: "#09090b",         // zinc-950
    color: "#f4f4f5",              // zinc-100
    customClass: {
      popup: "border border-zinc-800 rounded-2xl",
      confirmButton: "px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:brightness-110",
      cancelButton: "px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-zinc-800",
    },
    buttonsStyling: true,
  });

  return result.isConfirmed;
};
