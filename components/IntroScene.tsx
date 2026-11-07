
"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --------------------------------------------------
// PALETA DO PLANETA
// --------------------------------------------------

const COLORS = {
  space: "#090d1b",
  ground: "#252b45",
  groundLight: "#42405f",
  cyan: "#63e8ff",
  blue: "#3677c9",
  suit: "#e9eff5",
  suitShadow: "#aebdce",
  visor: "#101a32",
  gold: "#ffca70",
  violet: "#9274ff",
  plant: "#6cdbb1",
};

const CAMERA_INITIAL = new THREE.Vector3(0, 3.4, 10);
const CAMERA_FINAL = new THREE.Vector3(1.5, 2.7, 7.2);
const LOOK_INITIAL = new THREE.Vector3(0, 1, 0);
const LOOK_FINAL = new THREE.Vector3(1.7, 1.1, 0);

// --------------------------------------------------
// ASTRONAUTA PROCEDURAL
// --------------------------------------------------

function Astronaut({ started }: { started: boolean }) {
  const astronautRef = useRef<THREE.Group>(null!);
  const leftArmRef = useRef<THREE.Group>(null!);
  const rightArmRef = useRef<THREE.Group>(null!);
  const helmetRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    astronautRef.current.position.y =
      Math.sin(time * 1.3) * 0.035;

    astronautRef.current.rotation.y =
      Math.sin(time * 0.35) * 0.08 + (started ? 0.12 : 0);

    leftArmRef.current.rotation.z =
      Math.sin(time * 1.1) * 0.045 - 0.08;

    rightArmRef.current.rotation.z =
      Math.sin(time * 1.1 + 1) * 0.045 + 0.08;

    helmetRef.current.rotation.y =
      Math.sin(time * 0.65) * 0.035;
  });

  return (
    <group
      ref={astronautRef}
      position={[2.25, 0, 0.25]}
      rotation={[0, -0.12, 0]}
    >
      {/* MOCHILA DE SOBREVIVÊNCIA */}
      <group position={[0, 0.25, -0.48]}>
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.95, 0.38]} />
          <meshStandardMaterial
            color="#53647e"
            metalness={0.55}
            roughness={0.5}
          />
        </mesh>

        <mesh position={[0, 0.28, -0.23]}>
          <boxGeometry args={[0.55, 0.28, 0.12]} />
          <meshStandardMaterial color="#273b58" />
        </mesh>

        <mesh position={[-0.42, 0.1, 0]}>
          <boxGeometry args={[0.12, 0.62, 0.32]} />
          <meshStandardMaterial color={COLORS.gold} />
        </mesh>

        <mesh position={[0.42, 0.1, 0]}>
          <boxGeometry args={[0.12, 0.62, 0.32]} />
          <meshStandardMaterial color={COLORS.cyan} />
        </mesh>

        <mesh position={[0, -0.22, 0.205]}>
          <boxGeometry args={[0.3, 0.12, 0.035]} />
          <meshBasicMaterial color={COLORS.cyan} />
        </mesh>
      </group>

      {/* PERNAS */}
      {[-0.25, 0.25].map((x, index) => (
        <group key={index} position={[x, -0.48, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.2, 0.48, 5, 10]} />
            <meshStandardMaterial color={COLORS.suit} roughness={0.7} />
          </mesh>

          <mesh position={[0, -0.05, 0.185]}>
            <boxGeometry args={[0.22, 0.2, 0.08]} />
            <meshStandardMaterial color={COLORS.blue} />
          </mesh>

          {/* JOELHEIRA */}
          <mesh position={[0, 0.13, 0.17]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshStandardMaterial color="#71839b" />
          </mesh>

          {/* BOTAS */}
          <mesh position={[0, -0.39, 0.09]} castShadow>
            <boxGeometry args={[0.42, 0.23, 0.58]} />
            <meshStandardMaterial
              color="#dce5ef"
              roughness={0.75}
            />
          </mesh>

          <mesh position={[0, -0.515, 0.12]}>
            <boxGeometry args={[0.42, 0.045, 0.58]} />
            <meshStandardMaterial color="#334d6c" />
          </mesh>
        </group>
      ))}

      {/* CORPO */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.43, 0.62, 6, 12]} />
        <meshStandardMaterial
          color={COLORS.suit}
          roughness={0.72}
        />
      </mesh>

      {/* PEITORAL */}
      <mesh position={[0, 0.32, 0.39]}>
        <boxGeometry args={[0.52, 0.38, 0.12]} />
        <meshStandardMaterial
          color="#536b8b"
          metalness={0.25}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[0, 0.39, 0.465]}>
        <boxGeometry args={[0.26, 0.1, 0.025]} />
        <meshBasicMaterial color={COLORS.cyan} />
      </mesh>

      <mesh position={[-0.12, 0.18, 0.465]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color={COLORS.gold} />
      </mesh>

      {/* OMBROS E BRAÇOS */}
      <group ref={leftArmRef} position={[-0.52, 0.53, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.19, 0.52, 5, 10]} />
          <meshStandardMaterial color={COLORS.suit} />
        </mesh>

        <mesh position={[0, -0.18, 0.14]}>
          <boxGeometry args={[0.29, 0.19, 0.12]} />
          <meshStandardMaterial color={COLORS.blue} />
        </mesh>

        <mesh position={[0, -0.47, 0]}>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial color="#d8e1eb" />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.52, 0.53, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.19, 0.52, 5, 10]} />
          <meshStandardMaterial color={COLORS.suit} />
        </mesh>

        <mesh position={[0, -0.18, 0.14]}>
          <boxGeometry args={[0.29, 0.19, 0.12]} />
          <meshStandardMaterial color={COLORS.gold} />
        </mesh>

        <mesh position={[0, -0.47, 0]}>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial color="#d8e1eb" />
        </mesh>
      </group>

      {/* CAPACETE */}
      <group ref={helmetRef} position={[0, 1.25, 0.02]}>
        <mesh castShadow>
          <sphereGeometry args={[0.7, 24, 20]} />
          <meshStandardMaterial
            color="#f3f6fa"
            roughness={0.3}
            metalness={0.08}
          />
        </mesh>

        {/* VISOR */}
        <mesh position={[0, -0.02, 0.48]} scale={[1, 0.78, 0.38]}>
          <sphereGeometry args={[0.59, 24, 20]} />
          <meshPhysicalMaterial
            color={COLORS.visor}
            metalness={0.8}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* REFLEXO DO VISOR */}
        <mesh
          position={[-0.22, 0.2, 0.69]}
          rotation={[0, 0, -0.45]}
        >
          <boxGeometry args={[0.07, 0.28, 0.018]} />
          <meshBasicMaterial
            color="#a8f2ff"
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* ANEL DO CAPACETE */}
        <mesh position={[0, -0.53, 0]}>
          <torusGeometry args={[0.54, 0.075, 8, 28]} />
          <meshStandardMaterial color="#71849e" metalness={0.5} />
        </mesh>

        {/* LUZES LATERAIS */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.64, 0, 0.04]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshBasicMaterial color={COLORS.cyan} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --------------------------------------------------
