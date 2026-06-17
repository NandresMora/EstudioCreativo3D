import { useState } from 'react'
import { Menu, X, ArrowRight, ShoppingBag } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = ({ activeSection, onNavigate, cartCount = 0, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Productos' },
    { id: 'quote', label: 'Realizar Pedido' },
    { id: 'contact', label: 'Contacto / Cotizar' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img src={logo} alt="TO.GO 3D" className="w-12 h-8" />
            <span className="text-xl font-bold text-white">TO.GO 3D</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'text-clay border-b-2 border-clay pb-1'
                  : 'text-white/70 hover:text-clay pb-1'
                  }`}
              >
                {item.label}
              </button>
            ))}

            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white/70 hover:text-clay transition-colors hover:bg-white/5 rounded-lg flex items-center justify-center"
              title="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-clay text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('quote')}
              className="flex items-center space-x-2 bg-clay text-white px-4 py-2 rounded-lg hover:bg-clay-light transition-colors"
            >
              <span className="text-sm font-medium">Comprar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white/70 hover:text-clay transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-clay text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-clay p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glassmorphic-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setIsOpen(false)
                }}
                className={`block w-full text-left text-sm font-medium py-2 ${activeSection === item.id
                  ? 'text-clay'
                  : 'text-white/70'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('quote')
                setIsOpen(false)
              }}
              className="w-full bg-clay text-white px-4 py-2 rounded-lg hover:bg-clay-light transition-colors"
            >
              Realizar Pedido
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
