import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const { FiCheck, FiEdit, FiUpload, FiUser } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'assessment',
      icon: FiCheck,
      title: 'Medida org.1 marcada como cumplida',
      user: 'Ana García',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      color: 'text-success-600'
    },
    {
      id: 2,
      type: 'evidence',
      icon: FiUpload,
      title: 'Nueva evidencia subida para org.2',
      user: 'Carlos López',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      color: 'text-primary-600'
    },
    {
      id: 3,
      type: 'update',
      icon: FiEdit,
      title: 'Comentarios actualizados en mp.if.1',
      user: 'María Rodríguez',
      time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      color: 'text-warning-600'
    },
    {
      id: 4,
      type: 'assessment',
      icon: FiCheck,
      title: 'Revisión completada para op.acc.1',
      user: 'Pedro Martín',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      color: 'text-success-600'
    },
    {
      id: 5,
      type: 'evidence',
      icon: FiUpload,
      title: 'Evidencia añadida a mp.if.1',
      user: 'Laura Sánchez',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      color: 'text-primary-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Actividad Reciente
      </h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0`}>
              <SafeIcon icon={activity.icon} className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <SafeIcon icon={FiUser} className="w-3 h-3 mr-1" />
                <span className="mr-2">{activity.user}</span>
                <span>
                  {formatDistanceToNow(activity.time, { 
                    addSuffix: true, 
                    locale: es 
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver toda la actividad
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;