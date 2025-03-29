import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white p-5 shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600">Audit System</h2>
      <ul className="mt-5 space-y-2">
        <li>
          <Link to="/" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;