// NAVE ACIDENTADA
// --------------------------------------------------

function CrashedShip() {
  const shipRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    shipRef.current.position.y =
      -0.05 + Math.sin(time * 0.45) * 0.015;
  });

  return (
    <group
      ref={shipRef}
      position={[-1.6, 0.75, -3.5]}
      rotation={[0.12, 0.2, -0.23]}
    >
      {/* FUSELAGEM */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.58, 0.75, 3.1, 10]} />
        <meshStandardMaterial
          color="#64758c"
          metalness={0.75}
          roughness={0.5}
        />
      </mesh>

      {/* PONTA */}
      <mesh position={[1.67, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.58, 0.75, 10]} />
        <meshStandardMaterial color="#9aa8b9" metalness={0.6} />
      </mesh>

      {/* CABINE */}
      <mesh position={[0, 0.43, 0.1]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.46, 16, 12]} />
        <meshPhysicalMaterial
          color="#153b62"
          metalness={0.7}
          roughness={0.12}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* ASA DANIFICADA */}
      <mesh
        position={[-0.2, -0.2, 0.72]}
        rotation={[0.2, 0.2, -0.4]}
      >
        <boxGeometry args={[1.3, 0.08, 1.8]} />
        <meshStandardMaterial color="#4a5b74" metalness={0.6} />
      </mesh>

      {/* MOTOR */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.48, 0.5, 10]} />
        <meshStandardMaterial color="#28364c" metalness={0.8} />
      </mesh>

      {/* ENERGIA RESIDUAL */}
      <mesh position={[-1.76, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.08, 12]} />
        <meshBasicMaterial color={COLORS.cyan} />
      </mesh>

      {/* ANTENA */}
      <mesh position={[0.2, 0.95, -0.15]}>
        <cylinderGeometry args={[0.025, 0.025, 0.85, 6]} />
        <meshStandardMaterial color="#aab7c9" metalness={0.8} />
      </mesh>

      <mesh position={[0.2, 1.38, -0.15]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color={COLORS.gold} />
      </mesh>
    </group>
  );
}

// --------------------------------------------------
// TERRENO E ELEMENTOS ALIENÍGENAS
// --------------------------------------------------

