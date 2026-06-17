import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Clock, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, getResolvedImage } from '../data/products'

// Card component with its own inner image carousel
const ProductCarouselCard = ({ product, onProductSelect, onQuickAdd }) => {
  const [imgIdx, setImgIdx] = useState(0)
  const images = product.images || []

  const handlePrevImg = (e) => {
    e.stopPropagation()
    setImgIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImg = (e) => {
    e.stopPropagation()
    setImgIdx((prev) => (prev + 1) % images.length)
  }

  const renderProductImage = () => {
    const imgPath = images[imgIdx]
    const resolvedSrc = getResolvedImage(imgPath)
    if (typeof resolvedSrc === 'string' && (resolvedSrc.startsWith('/') || resolvedSrc.includes('.') || resolvedSrc.startsWith('data:') || resolvedSrc.startsWith('blob:'))) {
      return (
        <img
          src={resolvedSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      )
    }
    return (
      <span className="transform duration-500 select-none text-7xl">{resolvedSrc}</span>
    )
  }

  return (
    <div className="rounded-3xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 grid md:grid-cols-12 gap-0 p-0" style={{ background: '#111827' }}>

      {/* Product Image Carousel (Left side on Desktop, Top on Mobile) */}
      <div className="md:col-span-6 relative overflow-hidden rounded-none md:rounded-l-3xl min-h-[300px]" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(139,115,85,0.08))' }}>
        <div className="w-full h-full flex items-center justify-center min-h-[300px]">
          {renderProductImage()}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white hover:text-clay transition-all z-10" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImg}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white hover:text-clay transition-all z-10" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(idx); }}
                  className={`w-2 h-2 rounded-full transition-all ${idx === imgIdx ? 'bg-clay w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Details (Right side on Desktop, Bottom on Mobile) */}
      <div className="md:col-span-6 flex flex-col justify-between py-6 pr-6 pl-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-clay bg-clay/10 px-2.5 py-1 rounded-full">
                {product.material}
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                {product.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-white/40 font-semibold uppercase">Precio Base</span>
              <span className="text-2xl font-black text-clay">${product.price.toLocaleString()} COP</span>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 text-xs text-white/50">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-clay" />
              <span>Tiempo de producción: {product.leadTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
              <span className="font-bold text-white">4.9</span>
              <span className="text-white/40">(Opiniones)</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => onProductSelect(product)}
            className="flex-1 flex items-center justify-center space-x-2 bg-clay hover:bg-clay-light text-white py-3.5 px-6 rounded-xl transition-colors font-bold shadow-md text-sm group"
          >
            <span>Personalizar Producto</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onQuickAdd && onQuickAdd(product)}
            className="bg-clay/15 text-clay hover:bg-clay hover:text-white p-3.5 rounded-xl transition-all flex items-center justify-center shadow-sm"
            title="Añadir rápido al carrito (Por defecto)"
          >
            <ShoppingBag className="w-5 h-5 font-bold" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Carousel component that rotates between different products
const ProductCarousel = ({ onProductSelect, onQuickAdd, onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handlePrevProduct = () => {
    setCurrentIdx((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleNextProduct = () => {
    setCurrentIdx((prev) => (prev + 1) % products.length)
  }

  return (
    <section className="py-20 border-b border-white/5" style={{ background: 'linear-gradient(to bottom, #161b27, #111827)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-clay bg-clay/10 px-3 py-1 rounded-full">
            Lo Más Popular
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Productos Destacados
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mt-2">
            Desliza y explora nuestra selección de piezas 3D premium listas para personalizar.
          </p>
        </div>
        
       <div className="flex justify-center mt-8 mb-6">
  <button
    onClick={() => onNavigate('catalog')}
    className="flex items-center space-x-2 text-clay hover:text-clay-light transition-colors font-semibold group"
  >
    <span>Ver todo el catálogo</span>
    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
  </button>
</div>



        {/* Carousel Container */}



        <div className="relative px-2 sm:px-10">



          {/* Main Card with Slide Transition */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCarouselCard
                  product={products[currentIdx]}
                  onProductSelect={onProductSelect}
                  onQuickAdd={onQuickAdd}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left/Right Outer Control Buttons */}

          <button
            onClick={handlePrevProduct}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 w-12 h-12 hover:bg-clay hover:text-white text-white rounded-full flex items-center justify-center shadow-lg border border-white/10 transition-all focus:outline-none z-20" style={{ background: '#1e2d3d' }} title="Producto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextProduct}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 w-12 h-12 hover:bg-clay hover:text-white text-white rounded-full flex items-center justify-center shadow-lg border border-white/10 transition-all focus:outline-none z-20" style={{ background: '#1e2d3d' }} title="Siguiente producto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIdx
                ? 'bg-clay w-6 shadow-sm shadow-clay/20'
                : 'bg-metallic-charcoal/20 hover:bg-metallic-charcoal/40'
                }`}
              title={`Ver producto ${idx + 1}`}
            />
          ))}
        </div>

      </div >
    </section >
  )
}

export default ProductCarousel
