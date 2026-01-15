
import React from 'react';
import { Bookmark, CheckCircle, Package } from 'lucide-react';
import { Product, Status } from '../types';

interface BookedListProps {
  products: Product[];
  onToggleStatus: (id: string) => void;
}

const BookedList: React.FC<BookedListProps> = ({ products, onToggleStatus }) => {
  const totalBookedValue = products.reduce((sum, p) => sum + p.sellingPrice, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-black uppercase italic">Booked Items</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Pending Delivery: ${totalBookedValue.toLocaleString()}
          </p>
        </div>
        <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
          {products.length} ORDERS
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
          <Bookmark size={48} strokeWidth={1} />
          <p className="font-medium">No booked orders right now.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-blue-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {product.itemName}
                  </h3>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue</p>
                      <p className="text-xl font-black text-blue-600">${product.sellingPrice}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">In Stock</p>
                      <div className="flex items-center gap-1.5 text-gray-900">
                        <Package size={14} />
                        <p className="text-lg font-black">{product.stockQuantity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onToggleStatus(product.id)}
                  className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all hover:bg-green-600 active:scale-95 shadow-lg"
                >
                  <CheckCircle size={16} />
                  Deliver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedList;
