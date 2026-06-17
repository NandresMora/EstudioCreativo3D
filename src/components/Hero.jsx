import { ArrowRight, Gift, Zap, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import portada from '../assets/portada.png'



const Hero = ({ onNavigate }) => {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #0d1117, #161b27, rgba(139,115,85,0.05))' }} />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-metallic-charcoal rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-clay rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <img src={logo} alt="logo" className='w-64 h-44 mx-auto mt-10' />
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Impresión 3D
              <span className="block text-clay">Personalizable</span>
              <span className="block text-3xl lg:text-4xl font-normal text-white/60">
                para tus Eventos y Fechas Especiales
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-xl">
              Convierte tus ideas en productos impresos en 3D de alta calidad: regalos corporativos,
              recuerdos para fiestas privadas y detalles únicos para cada ocasión especial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="group flex items-center justify-center space-x-2 bg-clay text-white px-8 py-4 rounded-lg hover:bg-clay-light transition-all"
              >
                <span className="font-medium">Ver Catálogo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('customize')}
                className="flex items-center justify-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <Gift className="w-5 h-5" />
                <span className="font-medium">Personalizar</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-white/50">Eventos realizados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/50">Personalizable</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">48h</div>
                <div className="text-sm text-white/50">Entrega rápida</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(139,115,85,0.1))' }}>
              <img 
                src={portada} 
                alt="portada" 
                className="w-full  h-full object-cover absolute inset-0"
              />      


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
