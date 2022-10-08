import type { FC } from 'react';
import React from 'react';
import videojs from 'video.js';
import type { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.min.css';
import '../css/landing-sections/video.css';

export interface VideoProps {
    options: VideoJsPlayerOptions,
    // eslint-disable-next-line react/require-default-props
    onReady?: ((player: VideoJsPlayer) => void) | undefined
}

export const Video: FC<VideoProps> = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady?.(player);
      });
      playerRef.current = player;
    }
    return () => {
      playerRef.current.dispose();
    };
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default Video;
