import { BsBell, BsGear } from 'react-icons/bs';
import { useState } from 'react';
import logoMobilis from '../assets/mobilis-logo.png'; // Assurez-vous d'avoir ce logo dans vos assets

function Navbar() {
  const [notifications] = useState(3);

  return (
    <div className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src={logoMobilis || "https://via.placeholder.com/40"} 
          alt="Mobilis" 
          className="h-8 mr-3" 
        />
        <h1 className="text-xl font-semibold text-gray-800">Système d'Audit Roaming</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border border-gray-300 p-2 rounded-md w-64"
          />
        </div>
        
        <div className="relative">
          <BsBell className="text-gray-600 text-xl cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
        
        <BsGear className="text-gray-600 text-xl cursor-pointer" />
        
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Utilisateur"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2">
            <p className="text-sm font-medium">AdminUser</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;