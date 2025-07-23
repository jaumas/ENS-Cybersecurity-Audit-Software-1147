import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiFileText, FiDownload, FiSettings, FiCheck } = FiIcons;

const ReportGenerator = ({ auditId, onGenerate }) => {
  const { audits, getComplianceStats } = useData();
  const [selectedSections, setSelectedSections] = useState({
    executive_summary: true,
    compliance_overview: true,
    detailed_measures: true,
    recommendations: true,
    appendices: false
  });
  const [reportFormat, setReportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const audit = audits.find(a => a.id === auditId);
  const stats = getComplianceStats();

  const sections = [
    {
      id: 'executive_summary',
      name: 'Resumen Ejecutivo',
      description: 'Resumen de alto nivel para la dirección'
    },
    {
      id: 'compliance_overview',
      name: 'Estado de Cumplimiento',
      description: 'Gráficos y estadísticas generales'
    },
    {
      id: 'detailed_measures',
      name: 'Medidas Detalladas',
      description: 'Análisis completo de cada medida ENS'
    },
    {
      id: 'recommendations',
      name: 'Recomendaciones',
      description: 'Plan de acción y mejoras sugeridas'
    },
    {
      id: 'appendices',
      name: 'Anexos',
      description: 'Documentación adicional y evidencias'
    }
  ];

  const handleSectionToggle = (sectionId) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const reportData = {
      auditId,
      sections: selectedSections,
      format: reportFormat,
      generatedAt: new Date().toISOString(),
      stats
    };

    if (onGenerate) {
      onGenerate(reportData);
    }

    setIsGenerating(false);
  };

  if (!audit) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">Selecciona una auditoría para generar informes</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiFileText} className="w-6 h-6 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Generar Informe: {audit.name}
        </h2>
      </div>

      {/* Report Sections */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700">Secciones del Informe</h3>
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
          >
            <input
              type="checkbox"
              id={section.id}
              checked={selectedSections[section.id]}
              onChange={() => handleSectionToggle(section.id)}
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor={section.id} className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">{section.name}</div>
              <div className="text-sm text-gray-600">{section.description}</div>
            </label>
          </div>
        ))}
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Formato</h3>
        <div className="flex space-x-3">
          {[
            { value: 'pdf', label: 'PDF', icon: FiFileText },
            { value: 'docx', label: 'Word', icon: FiFileText },
            { value: 'html', label: 'HTML', icon: FiFileText }
          ].map((format) => (
            <button
              key={format.value}
              onClick={() => setReportFormat(format.value)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                reportFormat === format.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <SafeIcon icon={format.icon} className="w-4 h-4" />
              <span>{format.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Stats */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Vista Previa del Contenido</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Medidas evaluadas:</span>
            <span className="ml-2 font-medium">{stats.compliant + stats.partial + stats.nonCompliant}</span>
          </div>
          <div>
            <span className="text-gray-600">Cumplimiento:</span>
            <span className="ml-2 font-medium">{stats.percentage}%</span>
          </div>
          <div>
            <span className="text-gray-600">Medidas cumplidas:</span>
            <span className="ml-2 font-medium text-green-600">{stats.compliant}</span>
          </div>
          <div>
            <span className="text-gray-600">Requieren atención:</span>
            <span className="ml-2 font-medium text-orange-600">{stats.partial + stats.nonCompliant}</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || Object.values(selectedSections).every(v => !v)}
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Generando informe...</span>
          </>
        ) : (
          <>
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Generar Informe</span>
          </>
        )}
      </button>

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <div>
              <p className="text-sm font-medium text-blue-900">Generando informe...</p>
              <p className="text-xs text-blue-700">Esto puede tardar unos minutos</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportGenerator;