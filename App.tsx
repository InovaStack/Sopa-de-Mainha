
import React, { useState, useEffect, useMemo } from 'react';
import { Soup, CartItem, DayOfWeek, CustomerInfo } from './types';
import { WEEKLY_MENU, STORE_PHONE } from './constants';
import Header from './components/Header';
import SoupCard from './components/SoupCard';
import MainhaAI from './components/MainhaAI';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Segunda');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSoup, setSelectedSoup] = useState<Soup | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    neighborhood: '',
    reference: '',
    paymentMethod: 'Pix',
    deliveryTime: 'O mais rápido possível (30-50 min)'
  });

  useEffect(() => {
    const days: DayOfWeek[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const todayIndex = new Date().getDay();
    setSelectedDay(days[todayIndex]);
  }, []);

  const currentMenu = useMemo(() => {
    const dailySoups = WEEKLY_MENU.find(m => m.day === selectedDay)?.soups || [];
    const soupsWithRatings = dailySoups.map(soup => ({
      ...soup,
      rating: userRatings[soup.id] || soup.rating
    }));

    if (activeCategory === 'todos') return soupsWithRatings;
    return soupsWithRatings.filter(s => s.category === activeCategory);
  }, [selectedDay, activeCategory, userRatings]);

  const addToCart = (soup: Soup) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === soup.id);
      if (existing) {
        return prev.map(item => item.id === soup.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...soup, quantity: 1 }];
    });

    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 800);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRateSoup = (id: string, rating: number) => {
    setUserRatings(prev => ({ ...prev, [id]: rating }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleFinalizeOrder = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formatWhatsAppMessage = () => {
    const itemsList = cart.map(item => `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`).join('\n');
    const message = `*🌵 PEDIDO - SOPA DE MAINHA 🌵*
----------------------------
*Cliente:* ${customerInfo.name}
*Endereço:* ${customerInfo.address}
*Bairro:* ${customerInfo.neighborhood}
*Referência:* ${customerInfo.reference || 'Não informada'}
*Pagamento:* ${customerInfo.paymentMethod}
*Entrega:* ${customerInfo.deliveryTime}

*Itens do Pedido:*
${itemsList}

*Total:* R$ ${cartTotal.toFixed(2).replace('.', ',')}
----------------------------
_Pedido feito pelo aplicativo Sopa de Mainha_`;

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${STORE_PHONE}?text=${message}`, '_blank');
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 md:pb-24 px-3 md:px-6">
      <Header />

      <main className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden mb-8 md:mb-12">
        <div className="pt-6 md:pt-12 px-4 md:px-12 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-[#6b3e26] mb-1">O que tem pra hoje?</h2>
          <p className="text-stone-400 text-xs md:text-lg font-medium italic">Achegue-se! escolha o seu prato favorito</p>
        </div>

        <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 mt-6">
          <div className="px-2 md:px-12 py-3">
            <div className="flex overflow-x-auto gap-2 no-scrollbar snap-x snap-mandatory scroll-smooth pb-1">
              {WEEKLY_MENU.map(m => (
                <button
                  key={m.day}
                  onClick={() => {
                    setSelectedDay(m.day);
                    setActiveCategory('todos');
                  }}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-sm font-bold transition-all flex-shrink-0 snap-center border ${
                    selectedDay === m.day 
                    ? 'bg-[#d2691e] text-white border-[#d2691e] shadow-lg shadow-orange-200' 
                    : 'bg-stone-50 text-stone-400 border-transparent hover:border-stone-300'
                  }`}
                >
                  {m.day}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="p-4 md:p-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 md:mb-8 pb-1">
            {['todos', 'sopa', 'caldo', 'creme'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                  ? 'bg-[#6b3e26] text-white border-[#6b3e26]' 
                  : 'bg-stone-50 text-stone-400 border-transparent hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {currentMenu.map(soup => (
              <SoupCard 
                key={soup.id} 
                soup={soup} 
                onAddToCart={addToCart} 
                onViewDetails={setSelectedSoup}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal Ver Detalhes */}
      {selectedSoup && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-t-2xl md:rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300 no-scrollbar">
            <div className="relative h-48 md:h-80">
              <img src={selectedSoup.image} alt={selectedSoup.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedSoup(null)}
                className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold hover:bg-black/60 transition-colors"
              >✕</button>
            </div>
            <div className="p-5 md:p-8">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="min-w-0">
                  <h2 className="text-xl md:text-3xl font-bold text-[#6b3e26] truncate">{selectedSoup.name}</h2>
                  <div className="flex items-center gap-2 mt-1 md:mt-2">
                    <span className="inline-block bg-orange-50 text-[#d2691e] text-[8px] md:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-orange-100">
                      {selectedSoup.category}
                    </span>
                    <div className="flex text-yellow-400 text-xs md:text-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>{star <= (userRatings[selectedSoup.id] || selectedSoup.rating) ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-black text-green-700 whitespace-nowrap ml-2">R$ {selectedSoup.price.toFixed(2)}</p>
              </div>
              
              <p className="text-stone-500 text-xs md:text-base mb-4 md:mb-6 leading-relaxed">{selectedSoup.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                <div>
                  <h4 className="font-bold text-[#6b3e26] mb-2 md:mb-3 text-[10px] md:text-xs uppercase tracking-[0.2em] border-l-4 border-[#d2691e] pl-2 md:pl-3">Ingredientes:</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedSoup.ingredients.map(ing => (
                      <span key={ing} className="bg-stone-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-xs text-stone-600 border border-stone-100">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-stone-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-stone-100">
                  <h4 className="font-bold text-[#6b3e26] mb-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-center">O que achou?</h4>
                  <div className="flex justify-center gap-2 text-2xl md:text-3xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateSoup(selectedSoup.id, star)}
                        className={`transition-transform active:scale-125 ${star <= (userRatings[selectedSoup.id] || selectedSoup.rating) ? 'text-yellow-400' : 'text-stone-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => { addToCart(selectedSoup); setSelectedSoup(null); }}
                className="w-full bg-[#d2691e] hover:bg-[#a0522d] text-white font-bold py-4 md:py-5 rounded-xl md:rounded-2xl transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 text-base md:text-lg transform active:scale-[0.98]"
              >
                🥣 Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#fdf6e3] rounded-2xl md:rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-[#6b3e26] p-4 md:p-6 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold italic">Quase lá! 🌵</h2>
              <p className="text-[9px] md:text-xs opacity-80 uppercase tracking-widest mt-1">Informe onde entregamos</p>
            </div>
            
            <form onSubmit={sendToWhatsApp} className="p-4 md:p-8 space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#6b3e26] uppercase tracking-wider mb-1">Seu Nome</label>
                  <input 
                    required
                    type="text" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#d2691e] focus:outline-none"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#6b3e26] uppercase tracking-wider mb-1">Pagamento</label>
                  <select 
                    value={customerInfo.paymentMethod}
                    onChange={(e) => setCustomerInfo({...customerInfo, paymentMethod: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#d2691e] focus:outline-none appearance-none"
                  >
                    <option>Pix</option>
                    <option>Cartão</option>
                    <option>Dinheiro</option>
                  </select>
                </div>
              </div>

              {/* Novo Campo: Tempo Estimado de Entrega */}
              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex items-center gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-xl">🕒</div>
                <div className="flex-grow">
                  <label className="block text-[10px] font-bold text-[#6b3e26] uppercase tracking-wider mb-0.5">Tempo Estimado</label>
                  <select
                    value={customerInfo.deliveryTime}
                    onChange={(e) => setCustomerInfo({...customerInfo, deliveryTime: e.target.value})}
                    className="w-full bg-transparent font-bold text-[#d2691e] text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option>O mais rápido possível (30-50 min)</option>
                    <option>Para daqui a 1 hora</option>
                    <option>Para daqui a 2 horas</option>
                    <option>Retirar na Loja (15 min)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] md:text-xs font-bold text-[#6b3e26] uppercase tracking-wider mb-1">Endereço Completo</label>
                <input 
                  required
                  type="text" 
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full bg-white border border-stone-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#d2691e] focus:outline-none"
                  placeholder="Rua, número"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#6b3e26] uppercase tracking-wider mb-1">Bairro</label>
                  <input 
                    required
                    type="text" 
                    value={customerInfo.neighborhood}
                    onChange={(e) => setCustomerInfo({...customerInfo, neighborhood: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#d2691e] focus:outline-none"
                    placeholder="Bairro"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-[#6b3e26] uppercase tracking-wider mb-1">Referência</label>
                  <input 
                    type="text" 
                    value={customerInfo.reference}
                    onChange={(e) => setCustomerInfo({...customerInfo, reference: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#d2691e] focus:outline-none"
                    placeholder="Ex: Perto do bar"
                  />
                </div>
              </div>

              <div className="pt-3 md:pt-4 flex gap-2 md:gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 bg-stone-200 text-stone-600 font-bold py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-stone-300 transition-colors text-sm"
                >
                  Voltar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm"
                >
                  Enviar 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Botão de Pedido */}
      {cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[90] bg-green-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl flex items-center gap-3 md:gap-4 font-bold border-4 border-white transition-all hover:scale-105 ${isCartAnimating ? 'animate-bounce scale-110 bg-green-500' : 'animate-in zoom-in-50 duration-300'}`}
        >
          <span className="text-xl md:text-2xl">🛒</span>
          <span className="text-base md:text-lg">Pedido</span>
          <span className="bg-white text-green-700 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black">{cartCount}</span>
        </button>
      )}

      {/* Sacola Mobile */}
      <div className={`fixed inset-0 md:inset-auto md:top-0 md:right-0 md:h-full w-full md:w-[450px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 flex justify-between items-center bg-[#6b3e26] text-white">
            <div>
              <h2 className="text-lg md:text-2xl font-bold">Minha Sacola</h2>
              <p className="text-[9px] md:text-xs opacity-70 uppercase tracking-widest mt-0.5">Sopa de Mainha</p>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="text-2xl md:text-3xl hover:rotate-90 transition-transform p-2">✕</button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-stone-50 space-y-3 md:space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-300">
                <span className="text-6xl md:text-8xl mb-4">🍲</span>
                <p className="text-lg md:text-xl font-bold text-center px-8">Ainda não escolheu seu caldo, coração?</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-stone-100 flex gap-3 md:gap-5">
                  <img src={item.image} className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl object-cover" alt={item.name} />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-xs md:text-sm text-[#6b3e26] mb-0.5 truncate">{item.name}</h4>
                    <span className="text-green-700 font-bold text-xs">R$ {item.price.toFixed(2)}</span>
                    <div className="flex justify-between items-center mt-2 md:mt-3">
                      <div className="flex items-center gap-3 md:gap-4 bg-stone-100 rounded-full px-3 py-1 md:px-4 md:py-1.5">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-[#d2691e] font-black text-sm md:text-lg">-</button>
                        <span className="text-xs md:text-sm font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-[#d2691e] font-black text-sm md:text-lg">+</button>
                      </div>
                      <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-[10px] text-red-400 font-bold">Remover</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="p-5 md:p-8 bg-white border-t border-stone-100">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="font-bold text-stone-400 text-sm md:text-lg uppercase tracking-widest">Total</span>
                <span className="text-2xl md:text-3xl font-black text-[#6b3e26]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <button 
                onClick={handleFinalizeOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold shadow-xl transition-all text-lg md:text-xl flex items-center justify-center gap-2"
              >
                <span>Finalizar Pedido</span>
                <span className="text-xl md:text-2xl">🌵</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <MainhaAI availableSoups={currentMenu} />
      
      <footer className="mt-8 md:mt-12 mb-20 md:mb-0 text-center text-stone-400 text-[9px] md:text-xs uppercase tracking-[0.4em]">
        © 2024 Sopa de Mainha • Feito no Sertão
      </footer>
    </div>
  );
};

export default App;
