import { ShoppingBag } from 'lucide-react';

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <ShoppingBag className="h-8 w-8 text-white" />
        <h1 className="text-3xl font-bold text-white tracking-wider">OFERTAS</h1>
      </div>
    </div>
  );
}