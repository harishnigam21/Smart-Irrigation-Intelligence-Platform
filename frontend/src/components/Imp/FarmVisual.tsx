import { RootState } from "@/store/Store";
import { Focus } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

// Define explicit types for props to clear TypeScript errors
export interface DeviceType {
  id: string;
  coords: [number, number];
  label?: string;
  status?: "online" | "offline" | "error";
}

export interface FarmVisualProps {
  width?: string | number;
  height?: string | number;
  points: [number, number][];
  devices: DeviceType[] | [];
}

const FarmVisual: React.FC<FarmVisualProps> = ({
  width = "90%",
  height = "90%",
  points = [
    // Replaced the leading stray comma with a proper explicit origin point
    [0, 0],
    [-20.73089515157338, -29.64377938631613],
    [128.7544573497965, -80.4151032814699],
    [141.19299172222154, -43.48089962518806],
  ],
  devices = [
    {
      id: "dev-1",
      coords: [3.73298964105864, -18.160760693212016],
      label: "Node A",
      status: "online",
    },
    {
      id: "dev-2",
      coords: [2.0468962001636117, -19.159773893399553],
      label: "Node B",
      status: "offline",
    },
    {
      id: "dev-2",
      coords: [5.0468962001636117, -21.159773893399553],
      label: "Node C",
      status: "error",
    },
  ],
}) => {
  //Graph portion starts
  const screenSize = useSelector<RootState>(
    (store) => store.layout.screenSize,
  ) as { width: number; height: number };
  const canvasW = Math.min(screenSize?.width, screenSize?.height) || 400;
  const canvasH = canvasW / 2 || 100;
  const padding = 5;

  if (!points || points.length != 4) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl text-red-500 uppercase">
        Invalid Point
      </div>
    );
  }
  const mathBounds = useMemo(() => {
    const validPoints = points;
    if (validPoints.length === 0)
      return { scale: 1, minX: 0, minY: 0, maxX: 0, maxY: 0 };
    const xValues: number[] = validPoints.map((p) => p[0]);
    const yValues: number[] = validPoints.map((p) => p[1]);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    const scaleX = (canvasW - padding * 2) / rangeX;
    const scaleY = (canvasH - padding * 2) / rangeY;
    const scale = Math.min(scaleX, scaleY);

    return { scale, minX, minY, maxX, maxY };
  }, [points, screenSize]);

  const transformCoords = (x: number, y: number) => {
    const { scale, minX, minY, maxX, maxY } = mathBounds;
    const offsetX = (canvasW - (maxX - minX) * scale) / 2;
    const offsetY = (canvasH - (maxY - minY) * scale) / 2;

    const svgX = offsetX + (x - minX) * scale;
    const svgY = canvasH - (offsetY + (y - minY) * scale);
    return { x: svgX, y: svgY };
  };

  const polygonPointsStr = useMemo(() => {
    const validPoints = points || [];
    return validPoints
      .map((p) => {
        const { x, y } = transformCoords(p[0], p[1]);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points, mathBounds]);

  const validPoints = points || [];
  const validDevices = devices || [];
  //Graph portion ends


  //Magnifier Portion starts
  const [focus, setFocus] = useState<boolean>(false);
  const [glassPos, setGlassPos] = useState({ x: 0, y: 0, visible: false });
  const [contentPos, setContentPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const targetContentRef = useRef<HTMLDivElement>(null);
  const [ZOOM_LEVEL, setZOOM_LEVEL] = useState<number>(2.5);
  const [GLASS_SIZE, setGLASS_SIZE] = useState<number>(150);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!focus || !containerRef.current || !targetContentRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Get cursor position relative to the container box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check bounds: Hide glass if cursor moves outside the target container
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setGlassPos((prev) => ({ ...prev, visible: false }));
      return;
    }

    // Position the glass ring dynamically over the cursor
    setGlassPos({
      x: e.clientX - GLASS_SIZE / 2,
      y: e.clientY - GLASS_SIZE / 2,
      visible: true,
    });

    // Mirror and scale the inverse position coordinates inside the lens
    setContentPos({
      x: -x * ZOOM_LEVEL + GLASS_SIZE / 2,
      y: -y * ZOOM_LEVEL + GLASS_SIZE / 2,
    });
  };
  const handleMouseLeave = () => {
    setGlassPos((prev) => ({ ...prev, visible: false }));
  };
  const toggleMagnifier = () => {
    setFocus(!focus);
    if (!focus) {
      // Instantly default position to center of viewport when turned on
      setGlassPos({
        x: window.innerWidth / 2 - GLASS_SIZE / 2,
        y: window.innerHeight / 2 - GLASS_SIZE / 2,
        visible: true,
      });
      // Point internal cloned text focus to the center of the target content block
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContentPos({
          x: -(rect.width / 2) * ZOOM_LEVEL + GLASS_SIZE / 2,
          y: -(rect.height / 2) * ZOOM_LEVEL + GLASS_SIZE / 2,
        });
      }
    }
  };
  //Magnifier Portion ends

  const getWholeCompo = () => {
    return (
      <svg
        width={`${canvasW - 100}`}
        height={`${canvasH}`}
        viewBox={`0 0 ${canvasW} ${canvasH}`}
        fill="none"
        xmlns="http://w3.org"
        style={{
          filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.06))",
          fontFamily: "sans-serif",
        }}
      >
        <defs>
          <pattern
            id="cropRows"
            width="14"
            height="14"
            patternTransform="rotate(25)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="7" x2="14" y2="7" stroke="brown" strokeWidth="2" />
            <line
              x1="0"
              y1="7"
              x2="14"
              y2="7"
              stroke="#2E7D32"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Main Farm Field Frame */}
        {validPoints.length >= 3 && (
          <g>
            <polygon
              points={polygonPointsStr}
              fill="url(#cropRows)"
              stroke="#1E4620"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <polygon
              points={polygonPointsStr}
              stroke="yellow"
              strokeWidth="0.5"
              strokeDasharray="5 5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Render Corner Boundaries */}
        {validPoints.map((p: [number, number], idx: number) => {
          const { x, y } = transformCoords(p[0], p[1]);
          const isOrigin = idx === 0;
          return (
            <g key={`vertex-${idx}`}>
              <circle
                cx={x}
                cy={y}
                r={1}
                fill={isOrigin ? "red" : "blue"}
                stroke="#FFFFFF"
                strokeWidth={0}
              />
            </g>
          );
        })}

        {/* Dynamic Multi-Chip Devices Layer */}
        {validDevices.map((device: DeviceType, index: number) => {
          if (!device.coords || device.coords.length < 2) return null;
          const { x, y } = transformCoords(device.coords[0], device.coords[1]);

          const colorMain =
            device.status == "online"
              ? "green"
              : device.status == "offline"
                ? "gray"
                : "red";
          const labelLength = device.label?.length || 0;
          const labelWidth = `${labelLength * 5}`;
          return (
            <g
              className={`relative cursor-pointer ${device.status == "error" && "animate-pulse"}`}
              key={device.id || `device-${index}`}
              transform={`translate(${x}, ${y})`}
            >
              {device.status == "error" && (
                <g transform="translate(-8, -15)">
                  <text
                    x="6"
                    y="7"
                    fill="red"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.1"
                  >
                    !
                  </text>
                </g>
              )}
              <title>
                {device.label} : {device.status}
              </title>
              <g
                transform="translate(-10, -10)"
                stroke={colorMain}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M5 2V0 M10 2V0 M15 2V0" />
                <path d="M5 18V20 M10 18V20 M15 18V20" />
                <path d="M2 5H0 M2 10H0 M2 15H0" />
                <path d="M18 5H20 M18 10H20 M18 15H20" />

                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="16"
                  rx="3"
                  fill={"white"}
                />
                <rect
                  x="6"
                  y="6"
                  width="8"
                  height="8"
                  rx="1.5"
                  strokeWidth="1.5"
                />
              </g>
              {devices.length == 1 && (
                <g transform="translate(10, -5)">
                  <rect
                    x="0"
                    y="-2"
                    width={labelWidth}
                    height="14"
                    rx="4"
                    fill="#1E293B"
                  />
                  <text
                    x="6"
                    y="8"
                    fill="#FFFFFF"
                    fontSize="8"
                    fontWeight="600"
                    letterSpacing="0.1"
                  >
                    {device.label || `Dev`}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center select-none">
      <div className="absolute top-1 right-1 flex flex-col items-center gap-2">
        <Focus
          onClick={toggleMagnifier}
          className={` text-3xl cursor-pointer ${focus ? "animate-pulse text-orange-500" : "text-yellow-300 animate-none"} transition-all`}
        >
          <title>Magnifier</title>
        </Focus>
        {focus && (
          <input
            style={{ writingMode: "vertical-rl", direction: "rtl" }}
            type="range"
            min={1}
            max={10}
            value={ZOOM_LEVEL}
            onChange={(e) => setZOOM_LEVEL(Number(e.target.value))}
            name="lensRange"
            id="lensRange"
          />
        )}
      </div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-crosshair"
      >
        <div ref={targetContentRef}>{getWholeCompo()}</div>
      </div>

      {focus && glassPos.visible && (
        <div
          className={`fixed rounded-full border-2 ${focus && " border-orange-500"} shadow-[0_0_25px_rgba(0,0,0,0.5)] overflow-hidden z-50 pointer-events-none bg-bgsecondary`}
          style={{
            left: `${glassPos.x}px`,
            top: `${glassPos.y}px`,
            width: `${GLASS_SIZE}px`,
            height: `${GLASS_SIZE}px`,
          }}
        >
          {/* Live DOM content mirror wrapper */}
          <div
            className="absolute origin-top-left"
            style={{
              width: `${canvasW}px`,
              height: `${canvasH}px`,
              transform: `translate(${contentPos.x}px, ${contentPos.y}px) scale(${ZOOM_LEVEL})`,
            }}
          >
            {getWholeCompo()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmVisual;
