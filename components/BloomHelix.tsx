'use client'

/**
 * BloomHelix — real WebGL 3D DNA double-helix for the hero.
 *
 * Procedural Three.js scene: two glass-tinted helical strands (TubeGeometry
 * along CatmullRom curves) connected by bronze metallic rungs (CylinderGeometry).
 * Lit with a warm key + cooler fill so the strands catch highlights as they
 * rotate. The whole group rotates around its Y axis continuously — this is
 * actual 3D motion (geometry transforms on the GPU), not a faked tilt of a
 * flat image.
 *
 * Performance posture (Lighthouse must stay ≥90 on both mobile & desktop):
 *  - Mounted via `next/dynamic({ ssr: false })` from the page, behind a
 *    matchMedia('(min-width: 1024px)') gate. Mobile NEVER fetches this code.
 *  - The H1 wins LCP on every form factor because the canvas only appears
 *    after hydration; the H1 has already painted from the SSR'd HTML.
 *  - Renderer uses `alpha: true` (transparent) + `powerPreference: 'low-power'`
 *    so the page background bleeds through and the GPU stays cool.
 *  - DPR is capped at 2 (max retina) so very-high-DPI screens don't render
 *    16× the pixels we need.
 *  - All geometries and materials disposed on unmount to avoid GPU leaks.
 *  - WebGL feature check: if WebGL is unavailable, the canvas is omitted —
 *    no fallback paint, no error.
 *  - prefers-reduced-motion: scene renders ONCE then animation stops. The
 *    helix is still visible (still 3D-rendered), just static.
 *  - Caller positions the wrapper absolutely + rotates it -22° for the
 *    diagonal-across-the-page layout. The helix rotates inside that frame.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

interface BloomHelixProps {
  className?: string
}

export default function BloomHelix({ className }: BloomHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── WebGL feature check ──────────────────────────────────────────────
    const testCanvas = document.createElement('canvas')
    const hasWebGL = !!(
      testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
    )
    if (!hasWebGL) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // ── Scene + camera + renderer ───────────────────────────────────────
    const initialWidth = container.clientWidth || 600
    const initialHeight = container.clientHeight || 750

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      35,
      initialWidth / initialHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 14)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setSize(initialWidth, initialHeight)
    // DPR cap: narrow viewports cap at 1.5 so a 3× retina phone doesn't render
    // 9× the pixels of a 1× target — saves GPU/battery without visible loss
    // since the helix is decorative + semi-transparent. Desktop caps at 2.
    const dprCap = window.innerWidth < 1024 ? 1.5 : 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Helix geometry ───────────────────────────────────────────────────
    const TURNS = 3.5
    const HEIGHT = 9
    const RADIUS = 1.55
    const STRAND_TUBE_SEGMENTS = 220
    const STRAND_RADIUS = 0.085

    const buildStrandCurve = (phaseOffset: number) => {
      const points: THREE.Vector3[] = []
      const samples = 240
      for (let i = 0; i <= samples; i++) {
        const t = i / samples
        const angle = t * TURNS * Math.PI * 2 + phaseOffset
        const y = (t - 0.5) * HEIGHT
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * RADIUS,
            y,
            Math.sin(angle) * RADIUS
          )
        )
      }
      return new THREE.CatmullRomCurve3(points)
    }

    const strandCurveA = buildStrandCurve(0)
    const strandCurveB = buildStrandCurve(Math.PI)

    const strandGeometryA = new THREE.TubeGeometry(
      strandCurveA,
      STRAND_TUBE_SEGMENTS,
      STRAND_RADIUS,
      14,
      false
    )
    const strandGeometryB = new THREE.TubeGeometry(
      strandCurveB,
      STRAND_TUBE_SEGMENTS,
      STRAND_RADIUS,
      14,
      false
    )

    // Glass-tinted bronze strand material — warm metallic with slight transmission
    const strandMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8cfbe,
      metalness: 0.55,
      roughness: 0.18,
      transmission: 0.35,
      thickness: 0.6,
      ior: 1.45,
      attenuationColor: 0xa89878,
      attenuationDistance: 4,
      envMapIntensity: 1.0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    })

    const strandMeshA = new THREE.Mesh(strandGeometryA, strandMaterial)
    const strandMeshB = new THREE.Mesh(strandGeometryB, strandMaterial)

    // ── Rungs ────────────────────────────────────────────────────────────
    const RUNG_COUNT = 22
    const rungLength = RADIUS * 2 - STRAND_RADIUS * 2 - 0.05
    const rungGeometry = new THREE.CylinderGeometry(
      0.045,
      0.045,
      rungLength,
      8
    )
    const rungMaterial = new THREE.MeshStandardMaterial({
      color: 0xa89878,
      metalness: 0.95,
      roughness: 0.32,
      emissive: 0x1a1814,
      emissiveIntensity: 0.15,
    })

    const helixGroup = new THREE.Group()
    helixGroup.add(strandMeshA, strandMeshB)

    for (let i = 0; i < RUNG_COUNT; i++) {
      const t = i / (RUNG_COUNT - 1)
      const angle = t * TURNS * Math.PI * 2
      const y = (t - 0.5) * HEIGHT
      const rung = new THREE.Mesh(rungGeometry, rungMaterial)
      rung.position.y = y
      // CylinderGeometry's default axis is Y; rotate to span the X axis
      // and then rotate around Y so it aligns with the local strand pair.
      rung.rotation.z = Math.PI / 2
      rung.rotation.y = angle
      helixGroup.add(rung)
    }

    scene.add(helixGroup)

    // ── Lighting ─────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xfff3df, 0.35)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffe4b5, 1.5)
    keyLight.position.set(6, 8, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xa89878, 0.8)
    fillLight.position.set(-6, -2, 4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xf5ecd9, 0.6)
    rimLight.position.set(0, 0, -8)
    scene.add(rimLight)

    // ── Animation loop ───────────────────────────────────────────────────
    // Slow continuous Y-axis rotation: ~24 s per revolution. Slow enough
    // to feel premium-clinical, fast enough to be noticeable.
    const ROTATION_SPEED = (Math.PI * 2) / (24 * 1000) // rad/ms

    let raf: number | null = null
    let last = performance.now()
    // Start at a slight phase so the first frame isn't perfectly axis-aligned
    helixGroup.rotation.y = Math.PI * 0.15
    helixGroup.rotation.x = 0.05

    const renderOnce = () => {
      renderer.render(scene, camera)
    }

    const animate = (now: number) => {
      const dt = now - last
      last = now
      helixGroup.rotation.y += ROTATION_SPEED * dt
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    if (reducedMotion) {
      renderOnce()
    } else {
      raf = requestAnimationFrame(animate)
    }

    // ── Pause when off-screen / tab hidden (battery + perf) ─────────────
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          if (raf == null) {
            last = performance.now()
            raf = requestAnimationFrame(animate)
          }
        } else if (raf != null) {
          cancelAnimationFrame(raf)
          raf = null
        }
      },
      { threshold: 0 }
    )
    visibilityObserver.observe(container)

    const onVisibilityChange = () => {
      if (document.hidden && raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      } else if (!document.hidden && !reducedMotion && raf == null) {
        last = performance.now()
        raf = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // ── Resize handling ──────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reducedMotion) renderOnce()
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)

      strandGeometryA.dispose()
      strandGeometryB.dispose()
      rungGeometry.dispose()
      strandMaterial.dispose()
      rungMaterial.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn('bloom-helix-wrap', className)}
      ref={containerRef}
    />
  )
}
