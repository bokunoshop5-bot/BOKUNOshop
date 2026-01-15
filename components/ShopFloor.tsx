
import React from 'react';
import { ShoppingBag, ChevronRight, Edit2, Trash2, Package } from 'lucide-react';
import { Product, Status, Category } from '../types';

interface ShopFloorProps {
  products: Product[];
  onToggleStatus: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ShopFloor: React.FC<ShopFloorProps> = ({ products, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-black uppercase italic">Shop Floor</h2>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
          {products.length} ACTIVE ITEMS
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
          <ShoppingBag size={48} strokeWidth={1} />
          <p className="font-medium">No products on the floor.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-red-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {product.itemName}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(product)}
                    className="p-2 text-gray-400 hover:text-black transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Price</p>
                      <p className="text-xl font-black">${product.sellingPrice}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Stock</p>
                      <div className="flex items-center gap-1.5">
                        <Package size={14} className={product.stockQuantity === 0 ? 'text-red-500' : 'text-gray-900'} />
                        <p className={`text-lg font-black ${product.stockQuantity === 0 ? 'text-red-500' : ''}`}>
                          {product.stockQuantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`
                    inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                    ${product.status === Status.DELIVERED ? 'bg-green-100 text-green-700' : 
                      product.status === Status.BOOKED ? 'bg-blue-100 text-blue-700' : 
                      product.status === Status.OUT_OF_STOCK ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {product.status}
                  </div>
                </div>

                <button 
                  onClick={() => onToggleStatus(product.id)}
                  className={`
                    p-4 rounded-xl flex items-center gap-2 font-bold text-sm transition-all active:scale-95
                    ${product.status === Status.BOOKED 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                  `}
                >
                  {product.status === Status.BOOKED ? 'Mark Delivered' : 'Next Stage'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopFloor;
