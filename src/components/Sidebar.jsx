import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiClipboard, FiShield, FiFileText, FiSettings, FiX } = FiIcons;

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/audits', icon: FiClipboard, label: 'Auditorías' },
    { path: '/measures', icon: FiShield, label: 'Medidas ENS' },
    { path: '/reports', icon: FiFileText, label: 'Informes' },
    { path: '/settings', icon: FiSettings, label: 'Configuración' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg lg:shadow-none
          lg:translate-x-0 lg:block
          ${isOpen ? 'block' : 'hidden lg:block'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ENSGuard</span>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            ENSGuard v1.0.0
            <br />
            Sistema de Gestión ENS
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;