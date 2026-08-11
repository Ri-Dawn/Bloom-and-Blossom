'use client';

import { useEffect, useRef } from 'react';

// A quiet drift of warm gold particles behind the storyline — an ambient
// depth layer rather than a centrepiece. Kept deliberately sparse and slow.
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let renderer: import('three').WebGLRenderer | null = null;
    let disposed = false;

    (async () => {
      const THREE = await import('three');
      if (disposed || !mountRef.current) return;

      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const COUNT = 140;
      const positions = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        speeds[i] = 0.02 + Math.random() * 0.05;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color('#f2c879'),
        size: 0.9,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      function animate() {
        const posAttr = geometry.getAttribute('position') as import('three').BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
          let y = posAttr.getY(i) + speeds[i];
          if (y > 45) y = -45;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
        points.rotation.y += 0.0006;
        renderer!.render(scene, camera);
        raf = requestAnimationFrame(animate);
      }
      animate();

      const onResize = () => {
        if (!mountRef.current || !renderer) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // stash cleanup on the container for the outer effect to call
      (container as HTMLDivElement & { __cleanup?: () => void }).__cleanup = () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(raf);
        geometry.dispose();
        material.dispose();
        renderer?.dispose();
        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      const container = mountRef.current as (HTMLDivElement & { __cleanup?: () => void }) | null;
      container?.__cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="particle-field" aria-hidden />;
}
