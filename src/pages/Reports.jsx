import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';
import ReportGenerator from '../components/ReportGenerator';

const { FiFileText, FiDownload, FiEye, FiCalendar, FiTrendingUp, FiPieChart } = FiIcons;

const Reports = () => {
  const { audits, getComplianceStats } = useData();
  const [selectedAudit, setSelectedAudit] = useState('');
  const stats = getComplianceStats();

  const reportTypes = [
    {
      id: 'compliance',
      name: 'Informe de Cumplimiento',
      description: 'Resumen completo del estado de cumplimiento ENS',
      icon: FiTrendingUp,
      color: 'bg-blue-500',
      format: 'PDF'
    },
    {
      id: 'detailed',
      name: 'Informe Detallado',
      description: 'Análisis exhaustivo de todas las medidas evaluadas',
      icon: FiFileText,
      color: 'bg-green-500',
      format: 'PDF'
    },
    {
      id: 'executive',
      name: 'Resumen Ejecutivo',
      description: 'Resumen de alto nivel para dirección',
      icon: FiPieChart,
      color: 'bg-purple-500',
      format: 'PDF'
    },
    {
      id: 'action_plan',
      name: 'Plan de Acción',
      description: 'Medidas pendientes y plan de mejora',
      icon: FiCalendar,
      color: 'bg-orange-500',
      format: 'PDF'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Informe de Cumplimiento - Enero 2024',
      type: 'compliance',
      generatedAt: '2024-01-30T10:30:00Z',
      size: '2.4 MB',
      audit: 'Auditoría ENS 2024'
    },
    {
      id: 2,
      name: 'Resumen Ejecutivo - Q4 2023',
      type: 'executive',
      generatedAt: '2024-01-15T14:20:00Z',
      size: '1.8 MB',
      audit: 'Revisión Anual ENS'
    },
    {
      id: 3,
      name: 'Plan de Acción - Medidas Pendientes',
      type: 'action_plan',
      generatedAt: '2024-01-10T09:15:00Z',
      size: '1.2 MB',
      audit: 'Auditoría ENS 2024'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Informes</h1>
        <p className="text-gray-600">Genera y gestiona informes de cumplimiento ENS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Cumplimiento Global', value: `${stats.percentage}%`, color: 'text-blue-600' },
          { label: 'Medidas Evaluadas', value: `${stats.compliant + stats.partial + stats.nonCompliant}/${stats.total}`, color: 'text-green-600' },
          { label: 'Requieren Atención', value: stats.partial + stats.nonCompliant, color: 'text-orange-600' },
          { label: 'Informes Generados', value: recentReports.length, color: 'text-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Report Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate New Report */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Generar Nuevo Informe
          </h2>

          {/* Audit Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Auditoría
            </label>
            <select
              value={selectedAudit}
              onChange={(e) => setSelectedAudit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Seleccionar auditoría...</option>
              {audits.map(audit => (
                <option key={audit.id} value={audit.id}>
                  {audit.name} - {audit.organization}
                </option>
              ))}
            </select>
          </div>

          {/* Report Types */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Tipo de Informe</h3>
            {reportTypes.map((type) => (
              <div
                key={type.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center flex-shrink-0`}>
                    <SafeIcon icon={type.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {type.format}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedAudit}
            className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Generar Informe</span>
          </button>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Informes Recientes
          </h2>

          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{report.audit}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(report.generatedAt).toLocaleDateString('es-ES')}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
            Ver todos los informes
          </button>
        </motion.div>
      </div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Plantillas de Informes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Informe Básico ENS',
              description: 'Plantilla estándar de cumplimiento',
              uses: 12,
              lastUsed: '2024-01-30'
            },
            {
              name: 'Informe Ejecutivo',
              description: 'Resumen para alta dirección',
              uses: 8,
              lastUsed: '2024-01-28'
            },
            {
              name: 'Plan de Mejora',
              description: 'Acciones correctivas y preventivas',
              uses: 15,
              lastUsed: '2024-01-25'
            },
            {
              name: 'Análisis de Brechas',
              description: 'Identificación de no conformidades',
              uses: 6,
              lastUsed: '2024-01-20'
            }
          ].map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Usado {template.uses} veces</p>
                <p>Último uso: {new Date(template.lastUsed).toLocaleDateString('es-ES')}</p>
              </div>
              <button className="w-full mt-3 text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">
                Usar Plantilla
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;