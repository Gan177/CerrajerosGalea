import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'

const EASE = [0.23, 1, 0.32, 1] as const

const testimonials = [
  {
    name: 'María García',
    location: 'Bilbao',
    rating: 5,
    text: 'Me quedé encerrada a las 2 de la mañana y Aitor llegó en menos de 20 minutos. Abrió la puerta sin ningún daño y a un precio muy razonable. Totalmente recomendados.',
    date: 'hace 2 semanas',
  },
  {
    name: 'Jon Etxebarria',
    location: 'Getxo',
    rating: 5,
    text: 'Excelente servicio. Aitor cambió todos los bombines de mi casa con cerraduras Ezkurra de alta seguridad. Trabajo muy profesional y limpio. El precio, justo.',
    date: 'hace 1 mes',
  },
  {
    name: 'Laura Fernández',
    location: 'Barakaldo',
    rating: 5,
    text: 'Rápidos, eficientes y muy amables. Instalaron una puerta blindada en tiempo récord. Muy contentos con el resultado. Sin duda los llamaré si necesito algo más.',
    date: 'hace 3 semanas',
  },
  {
    name: 'Mikel Uriarte',
    location: 'Santurtzi',
    rating: 5,
    text: 'Me dejé las llaves dentro del coche en el parking. Llamé a Cerrajeros Galea y en 25 minutos ya tenía el coche abierto. Sin rayar ni dañar nada. Increíble.',
    date: 'hace 5 días',
  },
  {
    name: 'Ana Ruiz',
    location: 'Portugalete',
    rating: 5,
    text: 'Aitor es un profesional de diez. Cambié la cerradura antigua por un bombín SAG y la diferencia en seguridad es enorme. Precio competitivo y puntualísimos.',
    date: 'hace 2 meses',
  },
]

// Stagger variants for card contents
const cardVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const starVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit:  { opacity: 0, transition: { duration: 0.15 } },
}

const quoteVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show:   { clipPath: 'inset(0 0% 0 0)',   opacity: 1, transition: { duration: 0.65, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
}

const authorVariants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [reduced])

  const t = testimonials[active]

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="py-20 px-4 bg-[#1A1A1A]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span className="text-white text-xs font-semibold">Google Reviews</span>
            <span className="text-[#FFD700] text-xs font-bold">4.9 ★</span>
          </div>
          <h2
            id="testimonios-title"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={reduced ? undefined : cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-[#161616] border border-[oklch(25%_0.006_20)] rounded-2xl p-7 sm:p-8"
            >
              {/* Stars — drop in one by one */}
              <span className="flex gap-0.5" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.span key={i} variants={reduced ? undefined : starVariants}>
                    <Star size={14} className="text-[#FFD700] fill-[#FFD700]" aria-hidden="true" />
                  </motion.span>
                ))}
              </span>

              {/* Quote — clip-path reveal left to right */}
              <motion.blockquote
                variants={reduced ? undefined : quoteVariants}
                className="mt-4 text-[oklch(78%_0.005_20)] text-base leading-relaxed"
              >
                "{t.text}"
              </motion.blockquote>

              {/* Author — slides up last */}
              <motion.div
                variants={reduced ? undefined : authorVariants}
                className="mt-5"
              >
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[oklch(50%_0.005_20)] text-xs">
                  {t.location} · {t.date}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-5" aria-hidden="true">
            {testimonials.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === active ? 24 : 8,
                  backgroundColor: i === active ? '#C1272D' : 'oklch(35% 0.006 20)',
                }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ height: 8, borderRadius: 9999 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
