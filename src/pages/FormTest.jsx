import React, { useState, useEffect } from 'react';

export default function FormTest() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    environment: 'development',
    notificationLevel: 'important',
    allowTelemetry: true,
    maxRetries: 5,
    systemNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(100);

  // Live diagnostic logs state for a premium developer environment experience
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), text: 'System Config Terminal initialized.', type: 'info' }
  ]);

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      { time: timestamp, text, type },
      ...prev
    ].slice(0, 10));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Clear validation error when user begins typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Interactive event log entries
    let logVal = finalValue;
    if (type === 'checkbox') logVal = checked ? 'ENABLED' : 'DISABLED';
    if (name === 'maxRetries') logVal = `${value} retries`;
    addLog(`Parameter edit: [${name}] set to "${logVal}"`, 'action');
  };

  const handleRadioChange = (val) => {
    setFormData(prev => ({ ...prev, notificationLevel: val }));
    addLog(`Notification priority updated: "${val.toUpperCase()}"`, 'action');
  };

  // Recalculate System Integrity Health Score in real-time
  useEffect(() => {
    let score = 100;
    let deduc = 0;

    if (!formData.username.trim()) {
      deduc += 40;
    } else if (formData.username.length < 3) {
      deduc += 20;
    }

    if (!formData.email.trim()) {
      deduc += 40;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      deduc += 20;
    }

    if (Object.keys(errors).length > 0) {
      deduc = Math.max(deduc, 50);
    }

    setIntegrityScore(Math.max(score - deduc, 20));
  }, [formData, errors]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is a required validation parameter.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please input a valid email formatting structure.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLog('Auditing form integrity parameters...', 'info');
    
    const isValid = validateForm();
    if (isValid) {
      setSubmitted(true);
      addLog('Validation SUCCESS! Target configuration payload pushed.', 'success');
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      addLog('Validation FAILED. Critical telemetry errors detected.', 'error');
    }
  };

  const loadMockValues = () => {
    setFormData({
      username: 'qa_engineer_alpha',
      email: 'qa.alpha@testing-core.io',
      environment: 'staging',
      notificationLevel: 'all',
      allowTelemetry: false,
      maxRetries: 12,
      systemNotes: 'Automated test suite simulation initialized. Latency metrics verify stability of backend routing.'
    });
    setErrors({});
    addLog('Predefined mock configuration suite loaded successfully.', 'success');
  };

  const getIntegrityClass = () => {
    if (integrityScore >= 90) return 'score-healthy';
    if (integrityScore >= 60) return 'score-warning';
    return 'score-danger';
  };

  return (
    <div className="page-content forms-page premium-forms-layout">
      {/* Scroll/Status Header Decorator */}
      <div className="reading-scroll-track forms-scroll-track">
        <div 
          className={`reading-scroll-thumb forms-scroll-thumb ${getIntegrityClass()}`}
          style={{ width: `${integrityScore}%` }}
        ></div>
      </div>

      <div className="page-header premium-animated-header">
        <div className="header-meta">
          <span className="badge badge-accent telemetry-status-badge">
            <span className="live-indicator-dot"></span>
            System Node: Active
          </span>
          <h1>Configuration Matrix</h1>
        </div>
        <h1 className="glowing-text">System Configuration</h1>
        <p className="subtitle">
          An advanced playground for validating input data integrity, state serialization constraints, and live telemetry log bindings.
        </p>
      </div>

      <div className="form-layout-container premium-layout-grid">
        {/* Interactive Configuration Terminal */}
        <div className="widget-card form-widget-premium">
          <div className="widget-header premium-widget-header">
            <div className="title-area">
              <h3>Control Matrix Panel</h3>
              <p className="card-sub-desc">Edit variables below to update the telemetry state</p>
            </div>
            <button 
              type="button"
              className="btn btn-small btn-outline mock-load-btn" 
              onClick={loadMockValues}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Quick Autofill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="custom-form premium-custom-form" noValidate>
            {/* Input Row */}
            <div className="form-row premium-form-row">
              <div className={`form-group premium-form-group ${errors.username ? 'has-error' : formData.username.length >= 3 ? 'is-valid' : ''}`}>
                <label htmlFor="username">
                  Username Target
                  {formData.username && (
                    <span className="field-status-txt">
                      {formData.username.length < 3 ? 'Too Short' : 'Valid'}
                    </span>
                  )}
                </label>
                <div className="input-with-icon">
                  <svg className="field-icon main-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="e.g. admin_operator"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {formData.username && (
                    <div className="validation-mark">
                      {errors.username || formData.username.length < 3 ? (
                        <svg className="error-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      ) : (
                        <svg className="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              <div className={`form-group premium-form-group ${errors.email ? 'has-error' : formData.email && /\S+@\S+\.\S+/.test(formData.email) ? 'is-valid' : ''}`}>
                <label htmlFor="email">
                  Email Address
                  {formData.email && (
                    <span className="field-status-txt">
                      {/\S+@\S+\.\S+/.test(formData.email) ? 'Valid Address' : 'Invalid Format'}
                    </span>
                  )}
                </label>
                <div className="input-with-icon">
                  <svg className="field-icon main-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formData.email && (
                    <div className="validation-mark">
                      {errors.email || !/\S+@\S+\.\S+/.test(formData.email) ? (
                        <svg className="error-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      ) : (
                        <svg className="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {/* Select Input Group */}
            <div className="form-group premium-form-group">
              <label htmlFor="environment">Target Environment Node</label>
              <div className="select-wrapper">
                <svg className="select-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
                <select 
                  id="environment" 
                  name="environment" 
                  value={formData.environment}
                  onChange={handleInputChange}
                  className="premium-select"
                >
                  <option value="development">Development (Local Node)</option>
                  <option value="staging">Staging (Integration Node)</option>
                  <option value="production">Production (High Availability)</option>
                  <option value="disaster-recovery">DR Sandbox (Failover)</option>
                </select>
                <div className="select-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Visual Node Tiles for modern look */}
              <div className="environment-tiles">
                {[
                  { id: 'development', label: 'Dev', desc: 'Local Unit' },
                  { id: 'staging', label: 'Stage', desc: 'QA Mock' },
                  { id: 'production', label: 'Prod', desc: 'Live Stack' },
                  { id: 'disaster-recovery', label: 'Failover', desc: 'DR Sandbox' }
                ].map(env => (
                  <button
                    key={env.id}
                    type="button"
                    className={`env-tile-btn ${formData.environment === env.id ? 'active' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'environment', value: env.id } })}
                  >
                    <span className="tile-label">{env.label}</span>
                    <span className="tile-desc">{env.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Radio Selection Group */}
            <div className="form-group premium-form-group">
              <label>Notification Priority Level</label>
              <div className="radio-group-horizontal premium-radio-track">
                {['all', 'important', 'critical-only'].map((level) => (
                  <label key={level} className={`radio-label premium-radio-pill ${formData.notificationLevel === level ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="notificationLevel" 
                      value={level}
                      checked={formData.notificationLevel === level}
                      onChange={() => handleRadioChange(level)}
                    />
                    <span className="pill-dot"></span>
                    <span>{level.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Slider Range Selector */}
            <div className="form-group premium-form-group">
              <div className="slider-label-row premium-slider-labels">
                <label htmlFor="maxRetries">Maximum Task Retries</label>
                <span className="slider-counter premium-slider-badge">{formData.maxRetries} Retries</span>
              </div>
              <div className="range-slider-wrapper">
                <input 
                  type="range" 
                  id="maxRetries" 
                  name="maxRetries" 
                  min="1" 
                  max="25" 
                  value={formData.maxRetries}
                  onChange={handleInputChange}
                  className="premium-range-slider"
                />
                <div className="slider-ticks">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                </div>
              </div>
            </div>

            {/* Switch Toggle (Telemetry) */}
            <div className="form-group toggle-group premium-toggle-card">
              <div className="toggle-meta">
                <span className="toggle-title">Allow Telemetry Stream</span>
                <span className="toggle-subtitle">Pipes real-time diagnostic JSON logs to dashboard widgets</span>
              </div>
              <label className="toggle-switch premium-switch">
                <input 
                  type="checkbox" 
                  name="allowTelemetry"
                  checked={formData.allowTelemetry}
                  onChange={handleInputChange}
                />
                <span className="slider round"></span>
              </label>
            </div>

            {/* Textarea */}
            <div className="form-group premium-form-group">
              <div className="textarea-label-row">
                <label htmlFor="systemNotes">System Diagnostic Notes</label>
                <span className="char-counter">{formData.systemNotes.length} / 300</span>
              </div>
              <div className="textarea-wrapper">
                <svg className="textarea-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <textarea 
                  id="systemNotes" 
                  name="systemNotes" 
                  rows="3" 
                  maxLength="300"
                  placeholder="Input custom hardware node notes or operational diagnostic summaries here..."
                  value={formData.systemNotes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary submit-btn premium-submit-btn ${submitted ? 'btn-success submission-success' : ''}`}
            >
              {submitted ? (
                <>
                  <svg className="btn-icon animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Operational State Submitted
                </>
              ) : (
                <>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Push State Configuration
                </>
              )}
            </button>
          </form>
        </div>

        {/* Diagnostic Dashboard & Live Serialization Inspector */}
        <div className="widget-card inspector-widget-premium">
          {/* Circular/Dynamic Integrity Gauge */}
          <div className="integrity-meter-card">
            <div className="meter-visual">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className={`circle ${getIntegrityClass()}`}
                  strokeDasharray={`${integrityScore}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{integrityScore}%</text>
              </svg>
            </div>
            <div className="meter-info">
              <h4>System Integrity Score</h4>
              <p className="meter-status-txt">
                {integrityScore === 100 ? (
                  <span className="badge badge-success">CLEAN RUNNING STATE</span>
                ) : integrityScore >= 60 ? (
                  <span className="badge badge-warning">VALIDATION ATTEMPT</span>
                ) : (
                  <span className="badge badge-error">CRITICAL FAULTS</span>
                )}
              </p>
              <span className="meter-hint-txt">Ensure all parameters comply with system schema nodes.</span>
            </div>
          </div>

          <div className="widget-header premium-widget-header">
            <div className="title-area">
              <h3>Telemetry Serializer</h3>
              <p className="card-sub-desc">Live JSON representation of application context</p>
            </div>
            <span className="badge badge-accent live-badge-glow">
              <span className="live-ping"></span>
              Live Stream
            </span>
          </div>

          <div className="json-container premium-json-container">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">state_inspector.json</span>
            </div>
            <pre id="state-json-output">{JSON.stringify(formData, null, 2)}</pre>
          </div>

          {/* Operational Realtime Event Logs Terminal */}
          <div className="operational-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">event_logger.log</span>
            </div>
            <div className="logs-feed">
              {logs.map((log, index) => (
                <div key={index} className={`log-row type-${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-indicator">
                    {log.type === 'success' ? '✓' : log.type === 'error' ? '⚠' : 'ℹ'}
                  </span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
