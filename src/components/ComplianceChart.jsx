import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useData } from '../context/DataContext';

const ComplianceChart = () => {
  const { getComplianceStats, categories, measures, assessments } = useData();
  const stats = getComplianceStats();

  // Datos para gráfico de dona
  const donutData = [
    { value: stats.compliant, name: 'Cumple', itemStyle: { color: '#22c55e' } },
    { value: stats.partial, name: 'Parcial', itemStyle: { color: '#f59e0b' } },
    { value: stats.nonCompliant, name: 'No Cumple', itemStyle: { color: '#ef4444' } },
    { value: stats.pending, name: 'Pendiente', itemStyle: { color: '#6b7280' } }
  ];

  // Datos por categoría
  const categoryData = categories.map(category => {
    const categoryMeasures = measures.filter(m => m.categoryId === category.id);
    const categoryAssessments = categoryMeasures.map(m => assessments[m.id]).filter(Boolean);
    
    const compliant = categoryAssessments.filter(a => a.status === 'compliant').length;
    const total = categoryMeasures.length;
    const percentage = total > 0 ? Math.round((compliant / total) * 100) : 0;
    
    return {
      name: category.name.replace('Marco ', '').replace('Medidas de ', ''),
      value: percentage
    };
  });

  const donutOption = {
    title: {
      text: 'Estado General',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      itemGap: 20
    },
    series: [
      {
        name: 'Estado',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: donutData
      }
    ]
  };

  const barOption = {
    title: {
      text: 'Cumplimiento por Categoría',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}%'
    },
    xAxis: {
      type: 'category',
      data: categoryData.map(d => d.name),
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        type: 'bar',
        data: categoryData.map(d => ({
          value: d.value,
          itemStyle: {
            color: d.value >= 80 ? '#22c55e' : d.value >= 60 ? '#f59e0b' : '#ef4444'
          }
        })),
        barWidth: '60%'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ReactECharts option={donutOption} style={{ height: '300px' }} />
        </div>
        <div>
          <ReactECharts option={barOption} style={{ height: '300px' }} />
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success-600">{stats.compliant}</p>
            <p className="text-sm text-gray-600">Cumple</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning-600">{stats.partial}</p>
            <p className="text-sm text-gray-600">Parcial</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-danger-600">{stats.nonCompliant}</p>
            <p className="text-sm text-gray-600">No Cumple</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pendiente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChart;