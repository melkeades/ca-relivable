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
import { momentS, photoIndexS, favoriteMoments } from '../../App';
import { mediaDb as db } from '../../db';
import { effect } from '@preact/signals-react';

import { Footer } from '../footer/footer';

const mediaPath = '../360/';

// const mediaDb = db[momentS.value];
// export const mediaDb = [
//   { type: 'video', src: 'v1.mp4', thumb: 'v1.jpg', name: 'Moment Name a' },
//   { type: 'video', src: 'v2.mp4', thumb: 'v2.jpg', name: 'Moment Name a' },
//   { type: 'image', src: 'w1.webp', thumb: '', name: 'Moment Name b' },
//   { type: 'image', src: 'w2.webp', thumb: '', name: 'Moment Name b' },
//   { type: 'image', src: 'w3.webp', thumb: '', name: 'Moment Name c' },
//   { type: 'image', src: 'w4.webp', thumb: '', name: 'Moment Name c' },
// ];

const sessionOptions = {
  requiredFeatures: ['local-floor'],
};

export default function Xrj({ index = 0, moment = 'favorites' }) {
  const mediaDb = moment === 'favorites' ? favoriteMoments : db[moment];

  const muteRef = useRef();
  const pauseRef = useRef(null);
  // photoIndexS.value = photoIndex;
  // console.log(photoIndex, moment, mediaDb);
  // console.log(mediaDb.length);
  // let mediaDb;
  // effect(() => {
  //   mediaDb = favoriteS?.value ? favoriteMoments : db[momentS?.value];
  //   console.log('c', momentS?.value, mediaDb);
  // });

  const enterAR = useEnterXR('immersive-vr', sessionOptions);
  const inputSources = useInputSources();

  const [orbitControl, setOrbitControl] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(index);
  // useEffect(() => {
  //   pauseRef.current.addEventListener('click', handleClick);
  //   return () => {
  //     pauseRef.current.removeEventListener('click', handleClick);
  //   };
  // }, []);

  // const handleClick = (event) => {
  //   console.log('Clicked!');
  // };
  // console.log(document.querySelector('#pause'));

  //  refs = {{ ref1: this.pauseRef, ref2: this.muteRef }};
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
