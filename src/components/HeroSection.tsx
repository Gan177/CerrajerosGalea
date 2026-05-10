import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Star, Clock, MapPin } from 'lucide-react'
import heroImg from '../assets/images/principal.jpg'
import heroImgMobile from '../assets/images/principal-movil.jpg'

const PHONE = '663 240 075'
const PHONE_HREF = 'tel:663240075'
const EASE = [0.23, 1, 0.32, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '18%'])

  return (
    <section
      ref={sectionRef}
      aria-label="Presentación principal"
      className="relative min-h-[45vh] md:min-h-screen flex flex-col items-center justify-center px-5 pt-28 md:pt-32 pb-12 overflow-hidden bg-[#1A1A1A]"
    >
      {/* Background photo with parallax */}
      {/* Desktop image */}
      <motion.img
        src={heroImg}
        alt=""
        aria-hidden="true"
        // @ts-expect-error fetchpriority valid HTML
        fetchpriority="high"
        style={{ y: imgY }}
        className="hidden md:block absolute inset-0 w-full h-[115%] top-[-8%] object-cover object-center select-none pointer-events-none"
      />
      {/* Mobile image */}
      <img
        src={heroImgMobile}
        alt=""
        aria-hidden="true"
        // @ts-expect-error fetchpriority valid HTML
        fetchpriority="high"
        className="md:hidden absolute inset-0 w-full h-full top-0 object-cover object-center select-none pointer-events-none"
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.72) 55%, rgba(26,26,26,0.88) 100%)' }}
      />

      {/* Bottom bleed */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #1A1A1A)' }}
      />

      {/* Static red accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-175 h-175 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(193,39,45,0.18) 0%, transparent 62%)' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="show"
      >
        {/* Live status badge */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative inline-flex mb-6"
        >
          <div className="flex items-stretch bg-[#1A1A1A] rounded-full overflow-hidden ring-1 ring-[#FFD700]/20">
            <div className="flex items-center gap-2 px-3 py-2 border-r border-[#FFD700]/15">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]" />
              </span>
              <span className="text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                Disponibles ahora
              </span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-white/50 text-[10px] sm:text-xs">Resp. en</span>
              <span className="text-white text-[10px] sm:text-xs font-bold">20 min</span>
            </div>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={reduced ? undefined : fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-5"
        >
          <span className="block text-xl sm:text-3xl md:text-4xl font-semibold text-white/70 tracking-wide mb-1.5">
            Cerrajeros <span className="text-[#FFD700] font-black">24h</span> en Bizkaia
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-[-0.02em]">
            Aperturas{' '}
            <span className="text-[#C1272D]">Sin Daños</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={reduced ? undefined : fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-base sm:text-xl text-white/65 max-w-lg mx-auto mb-7 leading-relaxed font-light"
        >
          Atención inmediata en menos de 30 minutos.
          <br className="hidden sm:block" />
          Expertos en puertas, vehículos y alta seguridad.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          transition={{ duration: 0.85, ease: EASE }}
          className="mb-8"
        >
          <motion.a
            href={PHONE_HREF}
            aria-label={`Llamar a Cerrajeros Galea: ${PHONE}`}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.12, ease: EASE }}
            className="pulse-cta inline-flex items-center gap-2 sm:gap-3 bg-[#C1272D] hover:bg-[#a82028] text-white rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-lg sm:text-2xl font-bold select-none w-full sm:w-auto justify-center"
            style={{ transition: 'background-color 160ms ease-out' }}
          >
            <Phone size={26} aria-hidden="true" />
            <span>
              Llamar:{' '}
              <span className="text-[#FFD700] font-black">{PHONE}</span>
            </span>
          </motion.a>
          <p className="mt-3 text-xs text-white/80 font-medium">
            Presupuesto gratuito · Sin sorpresas
          </p>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-2 sm:gap-x-6 sm:gap-y-3 text-sm text-[oklch(62%_0.005_20)]"
        >
          <span className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
            ))}
            <strong className="text-white ml-1">4.9</strong>
            <span>en Google</span>
          </span>
          <span className="hidden sm:block text-[oklch(30%_0.005_20)]">|</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            Llegamos en 20 min
          </span>
          <span className="hidden sm:block text-[oklch(30%_0.005_20)]">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            Todo Bizkaia
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-linear-to-b from-transparent to-[oklch(38%_0.005_20)]" />
      </motion.div>
    </section>
  )
}
