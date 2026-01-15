
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Product, Category, Status } from '../types';

interface ProductModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    itemName: initialData?.itemName || '',
    category: initialData?.category || Category.HOODIE,
    investmentCost: initialData?.investmentCost || 0,
    sellingPrice: initialData?.sellingPrice || 0,
    stockQuantity: initialData?.stockQuantity || 0,
    status: initialData?.status || Status.IN_STOCK
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit({ ...initialData, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
        <div className="px-8 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-black uppercase">
              {initialData ? 'Edit Drop' : 'New Drop'}
            </h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Item Name</label>
              <input 
                required
                type="text"
                value={formData.itemName}
                onChange={e => setFormData({ ...formData, itemName: e.target.value })}
                className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none placeholder:text-gray-300"
                placeholder="e.g. Vintage Oversized Hoodie"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none appearance-none"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                  className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none appearance-none"
                >
                  {Object.values(Status).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Cost Per Unit</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                  <input 
                    required
                    type="number"
                    value={formData.investmentCost}
                    onChange={e => setFormData({ ...formData, investmentCost: Number(e.target.value) })}
                    className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl pl-10 pr-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Price Tag</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                  <input 
                    required
                    type="number"
                    value={formData.sellingPrice}
                    onChange={e => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
                    className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl pl-10 pr-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Quantity in Stock</label>
              <input 
                required
                type="number"
                value={formData.stockQuantity}
                onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-red-600 transition-all outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
            >
              <Save size={20} />
              {initialData ? 'Update Inventory' : 'Add to Collection'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
