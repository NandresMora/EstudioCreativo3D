import { Printer, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="text-white py-16" style={{background: '#0a0f1a', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Printer className="w-8 h-8 text-clay" />
              <span className="text-xl font-bold">Forge & Finish</span>
            </div>
            <p className="text-white/60 text-sm">
              Industrial-grade 3D printing and custom prototyping for businesses and creative professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-clay transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-clay transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-clay transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-clay transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Customize</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Get Quote</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-clay transition-colors">Industrial Prototyping</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Custom Figurines</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Event Props</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Material Consulting</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 text-clay" />
                <span>contact@forgeandfinish.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 text-clay" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-clay" />
                <span>123 Innovation Drive<br />Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2024 Forge & Finish. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-clay transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-clay transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-clay transition-colors">ISO 9001:2015</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
