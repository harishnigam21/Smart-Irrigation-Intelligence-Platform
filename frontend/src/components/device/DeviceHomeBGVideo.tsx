import React, { Ref, useEffect, useRef } from "react";

export default function DeviceHomeBGVideo({
  videoRef,
  setVideoLoaded,
  videoLoaded,
  isDesktop,
}: {
  videoRef: Ref<HTMLDivElement | null>;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
  videoLoaded: boolean;
}) {
  const inVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = inVideoRef.current;
    if (!video) return;
    if (video.readyState >= 2) {
      setVideoLoaded(true);
    }
  }, []);
  return (
    <div ref={videoRef} className="fixed top-0 left-0 z-1 w-full">
      <video
        ref={inVideoRef}
        key={isDesktop ? "desktop" : "mobile"}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        width="100%"
        height="auto"
        className={`aspect-auto ${videoLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <source
          src={isDesktop ? "/device_front_land.mp4" : "/device_front_port.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
