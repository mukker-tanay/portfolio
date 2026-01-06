'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';
import { useTransition } from '@/context/TransitionContext';

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector2(0, 0));
  const currentPos = useRef(new THREE.Vector2(0, 0));
  const { stage } = useTransition();
  const prefersReducedMotion = useRef(false);

  // States:
  // idle/in: Corner position, small scale
  // out/interlude: Center position, big scale
  const isTransitioning = stage === 'out' || stage === 'interlude';

  const { scale, position, colorOpacity, rotationSpeed } = useSpring({
    scale: isTransitioning ? [1, 1, 1] : [1.5, 1.5, 1.5],
    position: isTransitioning ? [0, -0.3, 0] : [4, -1.5, -2], // Center vs Corner
    colorOpacity: isTransitioning ? 0.8 : 0.15,
    rotationSpeed: isTransitioning ? 0.4 : 0.2,
    config: { 
        mass: 2, 
        tension: isTransitioning ? 140 : 120, 
        friction: isTransitioning ? 24 : 60 
    }
  });

  // Check media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handleChange = () => {
      prefersReducedMotion.current = mediaQuery.matches;
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track mouse velocity
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    
    // Reset target when transitioning starts
    if (isTransitioning) {
        targetPos.current.set(0,0);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Don't modify target pos via mouse if we are in the main transition animation
      if (isTransitioning) return; 

      const now = performance.now();
      
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      
      // Normalized velocity (-1 to 1 range approx)
      const vx = (dx / window.innerWidth) * 50;
      const vy = (dy / window.innerHeight) * 50;

      targetPos.current.x += vx * 0.05; 
      targetPos.current.y -= vy * 0.05;
      
      // Clamp bounds
      targetPos.current.x = THREE.MathUtils.clamp(targetPos.current.x, -1, 1);
      targetPos.current.y = THREE.MathUtils.clamp(targetPos.current.y, -0.5, 0.5);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

// Remove mouse movement logic during transition by listening to isTransitioning dependency
  }, [isTransitioning]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Continuous rotation - speed depends on state
    if (!isTransitioning) {
        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;
    } else {
        // Faster spin during transition
        meshRef.current.rotation.y += delta * 0.8;
        meshRef.current.rotation.x += delta * 0.4;
    }

    if (!isTransitioning && !prefersReducedMotion.current) {
        // Smooth dampening (inertia) for mouse interaction ONLY when not transitioning
        currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPos.current.x, delta * 2);
        currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPos.current.y, delta * 2);
        
        // Return to center slowly
        targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, 0, delta * 0.5);
        targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, 0, delta * 0.5);

        // Update mesh position (combine spring group position with mouse offset)
        // Since we are moving the GROUP with spring, we move the MESH with mouse
        meshRef.current.position.x = currentPos.current.x;
        meshRef.current.position.y = currentPos.current.y;
    } else {
        // Reset mesh offset when transitioning
         meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, delta * 5);
         meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, delta * 5);
    }
  });

  return (
    // @ts-expect-error - react-spring types
    <animated.group position={position} scale={scale}>
         <animated.mesh ref={meshRef}>
            <sphereGeometry args={[1, 24, 24]} />
            <animated.meshStandardMaterial 
                color="#888888" 
                wireframe={true}
                transparent={true}
                opacity={colorOpacity}
            />
         </animated.mesh>
    </animated.group>
  );
}

export default function AmbientScene() {
  return (
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="fixed inset-0 pointer-events-none z-0" 
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WireframeGlobe />
      </Canvas>
  );
}
