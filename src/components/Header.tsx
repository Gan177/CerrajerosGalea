import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/images/logo.png'

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const PHONE = '663 240 075'
const PHONE_HREF = 'tel:663240075'
const EASE = [0.23, 1, 0.32, 1] as const

const NAV = [
  { href: '#servicios',   id: 'servicios',   label: 'Servicios'  },
  { href: '#testimonios', id: 'testimonios', label: 'Opiniones'  },
  { href: '#zonas',       id: 'zonas',       label: 'Zonas'      },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A1A1A]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      {/* Main bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-24 grid grid-cols-3 items-center">

        {/* Left — desktop nav / mobile call CTA */}
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6" aria-label="Secciones">
            {NAV.map(({ href, id, label }) => (
              <motion.a
                key={id}
                href={href}
                onClick={e => { e.preventDefault(); scrollTo(id) }}
                whileTap={reduced ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.1, ease: EASE }}
                className="flex flex-col items-center gap-1.5 py-1"
              >
                <span className={`text-sm transition-colors duration-200 ${
                  active === id
                    ? 'text-white font-semibold'
                    : 'text-[oklch(58%_0.006_20)] hover:text-white/70'
                }`}>
                  {label}
                </span>
                <motion.span
                  className="block h-0.75 rounded-full bg-[#C1272D]"
                  animate={{ width: active === id ? 16 : 0, opacity: active === id ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile: compact Llamar pill */}
          <motion.a
            href={PHONE_HREF}
            aria-label={`Llamar a Cerrajeros Galea: ${PHONE}`}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.12, ease: EASE }}
            className="md:hidden flex items-center gap-1.5 bg-[#C1272D] text-white px-3 py-2 rounded-full font-bold text-xs pulse-cta"
          >
            <Phone size={13} />
            Llamar
          </motion.a>
        </div>

        {/* Center — logo */}
        <div className="flex justify-center">
          <motion.a
            href="/"
            aria-label="Cerrajeros Galea — inicio"
            whileTap={reduced ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.12, ease: EASE }}
            className="bg-transparent"
          >
            <img
              src={logo}
              alt="Cerrajeros Galea"
              width={240}
              height={80}
              className="h-8 md:h-16 w-auto object-contain bg-transparent"
              style={{ filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.8))' }}
            />
          </motion.a>
        </div>

        {/* Right — WhatsApp + desktop phone CTA */}
        <div className="flex justify-end items-center gap-2">
          <motion.a
            href={`https://wa.me/34663240075?text=Hola%2C%20necesito%20un%20cerrajero`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            whileTap={reduced ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.12, ease: EASE }}
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-colors duration-150"
            style={{ transition: 'background-color 160ms ease-out' }}
          >
            <WhatsAppIcon />
          </motion.a>

          <motion.a
            href={PHONE_HREF}
            aria-label={`Llamar a Cerrajeros Galea: ${PHONE}`}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.12, ease: EASE }}
            className="hidden md:flex items-center gap-2 bg-[#C1272D] text-white px-4 py-2 rounded-full text-sm font-semibold"
            style={{ transition: 'background-color 160ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a82028')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C1272D')}
          >
            <Phone size={14} />
            Llamar
          </motion.a>
        </div>

      </div>

      {/* Mobile nav row */}
      <div className="md:hidden border-t border-white/[0.07]">
        <nav
          aria-label="Secciones"
          className="flex items-center justify-center gap-0 h-9"
        >
          {NAV.map(({ href, id, label }, i) => (
            <a
              key={id}
              href={href}
              onClick={e => { e.preventDefault(); scrollTo(id) }}
              className={`relative flex-1 flex items-center justify-center text-[11px] font-medium tracking-wide h-full transition-colors duration-150 ${
                active === id ? 'text-white' : 'text-white/45'
              } ${i < NAV.length - 1 ? 'border-r border-white/[0.07]' : ''}`}
            >
              {active === id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#C1272D]" />
              )}
              {label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
