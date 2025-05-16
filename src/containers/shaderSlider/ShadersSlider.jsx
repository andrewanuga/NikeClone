import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import * as THREE from 'three';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ShadersSlider.css';

const images = [
  'src/data/mendataimg/AIR+JORDAN+4+RM.avif',
  'src/data/mendataimg/AIR+JORDAN+1+LOW.avif',
  'src/data/mendataimg/G.T.+HUSTLE+3+LX.avif',
  'src/data/mendataimg/JORDAN+FLY+LOCK+FG.avif',
];

const transitions = {
  'triangle-slide': `
    float angle = atan(uv.y - 0.5, uv.x - 0.5) / 3.14159;
    float slide = uProgress * 2.0 - 1.0;
    float gradient = smoothstep(-0.2, 0.2, angle + slide);
    vec4 currentColor = texture2D(uCurrentTexture, uv);
    vec4 nextColor = texture2D(uNextTexture, uv);
    gl_FragColor = mix(currentColor, nextColor, gradient);
  `,
  swirl: `
    vec2 center = vec2(0.5);
    vec2 toUV = uv - center;
    float angle = uProgress * 3.14159 * 3.0;
    float radius = length(toUV) * (1.0 + 0.2 * uProgress);
    vec2 swirled = center + vec2(cos(angle), sin(angle)) * radius;
    vec4 currentColor = texture2D(uCurrentTexture, uv);
    vec4 nextColor = texture2D(uNextTexture, swirled);
    float mixFactor = smoothstep(0.0, 1.0, uProgress);
    gl_FragColor = mix(currentColor, nextColor, mixFactor);
  `,
  'water-drops': `
    float cappedTime = uTime * (1.0 - step(1.0, uProgress * 2.0)); // Stop time after 1s (uProgress * 2.0 reaches 1.0 in 0.5s)
    float ripple = sin(length(uv - 0.5) * 25.0 - cappedTime * 6.0) * 0.08;
    vec2 distortedUV = uv + ripple * uProgress * 0.5;
    float noise = snoise(uv * 8.0 + cappedTime * 0.4);
    float mixFactor = smoothstep(0.0, 1.0, uProgress + noise * 0.15 + ripple * 0.3);
    vec4 currentColor = texture2D(uCurrentTexture, uv);
    vec4 nextColor = texture2D(uNextTexture, distortedUV);
    gl_FragColor = mix(currentColor, nextColor, mixFactor);
  `,
  glitch: `
    float noise = snoise(uv * 10.0 + uTime * 0.5);
    vec2 offset = vec2(noise * 0.05 * uProgress, noise * 0.03 * uProgress);
    vec4 r = texture2D(uCurrentTexture, uv + offset * 0.5);
    vec4 g = texture2D(uCurrentTexture, uv);
    vec4 b = texture2D(uCurrentTexture, uv - offset * 0.5);
    vec4 currentColor = vec4(r.r, g.g, b.b, 1.0);
    r = texture2D(uNextTexture, uv + offset);
    g = texture2D(uNextTexture, uv);
    b = texture2D(uNextTexture, uv - offset);
    vec4 nextColor = vec4(r.r, g.g, b.b, 1.0);
    float mixFactor = smoothstep(0.0, 1.0, uProgress + noise * 0.3);
    gl_FragColor = mix(currentColor, nextColor, mixFactor);
  `,
  'radial-wipe': `
    float dist = length(uv - 0.5);
    float wipe = smoothstep(0.0, 0.5, uProgress - dist);
    float glow = 0.1 / (dist + 0.1);
    vec4 currentColor = texture2D(uCurrentTexture, uv);
    vec4 nextColor = texture2D(uNextTexture, uv);
    gl_FragColor = mix(currentColor, nextColor, wipe + glow * 0.2 * uProgress);
  `,
};

