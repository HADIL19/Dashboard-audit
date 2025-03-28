import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white p-5 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600">Audit System</h2>
      <ul className="mt-5">
        <li>
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
