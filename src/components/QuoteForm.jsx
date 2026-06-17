import React, { useState, useEffect } from 'react'
import { ArrowLeft, Check, ShoppingBag, Truck, MapPin, User, Mail, Phone, Clock, CreditCard, Box, CheckCircle2, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'

const QuoteForm = ({ orderDetails, onNavigate, clearCart }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const defaultProducts = [
    ...products.map(p => ({ id: p.id, name: p.name, basePrice: p.price })),
    { id: 'custom', name: 'Otro producto personalizado (Escribir...)', basePrice: 12000 },
  ]

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    productSelection: products[0]?.id || 'llaveros-personalizados',
    customProductName: '',
    quantity: 1,
    sizeVariant: 'Mediano (M)',
    observations: '',
  })

  // Dynamic calculations for direct orders
  const [selectedProduct, setSelectedProduct] = useState(defaultProducts[0])

  useEffect(() => {
    const prod = defaultProducts.find(p => p.id === formData.productSelection)
    if (prod) {
      setSelectedProduct(prod)
    }
  }, [formData.productSelection])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuantityChange = (val) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, parseInt(val) || 1)
    }))
  }

  const getOrderTotal = () => {
    if (orderDetails) {
      return orderDetails.totalPrice
    }
    return selectedProduct.basePrice * formData.quantity
  }

  const getProductName = () => {
    if (orderDetails) {
      if (orderDetails.isCart) {
        return `Pedido de carrito (${orderDetails.items.reduce((acc, i) => acc + i.quantity, 0)} ítems)`
      }
      return orderDetails.productName
    }
    return formData.productSelection === 'custom'
      ? formData.customProductName || 'Producto Personalizado Especial'
      : selectedProduct.name
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (clearCart && orderDetails?.isCart) {
      clearCart()
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    onNavigate('home')
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-clinical-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate(orderDetails ? (orderDetails.isCart ? 'catalog' : 'customize') : 'home')}
            className="flex items-center space-x-2 text-metallic-charcoal/60 hover:text-metallic-charcoal transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Volver</span>
          </button>
        </div>

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
                <h2 className="text-2xl font-bold text-metallic-charcoal">¡Pedido Confirmado!</h2>
                <p className="text-sm text-metallic-charcoal/70 leading-relaxed">
                  Gracias por tu pedido, <strong>{formData.fullName}</strong>. Hemos recibido tu orden para
                  {" "}<strong>{getProductName()}</strong> con un total estimado de
                  {" "}<strong className="text-clay">${getOrderTotal().toLocaleString()} COP</strong>.
                </p>
                <p className="text-xs text-metallic-charcoal/60">
                  Te contactaremos por correo electrónico (<strong>{formData.email}</strong>) o a tu número
                  (<strong>{formData.phone}</strong>) a la brevedad para definir el medio de pago (Nequi, Transferencia Bancaria) y la fecha de entrega.
                </p>
              </div>

              {/* Order summary card on success */}
              <div className="bg-clinical-white border border-metallic-charcoal/5 rounded-2xl p-4 text-left text-xs space-y-2">
                <span className="font-bold text-metallic-charcoal block mb-1">Detalles de Entrega:</span>
                <div><span className="text-metallic-charcoal/60">Dirección:</span> {formData.address}</div>
                {formData.observations && (
                  <div><span className="text-metallic-charcoal/60">Observaciones:</span> {formData.observations}</div>
                )}
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center bg-clay text-white px-8 py-3.5 rounded-xl hover:bg-clay-light transition-all font-bold shadow-md hover:-translate-y-0.5"
              >
                Volver a Inicio
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-3xl border border-metallic-charcoal/10 p-6 sm:p-8 shadow-sm">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-metallic-charcoal mb-1">
                      Realizar Pedido
                    </h1>
                    <p className="text-metallic-charcoal/60 text-xs">
                      Ingresa tus datos y los detalles del producto para procesar tu orden 3D premium.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* CLIENT INFO */}
                    <div className="border-b border-metallic-charcoal/10 pb-4 mb-4">
                      <h3 className="text-xs font-bold text-clay uppercase tracking-wider mb-4 flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>1. Información del Cliente</span>
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                            Nombre del Cliente *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                            placeholder="Ej. Carlos Mendoza"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                              Correo Electrónico *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                              placeholder="Ej. carlos@correo.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                              Teléfono / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                              placeholder="Ej. +57 301 234 5678"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                            Dirección de Envío *
                          </label>
                          <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                            placeholder="Calle, Número, Ciudad, Barrio"
                          />
                        </div>
                      </div>
                    </div>

                    {/* PRODUCT FORM FIELDS (only editable if orderDetails is not set) */}
                    <div>
                      <h3 className="text-xs font-bold text-clay uppercase tracking-wider mb-4 flex items-center space-x-1.5">
                        <Box className="w-3.5 h-3.5" />
                        <span>2. Detalles del Pedido</span>
                      </h3>

                      {orderDetails ? (
                        <div className="bg-clinical-white rounded-xl p-4 border border-clay/10 text-xs space-y-1 text-metallic-charcoal/70">
                          <p className="font-semibold text-metallic-charcoal text-sm mb-1">
                            {orderDetails.isCart ? 'Productos del Carrito:' : 'Producto Personalizado:'}
                          </p>
                          {orderDetails.isCart ? (
                            <ul className="space-y-1 list-disc list-inside">
                              {orderDetails.items.map((item, idx) => (
                                <li key={idx}>
                                  <strong>{item.name}</strong> x{item.quantity} - {item.details.material} ({item.details.color})
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div>
                              <strong>{orderDetails.productName}</strong> x{orderDetails.quantity}<br />
                              Material: {orderDetails.material}<br />
                              Color: {orderDetails.color}<br />
                              Escala: {orderDetails.size}
                            </div>
                          )}
                          <p className="text-[10px] text-metallic-charcoal/40 pt-2">
                            * Los detalles del producto fueron configurados en el paso anterior y no son modificables aquí.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                              Seleccionar Producto *
                            </label>
                            <select
                              name="productSelection"
                              value={formData.productSelection}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium bg-clinical-white text-sm"
                            >
                              {defaultProducts.map(p => (
                                <option key={p.id} value={p.id}>{p.name} - Desde ${p.basePrice.toLocaleString()} COP</option>
                              ))}
                            </select>
                          </div>

                          {formData.productSelection === 'custom' && (
                            <div>
                              <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                                ¿Qué producto deseas? Escríbelo *
                              </label>
                              <input
                                type="text"
                                name="customProductName"
                                required
                                value={formData.customProductName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                                placeholder="Escribe el nombre del objeto a modelar o imprimir"
                              />
                            </div>
                          )}

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                                Cantidad *
                              </label>
                              <input
                                type="number"
                                name="quantity"
                                min="1"
                                required
                                value={formData.quantity}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                                className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                                Talla / Variante / Color (Si aplica)
                              </label>
                              <input
                                type="text"
                                name="sizeVariant"
                                value={formData.sizeVariant}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay font-medium text-sm transition-colors"
                                placeholder="Ej. Mediano (M) / Color Rojo Mate"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* OBSERVATIONS */}
                    <div>
                      <label className="block text-xs font-semibold text-metallic-charcoal/60 mb-2">
                        Observaciones / Notas Adicionales
                      </label>
                      <textarea
                        name="observations"
                        rows={3}
                        value={formData.observations}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-metallic-charcoal/10 rounded-xl focus:outline-none focus:border-clay text-sm"
                        placeholder="Ej. Preferencias de empaque, detalles del color, o referencias de entrega."
                      />
                    </div>

                    {/* CTAs */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-clay text-white py-3.5 rounded-xl hover:bg-clay-light transition-all font-bold shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm"
                      >
                        <span>Confirmar pedido</span>
                      </button>
                    </div>

                  </form>
                </div>
              </div>

              {/* Sidebar Summary Column */}
              <div className="lg:col-span-5 space-y-6 sticky top-24">
                <div className="bg-metallic-charcoal text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-clay/10 rounded-full filter blur-2xl pointer-events-none" />

                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
                    <ShoppingBag className="w-4 h-4 text-clay" />
                    <span>Resumen de tu Pedido</span>
                  </h3>

                  <div className="border-b border-white/10 pb-4 mb-4 space-y-3">
                    {/* If cart show multiple, else single */}
                    {orderDetails && orderDetails.isCart ? (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {orderDetails.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-xs items-start">
                            <div className="min-w-0 pr-2">
                              <span className="font-semibold block truncate text-white">{item.name}</span>
                              <span className="text-[10px] text-white/50">{item.details.material} | {item.details.size}</span>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="block font-medium">x{item.quantity}</span>
                              <span className="text-[10px] text-clay-light">${(item.price * item.quantity).toLocaleString()} COP</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs space-y-1">
                        <span className="font-semibold block text-sm text-white">{getProductName()}</span>
                        {!orderDetails ? (
                          <>
                            <div className="text-white/60">Cantidad: {formData.quantity} {formData.quantity === 1 ? 'unidad' : 'unidades'}</div>
                            <div className="text-white/60">Variante: {formData.sizeVariant}</div>
                          </>
                        ) : (
                          <>
                            <div className="text-white/60">Cantidad: {orderDetails.quantity}</div>
                            <div className="text-white/60">Variante: {orderDetails.material} ({orderDetails.color})</div>
                            <div className="text-white/60">Tamaño: {orderDetails.size}</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <span className="block text-xs text-white/50">Total Estimado</span>
                      <span className="text-2xl font-bold text-white">${getOrderTotal().toLocaleString()} COP</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] text-white/50 flex items-center space-x-1 justify-end">
                        <Clock className="w-3 h-3 text-clay" />
                        <span>Fabricación</span>
                      </span>
                      <span className="text-xs font-semibold text-clay-light">
                        {orderDetails ? orderDetails.leadTime || '3-5 días' : '1-3 días'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-[10px] text-white/60 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CreditCard className="w-3.5 h-3.5 text-clay flex-shrink-0 mt-0.5" />
                    <span><strong>Nota de Pago:</strong> No solicitamos dinero por adelantado en la web. Al confirmar tu pedido, te contactaremos para acordar Nequi o transferencia bancaria.</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default QuoteForm
