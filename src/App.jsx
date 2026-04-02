import React, { useState } from 'react';
import { products } from './api';

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-zinc-900 tracking-tight mb-3">
            iStore
          </h1>
          <p className="text-2xl text-zinc-600 font-light">
            Apple Experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => {
            const newPrice = Math.round(item.price * (1 - item.sale / 100));
            return <ProductCard key={item.id} item={item} newPrice={newPrice} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item, newPrice }) => {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20 ;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    // Oldinga ko'tariladigan to'g'ri effekt
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(20px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl 
                  transition-all duration-300 border-2 cursor-pointer
                  ${item.price > 1000 ? 'border-red-500' : 'border-emerald-500'}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Rasm qismi */}
      <div className="h-72 bg-zinc-50 flex items-center justify-center overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-4/5 h-4/5 rounded-2xl object-contain transition-transform duration-700 group-hover:scale-110 "
        />

        {item.sale > 0 && (
          <div className="absolute top-5 right-5 w-13 text-center bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-2xl shadow-md">
            -{item.sale}%
          </div>
        )}
      </div>

      {/* Kontent */}
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-zinc-900 mb-1 min-h-14 line-clamp-2">
          {item.name}
        </h2>
        
        <p className="text-zinc-500 text-sm mb-6">
          {item.category}
        </p>

        <div className="mb-8">
          {item.sale > 0 ? (
            <div className="flex items-center justify-center gap-3">
              <span className="line-through text-zinc-400 text-lg">
                ${item.price}
              </span>
              <span className="text-3xl font-bold text-zinc-900">
                ${newPrice}
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-zinc-900">
              ${item.price}
            </span>
          )}
        </div>

        <button className="w-[90%] h-10 my-2 bg-zinc-900 hover:bg-black text-white py-4 rounded-2xl font-medium transition-all active:scale-95">
          Sotib olish
        </button>
      </div>
    </div>
  );
};

export default App;