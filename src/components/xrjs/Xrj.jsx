import { OrbitControls, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { XRCanvas, PointerHand, PointerController } from '@coconut-xr/natuerlich/defaults';
import { RootText, clippingEvents } from '@coconut-xr/koestlich';
import { getInputSourceId } from '@coconut-xr/natuerlich';
import { useSessionSupported } from '@coconut-xr/natuerlich/react';
import { XWebPointers } from '@coconut-xr/xinteraction/react';
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useInputSources,
  XR,
  useXR,
} from '@coconut-xr/natuerlich/react';
import { useEffect, useState, useRef, useCallback, forwardRef } from 'react';
import Glass from './Glass';
import Hud from './Hud';
import Dome from './Dome';
import { momentS, photoIndexS, favoriteMoments, screenS } from '../../App';
import { mediaDb as db } from '../../db';
import { effect } from '@preact/signals-react';

import { Footer } from '../footer/footer';

const mediaPath = '../360/';

const sessionOptions = {
  requiredFeatures: ['local-floor'],
};

export default function Xrj({ index = 0, moment = 'favorites' }) {
  const mediaDb = moment === 'favorites' ? favoriteMoments : db[moment];
  const muteRef = useRef();
  const pauseRef = useRef(null);

  const enterAR = useEnterXR('immersive-vr', sessionOptions);
  const inputSources = useInputSources();
  const [orbitControl, setOrbitControl] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(index);
  // console.log(mediaDb, photoIndex);
  useEffect(() => {
    if (screenS.value === 'momentOpen') setPhotoIndex(index);
  }, [index]);

  const props = {
    mediaDb: mediaDb,
    photoIndex: photoIndex,
    setPhotoIndex: setPhotoIndex,
  };
  // console.log(photoIndex);
  return (
    <>
      {useSessionSupported('immersive-vr') && (
        <button className="btn--xr" onClick={enterAR}>
          Enter VR
        </button>
      )}
      <XRCanvas events={clippingEvents} gl={{ localClippingEnabled: true }}>
        <OrbitControls enableRotate={orbitControl} />
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
        {inputSources.map((inputSource) =>
          inputSource.hand != null ? (
            <PointerHand
              id={getInputSourceId(inputSource)}
              key={getInputSourceId(inputSource)}
              inputSource={inputSource}
              hand={inputSource.hand}
              childrenAtJoint="wrist"
            ></PointerHand>
          ) : (
            <PointerController
              id={getInputSourceId(inputSource)}
              key={getInputSourceId(inputSource)}
              inputSource={inputSource}
            ></PointerController>
          )
        )}
        <Dome
          // photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          mediaPath={mediaPath}
          mediaDb={mediaDb}
          photoIndex={photoIndex}
          pauseRef={pauseRef}
          muteRef={muteRef}
          // moment={moment}
        />
        <Hud
          // setPhotoIndex={setPhotoIndex}
          setOrbitControl={setOrbitControl}
          mediaPath={mediaPath}
          mediaDb={mediaDb}
        />
      </XRCanvas>
      {/* <Footer mediaDb={mediaDb} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} /> */}
      {/* <Footer {...props} ref={refs} /> */}
      <Footer {...props} ref={{ pauseRef: pauseRef, muteRef: muteRef }} />

      {/* <Footer {...props} ref={pauseRef} /> */}
    </>
  );
}
