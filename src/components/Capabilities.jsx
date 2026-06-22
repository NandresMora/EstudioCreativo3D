import { Building2, PartyPopper, CalendarHeart, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Capabilities = ({ onNavigate }) => {
  const capabilities = [
    {
      icon: Building2,
      title: 'Eventos Corporativos',
      description: 'Regalos de marca, llaveros con logotipo en volumen y premios corporativos impresos en 3D con acabados premium.',
      features: ['Llaveros con logotipo', 'Premios y trofeos', 'Regalos de marca en volumen'],
      color: 'metallic-charcoal'
    },
    {
      icon: PartyPopper,
      title: 'Eventos Particulares',
      description: 'Toppers para pasteles de boda, recuerdos de cumpleaños, centros de mesa y figuras personalizadas para tu celebración.',
      features: ['Toppers de pastel', 'Recuerdos de cumpleaños', 'Centros de mesa únicos'],
      color: 'clay'
    },
    {
      icon: CalendarHeart,
      title: 'Fechas Especiales',
      description: 'Adornos navideños con nombres, regalos para el Día de la Madre, San Valentín y todas las fechas que importan.',
      features: ['Adornos navideños', 'Detalles de San Valentín', 'Regalos Día de la Madre'],
      color: 'accent-gold'
    }
  ]

  return (
    <section className="py-24" style={{background: '#111827'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            ¿Para qué ocasión necesitas?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Diseñamos y fabricamos piezas 3D personalizadas para cada tipo de evento.
            Cuéntanos tu idea y la hacemos realidad.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:shadow-xl" style={{background: '#0f172a'}}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-${capability.color}/10 flex items-center justify-center mb-6 group-hover:bg-${capability.color}/20 transition-colors`}>
                <capability.icon className={`w-8 h-8 text-${capability.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {capability.title}
              </h3>
              <p className="text-white/60 mb-6">
                {capability.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {capability.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-white/50">
                    <div className="w-1.5 h-1.5 bg-clay rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center space-x-2 text-clay font-medium group-hover:space-x-3 transition-all"
              >
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center space-x-2 bg-clay text-white px-8 py-4 rounded-lg hover:bg-clay-light transition-colors"
          >
            <span className="font-medium">Solicitar una Cotización Personalizada</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Capabilities
