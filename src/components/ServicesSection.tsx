import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { DoorOpen, Shield, Key, Car, type LucideIcon } from 'lucide-react'
import imgApertura from '../assets/images/principal.jpg'
import imgBlindadas from '../assets/images/puertas-blindadas.jpg'
import imgCerrojos from '../assets/images/cerrojo-sag.jpg'
import imgVehiculos from '../assets/images/olvido-llaves-coche.jpg'

const EASE = [0.23, 1, 0.32, 1] as const

const SPRING = { stiffness: 300, damping: 28 }

interface Service {
  icon: LucideIcon
  title: string
  description: string
  photo: string
  photoAlt: string
}

const services: Service[] = [
  {
    icon: DoorOpen,
    title: 'Apertura de puertas sin rotura',
    description:
      'Técnica no destructiva. Abrimos tu puerta conservando la cerradura intacta. Sin daños, sin costes extras.',
    photo: imgApertura,
    photoAlt: 'Apertura de puerta sin daños',
  },
  {
    icon: Shield,
    title: 'Puertas blindadas y acorazadas',
    description:
      'Instalación y reparación de puertas de alta seguridad. Asesoramiento personalizado sobre el nivel de protección óptimo.',
    photo: imgBlindadas,
    photoAlt: 'Puerta blindada de alta seguridad',
  },
  {
    icon: Key,
    title: 'Cerraduras Ezkurra y SAG',
    description:
      'Especialistas en bombines y cerrojos de alta seguridad. Instalación certificada de marcas líderes del mercado.',
    photo: imgCerrojos,
    photoAlt: 'Cerrojo SAG de alta seguridad',
  },
  {
    icon: Car,
    title: 'Apertura de vehículos',
    description:
      'Apertura de coches, furgonetas y vehículos industriales de todas las marcas. Rápido y sin daños en la carrocería.',
    photo: imgVehiculos,
    photoAlt: 'Apertura de vehículo — llaves olvidadas dentro',
  },
]

// 3D tilt card — spring-based, gated to pointer-fine devices
function TiltCard({ service, delay }: { service: Service; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), SPRING)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), SPRING)
  const glowOpacity = useSpring(0, SPRING)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    // Only on hover-capable devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
    glowOpacity.set(1)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    glowOpacity.set(0)
  }

  const { icon: Icon, title, description, photo, photoAlt } = service

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative bg-[#1E1E1E] border border-[oklch(28%_0.006_20)] rounded-2xl overflow-hidden flex flex-col"
      // border transition via CSS (cheaper than framer)
    >
      {/* Cursor glow highlight */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
          css-note="ring highlight on hover"
          // ring via box-shadow so it doesn't affect layout
          // eslint-disable-next-line react/no-unknown-property
        >
          <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C1272D]/30" />
        </motion.div>
      )}

      {/* Photo header */}
      <div className="relative h-40 overflow-hidden bg-[#111] shrink-0">
        <img
          src={photo}
          alt={photoAlt}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 [@media(hover:none)]:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(30,30,30,0.7) 100%)' }}
        />
        <div className="absolute bottom-3 left-4 w-9 h-9 flex items-center justify-center rounded-xl bg-[#C1272D] shadow-lg">
          <Icon size={18} className="text-white" aria-hidden="true" />
        </div>
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-white font-semibold text-sm leading-snug">{title}</h3>
        <p className="text-[oklch(58%_0.005_20)] text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="py-20 px-4 bg-[#1A1A1A]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C1272D] mb-3">
            Lo que hacemos
          </p>
          <h2
            id="servicios-title"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Nuestros Servicios
          </h2>
          <p className="mt-3 text-[oklch(60%_0.006_20)] max-w-md mx-auto text-sm">
            Soluciones de cerrajería profesional para hogares, empresas y vehículos en Bizkaia.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}