function AlienPlant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.045, 0.08, 0.58, 7]} />
        <meshStandardMaterial color="#527f83" />
      </mesh>

      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          position={[
            Math.sin(index * 2.1) * 0.22,
            0.43 + index * 0.08,
            Math.cos(index * 2.1) * 0.15,
          ]}
          rotation={[0.3, index * 2.1, 0.55]}
        >
          <coneGeometry args={[0.15, 0.62, 7]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? COLORS.plant : COLORS.violet}
            emissive={index % 2 === 0 ? "#174c49" : "#35205e"}
            emissiveIntensity={0.5}
            roughness={0.7}
          />
        </mesh>
      ))}

      <pointLight
        color={COLORS.plant}
        intensity={0.35}
        distance={2}
      />
    </group>
  );
}

function Terrain() {
  return (
    <group>
      {/* SOLO */}
      <mesh
        position={[0, -0.18, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial
          color={COLORS.ground}
          roughness={1}
          metalness={0.05}
        />
      </mesh>

      {/* COLINAS */}
      <mesh position={[-6, 0.15, -7]} scale={[7, 1.1, 4]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#202943" roughness={1} />
      </mesh>

      <mesh position={[7, 0.1, -9]} scale={[8, 1.4, 5]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#252c48" roughness={1} />
      </mesh>

      {/* ROCHAS */}
      {[
        [-3.5, 0.15, 0.5, 0.65],
        [-5, 0.18, -2, 0.9],
        [4.4, 0.15, -1.8, 0.8],
        [5.2, 0.2, 1.2, 0.55],
        [-0.5, 0.13, -4.2, 0.5],
      ].map(([x, y, z, size], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0.2 * index, 0.6 * index, 0.15]}
          scale={[size, size * 0.7, size * 0.9]}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#59627b" : "#3e4965"}
            roughness={0.95}
          />
        </mesh>
      ))}

      {/* VEGETAÇÃO */}
      <AlienPlant position={[-4, 0, -0.8]} scale={1.1} />
      <AlienPlant position={[5, 0, -3]} scale={0.8} />
      <AlienPlant position={[4.5, 0, 2]} scale={0.7} />
      <AlienPlant position={[-5.5, 0, -4]} scale={0.9} />

      {/* CRISTAIS */}
      {[
        [-2.9, 0.55, -1.5],
        [4.1, 0.48, -0.2],
        [-4.8, 0.4, 1.8],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[0.1, index, 0.15]}
        >
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={COLORS.cyan}
            emissive="#167b9d"
            emissiveIntensity={1.2}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// --------------------------------------------------
// ESTRELAS
// --------------------------------------------------

function StarField() {
  const stars = Array.from({ length: 100 }, (_, index) => {
    const x = Math.sin(index * 127.1) * 16;
    const y = 3 + Math.abs(Math.cos(index * 78.2)) * 10;
    const z = -12 - (index % 13) * 1.3;

    return {
      position: [x, y, z] as [number, number, number],
      size: 0.018 + (index % 4) * 0.009,
    };
  });

  return (
    <group>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[star.size, 5, 5]} />
          <meshBasicMaterial
            color={index % 5 === 0 ? COLORS.cyan : "#dce8ff"}
          />
        </mesh>
      ))}
    </group>
  );
}

// --------------------------------------------------
// CÂMERA E CENA
// --------------------------------------------------

function WorldScene({ started }: { started: boolean }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const destination = started ? CAMERA_FINAL : CAMERA_INITIAL;
    const lookTarget = started ? LOOK_FINAL : LOOK_INITIAL;
    const smooth = 1 - Math.exp(-delta * 1.2);

    camera.position.lerp(destination, smooth);
    camera.lookAt(lookTarget);
  });

  return (
    <>
      <color attach="background" args={[COLORS.space]} />
      <fog attach="fog" args={[COLORS.space, 13, 35]} />

      <ambientLight intensity={1.15} color="#b8caff" />

      <directionalLight
        position={[-5, 8, 5]}
        intensity={2}
        color="#d4eaff"
      />

      <pointLight
        position={[4, 4, 2]}
        intensity={30}
        distance={12}
        color={COLORS.violet}
      />

      <pointLight
        position={[-4, 3, -1]}
        intensity={22}
        distance={10}
        color={COLORS.cyan}
      />

      <Terrain />
      <CrashedShip />
      <Astronaut started={started} />
      <StarField />
    </>
  );
}

// --------------------------------------------------
// COMPONENTE PRINCIPAL
// --------------------------------------------------

export default function IntroScene() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleStart = () => setStarted(true);

    window.addEventListener("astroterrax:start", handleStart);

    return () => {
      window.removeEventListener("astroterrax:start", handleStart);
    };
  }, []);

  return (
    <div
      className="intro-scene"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{
          position: [0, 3.4, 10],
          fov: 43,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <WorldScene started={started} />
      </Canvas>
    </div>
  );
}
