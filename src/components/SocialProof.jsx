import { Quote, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const SocialProof = () => {
  const testimonials = [
    {
      name: ' Roberto Sánchez',
      role: 'Director de Innovación',
      company: ' JyR Asociados',
      content: 'El nivel de detalle en los llaveros personalizados es increíble. Totalmente recomendados.',
      rating: 5
    },
    {
      name: 'Mariana López',
      role: 'Organizadora',
      company: 'eSports Summit',
      content: 'Imprimimos trofeos personalizados en PLA para nuestro evento anual. La calidad fue constante en cada pieza y la entrega se realizó antes de la fecha acordada. Un servicio impecable.',
      rating: 5
    },
    {
      name: 'Arq. Fernando Ríos',
      role: 'Socio Fundador',
      company: 'Ríos & Asociados',
      content: 'Como recordatorios para nuestros clientes, necesitamos piezas únicas. To go 3D nos ha ayudado a sorprender a nuestros clientes en cada presentación.',
      rating: 5
    }
  ]

  const partners = [
    { name: 'MedTech Latam', color: 'metallic-charcoal' },
    { name: 'eSports Summit', color: 'clay' },
    { name: 'Ríos & Asociados', color: 'accent-gold' },
    { name: 'Automotriz Nova', color: 'metallic-charcoal' },
    { name: 'TechRobotics', color: 'clay' },
  ]

  return (
    <section className="py-24" style={{background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(139,115,85,0.05))', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-center text-sm font-medium text-white/40 mb-8 uppercase tracking-wider">
            Con la confianza de líderes del sector
          </p>
          
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl p-8 border border-white/10 hover:shadow-lg transition-shadow" style={{background: '#111827'}}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-clay/20 mb-4" />

              {/* Content */}
              <p className="text-white/70 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>

              {/* Author */}
              <div>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-white/50">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
