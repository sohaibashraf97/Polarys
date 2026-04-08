"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertexShader = `attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `precision highp float;

varying vec2 vUv;
uniform float uTime;

void main() {
    vec2 uv = vUv;

    // Simple dark gradient: black at top, dark grey at bottom
    vec3 color = mix(vec3(0.02, 0.02, 0.02), vec3(0.12, 0.12, 0.12), uv.y);

    // Animated film grain
    float grain = fract(sin(dot(uv + fract(uTime * 0.5), vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.08;

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function GradientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    const gl = renderer.gl;

    containerRef.current.appendChild(gl.canvas);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId: number;
    let time = 0;
    function update() {
      animateId = requestAnimationFrame(update);
      time += 0.01;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animateId);
      containerRef.current?.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'fixed', inset: 0, zIndex: -1 }} />;
}
