
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutGrid, 
  BarChart3, 
  Trash2, 
  Plus, 
  Sparkles,
  RefreshCw,
  Bookmark
} from 'lucide-react';
import { Product, Category, Status } from './types';
import ShopFloor from './components/ShopFloor';
import Analytics from './components/Analytics';
import TrashBin from './components/TrashBin';
import ProductModal from './components/ProductModal';
import BookedList from './components/BookedList';

const STORAGE_KEY = 'boku_no_shop_data';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'shop' | 'analytics' | 'trash' | 'booked'>('shop');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      // Seed initial data
      const seed: Product[] = [
        {
          id: '1',
          itemName: 'Boku Essential Hoodie',
          category: Category.HOODIE,
          investmentCost: 25,
          sellingPrice: 65,
          stockQuantity: 10,
          status: Status.IN_STOCK,
          isTrash: false,
          createdAt: Date.now()
        },
        {
          id: '2',
          itemName: 'Logo Print Tee',
          category: Category.TSHIRT,
          investmentCost: 12,
          sellingPrice: 35,
          stockQuantity: 5,
          status: Status.BOOKED,
          isTrash: false,
          createdAt: Date.now()
        }
      ];
      setProducts(seed);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id' | 'isTrash' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      isTrash: false,
      createdAt: Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
    setIsModalOpen(false);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setEditingProduct(undefined);
    setIsModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      
      let nextStatus = p.status;
      let nextQuantity = p.stockQuantity;

      if (p.status === Status.BOOKED) {
        nextStatus = Status.DELIVERED;
        nextQuantity = Math.max(0, p.stockQuantity - 1);
        if (nextQuantity === 0) nextStatus = Status.OUT_OF_STOCK;
      } else if (p.status === Status.IN_STOCK) {
        nextStatus = Status.BOOKED;
      } else if (p.status === Status.DELIVERED || p.status === Status.OUT_OF_STOCK) {
        nextStatus = Status.IN_STOCK;
      }

      return { ...p, status: nextStatus, stockQuantity: nextQuantity };
    }));
  };

  const moveToTrash = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isTrash: true } : p));
  };

  const restoreFromTrash = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isTrash: false } : p));
  };

  const permanentDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-black">
            BOKU <span className="text-red-600">NO</span> SHOP
          </h1>
        </div>
        <button 
          onClick={() => { setEditingProduct(undefined); setIsModalOpen(true); }}
          className="bg-black text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg active:scale-95"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'shop' && (
          <ShopFloor 
            products={products.filter(p => !p.isTrash)} 
            onToggleStatus={toggleStatus}
            onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }}
            onDelete={moveToTrash}
          />
        )}
        {activeTab === 'booked' && (
          <BookedList 
            products={products.filter(p => !p.isTrash && p.status === Status.BOOKED)} 
            onToggleStatus={toggleStatus}
          />
        )}
        {activeTab === 'analytics' && (
          <Analytics products={products.filter(p => !p.isTrash)} />
        )}
        {activeTab === 'trash' && (
          <TrashBin 
            products={products.filter(p => p.isTrash)} 
            onRestore={restoreFromTrash}
            onDelete={permanentDelete}
          />
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 flex justify-around items-center py-4 px-6 shadow-[-10px_0px_20px_rgba(0,0,0,0.05)] z-10">
        <button 
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'shop' ? 'text-red-600 scale-110' : 'text-gray-400'}`}
        >
          <LayoutGrid size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Floor</span>
        </button>
        <button 
          onClick={() => setActiveTab('booked')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'booked' ? 'text-red-600 scale-110' : 'text-gray-400'}`}
        >
          <Bookmark size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Booked</span>
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'analytics' ? 'text-red-600 scale-110' : 'text-gray-400'}`}
        >
          <BarChart3 size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Stats</span>
        </button>
        <button 
          onClick={() => setActiveTab('trash')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'trash' ? 'text-red-600 scale-110' : 'text-gray-400'}`}
        >
          <Trash2 size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Trash</span>
        </button>
      </nav>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={editingProduct ? updateProduct : addProduct}
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

export default App;
