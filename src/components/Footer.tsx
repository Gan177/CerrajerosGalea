import { Phone, Mail, MapPin } from 'lucide-react'
import logo from '../assets/images/logo.png'

const PHONE = '663 240 075'
const PHONE_HREF = 'tel:663240075'
const EMAIL = 'info@cerrajerosgalea.com'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111111]" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <img
              src={logo}
              alt="Cerrajeros Galea"
              width={280}
              height={96}
              className="h-24 w-auto object-contain"
            />
            <p className="text-[oklch(55%_0.005_20)] text-sm leading-relaxed">
              Servicio de cerrajería profesional 24h en Bizkaia. Aperturas sin
              daños, instalaciones y alta seguridad.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={PHONE_HREF}
                aria-label={`Llamar: ${PHONE}`}
                className="inline-flex items-center gap-2 text-[#FFD700] font-bold hover:text-[#e6c200] transition-colors"
              >
                <Phone size={16} aria-hidden="true" />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-[oklch(60%_0.005_20)] hover:text-white transition-colors"
              >
                <Mail size={15} aria-hidden="true" />
                {EMAIL}
              </a>
              <span className="inline-flex items-center gap-2 text-[oklch(55%_0.005_20)]">
                <MapPin size={15} aria-hidden="true" />
                Bilbao, Bizkaia
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[oklch(58%_0.005_20)]">
              {[
                'Apertura de puertas',
                'Puertas blindadas',
                'Cambio de cerraduras',
                'Apertura de vehículos',
                'Cerraduras Ezkurra',
                'Cerrojos SAG',
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Ubicación de servicio
            </h3>
            <div className="rounded-xl overflow-hidden border border-[oklch(25%_0.006_20)]">
              <iframe
                title="Zona de cobertura — Bilbao, Bizkaia"
                width="100%"
                height="200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46692.11!2d-2.9253!3d43.2627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e4fe5b61c5bf7%3A0xa4bb70f9d24f494c!2sBilbao%2C%20Bizkaia!5e0!3m2!1ses!2ses!4v1"
                className="block"
                aria-label="Mapa de Bilbao, Bizkaia"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[oklch(20%_0.006_20)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[oklch(40%_0.005_20)]">
          <p>© {year} Cerrajeros Galea. Todos los derechos reservados.</p>
          <a
            href={PHONE_HREF}
            aria-label={`Llamar ahora a Cerrajeros Galea: ${PHONE}`}
            className="flex items-center gap-2 bg-[#C1272D] hover:bg-[#a82028] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            <Phone size={14} />
            Llamar ahora: <span className="text-[#FFD700]">{PHONE}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
