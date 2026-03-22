'use client'
import { useEffect } from 'react'

export default function GSAPInit() {
  useEffect(() => {
    // Dynamically load GSAP to avoid SSR issues
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        // Fade up elements
        gsap.utils.toArray('.fade-up').forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
          })
        })

        // Stagger items on scroll
        gsap.utils.toArray('.stagger-item').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            }
          })
        })

        // Slide left elements
        gsap.utils.toArray('.slide-left').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            }
          })
        })

        // Navbar scroll effect
        ScrollTrigger.create({
          start: 'top -60',
          onUpdate: (self) => {
            const navbar = document.querySelector('.navbar')
            if (navbar) {
              navbar.style.borderBottomColor = self.progress > 0
                ? 'rgba(0,229,160,0.15)'
                : 'rgba(255,255,255,0.08)'
            }
          }
        })

        // Counter animation for stats
        gsap.utils.toArray('.stat-num').forEach(el => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              el.style.opacity = '1'
              // Animate the text with a flash effect
              gsap.from(el, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'back.out(1.7)'
              })
            }
          })
        })
      })
    })
  }, [])

  return null
}
