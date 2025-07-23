import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';
import ComplianceChart from '../components/ComplianceChart';
import StatusCard from '../components/StatusCard';
import RecentActivity from '../components/RecentActivity';

const { FiCheck, FiAlertTriangle, FiX, FiClock, FiTrendingUp, FiShield } = FiIcons;

const Dashboard = () => {
  const { getComplianceStats, audits, measures } = useData();
  const stats = getComplianceStats();

  const statusCards = [
    {
      title: 'Cumplimiento General',
      value: `${stats.percentage}%`,
      icon: FiTrendingUp,
      color: stats.percentage >= 80 ? 'success' : stats.percentage >= 60 ? 'warning' : 'danger',
      change: '+5% vs mes anterior'
    },
    {
      title: 'Medidas Cumplidas',
      value: stats.compliant,
      icon: FiCheck,
      color: 'success',
      change: `${stats.compliant}/${stats.total} medidas`
    },
    {
      title: 'Requieren Atención',
      value: stats.partial + stats.nonCompliant,
      icon: FiAlertTriangle,
      color: 'warning',
      change: `${stats.pending} pendientes`
    },
    {
      title: 'Auditorías Activas',
      value: audits.filter(a => a.status === 'in_progress').length,
      icon: FiShield,
      color: 'primary',
      change: 'En progreso'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen del estado de cumplimiento ENS</p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiClock} className="w-4 h-4" />
          <span>Última actualización: {new Date().toLocaleString('es-ES')}</span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatusCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <ComplianceChart />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* Priority Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Prioritarias
        </h2>
        
        <div className="space-y-3">
          {[
            {
              title: 'Actualizar Procedimientos de Seguridad (org.3)',
              priority: 'Alta',
              dueDate: '2024-02-15',
              status: 'pending'
            },
            {
              title: 'Implementar Autenticación Multifactor (op.acc.2)',
              priority: 'Media',
              dueDate: '2024-02-28',
              status: 'in_progress'
            },
            {
              title: 'Revisar Controles de Acceso Físico (mp.if.1)',
              priority: 'Media',
              dueDate: '2024-03-10',
              status: 'pending'
            }
          ].map((action, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">Vence: {action.dueDate}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${action.priority === 'Alta' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                  }
                `}>
                  {action.priority}
                </span>
                
                <SafeIcon 
                  icon={action.status === 'pending' ? FiClock : FiAlertTriangle} 
                  className={`w-4 h-4 ${
                    action.status === 'pending' ? 'text-gray-400' : 'text-orange-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;