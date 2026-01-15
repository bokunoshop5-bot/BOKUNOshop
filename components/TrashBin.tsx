
import React from 'react';
import { Trash2, RotateCcw, Ghost } from 'lucide-react';
import { Product } from '../types';

interface TrashBinProps {
  products: Product[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ products, onRestore, onDelete }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-black uppercase italic">Trash Bin</h2>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
          {products.length} ARCHIVED
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
          <Ghost size={48} strokeWidth={1} />
          <p className="font-medium">No items in the trash.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between group">
              <div>
                <h3 className="font-bold text-gray-900">{product.itemName}</h3>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{product.category}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onRestore(product.id)}
                  className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all"
                  title="Restore"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                  title="Permanently Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashBin;
