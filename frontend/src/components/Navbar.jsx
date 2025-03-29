function Navbar() {
  return (
    <div className="bg-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md"
        />
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}

export default Navbar;