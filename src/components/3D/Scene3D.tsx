import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  className?: string;
  autoRotate?: boolean;
  mouseInteraction?: boolean;
}

const Scene3D = ({ className = "", autoRotate = true, mouseInteraction = true }: Scene3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const logoGroupRef = useRef<THREE.Group>();
  const frameId = useRef<number>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create Buildnest logo geometry
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;

    // Main cube (representing the "Build" part)
    const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2979ff,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -1;

    // Nest sphere (representing the "Nest" part)
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 1;

    // Connection cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.8,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.rotation.z = Math.PI / 2;

    // Add wireframe overlays for premium effect
    const cubeWireframe = new THREE.WireframeGeometry(cubeGeometry);
    const cubeWireframeMesh = new THREE.LineSegments(
      cubeWireframe,
      new THREE.LineBasicMaterial({ color: 0x2979ff, transparent: true, opacity: 0.3 })
    );
    cubeWireframeMesh.position.copy(cube.position);

    const sphereWireframe = new THREE.WireframeGeometry(sphereGeometry);
    const sphereWireframeMesh = new THREE.LineSegments(
      sphereWireframe,
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 })
    );
    sphereWireframeMesh.position.copy(sphere.position);

    logoGroup.add(cube, sphere, cylinder, cubeWireframeMesh, sphereWireframeMesh);
    scene.add(logoGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x2979ff, 0.5, 100);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.5, 100);
    pointLight2.position.set(5, 0, 5);
    scene.add(pointLight2);

    // Animation loop
    let rotationX = 0;
    let rotationY = 0;

    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      if (logoGroupRef.current) {
        if (autoRotate) {
          logoGroupRef.current.rotation.y += 0.01;
        }

        if (mouseInteraction) {
          // Smooth mouse interaction
          const targetRotationX = (mousePosition.y - 0.5) * 0.3;
          const targetRotationY = (mousePosition.x - 0.5) * 0.3;
          
          rotationX += (targetRotationX - rotationX) * 0.05;
          rotationY += (targetRotationY - rotationY) * 0.05;
          
          logoGroupRef.current.rotation.x = rotationX;
          logoGroupRef.current.rotation.y += rotationY * 0.1;
        }

        // Floating animation
        logoGroupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate, mouseInteraction]);

  // Handle mouse movement
  useEffect(() => {
    if (!mouseInteraction) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInteraction]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default Scene3D;