import { Input } from "@/components/ui/input";

interface SearchTermProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchInput({ searchTerm, setSearchTerm }: SearchTermProps) {

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded w-full mb-4 max-w-full sm:max-w-[300px]"
    />
  )
}
