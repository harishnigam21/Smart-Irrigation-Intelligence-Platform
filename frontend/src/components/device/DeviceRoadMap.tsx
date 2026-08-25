import { useEffect, useMemo, useState, type ReactNode } from "react";

import "./DeviceRoadStyle.css";

interface SensorConfig {
  id: "temperature" | "humidity" | "waterFlow";
  name: string;
  icon: string;
  unit: string;
  min: number;
  max: number;
  initial: number;
  decimals: number;
  color: string;
}

type SensorData = Record<SensorConfig["id"], number>;

interface StageTitleProps {
  number: string;
  title: string;
  description: string;
}

interface DataConnectionProps {
  active: boolean;
  packetKey: number;
}

interface ServerItemProps {
  icon: string;
  title: string;
  subtitle: string;
}

interface FilterButtonProps {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}

interface StatusItemProps {
  icon: string;
  title: string;
  status: string;
}

interface MobileStepProps {
  icon: string;
  title: string;
  description: string;
}

const sensorConfig: SensorConfig[] = [
  {
    id: "temperature",
    name: "Temperature",
    icon: "🌡",
    unit: "°C",
    min: 22,
    max: 30,
    initial: 24.8,
    decimals: 1,
    color: "#ff5f56",
  },
  {
    id: "humidity",
    name: "Humidity",
    icon: "💧",
    unit: "%",
    min: 45,
    max: 75,
    initial: 61,
    decimals: 0,
    color: "#38bdf8",
  },
  {
    id: "waterFlow",
    name: "Water Flow",
    icon: "≋",
    unit: "L/min",
    min: 12,
    max: 25,
    initial: 18.4,
    decimals: 1,
    color: "#34d399",
  },
];

function randomChange(
  value: number,
  min: number,
  max: number,
  amount: number,
): number {
  const next = value + (Math.random() - 0.5) * amount;

  return Math.min(max, Math.max(min, next));
}

