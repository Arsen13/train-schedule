import { CiLogout } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className="flex flex-row mt-2 mx-8 justify-between">
      <p className="text-3xl">Lviv Station</p>
      <div className="flex flex-row items-center gap-3">
        <p className="italic">lviv@gmail.com</p>

        <CiLogout className="w-8 h-8 hover:text-red-500 text-foreground duration-300 cursor-pointer" />
      </div>
    </div>
  );
}
