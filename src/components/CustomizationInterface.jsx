import React, { useState, useEffect } from 'react'
import { ArrowLeft, Check, Plus, Minus, ShieldCheck, Truck, Sparkles, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

const CustomizationInterface = ({ product, onNavigate, onSetOrderDetails, onAddToCart }) => {
  // Define available filament colors
  const colors = [
    { id: 'black', name: 'Negro Mate (Matte Black)', colorCode: '#1A1A1A', colorType: 'Mate' },
    { id: 'white', name: 'Blanco Ártico (Arctic White)', colorCode: '#F9FAFB', colorType: 'Mate' },
    { id: 'gold', name: 'Oro Seda (Silk Gold)', colorCode: '#D4AF37', colorType: 'Brillante' },
    { id: 'silver', name: 'Plata Satinado (Satin Silver)', colorCode: '#C0C0C0', colorType: 'Satinado' },
    { id: 'ruby', name: 'Rojo Rubí (Ruby Red)', colorCode: '#DC2626', colorType: 'Translúcido' },
    { id: 'cobalt', name: 'Azul Cobalto (Cobalt Blue)', colorCode: '#1D4ED8', colorType: 'Mate' },
  ]

  // Define available materials/filaments
  const materials = [
    { id: 'pla', name: 'PLA Estándar', priceOffset: 0, desc: 'Económico y ecológico', color: '#8B7355' },
    { id: 'resin', name: 'Resina Ultra Alta-Detalle', priceOffset: 5000, desc: 'Superficie lisa y gran nivel estético', color: '#2c2c2e' },
    { id: 'wood', name: 'Wood-Fill (Madera)', priceOffset: 3000, desc: 'Acabado y aroma a madera real', color: '#A0896C' },
    { id: 'titanium', name: 'Titanio Industrial', priceOffset: 25000, desc: 'Máxima resistencia y peso ligero', color: '#7A7A7A' },
  ]

  // Sizing definitions
  const sizes = [
    { id: 's', label: 'Chico (S)', multiplier: 0.8, scale: '75%' },
    { id: 'm', label: 'Mediano (M)', multiplier: 1.0, scale: '100%' },
    { id: 'l', label: 'Grande (L)', multiplier: 1.4, scale: '150%' },
    { id: 'xl', label: 'Gigante (XL)', multiplier: 2.0, scale: '200%' },
  ]

  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[1]) // Default to Medium
  const [quantity, setQuantity] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)
  // Reset carousel index when product changes
  useEffect(() => {
    setActiveIdx(0)
  }, [product])

  // Calculate prices dynamically
  const basePrice = product?.price || 10000
  const subtotalPerUnit = Math.round((basePrice + selectedMaterial.priceOffset) * selectedSize.multiplier)
  const totalPrice = subtotalPerUnit * quantity

  const handleQuantityChange = (type) => {
    if (type === 'inc') {
      setQuantity(prev => prev + 1)
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleCheckout = () => {
    // Save order details to pre-fill the order form
    if (onSetOrderDetails) {
      onSetOrderDetails({
        productName: product.name,
        category: product.category,
        material: selectedMaterial.name,
        color: selectedColor.name,
        colorCode: selectedColor.colorCode,
        size: selectedSize.label,
        quantity: quantity,
        pricePerUnit: subtotalPerUnit,
        totalPrice: totalPrice,
        leadTime: product.leadTime
      })
    }
    // Redirect to Checkout form page
    onNavigate('quote')
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${selectedMaterial.id}-${selectedColor.id}-${selectedSize.id}`,
        name: product.name,
        price: subtotalPerUnit,
        quantity: quantity,
        image: product.images?.[0] || '📦',
        details: {
          material: selectedMaterial.name,
          color: selectedColor.name,
          colorCode: selectedColor.colorCode,
          size: selectedSize.label,
        }
      })
    }
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-clinical-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-metallic-charcoal/60 mb-4">No has seleccionado ningún producto</p>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-metallic-charcoal text-white px-6 py-3 rounded-lg hover:bg-clay transition-colors"
          >
            Explorar Catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-clinical-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center space-x-2 text-metallic-charcoal/60 hover:text-metallic-charcoal transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </button>
        </div>

        {/* Product Customizer Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Premium 2D Product Showcase with Glow and Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-24"
          >
            <div className="aspect-square bg-gradient-to-br from-metallic-charcoal/5 to-clay/5 rounded-3xl border border-metallic-charcoal/10 flex items-center justify-center relative p-8 shadow-inner overflow-hidden">
              
              {/* Soft background lighting glow matching the selected color */}
              <div 
                className="absolute w-72 h-72 rounded-full filter blur-3xl opacity-20 transition-all duration-500" 
                style={{ backgroundColor: selectedColor.colorCode }}
              />
              
              {/* Carousel Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {Array.isArray(product.images) && product.images.length > 0 && (
                  <> 
                    {/* Image */}
                    {(() => {
                      const img = product.images[activeIdx]
                      if (typeof img === 'string' && (img.startsWith('/') || img.includes('.') || img.startsWith('data:'))) {
                        return (
                          <img src={img} alt={product.name} className="max-w-[75%] max-h-[75%] object-contain drop-shadow-2xl transition-transform duration-500" />
                        )
                      }
                      return (
                        <span className="text-9xl drop-shadow-2xl select-none">{img}</span>
                      )
                    })()}
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveIdx((prev) => (prev - 1 + product.images.length) % product.images.length); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white z-20"
                        >
                          <ChevronLeft className="w-5 h-5 text-metallic-charcoal" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveIdx((prev) => (prev + 1) % product.images.length); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white z-20"
                        >
                          <ChevronRight className="w-5 h-5 text-metallic-charcoal" />
                        </button>
                        {/* Dots */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
                          {product.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setActiveIdx(idx) }}
                              className={`w-2 h-2 rounded-full ${idx === activeIdx ? 'bg-metallic-charcoal' : 'bg-metallic-charcoal/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Dynamic Badge indicators */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="glassmorphic px-3.5 py-2 rounded-full text-xs text-metallic-charcoal font-semibold shadow-md flex items-center space-x-2">
                  <span 
                    className="w-3 h-3 rounded-full border border-black/10 transition-colors duration-500" 
                    style={{ backgroundColor: selectedColor.colorCode }} 
                  />
                  <span>{selectedColor.name}</span>
                </div>
                <div className="glassmorphic px-3.5 py-2 rounded-full text-xs text-metallic-charcoal font-semibold shadow-md">
                  Escala: {selectedSize.scale}
                </div>
              </div>
            </div>

            {/* Delivery/Trust badging */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white border border-metallic-charcoal/10 rounded-xl p-4">
                <div className="p-2 bg-clay/10 rounded-lg">
                  <Truck className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-metallic-charcoal">Envío Rápido</h4>
                  <p className="text-[11px] text-metallic-charcoal/60">Listo en {product.leadTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white border border-metallic-charcoal/10 rounded-xl p-4">
                <div className="p-2 bg-clay/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-metallic-charcoal">Garantía de Calidad</h4>
                  <p className="text-[11px] text-metallic-charcoal/60">Filamentos Premium</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Customization Controls & Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Title Block */}
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-clay/10 text-clay px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configurar Producto</span>
              </div>
              <h1 className="text-4xl font-bold text-metallic-charcoal mb-2">
                {product.name}
              </h1>
              <p className="text-metallic-charcoal/70 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 1. Material Selector */}
            <div className="bg-white rounded-2xl border border-metallic-charcoal/10 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-metallic-charcoal uppercase tracking-wider mb-4">
                1. Selección de Material
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-4 rounded-xl border text-left transition-all relative ${
                      selectedMaterial.id === mat.id
                        ? 'border-clay bg-clay/5 ring-1 ring-clay'
                        : 'border-metallic-charcoal/10 hover:border-metallic-charcoal/20 hover:bg-metallic-charcoal/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full border border-black/10"
                        style={{ backgroundColor: mat.color }}
                      />
                      <div>
                        <div className="font-bold text-metallic-charcoal text-xs">
                          {mat.name}
                        </div>
                        <div className="text-[10px] text-metallic-charcoal/50 mt-0.5">
                          {mat.desc}
                        </div>
                      </div>
                    </div>
                    {mat.priceOffset > 0 && (
                      <span className="absolute top-2 right-2 text-[10px] bg-metallic-charcoal/5 text-clay px-1.5 py-0.5 rounded font-bold">
                        +{mat.priceOffset >= 1000 ? `$${mat.priceOffset / 1000}k` : `$${mat.priceOffset}`}
                      </span>
                    )}
                    {selectedMaterial.id === mat.id && (
                      <Check className="w-4 h-4 text-clay absolute bottom-2 right-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Selection */}
            <div className="bg-white rounded-2xl border border-metallic-charcoal/10 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-metallic-charcoal uppercase tracking-wider mb-4">
                2. Color de Filamento / Resina
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {colors.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColor(col)}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-2 transition-all relative ${
                      selectedColor.id === col.id
                        ? 'border-clay bg-clay/5 ring-1 ring-clay'
                        : 'border-metallic-charcoal/10 hover:border-metallic-charcoal/20 hover:bg-metallic-charcoal/5'
                    }`}
                    title={col.name}
                  >
                    <div
                      className="w-7 h-7 rounded-full shadow-inner border border-black/10 relative flex items-center justify-center"
                      style={{ backgroundColor: col.colorCode }}
                    >
                      {selectedColor.id === col.id && (
                        <Check className={`w-4 h-4 ${col.id === 'white' ? 'text-black' : 'text-white'}`} />
                      )}
                    </div>
                    <span className="text-[9px] text-metallic-charcoal/60 mt-1.5 font-medium truncate w-full text-center">
                      {col.id.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Size Selector & Quantity */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Size Selector */}
              <div className="bg-white rounded-2xl border border-metallic-charcoal/10 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-metallic-charcoal uppercase tracking-wider mb-4">
                  3. Tamaño / Escala
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-3 rounded-lg border text-center transition-all ${
                        selectedSize.id === sz.id
                          ? 'border-clay bg-clay/10 text-clay font-bold'
                          : 'border-metallic-charcoal/10 text-metallic-charcoal hover:bg-metallic-charcoal/5 text-xs'
                      }`}
                    >
                      <div className="text-xs">{sz.label}</div>
                      <div className="text-[9px] opacity-75 mt-0.5">Escala: {sz.scale}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-white rounded-2xl border border-metallic-charcoal/10 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-metallic-charcoal uppercase tracking-wider mb-1">
                    Cantidad
                  </h3>
                  <p className="text-[10px] text-metallic-charcoal/50 mb-3">Indica cuántas unidades deseas</p>
                </div>
                <div className="flex items-center justify-between bg-clinical-white border border-metallic-charcoal/10 rounded-xl p-2">
                  <button
                    onClick={() => handleQuantityChange('dec')}
                    className="p-2 bg-white rounded-lg border border-metallic-charcoal/10 hover:bg-metallic-charcoal/5 text-metallic-charcoal transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold text-metallic-charcoal px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('inc')}
                    className="p-2 bg-white rounded-lg border border-metallic-charcoal/10 hover:bg-metallic-charcoal/5 text-metallic-charcoal transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Pricing Receipt Breakdown & Checkout CTA */}
            <div className="bg-metallic-charcoal rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-clay/10 rounded-full filter blur-2xl pointer-events-none" />
              
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
                Resumen del Pedido
              </h3>
              
              <div className="space-y-2 text-sm text-white/80 border-b border-white/10 pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Precio Base del Producto</span>
                  <span>${basePrice.toLocaleString()} COP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Material ({selectedMaterial.name})</span>
                  <span>+{selectedMaterial.priceOffset > 0 ? `$${selectedMaterial.priceOffset.toLocaleString()}` : '$0'} COP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Multiplicador Tamaño ({selectedSize.label})</span>
                  <span>{selectedSize.multiplier}x</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Cantidad</span>
                  <span>{quantity} {quantity === 1 ? 'unidad' : 'unidades'}</span>
                </div>
              </div>

              {/* Final Subtotal & Checkout */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="block text-xs text-white/50">Total del Pedido</span>
                  <span className="text-3xl font-bold text-white">${totalPrice.toLocaleString()} COP</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-white/50">Estimado Envío</span>
                  <span className="text-xs font-semibold text-clay-light">{product.leadTime}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-clay text-white py-4 rounded-xl hover:bg-clay-light transition-all font-bold shadow-lg shadow-black/25 flex items-center justify-center space-x-2 text-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir al Carrito</span>
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 border-2 border-white/20 hover:border-white/50 text-white py-4 rounded-xl hover:bg-white/10 transition-all font-bold flex items-center justify-center space-x-2 text-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Comprar Ahora</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CustomizationInterface