const ShadersSlider = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const texturesRef = useRef([]);
  const meshRef = useRef(null);
  const animationIdRef = useRef(null);
  const progressRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transitionType, setTransitionType] = useState('triangle-slide');

  useEffect(() => {
    if (!canvasRef.current) {
      console.warn('Canvas ref is null, aborting setup');
      return;
    }

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    if (!context) {
      console.error('WebGL2 is not supported');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    let failedCount = 0;
    texturesRef.current = images.map((src, index) =>
      loader.load(
        src,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          loadedCount++;
          if (loadedCount + failedCount === images.length) {
            setIsLoaded(true);
          }
        },
        undefined,
        (err) => {
          console.error(`Failed to load texture ${src}:`, err);
          failedCount++;
          texturesRef.current[index] = new THREE.Texture();
          if (loadedCount + failedCount === images.length) {
            setIsLoaded(true);
          }
        }
      )
    );

    const currentTexture = texturesRef.current[0] || new THREE.Texture();
    const nextTexture = texturesRef.current[1] || new THREE.Texture();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uCurrentTexture: { value: currentTexture },
        uNextTexture: { value: nextTexture },
        uProgress: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uCurrentTexture;
        uniform sampler2D uNextTexture;
        uniform float uProgress;
        uniform vec2 uResolution;
        uniform float uTime;
        varying vec2 vUv;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;
          ${transitions[transitionType]}
        }
      `,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const animate = () => {
      if (!rendererRef.current || !materialRef.current) return;
      animationIdRef.current = requestAnimationFrame(animate);
      materialRef.current.uniforms.uTime.value += 0.016;
      if (isTransitioningRef.current) {
        progressRef.current += 0.016 / 0.5; // 0.5s transition
        materialRef.current.uniforms.uProgress.value = Math.min(progressRef.current, 1.0);
        if (progressRef.current >= 1.0) {
          isTransitioningRef.current = false;
          progressRef.current = 0;
          materialRef.current.uniforms.uCurrentTexture.value = materialRef.current.uniforms.uNextTexture.value;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      material.uniforms.uResolution.value.set(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    setIsSetupComplete(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && canvasRef.current && rendererRef.current.domElement.parentNode) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current && meshRef.current) {
        sceneRef.current.remove(meshRef.current);
      }
      texturesRef.current.forEach((texture) => texture.dispose());
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.fragmentShader = `
        precision highp float;
        uniform sampler2D uCurrentTexture;
        uniform sampler2D uNextTexture;
        uniform float uProgress;
        uniform vec2 uResolution;
        uniform float uTime;
        varying vec2 vUv;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;
          ${transitions[transitionType]}
        }
      `;
      materialRef.current.needsUpdate = true;
    }
  }, [transitionType]);

  const handleSlideChange = (swiper) => {
    if (!isSetupComplete || !isLoaded || !materialRef.current || isTransitioningRef.current) {
      return;
    }
    isTransitioningRef.current = true;
    progressRef.current = 0;
    materialRef.current.uniforms.uProgress.value = 0;
    const index = swiper.realIndex;
    materialRef.current.uniforms.uNextTexture.value = texturesRef.current[index] || new THREE.Texture();

    // Randomly select a transition
    const transitionKeys = Object.keys(transitions);
    const randomTransition = transitionKeys[Math.floor(Math.random() * transitionKeys.length)];
    setTransitionType(randomTransition);
  };

  return (
    <div className="slider-container" ref={canvasRef}>
      {!isLoaded && (
        <div className="preloader">
          <div className="preloader-spinner"></div>
        </div>
      )}
      <div className="overlay"></div>
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        onSlideChange={handleSlideChange}
        className="swiper"
        aria-label="Image slider with shader transitions"
      >
        {images.map((_, index) => (
          <SwiperSlide key={index} data-index={index} />
        ))}
        <div className="swiper-pagination" aria-label="Slide pagination"></div>
        <div className="swiper-button-prev" aria-label="Previous slide"></div>
        <div className="swiper-button-next" aria-label="Next slide"></div>
      </Swiper>
    </div>
  );
};

export default ShadersSlider;