function formatValue(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

export default function DeviceRoadMap() {
  const [sensorData, setSensorData] = useState<SensorData>(
    () =>
      Object.fromEntries(
        sensorConfig.map((sensor) => [sensor.id, sensor.initial]),
      ) as SensorData,
  );

  const [selectedSensor, setSelectedSensor] = useState<
    SensorConfig["id"] | "all"
  >("all");

  const [packets, setPackets] = useState<number>(0);

  const [serverActive, setServerActive] = useState<boolean>(false);

  /*
   * Simulate incoming sensor readings.
   *
   * Later you can replace this with your WebSocket:
   *
   * socket.onmessage = (event) => {
   *   const data = JSON.parse(event.data);
   *   setSensorData(data);
   * };
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((previous) => {
        const next: SensorData = {
          ...previous,
        };

        sensorConfig.forEach((sensor) => {
          next[sensor.id] = randomChange(
            previous[sensor.id],
            sensor.min,
            sensor.max,
            sensor.id === "humidity" ? 3 : 1,
          );
        });

        return next;
      });

      setPackets((previous) => previous + 1);

      setServerActive(true);

      const timeout = setTimeout(() => {
        setServerActive(false);
      }, 500);

      return () => clearTimeout(timeout);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const activeSensor = useMemo(
    () => sensorConfig.find((sensor) => sensor.id === selectedSensor) ?? null,
    [selectedSensor],
  );

  const isHighlighted = (id: SensorConfig["id"]): boolean => {
    return selectedSensor === "all" || selectedSensor === id;
  };

  return (
    <section className="sensor-flow-section blueprint-grid09">
      {/* Header */}

      <div className="sensor-flow-header">
        <div className="eyebrow">
          <span className="live-dot" />
          REAL-TIME DATA PIPELINE
        </div>

        <h2>
          How It Works —<span> Live Data Flow</span>
        </h2>

        <p>
          Sensor data travels from physical devices to the server and reaches
          your interface in real time.
        </p>
      </div>
      {/* ================= CONTROLS ================= */}

      <div className="flow-controls">
        <div className="control-description">
          <span className="click-icon">⌁</span>

          <div>
            <strong>Explore the data flow</strong>

            <small>Click a sensor to highlight its path</small>
          </div>
        </div>

        <div className="sensor-filters">
          <FilterButton
            active={selectedSensor === "all"}
            onClick={() => setSelectedSensor("all")}
          >
            All Sensors
          </FilterButton>

          {sensorConfig.map((sensor) => (
            <FilterButton
              key={sensor.id}
              active={selectedSensor === sensor.id}
              onClick={() => setSelectedSensor(sensor.id)}
            >
              {sensor.icon} {sensor.name}
            </FilterButton>
          ))}
        </div>

        <div className="packet-status">
          <div className="packet-dots">
            <i />
            <i />
            <i />
          </div>

          <div>
            <strong>Live Data Packets</strong>

            <small>Moving in real-time</small>
          </div>
        </div>
      </div>

      {/* Main flow */}

      <div className="flow-container pt-4">
        {/* ================= SENSORS ================= */}

        <div className="flow-stage sensors-stage">
          <StageTitle
            number="01"
            title="Sensors"
            description="Collecting real-world data"
          />

          <div className="sensor-list">
            {sensorConfig.map((sensor) => {
              const highlighted = isHighlighted(sensor.id);

              return (
                <button
                  key={sensor.id}
                  type="button"
                  className={`sensor-card ${highlighted ? "active" : "dimmed"}`}
                  onClick={() =>
                    setSelectedSensor(
                      selectedSensor === sensor.id ? "all" : sensor.id,
                    )
                  }
                  style={
                    {
                      "--sensor-color": sensor.color,
                    } as React.CSSProperties
                  }
                >
                  <div className="sensor-icon">{sensor.icon}</div>

                  <div className="sensor-content">
                    <div className="sensor-name">{sensor.name}</div>

                    <div className="sensor-value">
                      {formatValue(sensorData[sensor.id], sensor.decimals)}

                      <small>{sensor.unit}</small>
                    </div>

                    <div className="mini-chart">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Connection */}

        <DataConnection active={selectedSensor !== "all"} packetKey={packets} />

        {/* ================= DEVICE ================= */}

        <div className="flow-stage device-stage">
          <StageTitle
            number="02"
            title="IoT Device"
            description="Gateway / Edge Device"
          />

          <div className="device-card">
            <svg
              className="device-neon-border"
              viewBox="0 0 400 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Static subtle border */}
              <rect
                className="device-border-base"
                x="2"
                y="2"
                width="396"
                height="276"
                rx="20"
                pathLength="1000"
              />

              {/* Moving neon segment */}
              <rect
                className="device-border-snake"
                x="2"
                y="2"
                width="396"
                height="276"
                rx="20"
                pathLength="1000"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-1000"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>

            <div className="wifi-symbol">
              <span />
              <span />
              <span />
            </div>

            <div className="router">
              <div className="antenna antenna-left" />
              <div className="antenna antenna-right" />

              <div className="router-body">
                <div className="router-lights">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className="online-status">
              <span className="status-dot" />
              ONLINE
            </div>

            <p>Forwarding data securely</p>
          </div>
        </div>

        {/* Connection */}

        <DataConnection
          active={selectedSensor !== "all"}
          packetKey={packets + 1}
        />

        {/* ================= SERVER ================= */}

        <div className="flow-stage server-stage">
          <StageTitle
            number="03"
            title="Server"
            description="Cloud Processing"
          />

          <div className={`server-card ${serverActive ? "server-active" : ""}`}>
            <ServerItem icon="↓" title="Receive" subtitle="Data" />

            <ServerItem icon="⚙" title="Process" subtitle="Data" />

            <ServerItem icon="◉" title="Store" subtitle="Securely" />

            <ServerItem icon="◉" title="WebSocket" subtitle="Broadcast" />

            <div className="server-status">
              <span className="status-dot" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
        </div>

        {/* Connection */}

        <DataConnection
          active={selectedSensor !== "all"}
          packetKey={packets + 2}
        />

        {/* ================= USER UI ================= */}

        <div className="flow-stage user-stage">
          <StageTitle
            number="04"
            title="User Interface"
            description="Live Dashboard"
          />

          <div className="monitor">
            <div className="monitor-screen">
              <div className="dashboard-header">
                <strong>Live Dashboard</strong>

                <span>
                  <i />
                  Live
                </span>
              </div>

              <div className="dashboard-readings">
                {sensorConfig.map((sensor) => (
                  <div
                    key={sensor.id}
                    className={`dashboard-row ${
                      isHighlighted(sensor.id) ? "active" : "dimmed"
                    }`}
                  >
                    <div className="dashboard-label">
                      <span
                        style={
                          {
                            "--sensor-color": sensor.color,
                          } as React.CSSProperties
                        }
                      >
                        {sensor.icon}
                      </span>

                      {sensor.name}
                    </div>

                    <strong>
                      {formatValue(sensorData[sensor.id], sensor.decimals)}

                      <small>{sensor.unit}</small>
                    </strong>
                  </div>
                ))}
              </div>

              <div className="updated">
                <span className="status-dot" />
                Last updated: Just now
              </div>
            </div>

            <div className="monitor-stand" />
          </div>
        </div>
      </div>

      {/* ================= BOTTOM STATUS ================= */}

      <div className="bottom-grid">
        <SystemStatus />

        <MobileFlow />
      </div>

      <div className="flow-footer">
        <span>⚡</span>
        Real-time
        <b>•</b>
        Secure
        <b>•</b>
        Scalable
        <b>•</b>
        Built for the Future
      </div>
    </section>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function StageTitle({ number, title, description }: StageTitleProps) {
  return (
    <div className="stage-title">
      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function DataConnection({ active, packetKey }: DataConnectionProps) {
  return (
    <div className={`connection ${active ? "highlighted" : ""}`}>
      <div className="connection-line">
        <div key={packetKey} className="data-packet" />

        <div className="arrow-head" />
      </div>

      <span className="connection-label">DATA</span>
    </div>
  );
}

function ServerItem({ icon, title, subtitle }: ServerItemProps) {
  return (
    <div className="server-item">
      <div className="server-icon">{icon}</div>

      <strong>{title}</strong>

      <span>{subtitle}</span>
    </div>
  );
}

function FilterButton({ active, children, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={`filter-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SystemStatus() {
  return (
    <div className="status-panel">
      <h3>Live System Status</h3>

      <div className="status-items">
        <StatusItem icon="⌁" title="IoT Device" status="Connected" />

        <StatusItem icon="▤" title="Server" status="Operational" />

        <StatusItem icon="◉" title="WebSocket" status="Live" />

        <StatusItem icon="♙" title="Users" status="12 Online" />
      </div>
    </div>
  );
}

function StatusItem({ icon, title, status }: StatusItemProps) {
  return (
    <div className="status-item">
      <div className="status-item-icon">{icon}</div>

      <strong>{title}</strong>

      <span>
        <i />
        {status}
      </span>
    </div>
  );
}

function MobileFlow() {
  return (
    <div className="mobile-panel">
      <h3>
        Mobile View <small>(Responsive)</small>
      </h3>

      <div className="mobile-flow">
        <MobileStep icon="⌁" title="Sensors" description="Collecting Data" />

        <MobileArrow />

        <MobileStep icon="▣" title="IoT Device" description="Online" />

        <MobileArrow />

        <MobileStep icon="▤" title="Server" description="Processing" />

        <MobileArrow />

        <MobileStep icon="◉" title="Dashboard" description="Real-time Data" />
      </div>
    </div>
  );
}

function MobileStep({ icon, title, description }: MobileStepProps) {
  return (
    <div className="mobile-step">
      <div className="mobile-icon">{icon}</div>

      <strong>{title}</strong>

      <span>{description}</span>
    </div>
  );
}

function MobileArrow() {
  return (
    <div className="mobile-arrow">
      <span />
      <span />
      <span />→
    </div>
  );
}
