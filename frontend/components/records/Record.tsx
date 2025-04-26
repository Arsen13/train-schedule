import { RxUpdate } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";

export default function Record() {
  return (
    <div className="flex text-xl items-center justify-between border-b-1 border-emerald-800 text-amber-400 mb-1">
      <p>3</p>
      <p>128</p>
      <p>Ternopil - Lviv</p>
      <p>15:20</p>
      <p>15:35</p>
      <div className="flex gap-2">
        <RxUpdate className="cursor-pointer hover:text-green-500 duration-500" />
        <AiOutlineDelete className="cursor-pointer hover:text-red-500 duration-500" />
      </div>
    </div>
  );
}
