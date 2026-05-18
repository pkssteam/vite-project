import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [cpuUsage, setCpuUsage] = useState(34);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [latency, setLatency] = useState(45);
  const [statusHistory, setStatusHistory] = useState([30, 42, 35, 50, 40, 48, 52, 45]);
  const [logs, setLogs] = useState([
    { time: '09:30:12', type: 'info', msg: 'System check complete. All services healthy.' },
    { time: '09:31:05', type: 'warning', msg: 'High disk latency detected on node-c4.' },
    { time: '09:32:44', type: 'success', msg: 'Backup synchronization completed successfully.' }
  ]);

  // Simulate real-time updates for visual test dynamism
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const next = Math.max(10, Math.min(95, prev + (Math.random() * 20 - 10)));
        return Math.round(next);
      });
      setMemoryUsage(prev => {
        const next = Math.max(40, Math.min(90, prev + (Math.random() * 6 - 3)));
        return Math.round(next);
      });
      setLatency(prev => {
        const next = Math.max(20, Math.min(120, prev + (Math.random() * 30 - 15)));
        return Math.round(next);
      });
      setStatusHistory(prev => {
        const nextVal = Math.max(15, Math.min(95, prev[prev.length - 1] + (Math.random() * 24 - 12)));
        return [...prev.slice(1), Math.round(nextVal)];
      });

      if (Math.random() > 0.7) {
        const logTypes = ['info', 'warning', 'success', 'error'];
        const msgs = [
          'Garbage collector reclaimed 1.4 GB memory.',
          'Database replication lag reduced to 22ms.',
          'API Gateway ratelimit triggered for IP 192.168.1.45.',
          'SSL Certificate refreshed for domain admin.core.io.',
          'Cron job queue length exceeded baseline thresholds.'
        ];
        const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
        const timeStr = new Date().toTimeString().split(' ')[0];

        setLogs(prev => [
          { time: timeStr, type: randomType, msg: randomMsg },
          ...prev.slice(0, 4)
        ]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Generate SVG path for the sparkline chart
  const getSparklinePath = () => {
    const width = 300;
    const height = 80;
    const maxVal = 100;
    const pointsCount = statusHistory.length;

    return statusHistory.map((val, idx) => {
      const x = (idx / (pointsCount - 1)) * width;
      const y = height - (val / maxVal) * height + 5; // offset slightly
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="page-content dashboard-page">
      <div className="page-header">
        <div className="header-meta">
          <span className="badge badge-accent">Live Monitor system</span>
          <h1>Systems Health Dashboard</h1>
        </div>
        <p className="subtitle">
          Real-time visualization metrics and simulated environment monitors. Perfect for testing component rendering speeds and complex layout grids.
        </p>
      </div>

      {/* Grid of Key Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon cpu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-label">CPU Utilization</span>
            <h2 className="stat-value">{cpuUsage}%</h2>
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${cpuUsage > 80 ? 'critical' : cpuUsage > 60 ? 'warning' : 'healthy'}`}
                style={{ width: `${cpuUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon memory-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 19h12V5H6v14zM6 6h12M6 10h12M6 14h12" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-label">Memory Usage</span>
            <h2 className="stat-value">{memoryUsage}%</h2>
            <div className="progress-bar-container">
              <div
                className="progress-bar healthy"
                style={{ width: `${memoryUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon latency-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-label">API Latency</span>
            <h2 className="stat-value">{latency} ms</h2>
            <span className="stat-meta text-success">Within normal parameters</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon uptime-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-label">System Uptime</span>
            <h2 className="stat-value">99.998%</h2>
            <span className="stat-meta text-accent">34 days, 12 hours active</span>
          </div>
        </div>
      </div>

      {/* Main dashboard widgets block */}
      <div className="dashboard-layout-main">
        {/* Sparkline Monitor */}
        <div className="widget-card chart-widget">
          <div className="widget-header">
            <h3>Latency Waveform Analytics</h3>
            <span className="badge badge-outline">Last 8 Intervals</span>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 300 90" className="sparkline-svg">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="22.5" x2="300" y2="22.5" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="0" y1="45" x2="300" y2="45" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="0" y1="67.5" x2="300" y2="67.5" stroke="var(--border)" strokeDasharray="3 3" />

              {/* Spark Area */}
              <path
                d={`${getSparklinePath()} L 300 90 L 0 90 Z`}
                fill="url(#chart-grad)"
              />
              {/* Spark Path */}
              <path
                d={getSparklinePath()}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pulse at latest point */}
              <circle
                cx={300}
                cy={90 - (statusHistory[statusHistory.length - 1] / 100) * 80 + 5}
                r="4"
                fill="var(--accent)"
              />
            </svg>
          </div>
          <div className="chart-legend">
            <span>Peak: {Math.max(...statusHistory)}ms</span>
            <span>Avg: {Math.round(statusHistory.reduce((a, b) => a + b, 0) / statusHistory.length)}ms</span>
            <span>Min: {Math.min(...statusHistory)}ms</span>
          </div>
        </div>

        {/* Real-time Logger */}
        <div className="widget-card logs-widget">
          <div className="widget-header">
            <h3>Live Telemetry Stream</h3>
            <button className="btn btn-small" onClick={() => setLogs([])}>Clear Console</button>
          </div>
          <div className="terminal-logs">
            {logs.length === 0 ? (
              <div className="empty-logs">Console cleared. Waiting for event logs...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`log-entry log-${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-badge">{log.type.toUpperCase()}</span>
                  <span className="log-text">{log.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
