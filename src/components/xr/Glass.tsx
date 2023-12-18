import { Container } from '@coconut-xr/koestlich';
import { makeBorderMaterial } from '@coconut-xr/xmaterials';
import { MeshPhongMaterial } from 'three';

const GlassMaterial = makeBorderMaterial(MeshPhongMaterial, {
    specular: '#555',
    shininess: 100,
});

interface GlassProps {
    backgroundColor?: number;
}

const Glass: React.FC<GlassProps> = ({ backgroundColor = 0x888888, ...props }) => {
    return (
        <Container
            backgroundColor={backgroundColor}
            backgroundOpacity={0.8}
            borderColor={backgroundColor}
            border={4}
            borderOpacity={0.8}
            borderBend={0.3}
            material={GlassMaterial}
            {...props}
        />
    );
};

export default Glass;
