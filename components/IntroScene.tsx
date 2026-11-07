"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import PlayerController from "./PlayerController";

const COLORS = {
  sky: "#83c9ed",
  grass: "#6fae62",
  dirt: "#9b7956",
  dirtLight: "#b8956e",
  stone: "#858b91",
  cyan: "#63e8ff",
  blue: "#3677c9",
  suit: "#edf3f7",
  visor: "#152b43",
  gold: "#ffc96b",
};

function Astronaut() {
  const astronautRef = useRef<THREE.Group>(null!);
  const leftArmRef = useRef<THREE.Group>(null!);
  const rightArmRef = useRef<THREE.Group>(null!);
  const leftLegRef = useRef<THREE.Group>(null!);
  const rightLegRef = useRef<THREE.Group>(null!);
  const helmetRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const controller = astronautRef.current.parent;

    const moving = Boolean(controller?.userData.moving);
    const running = Boolean(controller?.userData.running);

    const speed = running ? 13 : 8;
    const swing = moving ? Math.sin(time * speed) : 0;

    const armAmount = moving ? (running ? 0.65 : 0.42) : 0.035;
    const legAmount = moving ? (running ? 0.7 : 0.48) : 0;

    leftArmRef.current.rotation.x = THREE.MathUtils.damp(
      leftArmRef.current.rotation.x,
      swing * armAmount,
      12,
      delta
    );

    rightArmRef.current.rotation.x = THREE.MathUtils.damp(
      rightArmRef.current.rotation.x,
      -swing * armAmount,
      12,
      delta
    );

    leftLegRef.current.rotation.x = THREE.MathUtils.damp(
      leftLegRef.current.rotation.x,
      -swing * legAmount,
      12,
      delta
    );

    rightLegRef.current.rotation.x = THREE.MathUtils.damp(
      rightLegRef.current.rotation.x,
      swing * legAmount,
      12,
      delta
    );

    astronautRef.current.position.y = moving
      ? Math.abs(Math.sin(time * speed * 2)) * 0.035
      : Math.sin(time * 1.3) * 0.012;

    helmetRef.current.rotation.y = Math.sin(time * 0.65) * 0.035;
  });

  return (
    <group ref={astronautRef}>
      {/* MOCHILA */}
      <group position={[0, 0.25, -0.48]}>
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.95, 0.38]} />
          <meshStandardMaterial color="#53647e" metalness={0.4} />
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

      {/* PERNA ESQUERDA */}
      <group ref={leftLegRef} position={[-0.25, -0.48, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.2, 0.48, 5, 10]} />
          <meshStandardMaterial color={COLORS.suit} roughness={0.75} />
        </mesh>

        <mesh position={[0, -0.05, 0.185]}>
          <boxGeometry args={[0.22, 0.2, 0.08]} />
          <meshStandardMaterial color={COLORS.blue} />
        </mesh>

        <mesh position={[0, 0.13, 0.17]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color="#71839b" />
        </mesh>

        <mesh position={[0, -0.39, 0.09]} castShadow>
          <boxGeometry args={[0.42, 0.23, 0.58]} />
          <meshStandardMaterial color="#dce5ef" roughness={0.75} />
        </mesh>

        <mesh position={[0, -0.515, 0.12]}>
          <boxGeometry args={[0.42, 0.045, 0.58]} />
          <meshStandardMaterial color="#334d6c" />
        </mesh>
      </group>

      {/* PERNA DIREITA */}
      <group ref={rightLegRef} position={[0.25, -0.48, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.2, 0.48, 5, 10]} />
          <meshStandardMaterial color={COLORS.suit} roughness={0.75} />
        </mesh>

        <mesh position={[0, -0.05, 0.185]}>
          <boxGeometry args={[0.22, 0.2, 0.08]} />
          <meshStandardMaterial color={COLORS.blue} />
        </mesh>

        <mesh position={[0, 0.13, 0.17]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color="#71839b" />
        </mesh>

        <mesh position={[0, -0.39, 0.09]} castShadow>
          <boxGeometry args={[0.42, 0.23, 0.58]} />
          <meshStandardMaterial color="#dce5ef" roughness={0.75} />
        </mesh>

        <mesh position={[0, -0.515, 0.12]}>
          <boxGeometry args={[0.42, 0.045, 0.58]} />
          <meshStandardMaterial color="#334d6c" />
        </mesh>
      </group>

      {/* CORPO */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.43, 0.62, 6, 12]} />
        <meshStandardMaterial color={COLORS.suit} roughness={0.72} />
      </mesh>

      {/* PEITORAL */}
      <mesh position={[0, 0.32, 0.39]}>
        <boxGeometry args={[0.52, 0.38, 0.12]} />
        <meshStandardMaterial color="#536b8b" metalness={0.25} />
      </mesh>

      <mesh position={[0, 0.39, 0.465]}>
        <boxGeometry args={[0.26, 0.1, 0.025]} />
        <meshBasicMaterial color={COLORS.cyan} />
      </mesh>

      <mesh position={[-0.12, 0.18, 0.465]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color={COLORS.gold} />
      </mesh>

      {/* BRAÇO ESQUERDO */}
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

      {/* BRAÇO DIREITO */}
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
          <meshStandardMaterial color="#f3f6fa" roughness={0.3} />
        </mesh>

        <mesh position={[0, -0.02, 0.48]} scale={[1, 0.78, 0.38]}>
          <sphereGeometry args={[0.59, 24, 20]} />
          <meshPhysicalMaterial
            color={COLORS.visor}
            metalness={0.75}
            roughness={0.17}
            clearcoat={1}
          />
        </mesh>

        <mesh
          position={[-0.22, 0.2, 0.69]}
          rotation={[0, 0, -0.45]}
        >
          <boxGeometry args={[0.07, 0.28, 0.018]} />
          <meshBasicMaterial color="#a8f2ff" />
        </mesh>

        <mesh position={[0, -0.53, 0]}>
          <torusGeometry args={[0.54, 0.075, 8, 28]} />
          <meshStandardMaterial color="#71849e" metalness={0.5} />
        </mesh>

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

function CrashedShip() {
  return (
    <group
      position={[-1.6, 0.75, -3.5]}
      rotation={[0.12, 0.2, -0.23]}
    >
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.58, 0.75, 3.1, 10]} />
        <meshStandardMaterial
          color="#64758c"
          metalness={0.65}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[1.67, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.58, 0.75, 10]} />
        <meshStandardMaterial color="#9aa8b9" metalness={0.5} />
      </mesh>

      <mesh position={[0, 0.43, 0.1]}>
        <sphereGeometry args={[0.46, 16, 12]} />
        <meshPhysicalMaterial
          color="#397da5"
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh
        position={[-0.2, -0.2, 0.72]}
        rotation={[0.2, 0.2, -0.4]}
      >
        <boxGeometry args={[1.3, 0.08, 1.8]} />
        <meshStandardMaterial color="#4a5b74" metalness={0.5} />
      </mesh>

      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.48, 0.5, 10]} />
        <meshStandardMaterial color="#28364c" metalness={0.7} />
      </mesh>

      <mesh position={[-1.76, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.08, 12]} />
        <meshBasicMaterial color={COLORS.cyan} />
      </mesh>

      <mesh position={[0.2, 0.95, -0.15]}>
        <cylinderGeometry args={[0.025, 0.025, 0.85, 6]} />
        <meshStandardMaterial color="#aab7c9" />
      </mesh>
    </group>
  );
}

