"use client"

import type { ReactNode } from "react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: 0.56, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
