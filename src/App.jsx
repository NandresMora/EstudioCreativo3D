import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import SocialProof from './components/SocialProof'
import ProductCatalog from './components/ProductCatalog'

import CustomizationInterface from './components/CustomizationInterface'
import QuoteForm from './components/QuoteForm'
import ContactForm from './components/ContactForm'
import CartDrawer from './components/CartDrawer'
import ProductCarousel from './components/ProductCarousel'
import Footer from './components/Footer'
import { ShoppingBag } from 'lucide-react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)

  // Shopping Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Cart operations
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Find if item with same ID and same customization details already exists
      const existingItemIndex = prevCart.findIndex(
        (i) =>
          i.id === item.id &&
          JSON.stringify(i.details) === JSON.stringify(item.details)
      )

      if (existingItemIndex > -1) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += item.quantity
        return newCart
      }

      return [...prevCart, item]
    })
    setIsCartOpen(true) // Automatically open drawer for confirmation
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setActiveSection('customize')
  }

  const handleNavigate = (section) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCartCheckout = () => {
    // Structure order details for cart checkout
    setOrderDetails({
      isCart: true,
      items: cart,
      totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    })
    setIsCartOpen(false)
    setActiveSection('quote')
  }

  const handleQuickAdd = (product) => {
    // Default configuration for quick catalog adds
    const quickItem = {
      id: `quick-${product.id}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || '📦',
      details: {
        material: product.material === 'Resin' ? 'Resina Ultra Alta-Detalle' : 'PLA Estándar',
        color: 'Negro Mate (Matte Black)',
        colorCode: '#1A1A1A',
        size: 'Mediano (M)',
      },
    }
    addToCart(quickItem)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #161b27 100%)', backgroundAttachment: 'fixed' }}>
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {activeSection === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <Capabilities onNavigate={handleNavigate} />
          <SocialProof />
          <ProductCarousel onProductSelect={handleProductSelect} onQuickAdd={handleQuickAdd} onNavigate={handleNavigate}  />
          
        </>
      )}

      {activeSection === 'catalog' && (
        <ProductCatalog onProductSelect={handleProductSelect} onQuickAdd={handleQuickAdd} />
      )}

      {activeSection === 'customize' && (
        <CustomizationInterface
          product={selectedProduct}
          onNavigate={handleNavigate}
          onSetOrderDetails={setOrderDetails}
          onAddToCart={addToCart}
        />
      )}

      {activeSection === 'quote' && (
        <QuoteForm
          orderDetails={orderDetails}
          onNavigate={handleNavigate}
          clearCart={clearCart}
        />
      )}

      {activeSection === 'contact' && (
        <ContactForm
          onNavigate={handleNavigate}
        />
      )}

      <Footer />

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/5211234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
          title="Contactar por WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </a>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-clay hover:bg-clay-light text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center relative"
          title="Abrir Carrito"
          id="floating-cart-btn"
        >
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-metallic-charcoal text-white text-xs font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-white">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCartCheckout}
      />
    </div>
  )
}

export default App

