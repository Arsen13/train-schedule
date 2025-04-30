import CreateModal from "@/components/modals/CreateModal";
import UpdateModal from "@/components/modals/UpdateModal";
import Navbar from "@/components/navbar/Navbar";
import PaginationButtons from "@/components/records/PaginationBtn";
import Records from "@/components/records/Records";
import SearchField from "@/components/searchField/SearchField";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";

export default async function Home({ searchParams }: any) {
  const { showModal } = await searchParams;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl flex items-center gap-6 flex-col mt-20  mx-auto">
        <SearchField />
        <Records />
        <PaginationButtons />
      </div>

      <Link href="/?showModal=create">
        <IoMdAddCircle className="w-14 h-14 fixed bottom-10 right-10 cursor-pointer hover:text-amber-600 duration-500" />
      </Link>

      {showModal == "create" ? (
        <CreateModal />
      ) : (
        showModal == "update" && <UpdateModal />
      )}
    </>
  );
}