function Cloud({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const cloudRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    cloudRef.current.position.x += delta * 0.045;

    if (cloudRef.current.position.x > 17) {
      cloudRef.current.position.x = -17;
    }
  });

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      {[
        [-0.8, 0, 0, 0.85],
        [0, 0.18, 0, 1.05],
        [0.85, 0.02, 0, 0.8],
        [-0.15, -0.12, 0.25, 0.75],
      ].map(([x, y, z, size], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          scale={[1.3, 0.75, 0.8]}
        >
          <sphereGeometry args={[size, 12, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Clouds() {
  return (
    <>
      <Cloud position={[-7, 7, -13]} scale={1.6} />
      <Cloud position={[2, 8, -16]} scale={1.25} />
      <Cloud position={[10, 6, -12]} scale={1.8} />
      <Cloud position={[-13, 5.5, -10]} scale={1.1} />
    </>
  );
}

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
        <meshStandardMaterial color="#527f55" />
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
            color={index % 2 === 0 ? "#68bfa0" : "#a28ad8"}
          />
        </mesh>
      ))}
    </group>
  );
}

function GrassTuft({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {[0, 1, 2, 3].map((index) => (
        <mesh
          key={index}
          position={[
            Math.sin(index * 1.7) * 0.08,
            0.15,
            Math.cos(index * 1.7) * 0.08,
          ]}
          rotation={[0.1, index * 1.7, 0.22 * (index - 1)]}
        >
          <coneGeometry args={[0.055, 0.34, 4]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#4f9950" : "#83bd65"}
          />
        </mesh>
      ))}
    </group>
  );
}

function Terrain() {
  const dirtPatches = [
    [-4, 0.01, 1, 2.1, 0.65],
    [0, 0.01, 3, 2.6, 0.8],
    [3.5, 0.01, -2, 1.7, 0.7],
    [-2, 0.01, -4, 2.3, 0.7],
    [5, 0.01, 3, 1.6, 0.6],
  ];

  const stones = [
    [-3.5, 0.14, 0.5, 0.22],
    [-5, 0.22, -2, 0.34],
    [4.4, 0.2, -1.8, 0.3],
    [5.2, 0.13, 1.2, 0.2],
    [-0.5, 0.12, -4.2, 0.18],
    [0.5, 0.1, 2.5, 0.15],
    [-4.5, 0.16, 3, 0.24],
    [3.5, 0.12, 4, 0.18],
  ];

  return (
    <group>
      <mesh position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={COLORS.grass} roughness={1} />
      </mesh>

      {dirtPatches.map(([x, y, z, sx, sz], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, index * 0.4]}
          scale={[sx, sz, 1]}
        >
          <circleGeometry args={[1, 20]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? COLORS.dirt : COLORS.dirtLight}
            roughness={1}
          />
        </mesh>
      ))}

      {stones.map(([x, y, z, size], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[index * 0.2, index, 0.2]}
          scale={[size * 1.4, size * 0.8, size]}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? COLORS.stone : "#a6a29a"}
            roughness={0.95}
          />
        </mesh>
      ))}

      <mesh position={[-7, 0.2, -8]} scale={[7, 1.3, 4]}>
        <sphereGeometry args={[1, 14, 10]} />
        <meshStandardMaterial color="#719b78" roughness={1} />
      </mesh>

      <mesh position={[8, 0.15, -10]} scale={[8, 1.5, 5]}>
        <sphereGeometry args={[1, 14, 10]} />
        <meshStandardMaterial color="#8bad80" roughness={1} />
      </mesh>

      <AlienPlant position={[-4, 0, -0.8]} scale={1.1} />
      <AlienPlant position={[5, 0, -3]} scale={0.8} />
      <AlienPlant position={[4.5, 0, 2]} scale={0.7} />
      <AlienPlant position={[-5.5, 0, -4]} scale={0.9} />

      <GrassTuft position={[-2.8, 0, 1.5]} />
      <GrassTuft position={[-4.5, 0, 2.5]} scale={1.2} />
      <GrassTuft position={[3.8, 0, 1.5]} />
      <GrassTuft position={[0.5, 0, -2.5]} />
      <GrassTuft position={[-5, 0, -1]} scale={0.8} />
      <GrassTuft position={[5.5, 0, -0.5]} />

      {[
        [-2.9, 0.35, -1.5],
        [4.1, 0.35, -0.2],
        [-4.8, 0.35, 1.8],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[0.1, index, 0.15]}
        >
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color={COLORS.cyan}
            emissive="#167b9d"
            emissiveIntensity={0.35}
            metalness={0.25}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Sun() {
  return (
    <group position={[-7, 9, -18]}>
      <mesh>
        <sphereGeometry args={[1.15, 20, 20]} />
        <meshBasicMaterial color="#fff1c2" />
      </mesh>

      <pointLight
        color="#fff0c7"
        intensity={75}
        distance={100}
        decay={2}
      />
    </group>
  );
}

function WorldScene({ started }: { started: boolean }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (started) return;

    const destination = new THREE.Vector3(0, 3.4, 10);
    const target = new THREE.Vector3(0, 1, 0);

    const smooth = 1 - Math.exp(-delta * 1.2);

    camera.position.lerp(destination, smooth);
    camera.lookAt(target);
  });

  return (
    <>
      <color attach="background" args={[COLORS.sky]} />
      <fog attach="fog" args={[COLORS.sky, 22, 55]} />

      <ambientLight intensity={1.8} color="#ffffff" />

      <hemisphereLight args={["#dff5ff", "#557b48", 1.2]} />

      <directionalLight
        position={[-5, 10, 5]}
        intensity={2.4}
        color="#fff3d8"
        castShadow
      />

      <pointLight
        position={[4, 4, 2]}
        intensity={12}
        distance={15}
        color="#b9c9ff"
      />

      <Sun />
      <Clouds />
      <Terrain />
      <CrashedShip />

      {started && (
        <PlayerController active={started}>
          <Astronaut />
        </PlayerController>
      )}

      {!started && (
        <group position={[2.25, 1.02, 0.25]}>
          <Astronaut />
        </group>
      )}
    </>
  );
}

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
        dpr={[1, 1.35]}
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
