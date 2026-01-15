
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Sparkles, ArrowUpRight, TrendingUp, DollarSign, Wallet } from 'lucide-react';
import { Product, Status, Category } from '../types';
import { getAIAnalysis } from '../services/geminiService';

interface AnalyticsProps {
  products: Product[];
}

const Analytics: React.FC<AnalyticsProps> = ({ products }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // Formulas as requested
  const activeStockValue = products.reduce((sum, p) => sum + p.investmentCost * p.stockQuantity, 0);
  
  const realizedProfit = products
    .filter(p => p.status === Status.DELIVERED)
    .reduce((sum, p) => sum + (p.sellingPrice - p.investmentCost), 0);

  const projectedCash = products
    .filter(p => p.status === Status.BOOKED)
    .reduce((sum, p) => sum + p.sellingPrice, 0);

  const categoryEfficiency = Object.values(Category).map(cat => ({
    name: cat,
    sales: products.filter(p => p.category === cat && p.status === Status.DELIVERED).length,
    revenue: products
      .filter(p => p.category === cat && p.status === Status.DELIVERED)
      .reduce((sum, p) => sum + p.sellingPrice, 0)
  }));

  const chartData = [
    { name: 'Investment', value: activeStockValue },
    { name: 'Realized Profit', value: realizedProfit },
    { name: 'Projected', value: projectedCash }
  ];

  const COLORS = ['#111111', '#DC2626', '#3B82F6'];

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await getAIAnalysis(products);
    setAiReport(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-black uppercase italic">Dashboard</h2>
        <button 
          onClick={handleAIAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-red-500/20 active:scale-95 disabled:opacity-50 transition-all"
        >
          {isAnalyzing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Sparkles size={16} />
          )}
          AI Insights
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black text-white p-5 rounded-3xl space-y-2 shadow-xl">
          <div className="flex justify-between items-start">
            <div className="bg-white/10 p-2 rounded-xl">
              <DollarSign size={16} />
            </div>
            <ArrowUpRight size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Realized Profit</p>
            <p className="text-2xl font-black">${realizedProfit.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl space-y-2 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Projected Cash</p>
            <p className="text-2xl font-black text-blue-600">${projectedCash.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl space-y-2 border border-gray-100 shadow-sm col-span-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-xl text-gray-600">
                <Wallet size={16} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Stock Value</p>
                <p className="text-xl font-black text-gray-900">${activeStockValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Report */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Weekly Performance</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Efficiency by Category */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Efficiency Index</h3>
        <div className="space-y-4">
          {categoryEfficiency.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-4">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-500" 
                  style={{ width: `${(cat.sales / Math.max(...categoryEfficiency.map(c => c.sales || 1))) * 100}%` }}
                ></div>
              </div>
              <div className="min-w-[80px] text-right">
                <p className="text-[10px] font-black uppercase">{cat.name}</p>
                <p className="text-xs font-bold text-gray-500">{cat.sales} sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Report Display */}
      {aiReport && (
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            AI Business Analyst
          </div>
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line prose prose-sm">
            {aiReport}
          </div>
          <button 
            onClick={() => setAiReport(null)}
            className="text-[10px] font-black uppercase text-red-600/50 hover:text-red-600 transition-colors"
          >
            Dismiss Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
