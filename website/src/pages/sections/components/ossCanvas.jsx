import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import "../../../css/customTheme.css";
 
const OssCanvas = () => {
  let screenWidth, screenHeight;

  const canvasRef = useRef(null);

  let canvasHeight, canvasWidth;
  
  useEffect(() => {
    let camera, scene, renderer, material, mesh;
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    window.addEventListener('resize', onWindowResize, false);
    
    let controls;
    let isLoaded = false, isRendering = false, animationFrame;
    
    if (screenWidth > 1100) {
      canvasHeight = 500;
      canvasWidth = screenWidth/2;
    } else {
      canvasHeight = 500
      canvasWidth = screenWidth;
    }

    function onWindowResize(event) {
      screenHeight = window.innerHeight;
      screenWidth = window.innerWidth;

      if (screenWidth > 1100) {
        canvasHeight = 500;
        canvasWidth = screenWidth/2;
      } else {
        canvasHeight = 500
        canvasWidth = screenWidth;
      }
  
      renderer.setSize(canvasWidth, canvasHeight);
    }
    
    let ossCanvasObserver = new IntersectionObserver(onOssCanvasIntersection, {
      root: null,
      threshold: 0.01,
    });

    function init(width, height) {
      const ctx = canvasRef.current;
      renderer = new THREE.WebGLRenderer({canvas: ctx});

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      
      controls = new OrbitControls( camera, renderer.domElement );
      controls.enableZoom = false;

      const radius = window.innerWidth > 768 ? 5 : 4.5;  
      const detail = 8; 
      
      const geometry = new THREE.IcosahedronGeometry(radius, detail);

      camera.position.z = 2;
      camera.position.x = 3;
      
      controls.update();
      
      scene = new THREE.Scene();
      renderer.setSize(canvasWidth, canvasHeight);
      
      scene.background = new THREE.Color(0x000000);

      material = new THREE.MeshNormalMaterial({wireframe: false, flatShading: true});

      mesh = new THREE.Mesh(geometry, material);
      
      scene.add(mesh);
      mesh.position.set(3, 0, -9.5);

      controls.target.copy(mesh.position)
      
      controls.update();
      renderer.setPixelRatio(window.devicePixelRatio);

      onWindowResize();

      isLoaded = true;
    }
    
    function animate() {
      animationFrame = requestAnimationFrame(animate);

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;

      controls.update();
      
      renderer.render(scene, camera);
      isRendering = true;
    }
    
    init(canvasWidth, canvasHeight);

    function onOssCanvasIntersection(entries, opts){
      entries.forEach(entry =>  {
        if (entry.isIntersecting && isLoaded) {
          if (isLoaded && !isRendering) {
            animate();
          } else {
            console.log("Loading")
          }
        } else {
          if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          isRendering = false;
          }
        }
      }
      );
    }      
  
    ossCanvasObserver.observe(canvasRef.current);

    return () => {
      scene.remove.apply(scene, scene.children);
      ossCanvasObserver.disconnect();
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="ossCanvas"></canvas>
  );
}

export default OssCanvas;
