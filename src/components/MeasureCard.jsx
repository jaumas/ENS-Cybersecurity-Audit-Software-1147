import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiCheck, FiX, FiMinus, FiClock, FiChevronDown, FiChevronUp, FiFileText, FiEdit3, FiExternalLink } = FiIcons;

const MeasureCard = ({ measure }) => {
  const { assessments, updateAssessment, categories } = useData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: 'pending',
    notes: '',
    evidence: []
  });

  const assessment = assessments[measure.id];
  const category = categories.find(c => c.id === measure.categoryId);

  React.useEffect(() => {
    if (assessment) {
      setEditData({
        status: assessment.status || 'pending',
        notes: assessment.notes || '',
        evidence: assessment.evidence || []
      });
    }
  }, [assessment]);

  const getStatusConfig = (status) => {
    const configs = {
      compliant: { 
        label: 'Cumple', 
        icon: FiCheck, 
        color: 'bg-success-50 text-success-700 border-success-200',
        iconColor: 'text-success-600'
      },
      partial: { 
        label: 'Parcial', 
        icon: FiMinus, 
        color: 'bg-warning-50 text-warning-700 border-warning-200',
        iconColor: 'text-warning-600'
      },
      non_compliant: { 
        label: 'No Cumple', 
        icon: FiX, 
        color: 'bg-danger-50 text-danger-700 border-danger-200',
        iconColor: 'text-danger-600'
      },
      not_applicable: { 
        label: 'No Aplica', 
        icon: FiMinus, 
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        iconColor: 'text-gray-600'
      },
      pending: { 
        label: 'Pendiente', 
        icon: FiClock, 
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        iconColor: 'text-gray-400'
      }
    };
    return configs[status] || configs.pending;
  };

  const currentStatus = assessment?.status || 'pending';
  const statusConfig = getStatusConfig(currentStatus);

  const handleSave = () => {
    updateAssessment(measure.id, {
      ...editData,
      reviewedAt: new Date().toISOString(),
      reviewer: 'Usuario Actual'
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (assessment) {
      setEditData({
        status: assessment.status || 'pending',
        notes: assessment.notes || '',
        evidence: assessment.evidence || []
      });
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-medium text-gray-500">{measure.code}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${category?.color || 'bg-gray-500'} text-white`}>
                {category?.code.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {measure.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {measure.description}
            </p>
          </div>

          <div className="flex items-center space-x-3 ml-6">
            <div className={`px-3 py-1 rounded-full border flex items-center space-x-2 ${statusConfig.color}`}>
              <SafeIcon icon={statusConfig.icon} className={`w-4 h-4 ${statusConfig.iconColor}`} />
              <span className="text-sm font-medium">{statusConfig.label}</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={isExpanded ? FiChevronUp : FiChevronDown} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick actions */}
        {!isExpanded && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {assessment?.reviewedAt && (
                <span>Revisado: {new Date(assessment.reviewedAt).toLocaleDateString('es-ES')}</span>
              )}
              {assessment?.evidence?.length > 0 && (
                <span className="flex items-center space-x-1">
                  <SafeIcon icon={FiFileText} className="w-4 h-4" />
                  <span>{assessment.evidence.length} evidencia(s)</span>
                </span>
              )}
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
            >
              <SafeIcon icon={FiEdit3} className="w-4 h-4" />
              <span>Evaluar</span>
            </button>
          </div>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200"
        >
          <div className="p-6 space-y-6">
            {/* Requirements */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Requisitos por Nivel</h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Básico:</span>
                  <p className="text-sm text-gray-600 mt-1">{measure.basicRequirement}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Medio:</span>
                  <p className="text-sm text-blue-600 mt-1">{measure.mediumRequirement}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">Alto:</span>
                  <p className="text-sm text-red-600 mt-1">{measure.highRequirement}</p>
                </div>
              </div>
            </div>

            {/* Assessment form */}
            {isEditing ? (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Evaluación</h4>
                
                {/* Status selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado de Cumplimiento
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { value: 'compliant', label: 'Cumple', icon: FiCheck, color: 'success' },
                      { value: 'partial', label: 'Parcial', icon: FiMinus, color: 'warning' },
                      { value: 'non_compliant', label: 'No Cumple', icon: FiX, color: 'danger' },
                      { value: 'not_applicable', label: 'No Aplica', icon: FiMinus, color: 'gray' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setEditData({ ...editData, status: option.value })}
                        className={`p-3 rounded-lg border-2 transition-colors flex items-center space-x-2 ${
                          editData.status === option.value
                            ? option.color === 'success' ? 'border-success-500 bg-success-50' :
                              option.color === 'warning' ? 'border-warning-500 bg-warning-50' :
                              option.color === 'danger' ? 'border-danger-500 bg-danger-50' :
                              'border-gray-500 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <SafeIcon icon={option.icon} className="w-4 h-4" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas y Comentarios
                  </label>
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Añade comentarios sobre el estado de cumplimiento..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Guardar Evaluación
                  </button>
                </div>
              </div>
            ) : (
              /* Assessment display */
              assessment && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Evaluación Actual</h4>
                  
                  {assessment.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Notas:</span>
                      <p className="text-sm text-gray-600 mt-1">{assessment.notes}</p>
                    </div>
                  )}

                  {assessment.evidence && assessment.evidence.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Evidencias:</span>
                      <div className="mt-2 space-y-2">
                        {assessment.evidence.map((evidence, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <SafeIcon icon={FiFileText} className="w-4 h-4" />
                            <span>{evidence}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {assessment.reviewer && (
                        <span>Revisado por {assessment.reviewer}</span>
                      )}
                      {assessment.reviewedAt && (
                        <span> el {new Date(assessment.reviewedAt).toLocaleDateString('es-ES')}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
              )
            )}

            {/* Guide link */}
            {measure.guideLink && (
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={measure.guideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                >
                  <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                  <span>Ver guía oficial CCN-CERT</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MeasureCard;