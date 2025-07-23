import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';
import MeasureCard from '../components/MeasureCard';

const { FiArrowLeft, FiDownload, FiEdit, FiFilter, FiSearch, FiCheck, FiX, FiMinus, FiClock } = FiIcons;

const AuditDetail = () => {
  const { id } = useParams();
  const { audits, measures, categories, assessments, getComplianceStats } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const audit = audits.find(a => a.id === id);
  const stats = getComplianceStats();

  if (!audit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Auditoría no encontrada</h2>
        <Link to="/audits" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Volver a auditorías
        </Link>
      </div>
    );
  }

  const filteredMeasures = measures.filter(measure => {
    const matchesCategory = selectedCategory === 'all' || measure.categoryId.toString() === selectedCategory;
    const assessment = assessments[measure.id];
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'pending' && !assessment) ||
      (assessment && assessment.status === selectedStatus);
    const matchesSearch = measure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         measure.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const statusIcons = {
    compliant: { icon: FiCheck, color: 'text-success-600' },
    partial: { icon: FiMinus, color: 'text-warning-600' },
    non_compliant: { icon: FiX, color: 'text-danger-600' },
    pending: { icon: FiClock, color: 'text-gray-400' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/audits"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{audit.name}</h1>
            <p className="text-gray-600">{audit.organization}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiEdit} className="w-4 h-4" />
            <span>Editar</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Cumple', value: stats.compliant, icon: FiCheck, color: 'success' },
          { label: 'Parcial', value: stats.partial, icon: FiMinus, color: 'warning' },
          { label: 'No Cumple', value: stats.nonCompliant, icon: FiX, color: 'danger' },
          { label: 'Pendiente', value: stats.pending, icon: FiClock, color: 'gray' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <SafeIcon 
                icon={stat.icon} 
                className={`w-8 h-8 ${
                  stat.color === 'success' ? 'text-success-600' :
                  stat.color === 'warning' ? 'text-warning-600' :
                  stat.color === 'danger' ? 'text-danger-600' : 'text-gray-400'
                }`} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Buscar medidas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="compliant">Cumple</option>
            <option value="partial">Parcial</option>
            <option value="non_compliant">No Cumple</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>
      </div>

      {/* Measures */}
      <div className="space-y-4">
        {filteredMeasures.map((measure, index) => (
          <motion.div
            key={measure.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MeasureCard measure={measure} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMeasures.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <SafeIcon icon={FiFilter} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron medidas
          </h3>
          <p className="text-gray-600">
            Prueba a ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default AuditDetail;