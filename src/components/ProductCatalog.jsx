import { useState } from 'react'
import { Filter, Clock, ArrowRight, Box, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { products, getResolvedImage } from '../data/products'

// ProductCard component encapsulates carousel logic for each product
const ProductCard = ({ product, onProductSelect, onQuickAdd }) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const images = product.images || []

  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev + 1) % images.length)
  }

  const handleDotClick = (e, idx) => {
    e.stopPropagation()
    setActiveIdx(idx)
  }

  const renderImage = () => {
    const img = images[activeIdx]
    const resolvedSrc = getResolvedImage(img)
    // If string starts with '/' or contains '.' treat as image src, else assume emoji
    if (typeof resolvedSrc === 'string' && (resolvedSrc.startsWith('/') || resolvedSrc.includes('.') || resolvedSrc.startsWith('data:') || resolvedSrc.startsWith('blob:'))) {
      return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* imagen de fondo desenfocada */}
          <img
            src={resolvedSrc}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ filter: 'blur(16px)', opacity: 0.3 }}
          />
          {/* imagen principal centrada */}
          <img
            src={resolvedSrc}
            alt={product.name}
            loading="lazy" 
            className="relative w-full h-full object-contain p-3 transition-transform duration-500"
          />
        </div>
      )
    }
    return (
      <span className="transform duration-500 select-none text-6xl">{resolvedSrc}</span>
    )
  }

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      className="group rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-all" style={{ background: '#111827' }}
      onClick={() => onProductSelect(product)}
    >
      {/* Carousel */}
      <div className="relative aspect-square rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(139,115,85,0.08))' }}>
        {renderImage()}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(e, idx)}
                  className={`w-2 h-2 rounded-full ${idx === activeIdx ? 'bg-clay' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <div className="text-2xl font-bold text-clay">${product.price}</div>
        </div>
        <p className="text-white/60 mb-4">{product.description}</p>
        <div className="flex items-center space-x-2 text-sm text-white/50 mb-4">
          <Clock className="w-4 h-4" />
          <span>{product.leadTime}</span>
        </div>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white/70 mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
          {product.material.toUpperCase()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onProductSelect(product) }}
            className="flex-1 flex items-center justify-center space-x-1.5 bg-clay text-white py-3 rounded-lg hover:bg-clay-light transition-colors text-sm font-medium"
          >
            <span>Personalizar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickAdd && onQuickAdd(product) }}
            className="p-3 bg-white/5 text-clay hover:bg-clay hover:text-white rounded-lg transition-colors flex items-center justify-center"
            title="Añadir rápido al carrito (Por defecto)"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const ProductCatalog = ({ onProductSelect, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMaterial, setSelectedMaterial] = useState('all')

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'corporativos', label: 'Eventos Corporativos' },
    { id: 'particulares', label: 'Eventos Particulares' },
    { id: 'especiales', label: 'Fechas Especiales' },
  ]

  const materials = [
    { id: 'all', label: 'Todos los Materiales' },
    { id: 'resin', label: 'Resina' },
    { id: 'pla', label: 'PLA' },
    { id: 'titanium', label: 'Titanio' },
    { id: 'wood-fill', label: 'Wood-Fill' },
  ]



  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const materialMatch = selectedMaterial === 'all' || product.material.toLowerCase() === selectedMaterial.toLowerCase()
    return categoryMatch && materialMatch
  })

  return (
    <section className="pt-24 pb-16 min-h-screen" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-lg text-white/60">
            Explora nuestra línea de productos 3D personalizables para tus eventos y fechas especiales
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-white/60 mt-1" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                  ? 'bg-clay text-white'
                  : 'text-white/70 hover:bg-white/10'
                  }`} style={selectedCategory !== category.id ? { background: 'rgba(255,255,255,0.05)' } : {}}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Material Filter */}
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedMaterial === material.id
                  ? 'bg-clay text-white'
                  : 'text-white/70 hover:bg-white/10'
                  }`} style={selectedMaterial !== material.id ? { background: 'rgba(255,255,255,0.05)' } : {}}
              >
                {material.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} onQuickAdd={onQuickAdd} />
          ))}        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Box className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">
              No hay productos que coincidan con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductCatalog
