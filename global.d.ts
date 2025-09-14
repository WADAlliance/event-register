import { WaveMaterial } from './components/WaveMaterial'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<WaveMaterial, typeof WaveMaterial>
    }
  }
}
