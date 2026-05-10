import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const zones = [
  'Bilbao', 'Getxo', 'Barakaldo', 'Portugalete', 'Santurtzi',
  'Galdakao', 'Mallabia', 'Basauri', 'Leioa', 'Sestao',
  'Erandio', 'Bermeo', 'Durango', 'Amorebieta', 'Gernika',
  'Algorta', 'Urduliz', 'Mungia', 'Sopelana', 'Plentzia',
]

export default function ServiceZonesSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="zonas"
      aria-labelledby="zonas-title"
      className="relative py-20 pb-32 px-4 bg-[#1A1A1A] overflow-hidden"
    >
      {/* Bottom bleed into footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, #111111)' }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Blur reveal heading */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C1272D] mb-3">
            Cobertura
          </p>
          <h2
            id="zonas-title"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-3"
          >
            <MapPin className="text-[#C1272D]" size={32} aria-hidden="true" />
            Zonas de Servicio en Bizkaia
          </h2>
          <p className="mt-3 text-[oklch(60%_0.006_20)] text-sm max-w-sm mx-auto">
            Cubrimos toda el área metropolitana del Gran Bilbao y alrededores.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          variants={
            reduced
              ? undefined
              : {
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.04 },
                  },
                }
          }
        >
          {zones.map((zone) => (
            <motion.span
              key={zone}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, scale: 0.88 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                      },
                    }
              }
              className="inline-flex items-center gap-1.5 bg-[#1E1E1E] border border-[oklch(28%_0.006_20)] text-[oklch(72%_0.005_20)] text-sm px-4 py-2 rounded-full hover:border-[#C1272D]/50 hover:text-white transition-colors duration-200"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C1272D]"
                aria-hidden="true"
              />
              {zone}
            </motion.span>
          ))}
        </motion.div>

        <p className="text-center mt-6 text-[oklch(45%_0.005_20)] text-xs">
          ¿No ves tu municipio? Llámanos —{' '}
          <a
            href="tel:663240075"
            className="text-[#C1272D] hover:underline"
          >
            seguro que podemos ayudarte
          </a>
          .
        </p>
      </div>
    </section>
  )
}
