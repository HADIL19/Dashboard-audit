function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-5 shadow rounded-lg">
        <h3 className="text-gray-600">Total Audits</h3>
        <p className="text-2xl font-bold">25</p>
      </div>
      <div className="bg-white p-5 shadow rounded-lg">
        <h3 className="text-gray-600">Pending Reviews</h3>
        <p className="text-2xl font-bold">10</p>
      </div>
      <div className="bg-white p-5 shadow rounded-lg">
        <h3 className="text-gray-600">Completed Audits</h3>
        <p className="text-2xl font-bold">15</p>
      </div>
    </div>
  );
}

export default StatsGrid;
