import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.clear();
    await fetch("/api/logout", { method: "POST" });

    router.push("/login");
  };
  return (
    <CiLogout
      onClick={handleLogout}
      className="w-8 h-8 hover:text-red-500 text-foreground duration-300 cursor-pointer"
    />
  );
}
