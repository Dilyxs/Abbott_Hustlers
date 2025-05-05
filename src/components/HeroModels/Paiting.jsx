import { useGLTF } from '@react-three/drei';

export function PainterModel() {
  const { scene } = useGLTF('/models/painter.glb'); 

  return <primitive object={scene} />;
}