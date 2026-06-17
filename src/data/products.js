// Importa todas las imágenes automáticamente
const allImages = import.meta.glob(
  '../assets/products/**/*.{avif,jpg,jpeg,png,webp}',
  { eager: true }
)

// Obtiene imágenes de una carpeta específica ordenadas
const getImagesByFolder = (folder) =>
  Object.entries(allImages)
    .filter(([path]) => path.includes(`/products/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default)

// Compatible con el código existente
export const getResolvedImage = (img) => {
  if (!img) return '📦'
  return img
}

export const getResolvedImages = (product) => {
  return product.images || []
}

export const products = [
  {
    id: 'toppers-cualquier-evento',
    name: 'Toppers - Cualquier evento',
    description: 'Toppers personalizados para pasteles y decoración en bodas, cumpleaños y eventos especiales.',
    price: 15000,
    category: 'particulares',
    material: 'Resin',
    leadTime: '2-4 días',
    images: getImagesByFolder('toppers-pastel'),
  },
  {
    id: 'llaveros-qr-invitacion',
    name: 'Llaveros - QR, invitación',
    description: 'Llaveros premium con código QR grabado o detalles de invitación para control de acceso y marcas.',
    price: 10000,
    category: 'corporativos',
    material: 'PLA',
    leadTime: '1-2 días',
    images: getImagesByFolder('llaveros-qr-invitacion'),
  },
  {
    id: 'soportes-escritorio',
    name: 'Soportes de Escritorio',
    description: 'Soportes ergonómicos de celular y laptop impresos en 3D con alta resistencia y diseño moderno.',
    price: 25000,
    category: 'corporativos',
    material: 'PLA',
    leadTime: '3-5 días',
    images: getImagesByFolder('soportes-escritorio'),
  },
  {
    id: 'trofeos-reconocimientos',
    name: 'Trofeos y Reconocimientos',
    description: 'Trofeos corporativos y deportivos a medida. Diseños exclusivos con resinas y acabados metalizados.',
    price: 35000,
    category: 'corporativos',
    material: 'Resin',
    leadTime: '4-6 días',
    images: getImagesByFolder('trofeos-reconocimientos'),
  },
  {
    id: 'posavasos-personalizados',
    name: 'Posavasos Personalizados',
    description: 'Posavasos con texturas geométricas y logotipos corporativos. Filamento de madera y acabados únicos.',
    price: 12000,
    category: 'particulares',
    material: 'Wood-Fill',
    leadTime: '2-3 días',
    images: getImagesByFolder('posavasos-personalizados'),
  },
  {
    id: 'identificadores-mesa',
    name: 'Identificadores de Mesa',
    description: 'Señaladores de mesa con nombres o números calados en 3D. Ideales para bodas y banquetes elegantes.',
    price: 8000,
    category: 'particulares',
    material: 'PLA',
    leadTime: '2-3 días',
    images: getImagesByFolder('identificadores-mesa'),
  },
  {
    id: 'macetas-decorativas',
    name: 'Macetas Decorativas',
    description: 'Macetas de diseño facetado y formas orgánicas para interiores. Material ecológico resistente al agua.',
    price: 18000,
    category: 'particulares',
    material: 'PLA',
    leadTime: '3-5 días',
    images: getImagesByFolder('macetas-decorativas'),
  },
  {
    id: 'cajas-recuerdos',
    name: 'Cajas de Recuerdos',
    description: 'Cajas ornamentales con tapas personalizadas y texturas en relieve para detalles y recordatorios.',
    price: 30000,
    category: 'particulares',
    material: 'Wood-Fill',
    leadTime: '4-6 días',
    images: getImagesByFolder('cajas-recuerdos'),
  },
  {
    id: 'lamparas-luminarias',
    name: 'Lámparas y Luminarias',
    description: 'Luminarias de luz difusa con patrones geométricos impresas en resina translúcida y materiales premium.',
    price: 45000,
    category: 'especiales',
    material: 'Resin',
    leadTime: '5-7 días',
    images: getImagesByFolder('lamparas-luminarias'),
  },
  {
    id: 'figuras-escritorio',
    name: 'Figuras de Escritorio',
    description: 'Figuras decorativas para escritorio con diseños personalizados.',
    price: 10000,
    category: 'particulares',
    material: 'PLA',
    leadTime: '2-3 días',
    images: getImagesByFolder('figuras-escritorio'),
  },
  {
    id: 'soportes-mesa',
    name: 'Soportes de Mesa',
    description: 'Soportes para celular y laptop impresos en 3D con alta resistencia y diseño moderno.',
    price: 10000,
    category: 'corporativos', 
    material: 'PLA',
    leadTime: '2-3 días',
    images: getImagesByFolder('soportes-mesa'),
  },
  {
    id: 'pins-broches',
    name: 'Pins y Broches',
    description: 'Pines de solapa personalizados y broches temáticos impresos en resina de alta definición con detalles pintados.',
    price: 5000,
    category: 'especiales',
    material: 'Resin',
    leadTime: '2-3 días',
    images: getImagesByFolder('pins-broches'),
  },
  {
    id: 'imanes-promocionales',
    name: 'Imanes Promocionales',
    description: 'Imanes decorativos y promocionales para nevera y pizarras magnéticas con relieves personalizados.',
    price: 3000,
    category: 'corporativos',
    material: 'PLA',
    leadTime: '2-4 días',
    images: getImagesByFolder('llaveros-qr-invitacion'), // reutiliza mientras no haya imágenes propias
  },
  {
    id: 'senalizacion-eventos',
    name: 'Señalización de Eventos',
    description: 'Letreros direccionales, flechas e indicadores para bodas, ferias corporativas y eventos al aire libre.',
    price: 15000,
    category: 'corporativos',
    material: 'PLA',
    leadTime: '3-5 días',
    images: getImagesByFolder('senalizacion-eventos'),
  },
  {
    id: 'pisapapeles-sellos',
    name: 'Pisapapeles y Sellos',
    description: 'Pisapapeles pesados con geometrías complejas y sellos personalizados para lacre o tinta en resina premium.',
    price: 18000,
    category: 'corporativos',
    material: 'Resin',
    leadTime: '3-5 días',
    images: getImagesByFolder('pisapapeles-sellos'),
  },
]