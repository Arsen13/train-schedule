import Navbar from "@/components/navbar/Navbar";
import PaginationButtons from "@/components/records/PaginationBtn";
import Records from "@/components/records/Records";
import SearchField from "@/components/searchField/SearchField";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="max-w-3xl flex items-center gap-6 flex-col mt-20  mx-auto">
        <SearchField />
        <Records />
        <PaginationButtons />
      </div>
    </>
  );
}
