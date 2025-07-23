import React, { createContext, useContext, useState, useEffect } from 'react';
import { ensData } from '../data/ensData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [audits, setAudits] = useState([]);
  const [measures, setMeasures] = useState(ensData.measures);
  const [categories, setCategories] = useState(ensData.categories);
  const [assessments, setAssessments] = useState(ensData.assessments);

  useEffect(() => {
    // Initialize demo data
    const demoAudits = [
      {
        id: '1',
        name: 'Auditoría ENS 2024',
        organization: 'Empresa Demo',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'in_progress',
        level: 'medium',
        createdAt: '2024-01-15',
        completionPercentage: 65
      },
      {
        id: '2',
        name: 'Revisión Anual ENS',
        organization: 'Empresa Demo',
        startDate: '2023-10-01',
        endDate: '2023-12-31',
        status: 'completed',
        level: 'basic',
        createdAt: '2023-10-01',
        completionPercentage: 100
      }
    ];
    setAudits(demoAudits);
  }, []);

  const updateAssessment = (measureId, newAssessment) => {
    setAssessments(prev => ({
      ...prev,
      [measureId]: {
        ...prev[measureId],
        ...newAssessment,
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const getComplianceStats = () => {
    const total = measures.length;
    const compliant = Object.values(assessments).filter(a => a.status === 'compliant').length;
    const partial = Object.values(assessments).filter(a => a.status === 'partial').length;
    const nonCompliant = Object.values(assessments).filter(a => a.status === 'non_compliant').length;
    const notApplicable = Object.values(assessments).filter(a => a.status === 'not_applicable').length;
    const pending = total - compliant - partial - nonCompliant - notApplicable;

    return {
      total,
      compliant,
      partial,
      nonCompliant,
      notApplicable,
      pending,
      percentage: Math.round((compliant / (total - notApplicable)) * 100) || 0
    };
  };

  const value = {
    audits,
    measures,
    categories,
    assessments,
    updateAssessment,
    getComplianceStats,
    setAudits
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};