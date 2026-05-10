import { motion, useReducedMotion } from 'framer-motion'
import { Timer, Clock4, CheckCircle } from 'lucide-react'

const items = [
  {
    icon: Timer,
    heading: 'Llegamos en 20 min',
    sub: 'Tiempo de respuesta garantizado en toda el área metropolitana de Bilbao.',
  },
  {
    icon: Clock4,
    heading: 'Atención 24h · 365 días',
    sub: 'Festivos, fines de semana, madrugadas. Siempre disponibles cuando más nos necesitas.',
  },
  {
    icon: CheckCircle,
    heading: 'Presupuesto gratuito',
    sub: 'Sin compromiso. Te damos el precio antes de empezar. Sin letra pequeña.',
  },
]

export default function DifferentialsSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Por qué elegirnos"
      className="relative py-24 bg-[#7D1A1F] overflow-hidden"
    >
      {/* Top blend: dark → red */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, #1A1A1A, #7D1A1F)' }}
      />
      {/* Bottom blend: red → dark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, #7D1A1F, #1A1A1A)' }}
      />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {items.map(({ icon: Icon, heading, sub }, i) => {
            // Each item fans out from its own direction
            const xFrom = i === 0 ? -32 : i === 2 ? 32 : 0
            const yFrom = i === 1 ? 24 : 0
            return (
            <motion.div
              key={heading}
              initial={reduced ? {} : { opacity: 0, x: xFrom, y: yFrom }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/15">
                <Icon size={28} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-snug mb-1">{heading}</p>
                <p className="text-white/75 text-sm leading-relaxed max-w-55 mx-auto">{sub}</p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}
