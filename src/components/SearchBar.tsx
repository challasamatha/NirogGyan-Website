const SearchBar = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search by name or specialization..."
    className="w-full p-2 border rounded-md mb-4"
  />
)

export default SearchBar
