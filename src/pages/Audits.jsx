import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const { FiPlus, FiSearch, FiFilter, FiEye, FiEdit, FiTrash2, FiCalendar, FiTrendingUp } = FiIcons;

const Audits = () => {
  const { audits } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_progress: { label: 'En Progreso', color: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completada', color: 'bg-green-100 text-green-800' },
      draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelConfig = {
      basic: { label: 'Básico', color: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medio', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Alto', color: 'bg-red-100 text-red-800' }
    };
    
    const config = levelConfig[level] || levelConfig.basic;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Auditorías</h1>
          <p className="text-gray-600">Gestiona las auditorías de cumplimiento ENS</p>
        </div>
        
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Nueva Auditoría</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Buscar auditorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <SafeIcon 
              icon={FiFilter} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todos los estados</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completada</option>
              <option value="draft">Borrador</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAudits.map((audit, index) => (
          <motion.div
            key={audit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{audit.name}</h3>
                  <p className="text-sm text-gray-600">{audit.organization}</p>
                </div>
                {getStatusBadge(audit.status)}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                  <span>
                    {format(new Date(audit.startDate), 'dd MMM yyyy', { locale: es })}
                    {audit.endDate && ` - ${format(new Date(audit.endDate), 'dd MMM yyyy', { locale: es })}`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nivel ENS:</span>
                  {getLevelBadge(audit.level)}
                </div>

                {audit.completionPercentage !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-medium">{audit.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${audit.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  to={`/audits/${audit.id}`}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  <span>Ver detalles</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAudits.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron auditorías
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Prueba a ajustar los filtros de búsqueda'
              : 'Comienza creando tu primera auditoría ENS'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Crear Primera Auditoría
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Audits;