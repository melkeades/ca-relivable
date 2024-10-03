type StandAloneVideoUrl = {
    src: string;
    type: string;
    xr: boolean;
};
declare const ImmersiveVideoPlayer: ({ mediaType, mediaId, viewMedia, moments, isXR, isSingle, viewOnly, standAloneVideoUrl }: {
    mediaType?: any;
    mediaId?: string;
    viewMedia?: any;
    moments?: any;
    isXR?: any;
    isSingle?: any;
    viewOnly?: any;
    standAloneVideoUrl?: StandAloneVideoUrl;
}) => React.JSX.Element;

export { ImmersiveVideoPlayer as default };