import { useCallback, FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, useVideoTexture } from '@react-three/drei';

interface ImageTextureProps {
    mediaFile: string;
    texture: THREE.Texture | undefined;
    setTexture: React.Dispatch<React.SetStateAction<THREE.Texture | undefined>>;
}

const ImageTexture: FC<ImageTextureProps> = ({ mediaFile, texture, setTexture }) => {
    const _texture = useTexture(mediaFile);

    useEffect(() => {
        setTexture(_texture);
    }, [_texture]);

    return (
        <meshBasicMaterial
            attach="material"
            map={_texture}
            toneMapped={false}
            side={THREE.BackSide}
            onUpdate={(self: any) => (self.needsUpdate = true)}
        />
    );
};

interface VideoTextureProps {
    mediaFile: string;
    texture: THREE.Texture | undefined;
    setTexture: React.Dispatch<React.SetStateAction<THREE.Texture | undefined>>;
    videoPaused: boolean;
    setVideoPaused: React.Dispatch<React.SetStateAction<boolean>>;
    videoMuted: boolean;
    setVideoMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoTexture: FC<VideoTextureProps> = ({
    mediaFile,
    texture,
    setTexture,
    videoPaused,
    setVideoPaused,
    videoMuted,
    setVideoMuted,
}) => {
    const videoProps = {
        crossOrigin: 'Anonymous',
        loop: true,
        muted: true,
        volume: 0.5,
    };

    const _texture = useVideoTexture(mediaFile, videoProps);

    useEffect(() => {
        setTexture(_texture.image);
    }, [_texture]);

    return (
        <meshBasicMaterial
            attach="material"
            map={_texture}
            toneMapped={false}
            side={THREE.BackSide}
            onUpdate={(self: any) => (self.needsUpdate = true)}
        />
    );
};

interface DomeProps {
    photoIndex: number;
    setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
    mediaPath: string;
    mediaDb: Media[];
}

interface Media {
    type: string;
    src: string;
}

const Dome: FC<DomeProps> = ({ photoIndex, setPhotoIndex, mediaPath, mediaDb }) => {
    const [texture, setTexture] = useState<THREE.Texture>();
    const [prevIndex, setPrevIndex] = useState<number>(photoIndex);
    const [videoPaused, setVideoPaused] = useState<boolean>(false);
    const [videoMuted, setVideoMuted] = useState<boolean>(true);
    const [mediaType, setMediaType] = useState<string>(mediaDb[photoIndex].type);
    const [mediaFile, setMediaFile] = useState<string>(mediaPath + mediaDb[photoIndex].src);

    useEffect(() => {
        // texture?.pause();
        texture?.remove();
        setMediaType(mediaDb[photoIndex].type);
        setMediaFile(mediaPath + mediaDb[photoIndex].src);
    }, [photoIndex]);

    // useEffect(() => {
    //     if (videoPaused && mediaType === 'video') {
    //         texture.pause();
    //     }
    // }, [photoIndex, texture, videoPaused, mediaType]);

    // useEffect(() => {
    //     function handler() {
    //         if (mediaType === 'video') {
    //             if (videoPaused) {
    //                 pause$.style.opacity = 1;
    //                 texture.play();
    //             } else {
    //                 pause$.style.opacity = 0.3;
    //                 texture.pause();
    //             }
    //             setVideoPaused(!videoPaused);
    //         }
    //     }
    //     pause$.addEventListener('click', handler);
    //     return () => pause$.removeEventListener('click', handler);
    // }, [videoPaused, texture, mediaType]);

    useEffect(() => {
        if (!videoMuted && mediaType === 'video') {
            console.log('change while unmuted');
            texture.muted = false;
        }
        if (videoMuted && mediaType === 'video' && texture) {
            texture.muted = true;
        }
    }, [photoIndex, texture, videoMuted, mediaType]);

    useEffect(() => {
        function handler() {
            if (mediaType === 'video') {
                if (!videoMuted) {
                    vol$.style.opacity = 1;
                    texture.muted = true;
                    console.log('muted');
                } else {
                    vol$.style.opacity = 0.3;
                    texture.muted = false;
                    console.log('unmuted');
                }
                setVideoMuted(!videoMuted);
            }
        }
        vol$.addEventListener('click', handler);
        return () => vol$.removeEventListener('click', handler);
    }, [videoMuted, texture, mediaType]);

    return (
        <>
            <mesh position={[0, 0, 0]} scale-x={-1}>
                <sphereGeometry attach="geometry" args={[100, 100, 100]} />
                {mediaType === 'video' ? (
                    <VideoTexture
                        mediaFile={mediaFile}
                        texture={texture}
                        setTexture={setTexture}
                        videoPaused={videoPaused}
                        setVideoPaused={setVideoPaused}
                        videoMuted={videoMuted}
                        setVideoMuted={setVideoMuted}
                    />
                ) : (
                    <ImageTexture mediaFile={mediaFile} texture={texture} setTexture={setTexture} />
                )}
            </mesh>
        </>
    );
};

export default Dome;
