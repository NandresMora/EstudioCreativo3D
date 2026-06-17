import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, BookOpen, Image, Send, CheckCircle2, ArrowLeft, Upload, X } from 'lucide-react'

const ContactForm = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending data to server
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setImagePreview(null)
    setImageFile(null)
    setIsSubmitted(false)
    onNavigate('home')
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-clinical-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-metallic-charcoal/60 hover:text-metallic-charcoal transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Inicio</span>
          </button>
        </div>

        {/* Success screen */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-metallic-charcoal/10 p-8 sm:p-12 shadow-xl text-center space-y-6 max-w-xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-clay/10 flex items-center justify-center mx-auto text-clay">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-metallic-charcoal">¡Cotización Enviada!</h2>
                <p className="text-sm text-metallic-charcoal/70 leading-relaxed">
                  Gracias, <strong>{formData.name}</strong>. Hemos recibido tu solicitud de cotización para el asunto "{formData.subject}". 
                  Analizaremos los detalles y la imagen de referencia y te responderemos al correo <strong>{formData.email}</strong> en menos de 24 horas.
                </p>
              </div>

              {imagePreview && (
                <div className="bg-clinical-white border border-metallic-charcoal/5 rounded-2xl p-4 max-w-xs mx-auto">
                  <span className="text-xs text-metallic-charcoal/50 block mb-2 font-medium">Imagen cargada como referencia:</span>
                  <img src={imagePreview} alt="Referencia" className="max-h-36 rounded-lg object-contain mx-auto shadow-sm" />
                </div>
              )}

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center bg-clay text-white px-8 py-3.5 rounded-xl hover:bg-clay-light transition-all font-bold shadow-md hover:-translate-y-0.5"
              >
                Volver al Inicio
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl border border-metallic-charcoal/10 p-6 sm:p-10 shadow-sm"
            >
              {/* Header */}
              <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-metallic-charcoal mb-2">
                  Solicitar Cotización Especial
                </h1>
                <p className="text-metallic-charcoal/70 text-sm">
                  ¿Tienes una idea específica o un archivo 3D personalizado? Completa este formulario e incluye una imagen para darte una cotización a medida.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-clay" />
                      <span>Nombre Completo *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                      placeholder="Ej. Sofía Rodríguez"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-clay" />
                      <span>Correo Electrónico *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                      placeholder="Ej. sofia@ejemplo.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-clay" />
                    <span>Asunto / Proyecto *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                    placeholder="Ej. Cotización Llaveros corporativos de engranajes"
                  />
                </div>

                {/* Image Upload Field */}
                <div>
                  <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2 flex items-center space-x-1.5">
                    <Image className="w-3.5 h-3.5 text-clay" />
                    <span>Imagen de Referencia *</span>
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={!imagePreview} // Required if no image is currently selected
                  />
                  
                  {imagePreview ? (
                    <div className="relative rounded-2xl border border-clay/30 bg-clay/5 p-4 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white rounded-xl border border-metallic-charcoal/10 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                        <img src={imagePreview} alt="Referencia" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-metallic-charcoal truncate">
                          {imageFile ? imageFile.name : 'Imagen seleccionada'}
                        </p>
                        <p className="text-[10px] text-metallic-charcoal/50">
                          {imageFile ? `${(imageFile.size / 1024).toFixed(1)} KB` : ''}
                        </p>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="mt-1 text-xs text-red-500 hover:text-red-600 font-semibold flex items-center space-x-1"
                        >
                          <X className="w-3 h-3" />
                          <span>Remover imagen</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-metallic-charcoal/20 hover:border-clay/50 rounded-2xl p-6 text-center cursor-pointer hover:bg-clay/5 transition-all group"
                    >
                      <Upload className="w-8 h-8 text-metallic-charcoal/30 group-hover:text-clay transition-colors mx-auto mb-2.5" />
                      <span className="block text-xs font-bold text-metallic-charcoal mb-1">
                        Sube una imagen o haz clic para buscar
                      </span>
                      <span className="block text-[10px] text-metallic-charcoal/50">
                        Soporta formatos JPG, PNG, GIF (Máx. 5MB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Message / Description */}
                <div>
                  <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                    Detalles del Mensaje / Requerimientos de Impresión *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay text-sm transition-colors"
                    placeholder="Describe en detalle tu idea: dimensiones deseadas, material preferido, cantidad de copias y cualquier especificación técnica."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-clay text-white py-4 rounded-xl hover:bg-clay-light transition-all font-bold shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:-translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud de Cotización</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ContactForm
