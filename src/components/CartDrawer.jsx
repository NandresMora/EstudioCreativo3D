import React from 'react'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md z-50 shadow-2xl flex flex-col border-l border-white/10" style={{background: '#111827'}}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-clay" />
                <h2 className="text-lg font-bold text-white">Tu Carrito</h2>
                <span className="bg-clay/10 text-clay text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,0.05)'}}>
                    <ShoppingBag className="w-8 h-8 text-white/20" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">El carrito está vacío</h3>
                    <p className="text-sm text-white/40 max-w-[240px]">
                      Explora nuestro catálogo y añade productos para comenzar.
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-4 rounded-2xl border border-white/10 relative group" style={{background: '#0f172a'}}
                  >
                    {/* Visual Indicator (Emoji or Thumbnail) */}
                    <div className="w-16 h-16 rounded-xl border border-white/5 flex items-center justify-center text-3xl overflow-hidden flex-shrink-0" style={{background: '#111827'}}>
                      {typeof item.image === 'string' && (item.image.startsWith('/') || item.image.includes('.') || item.image.startsWith('data:')) ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        item.image || '📦'
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                      {item.details && (
                        <div className="text-[11px] text-white/50 mt-1 space-y-0.5">
                          {item.details.material && (
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold">Material:</span>
                              <span>{item.details.material}</span>
                            </div>
                          )}
                          {item.details.color && (
                            <div className="flex items-center space-x-1.5">
                              <span className="font-semibold">Color:</span>
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                                style={{ backgroundColor: item.details.colorCode }}
                              />
                              <span>{item.details.color}</span>
                            </div>
                          )}
                          {item.details.size && (
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold">Tamaño:</span>
                              <span>{item.details.size}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/10 rounded-lg p-1" style={{background: 'rgba(255,255,255,0.05)'}}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white px-2.5">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <span className="text-[10px] text-white/30 block">
                            ${item.price.toLocaleString()} c/u
                          </span>
                          <span className="font-bold text-clay text-sm">
                            ${(item.price * item.quantity).toLocaleString()} COP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                      title="Eliminar artículo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4" style={{background: '#0f172a'}}>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-white/50">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()} COP</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/50">
                    <span>Envío</span>
                    <span className="text-xs font-medium text-clay">Se calcula al finalizar</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-white/10">
                    <span className="font-bold text-white text-base">Total General</span>
                    <span className="font-bold text-clay text-xl">${subtotal.toLocaleString()} COP</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-clay text-white py-3.5 rounded-xl hover:bg-clay-light transition-all font-bold shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Proceder a Realizar Pedido</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
