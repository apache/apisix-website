import type { FC } from 'react';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import '../css/customTheme.css';
import { fragment, vertex } from '../database/heroCanvas';

const HeroCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const overlayRef = useRef<HTMLDivElement>();

  let canvasHeight: number;
  let canvasWidth: number;
  let screenWidth: number;
  let screenHeight: number;
  let controls: OrbitControls;
  let isLoaded = false;
  let isRendering = false;
  let animationFrame: number;

  useEffect(() => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    const mouse = { x: 0.5, y: 0.5 };
    const fragMouse = { x: 0.5, y: 0.5 };

    let camera; let mesh; let scene; let renderer; let material; let
      geometry;

    window.addEventListener('resize', onWindowResize, false);

    if (screenWidth > 1100) {
      canvasHeight = screenHeight;
      canvasWidth = screenWidth / 2;
    } else {
      canvasHeight = screenHeight / 2;
      canvasWidth = screenWidth;
    }

    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    canvasRef.current.addEventListener('mousemove', (event) => {
      const ctx = {
        x: (event.clientX),
        y: (event.clientY),
      };

      const canvasOffset = {
        left: canvasRef.current.getBoundingClientRect().x,
        top: canvasRef.current.getBoundingClientRect().y,
      };

      ctx.x = ((ctx.x - canvasOffset.left) / canvasWidth);
      ctx.y = ((ctx.y - canvasOffset.top) / canvasHeight);

      gsap.to(mouse, 2, {
        x: ctx.x * (canvasWidth / canvasHeight) - (canvasWidth / canvasHeight) / 2,
        y: (1.0 - ctx.y) - 0.5,
        onUpdate: () => {
          material.uniforms.u_mouse.value.x = mouse.x;
          material.uniforms.u_mouse.value.y = mouse.y;
        },
      });

      gsap.to(fragMouse, 2, {
        x: ctx.x,
        y: (1.0 - ctx.y),
        onUpdate: () => {
          material.uniforms.u_fragMouse.value.x = fragMouse.x;
          material.uniforms.u_fragMouse.value.y = fragMouse.y;
        },
      });
    });

    function getRandom(a, b) {
      return a + (b - a) * Math.random();
    }

    const canvasObserver = new IntersectionObserver(onCanvasIntersection, {
      root: null,
      threshold: 0.01,
    });

    init(canvasWidth, canvasHeight);

    function onCanvasIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isLoaded) {
          if (isLoaded && !isRendering) {
            animate();
          } else {
            console.log('Loading');
          }
        } else {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            isRendering = false;
          }
        }
      });
    }

    canvasObserver.observe(canvasRef.current);

    function init(width: number, height: number) {
      const ctx = canvasRef.current;

      renderer = new THREE.WebGLRenderer({ canvas: ctx });
      renderer.autoClearColor = false;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      controls = new OrbitControls(camera, renderer.domElement);

      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enabled = false;

      geometry = new THREE.PlaneBufferGeometry(width / height, 1, 250, 250);

      const { count } = geometry.attributes.position;
      const arrSize = new THREE.BufferAttribute(new Float32Array(count), 1);

      for (let i = 0; i < arrSize.count; i += 1) {
        arrSize.array[i] = getRandom(0, 1);
      }
      geometry.setAttribute('aSize', arrSize, 1);

      geometry.scale(2.0, 1.0, 1.0);

      scene = new THREE.Scene();
      renderer.setSize(canvasWidth, canvasHeight);

      const uniforms = {
        u_time: {
          type: 'f',
          value: 1.0,
        },
        u_resolution: {
          type: 'v2',
          value: new THREE.Vector2(),
        },
        u_mouse: {
          type: 'v2',
          value: new THREE.Vector2(0.5, 0.5),
        },
        u_fragMouse: {
          type: 'v2',
          value: new THREE.Vector2(0.5, 0.5),
        },
      };

      scene.background = new THREE.Color('red');

      camera.position.z = 5;
      controls.update();

      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        wireframe: true,
        side: THREE.DoubleSide,
      });

      mesh = new THREE.Points(geometry, material);

      const backGeometry = new THREE.PlaneBufferGeometry(width / height, 1, 200, 200);
      const bgMaterial = new THREE.MeshBasicMaterial({ color: 0x121212, wireframe: false });
      const background = new THREE.Mesh(backGeometry, bgMaterial);

      backGeometry.scale(50, 50, 1);
      background.position.set(10, 10, -10);
      background.rotation.set(Math.PI / 2, 0, 0);

      scene.add(mesh);
      scene.add(background);

      // Tested and checked
      camera.position.set(
        0.16430412417444037,
        -1.5202138879420155,
        0.20892968987792318,
      );

      controls.update();

      renderer.setPixelRatio(window.devicePixelRatio);
      onWindowResize();

      isLoaded = true;
    }

    function onWindowResize() {
      screenHeight = window.innerHeight;
      screenWidth = window.innerWidth;

      if (screenWidth > 1100) {
        canvasHeight = screenHeight;
        canvasWidth = screenWidth / 2;
      } else {
        canvasHeight = screenHeight / 2;
        canvasWidth = screenWidth;
      }

      renderer.setSize(canvasWidth, canvasHeight);
      material.uniforms.u_resolution.value.x = renderer.domElement.width;
      material.uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    function animate() {
      animationFrame = requestAnimationFrame(animate);
      material.uniforms.u_time.value += 0.05;
      controls.update();
      renderer.render(scene, camera);
      isRendering = true;
    }

    return () => {
      // eslint-disable-next-line prefer-spread
      scene.remove.apply(scene, scene.children);
      canvasObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    gsap.to(overlayRef.current, {
      height: 0,
      delay: window.innerWidth >= 768 ? 0 : 0.3,
      duration: 2.1,
      ease: 'Expo.easeInOut',
    });
  }, []);

  return (
    <div className="hero-infograph" style={{ position: 'relative' }}>
      <canvas ref={canvasRef} className="homeCanvas" />
      <div ref={overlayRef} className="homeCanvas-overlay" />
    </div>
  );
};

export default HeroCanvas;
