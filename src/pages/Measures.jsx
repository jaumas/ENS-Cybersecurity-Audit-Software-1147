import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';
import MeasureCard from '../components/MeasureCard';

const { FiSearch, FiFilter, FiDownload, FiShield } = FiIcons;

const Measures = () => {
  const { measures, categories, assessments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredMeasures = measures.filter(measure => {
    const matchesSearch = measure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         measure.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         measure.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || measure.categoryId.toString() === selectedCategory;
    
    const assessment = assessments[measure.id];
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'pending' && !assessment) ||
      (assessment && assessment.status === selectedStatus);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryStats = () => {
    return categories.map(category => {
      const categoryMeasures = measures.filter(m => m.categoryId === category.id);
      const totalMeasures = categoryMeasures.length;
      const evaluatedMeasures = categoryMeasures.filter(m => assessments[m.id]).length;
      const compliantMeasures = categoryMeasures.filter(m => 
        assessments[m.id]?.status === 'compliant'
      ).length;
      
      return {
        ...category,
        totalMeasures,
        evaluatedMeasures,
        compliantMeasures,
        completionPercentage: totalMeasures > 0 ? Math.round((evaluatedMeasures / totalMeasures) * 100) : 0,
        compliancePercentage: totalMeasures > 0 ? Math.round((compliantMeasures / totalMeasures) * 100) : 0
      };
    });
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medidas ENS</h1>
          <p className="text-gray-600">Gestiona el cumplimiento de las medidas del Esquema Nacional de Seguridad</p>
        </div>
        
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Exportar Evaluaciones</span>
        </button>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryStats.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                <SafeIcon icon={FiShield} className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{category.totalMeasures}</span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Evaluadas</span>
                <span className="font-medium">{category.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.completionPercentage}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Cumplimiento</span>
                <span className="font-medium">{category.compliancePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-success-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.compliancePercentage}%` }}
                />
              </div>
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
              placeholder="Buscar medidas por nombre, código o descripción..."
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
            <option value="not_applicable">No Aplica</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {filteredMeasures.length} de {measures.length} medidas
        </p>
        
        {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpiar filtros
          </button>
        )}
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

export default Measures;