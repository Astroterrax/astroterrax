
"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerControllerProps {
  children: ReactNode;
  active: boolean;
}

const WALK_SPEED = 3.2;
const RUN_SPEED = 6;
const JUMP_FORCE = 5;
const GRAVITY = 12;
const CAMERA_DISTANCE = 6.5;

export default function PlayerController({
  children,
  active,
}: PlayerControllerProps) {
  const playerRef = useRef<THREE.Group>(null!);

  const keys = useRef<Record<string, boolean>>({});
  const yaw = useRef(0);
  const pitch = useRef(0.22);
  const verticalVelocity = useRef(0);
  const grounded = useRef(true);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const { camera, gl } = useThree();

  const cameraTarget = useRef(new THREE.Vector3());
  const desiredCamera = useRef(new THREE.Vector3());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)
      ) {
        event.preventDefault();
      }

      keys.current[key] = true;
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };

    const onBlur = () => {
      keys.current = {};
      dragging.current = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!active || event.button !== 0) return;

      dragging.current = true;
      lastMouse.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current || !active) return;

      const deltaX = event.clientX - lastMouse.current.x;
      const deltaY = event.clientY - lastMouse.current.y;

      lastMouse.current = {
        x: event.clientX,
        y: event.clientY,
      };

      yaw.current -= deltaX * 0.004;
      pitch.current = THREE.MathUtils.clamp(
        pitch.current + deltaY * 0.003,
        -0.05,
        0.85
      );
    };

    const onPointerUp = () => {
      dragging.current = false;
    };

    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [active, gl]);

  useFrame((_, delta) => {
    const player = playerRef.current;
    if (!player) return;

    const frameDelta = Math.min(delta, 0.05);

    if (active) {
      const forward =
        Number(keys.current.w || keys.current.arrowup) -
        Number(keys.current.s || keys.current.arrowdown);

      const sideways =
        Number(keys.current.d || keys.current.arrowright) -
        Number(keys.current.a || keys.current.arrowleft);

      const movement = new THREE.Vector3(
        0,
        0,
        0
      );

      movement.x =
        Math.sin(yaw.current) * forward +
        Math.cos(yaw.current) * sideways;

      movement.z =
        Math.cos(yaw.current) * forward -
        Math.sin(yaw.current) * sideways;

      if (movement.lengthSq() > 0) {
        movement.normalize();

        const running =
          keys.current.shift ||
          keys.current.shiftleft ||
          keys.current.shiftright;

        const speed = running ? RUN_SPEED : WALK_SPEED;

        player.position.x += movement.x * speed * frameDelta;
        player.position.z += movement.z * speed * frameDelta;

        player.rotation.y = THREE.MathUtils.damp(
          player.rotation.y,
          Math.atan2(movement.x, movement.z),
          9,
          frameDelta
        );
      }

      // PULO
      if (
        (keys.current[" "] || keys.current.space) &&
        grounded.current
      ) {
        verticalVelocity.current = JUMP_FORCE;
        grounded.current = false;
      }

      if (!grounded.current) {
        verticalVelocity.current -= GRAVITY * frameDelta;
        player.position.y += verticalVelocity.current * frameDelta;

        if (player.position.y <= 0) {
          player.position.y = 0;
          verticalVelocity.current = 0;
          grounded.current = true;
        }
      }

      // CÂMERA ATRÁS DO PERSONAGEM
      const horizontalDistance =
        CAMERA_DISTANCE * Math.cos(pitch.current);

      desiredCamera.current.set(
        player.position.x -
          Math.sin(yaw.current) * horizontalDistance,
        player.position.y +
          1.8 +
          CAMERA_DISTANCE * Math.sin(pitch.current),
        player.position.z -
          Math.cos(yaw.current) * horizontalDistance
      );

      cameraTarget.current.set(
        player.position.x,
        player.position.y + 1.25,
        player.position.z
      );

      const smooth = 1 - Math.exp(-5 * frameDelta);

      camera.position.lerp(desiredCamera.current, smooth);

      const currentLook = new THREE.Vector3();
      camera.getWorldDirection(currentLook);

      const desiredLook = cameraTarget.current
        .clone()
        .sub(camera.position)
        .normalize();

      currentLook.lerp(desiredLook, smooth).normalize();

      camera.lookAt(
        camera.position.clone().add(currentLook)
      );
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 0]}>
      {children}
    </group>
  );
}
