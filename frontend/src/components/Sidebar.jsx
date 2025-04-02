import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  BsSpeedometer2, 
  BsFileEarmarkText, 
  BsPeople, 
  BsArrowLeftRight, 
  BsExclamationTriangle, 
  BsFileEarmarkBarGraph, 
  BsGear, 
  BsQuestionCircle, 
  BsBoxArrowRight
} from "react-icons/bs";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: <BsSpeedometer2 /> },
    { id: "audits", label: "Audits", icon: <BsFileEarmarkText /> },
    { id: "partners", label: "Partenaires", icon: <BsPeople /> },
    { id: "roaming", label: "Configuration Roaming", icon: <BsArrowLeftRight /> },
    { id: "alerts", label: "Alertes", icon: <BsExclamationTriangle /> },
    { id: "reports", label: "Rapports", icon: <BsFileEarmarkBarGraph /> },
    { id: "settings", label: "Paramètres", icon: <BsGear /> }
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg min-h-screen flex flex-col transition-all duration-300 relative cursor-pointer`}
      onClick={toggleSidebar}
    >

      <div className={`p-5 border-b flex ${isCollapsed ? 'justify-center' : ''}`}>
        {isCollapsed ? (
          <h2 className="text-2xl font-bold text-green-600">AR</h2>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-green-600">Audit Roaming</h2>
            <p className="text-sm text-gray-500 mt-1">Mobilis</p>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {!isCollapsed && (
          <p className="text-xs uppercase text-gray-500 font-medium mb-2 ml-2">MENU PRINCIPAL</p>
        )}
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <Link 
                to={item.id === "dashboard" ? "/" : `/${item.id}`} 
                className={`flex items-center py-2 ${isCollapsed ? 'px-2 justify-center' : 'px-3'} rounded-lg transition-colors ${
                  activeItem === item.id 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveItem(item.id)}
                title={isCollapsed ? item.label : ""}
              >
                <span className={isCollapsed ? "" : "mr-3"}>{item.icon}</span>
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {!isCollapsed && (
          <div className="mt-8">
            <p className="text-xs uppercase text-gray-500 font-medium mb-2 ml-2">ASSISTANCE</p>
            <ul className="space-y-1">
              <li>
                <Link to="/help" className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <BsQuestionCircle className="mr-3" />
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>
        )}
        {isCollapsed && (
          <div className="mt-8 flex justify-center">
            <Link to="/help" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg" title="Centre d'aide">
              <BsQuestionCircle />
            </Link>
          </div>
        )}
      </div>
      
      <div className={`p-4 border-t ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button className={`${isCollapsed ? '' : 'flex items-center w-full'} py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors`} title={isCollapsed ? "Déconnexion" : ""}>
          <BsBoxArrowRight className={isCollapsed ? "" : "mr-3"} />
          {!isCollapsed && "Déconnexion"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;