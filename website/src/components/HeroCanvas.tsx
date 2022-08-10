import type { FC } from 'react';
import React, { useRef, useEffect } from 'react';
import {
  Vector2,
  Color,
  ShaderMaterial,
  Points,
  PlaneBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  BufferAttribute,
  Scene,
  DoubleSide,
  Clock,
} from 'three';
import { gsap } from 'gsap/gsap-core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// eslint-disable-next-line import/no-unresolved, import/no-webpack-loader-syntax, import/extensions
import fragment from '!!raw-loader!../shaders/fragment.frag';
// eslint-disable-next-line import/no-unresolved, import/no-webpack-loader-syntax, import/extensions
import vertex from '!!raw-loader!../shaders/vertex.vert';

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
  const clock = new Clock();
  let delta = 0;
  const interval = 1 / 30;

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

      gsap.to(mouse, {
        duration: 2,
        x: ctx.x * (canvasWidth / canvasHeight) - (canvasWidth / canvasHeight) / 2,
        y: (1.0 - ctx.y) - 0.5,
        onUpdate: () => {
          material.uniforms.u_mouse.value.x = mouse.x;
          material.uniforms.u_mouse.value.y = mouse.y;
        },
      });

      gsap.to(fragMouse, {
        duration: 2,
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
      threshold: 0.1,
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

      renderer = new WebGLRenderer({ canvas: ctx });
      renderer.autoClearColor = false;

      camera = new PerspectiveCamera(45, width / height, 0.1, 100);
      controls = new OrbitControls(camera, renderer.domElement);

      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enabled = false;

      geometry = new PlaneBufferGeometry(width / height, 1, 250, 250);

      const { count } = geometry.attributes.position;
      const arrSize = new BufferAttribute(new Float32Array(count), 1);

      for (let i = 0; i < arrSize.count; i += 1) {
        arrSize.array[i] = getRandom(0, 1);
      }
      geometry.setAttribute('aSize', arrSize, 1);

      geometry.scale(2.0, 1.0, 1.0);

      scene = new Scene();
      renderer.setSize(canvasWidth, canvasHeight);

      const uniforms = {
        u_time: {
          type: 'f',
          value: 1.0,
        },
        u_resolution: {
          type: 'v2',
          value: new Vector2(),
        },
        u_mouse: {
          type: 'v2',
          value: new Vector2(0.5, 0.5),
        },
        u_fragMouse: {
          type: 'v2',
          value: new Vector2(0.5, 0.5),
        },
      };

      scene.background = new Color('red');

      camera.position.z = 5;
      controls.update();

      material = new ShaderMaterial({
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        wireframe: true,
        side: DoubleSide,
      });

      mesh = new Points(geometry, material);

      const backGeometry = new PlaneBufferGeometry(width / height, 1, 200, 200);
      const bgMaterial = new MeshBasicMaterial({ color: 0x121212, wireframe: false });
      const background = new Mesh(backGeometry, bgMaterial);

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
      delta += clock.getDelta();

      if (delta > interval) {
        // The draw or time dependent code are here
        material.uniforms.u_time.value += 0.05;
        controls.update();
        renderer.render(scene, camera);
        isRendering = true;

        delta %= interval;
      }
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
      duration: 2,
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
