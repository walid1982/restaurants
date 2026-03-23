
// Search bar component for restaurant filtering
// Props:
//   search: current search string
//   setSearch: function to update search string
export default function Search({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {

  return (
    <div className="flex justify-center my-6">
      <div className="form-control w-full max-w-md">
        <div className="input-group">
          <input
            type="text"
            placeholder="Rechercher un restaurant..."
               className="input input-bordered rounded-lg"
                style={{ width: '320px', marginRight: '0.5rem', color: 'black' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-square btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </button>
        </div>
      </div>

    </div>
  )
}


