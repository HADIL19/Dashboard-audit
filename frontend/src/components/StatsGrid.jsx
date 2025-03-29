function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { title: "Total Audits", value: 25 },
        { title: "Pending Reviews", value: 10 },
        { title: "Completed Audits", value: 15 },
      ].map((stat, index) => (
        <div key={index} className="bg-white p-5 shadow rounded-lg">
          <h3 className="text-gray-600">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;