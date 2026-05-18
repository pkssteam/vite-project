import React, { useState } from 'react';

const INITIAL_NODES = [
  {
    id: 'node-sec-01',
    name: 'Secure Firewall Node',
    category: 'security',
    status: 'active',
    ip: '10.0.4.15',
    load: 18,
    version: 'v4.1.2',
    description: 'Intercepts external socket packets and executes TLS handshake authorization blocks.'
  },
  {
    id: 'node-ana-02',
    name: 'Realtime Analytics Pipe',
    category: 'analytics',
    status: 'active',
    ip: '10.0.12.82',
    load: 74,
    version: 'v9.0.4',
    description: 'Buffers distributed streaming telemetry and formats payload structures for visualization.'
  },
  {
    id: 'node-api-03',
    name: 'Core GraphQL Gateway',
    category: 'api',
    status: 'active',
    ip: '10.0.2.10',
    load: 42,
    version: 'v2.8.0',
    description: 'Resolves database entity relationships and provides low-latency REST/gRPC gateways.'
  },
  {
    id: 'node-sec-04',
    name: 'Identity Token Validator',
    category: 'security',
    status: 'error',
    ip: '10.0.4.19',
    load: 0,
    version: 'v3.5.2',
    description: 'Authorizes cryptographic web signatures (JWT) and maintains state token blacklists.'
  },
  {
    id: 'node-api-05',
    name: 'Media Transcoding Worker',
    category: 'api',
    status: 'inactive',
    ip: '10.0.84.11',
    load: 0,
    version: 'v1.4.9',
    description: 'Compresses static asset files and uploads optimized WebP content buckets.'
  },
  {
    id: 'node-ana-06',
    name: 'Log Aggregation Vault',
    category: 'analytics',
    status: 'active',
    ip: '10.0.12.90',
    load: 59,
    version: 'v2.1.1',
    description: 'Indexes microservice console logs and aggregates telemetry into elastic indexes.'
  }
];

export default function Gallery() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [runningTests, setRunningTests] = useState({});

  const toggleNodeStatus = (id) => {
    setNodes(prev => prev.map(node => {
      if (node.id === id) {
        const nextStatus = node.status === 'active' ? 'inactive' : node.status === 'inactive' ? 'active' : 'active';
        const nextLoad = nextStatus === 'active' ? Math.round(Math.random() * 60 + 20) : 0;
        return { ...node, status: nextStatus, load: nextLoad };
      }
      return node;
    }));
  };

  const triggerNodeTest = (id) => {
    setRunningTests(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setRunningTests(prev => ({ ...prev, [id]: false }));
      
      // Randomly update load or recover from error on success
      setNodes(prev => prev.map(node => {
        if (node.id === id) {
          const isError = node.status === 'error';
          const nextStatus = isError ? 'active' : node.status;
          const nextLoad = nextStatus === 'active' ? Math.round(Math.random() * 50 + 20) : 0;
          return { ...node, status: nextStatus, load: nextLoad };
        }
        return node;
      }));
    }, 2000);
  };

  const filteredNodes = nodes.filter(node => {
    const matchesFilter = filter === 'all' || node.category === filter;
    const matchesSearch = node.name.toLowerCase().includes(search.toLowerCase()) || 
                          node.description.toLowerCase().includes(search.toLowerCase()) ||
                          node.ip.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-content gallery-page">
      <div className="page-header">
        <div className="header-meta">
          <span className="badge badge-accent">Card Grid & State Testing</span>
          <h1>Cloud Network Nodes Architecture</h1>
        </div>
        <p className="subtitle">
          Verify flexbox/grid alignments, media card hover elevations, typography overflow ellipses, and component dynamic state transitions.
        </p>
      </div>

      {/* Filter and Search Action Bar */}
      <div className="gallery-action-bar widget-card">
        <div className="filters-container">
          <button 
            className={`btn-tab ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All Services ({nodes.length})
          </button>
          <button 
            className={`btn-tab ${filter === 'security' ? 'active' : ''}`} 
            onClick={() => setFilter('security')}
          >
            Security
          </button>
          <button 
            className={`btn-tab ${filter === 'analytics' ? 'active' : ''}`} 
            onClick={() => setFilter('analytics')}
          >
            Analytics
          </button>
          <button 
            className={`btn-tab ${filter === 'api' ? 'active' : ''}`} 
            onClick={() => setFilter('api')}
          >
            API & Workers
          </button>
        </div>

        <div className="search-box-container">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            type="text" 
            placeholder="Search IP, node name, description..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch('')}>×</button>
          )}
        </div>
      </div>

      {/* Responsive Card Grid */}
      {filteredNodes.length === 0 ? (
        <div className="empty-results-widget widget-card">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <h3>No matching network nodes found</h3>
          <p>Try resetting the search query or selecting a different category filter above.</p>
          <button className="btn btn-outline" onClick={() => { setFilter('all'); setSearch(''); }}>Clear Filters</button>
        </div>
      ) : (
        <div className="nodes-card-grid">
          {filteredNodes.map((node) => (
            <div key={node.id} className={`node-card border-status-${node.status} ${runningTests[node.id] ? 'testing' : ''}`}>
              
              {/* Card Geometric SVG Visual pattern (Stable Visual QA Asset) */}
              <div className={`card-visual-pattern bg-pattern-${node.category}`}>
                <svg viewBox="0 0 100 40" className="pattern-svg">
                  <path d="M 0,20 Q 25,5 50,20 T 100,20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  <path d="M 0,30 Q 30,15 60,30 T 100,30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <circle cx="15" cy="15" r="3" fill="rgba(255,255,255,0.25)" />
                  <circle cx="85" cy="25" r="4" fill="rgba(255,255,255,0.18)" />
                </svg>
                <span className="category-tag">{node.category.toUpperCase()}</span>
                <span className={`status-badge badge-${node.status}`}>{node.status.toUpperCase()}</span>
              </div>

              {/* Card Details */}
              <div className="card-details">
                <div className="card-title-row">
                  <h3 className="node-title" title={node.name}>{node.name}</h3>
                  <span className="node-version">{node.version}</span>
                </div>
                <div className="node-ip-row">
                  <code>{node.ip}</code>
                  {node.status === 'active' && (
                    <span className="node-load-text">Load: {node.load}%</span>
                  )}
                </div>
                
                <p className="node-description">{node.description}</p>
                
                {/* Dynamically active progress bar */}
                {node.status === 'active' && (
                  <div className="mini-progress-track">
                    <div className="mini-progress-fill" style={{ width: `${node.load}%` }}></div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="card-actions">
                <button 
                  className={`btn btn-small ${node.status === 'active' ? 'btn-outline-error' : 'btn-outline'}`}
                  disabled={runningTests[node.id] || node.status === 'error'}
                  onClick={() => toggleNodeStatus(node.id)}
                >
                  {node.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  className={`btn btn-small btn-primary ${runningTests[node.id] ? 'btn-pulse' : ''}`}
                  disabled={runningTests[node.id]}
                  onClick={() => triggerNodeTest(node.id)}
                >
                  {runningTests[node.id] ? 'Simulating...' : 'Run Test'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
