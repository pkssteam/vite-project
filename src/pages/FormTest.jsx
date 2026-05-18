import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user begins typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (val) => {
    setFormData(prev => ({ ...prev, notificationLevel: val }));
  };

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
    const isValid = validateForm();
    if (isValid) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
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
  };

  return (
    <div className="page-content forms-page">
      <div className="page-header">
        <div className="header-meta">
          <span className="badge badge-accent">Input & State QA Playground</span>
          <h1>Interactive Form Controls Validation</h1>
        </div>
        <p className="subtitle">
          Test interactive UI form inputs, focused outlines, disabled controls, validation errors, and state binding serialization.
        </p>
      </div>

      <div className="form-layout-container">
        {/* Interactive Form Block */}
        <div className="widget-card form-widget">
          <div className="widget-header">
            <h3>Configuration Panel</h3>
            <button className="btn btn-small btn-outline" onClick={loadMockValues}>Load Mock Values</button>
          </div>

          <form onSubmit={handleSubmit} className="custom-form" noValidate>
            {/* Input Row */}
            <div className="form-row">
              <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                <label htmlFor="username">Username Target</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="e.g. admin_operator"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {/* Select Input Group */}
            <div className="form-group">
              <label htmlFor="environment">Target Environment Node</label>
              <select 
                id="environment" 
                name="environment" 
                value={formData.environment}
                onChange={handleInputChange}
              >
                <option value="development">Development (Local Node)</option>
                <option value="staging">Staging (Integration Node)</option>
                <option value="production">Production (High Availability)</option>
                <option value="disaster-recovery">DR Sandbox (Failover)</option>
              </select>
            </div>

            {/* Radio Selection Group */}
            <div className="form-group">
              <label>Notification Priority Level</label>
              <div className="radio-group-horizontal">
                {['all', 'important', 'critical-only'].map((level) => (
                  <label key={level} className={`radio-label ${formData.notificationLevel === level ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="notificationLevel" 
                      value={level}
                      checked={formData.notificationLevel === level}
                      onChange={() => handleRadioChange(level)}
                    />
                    <span>{level.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Slider Range Selector */}
            <div className="form-group">
              <div className="slider-label-row">
                <label htmlFor="maxRetries">Maximum Task Retries</label>
                <span className="slider-counter">{formData.maxRetries} Retries</span>
              </div>
              <input 
                type="range" 
                id="maxRetries" 
                name="maxRetries" 
                min="1" 
                max="25" 
                value={formData.maxRetries}
                onChange={handleInputChange}
              />
            </div>

            {/* Switch Toggle (Telemetry) */}
            <div className="form-group toggle-group">
              <div className="toggle-meta">
                <span className="toggle-title">Allow Telemetry Logging</span>
                <span className="toggle-subtitle">Streams performance logs to dashboard visualization cards</span>
              </div>
              <label className="toggle-switch">
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
            <div className="form-group">
              <label htmlFor="systemNotes">System Diagnostic Notes</label>
              <textarea 
                id="systemNotes" 
                name="systemNotes" 
                rows="3" 
                placeholder="Describe local machine configuration..."
                value={formData.systemNotes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className={`btn btn-primary submit-btn ${submitted ? 'btn-success' : ''}`}>
              {submitted ? '✓ Submission Success' : 'Submit Target Config'}
            </button>
          </form>
        </div>

        {/* Live State Inspector Block */}
        <div className="widget-card inspector-widget">
          <div className="widget-header">
            <h3>State Serialization Inspector</h3>
            <span className="badge badge-accent">Live JSON</span>
          </div>
          <p className="inspector-desc">
            The JSON packet below represents the exact in-memory state of the React application context. Click elements, adjust sliders, and type to observe real-time bindings.
          </p>
          <div className="json-container">
            <pre id="state-json-output">{JSON.stringify(formData, null, 2)}</pre>
          </div>
          <div className="validation-status-box">
            <div className="status-indicator-row">
              <span>Form Integrity:</span>
              <span className={`badge ${Object.keys(errors).length === 0 ? 'badge-success' : 'badge-error'}`}>
                {Object.keys(errors).length === 0 ? 'CLEAN STATE' : 'VALIDATION ERRORS'}
              </span>
            </div>
            {Object.keys(errors).length > 0 && (
              <ul className="mini-error-list">
                {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
