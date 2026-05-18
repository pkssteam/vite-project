import React, { useState, useEffect, useRef } from 'react';

export default function Articles() {
  // Core Typography state (Must keep original state for test compliance)
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [lineHeight, setLineHeight] = useState(1.55);

  // New Premium UX Settings
  const [fontFamily, setFontFamily] = useState('serif'); // 'sans-serif' | 'serif' | 'monospace'
  const [readingTheme, setReadingTheme] = useState('slate'); // 'slate' | 'sepia' | 'dim' | 'dark'
  const [isSimulatingQA, setIsSimulatingQA] = useState(false);
  const [qaCompleted, setQaCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom Table Data State for dynamic QA Simulation
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Authentication', type: 'System API', viewport: 'Mobile / Desktop', rate: 99.98, status: 'success' },
    { id: 2, name: 'Dashboard Charts', type: 'Visual UI', viewport: 'Tablet / Desktop', rate: 99.20, status: 'success' },
    { id: 3, name: 'Telemetry Logger', type: 'Background Node', viewport: 'All Viewports', rate: 94.85, status: 'warning' },
    { id: 4, name: 'Form Validation', type: 'Interactive Input', viewport: 'Mobile Specific', rate: 78.50, status: 'error' }
  ]);

  const previewRef = useRef(null);

  // Original Reset Typography Function (Must keep original signature)
  const resetTypography = () => {
    setFontSizeMultiplier(1);
    setLineHeight(1.55);
    setFontFamily('serif');
    setReadingTheme('slate');
    setQaCompleted(false);
    setTableData([
      { id: 1, name: 'Authentication', type: 'System API', viewport: 'Mobile / Desktop', rate: 99.98, status: 'success' },
      { id: 2, name: 'Dashboard Charts', type: 'Visual UI', viewport: 'Tablet / Desktop', rate: 99.20, status: 'success' },
      { id: 3, name: 'Telemetry Logger', type: 'Background Node', viewport: 'All Viewports', rate: 94.85, status: 'warning' },
      { id: 4, name: 'Form Validation', type: 'Interactive Input', viewport: 'Mobile Specific', rate: 78.50, status: 'error' }
    ]);
  };

  // Typography Presets Handler
  const applyPreset = (preset) => {
    switch (preset) {
      case 'technical':
        setFontSizeMultiplier(0.85);
        setLineHeight(1.40);
        setFontFamily('monospace');
        break;
      case 'compact':
        setFontSizeMultiplier(0.90);
        setLineHeight(1.50);
        setFontFamily('sans-serif');
        break;
      case 'editorial':
        setFontSizeMultiplier(1.05);
        setLineHeight(1.60);
        setFontFamily('serif');
        break;
      case 'accessibility':
        setFontSizeMultiplier(1.30);
        setLineHeight(1.75);
        setFontFamily('sans-serif');
        break;
      default:
        resetTypography();
    }
  };

  // Scroll Progress Tracker for the editorial container
  useEffect(() => {
    const handleScroll = () => {
      const element = previewRef.current;
      if (!element) return;

      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(0);
        return;
      }

      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const element = previewRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Simulate Interactive QA Testing Action
  const runQASimulation = () => {
    if (isSimulatingQA) return;

    setIsSimulatingQA(true);
    setQaCompleted(false);

    // Dynamic state simulation
    setTimeout(() => {
      setTableData(prev =>
        prev.map(row => {
          if (row.status === 'error') {
            return { ...row, rate: 98.42, status: 'success' };
          }
          if (row.status === 'warning') {
            return { ...row, rate: 99.10, status: 'success' };
          }
          return { ...row, rate: Math.min(row.rate + 0.02, 100) };
        })
      );
      setIsSimulatingQA(false);
      setQaCompleted(true);
    }, 1500);
  };

  // Calculate readability contrast level (Simulated indicator)
  const getReadabilityMetrics = () => {
    let level = 'AAA Perfect';
    let color = 'var(--success-color)';
    let score = 100;

    if (fontSizeMultiplier < 0.9 && lineHeight < 1.45) {
      level = 'AA Pass (Low Line Space)';
      color = 'var(--warning-color)';
      score = 78;
    } else if (fontSizeMultiplier > 1.25 && lineHeight > 1.8) {
      level = 'AA Pass (Large Print)';
      color = 'var(--warning-color)';
      score = 85;
    } else if (readingTheme === 'dark' || readingTheme === 'dim') {
      level = 'AAA Contrast Perfect';
      color = 'var(--success-color)';
      score = 98;
    }

    return { level, color, score };
  };

  const metrics = getReadabilityMetrics();

  return (
    <div className="page-content articles-page theme-adaptable-container">
      {/* Scroll Progress Bar at the top of the container */}
      <div className="reading-scroll-track">
        <div className="reading-scroll-thumb" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="page-header premium-animated-header">
        <div className="header-meta">
          <span className="badge badge-accent">Typography & Layout Sandbox</span>
          <h1>Structured Editorial & Text Testing</h1>
        </div>
        <h1 className="glowing-text">Structured Editorial</h1>
        <p className="subtitle">
          An advanced type scaling playground containing precise editorial tokens. Evaluate container alignment, heading hierarchies, lists wrapping, and table cell contrast under variable fonts and custom contrast schemes.
        </p>
      </div>

      {/* Font Size & Line Height Tester Widget */}
      <div className="typography-controls widget-card">
        <div className="controls-grid">
          <div className="control-group">
            <label>Text Scaling: {fontSizeMultiplier.toFixed(2)}x</label>
            <input
              type="range"
              min="0.8"
              max="1.4"
              step="0.05"
              value={fontSizeMultiplier}
              onChange={(e) => setFontSizeMultiplier(parseFloat(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>Line Height: {lineHeight.toFixed(2)}</label>
            <input
              type="range"
              min="1.2"
              max="1.9"
              step="0.05"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
            />
          </div>
          <button className="btn btn-outline reset-btn" onClick={resetTypography}>Reset Styling</button>
        </div>
      </div>

      {/* Styled text container */}
      <div
        className="editorial-body widget-card"
        style={{
          fontSize: `${18 * fontSizeMultiplier}px`,
          lineHeight: lineHeight
        }}
      >
        <header className="article-header">
          <h2 className="article-title">The Typography Specification & Rendering Baseline</h2>
          <div className="article-meta">
            <span>Published on May 18, 2026</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span>Author: Dev QA Specialist</span>
          </div>
        </header>

        <div className="article-content-flow">
          <p className="lead-paragraph drop-cap">
            This paragraph acts as a lead-in for typography rendering checks. Modern user interfaces require fluid type scaling, high color-contrast readability under variable monitor color temperatures, and strict alignment to pixel grids.
          </p>

          <h3 id="section-headings" className="anchor-heading">
            1. Heading Hierarchy
            <a href="#section-headings" className="heading-anchor-link">#</a>
          </h3>

          <p>
            Below are the standard structural heading sizes defined in this project. Heading tags must maintain strict line-height overrides so that double-line wrapping does not overlap neighboring text blocks.
          </p>

          <div className="heading-spec-box premium-spec-box">
            <div className="spec-badge">TYPOGRAPHY TOKENS SPEC</div>

            <div className="spec-item">
              <div className="spec-item-label">
                <h4>Heading 4 Element (H4)</h4>
                <span className="spec-token">token: font-h4 (20px)</span>
              </div>
              <p>Commonly used for subtitle labels and inner card partitions.</p>
            </div>

            <div className="spec-item">
              <div className="spec-item-label">
                <h5>Heading 5 Element (H5)</h5>
                <span className="spec-token">token: font-h5 (17px)</span>
              </div>
              <p>Serves as secondary sub-headings within complex data clusters.</p>
            </div>

            <div className="spec-item">
              <div className="spec-item-label">
                <h6>Heading 6 Element (H6)</h6>
                <span className="spec-token">token: font-h6 (14px)</span>
              </div>
              <p>Smallest heading tag, used primarily for meta labels, table headers, and form groupings.</p>
            </div>
          </div>

          <h3 id="section-quotes" className="anchor-heading">
            2. Decorative Blockquotes
            <a href="#section-quotes" className="heading-anchor-link">#</a>
          </h3>

          <blockquote className="premium-blockquote">
            <span className="quote-mark">“</span>
            <p className="quote-text">
              The details are not the details. They make the design. Building automated tests for visual regression ensures that your details don’t break when shipping refactored modules.
            </p>
            <cite className="quote-citation">— Charles Eames (QA Modified)</cite>
          </blockquote>

          <h3 id="section-lists" className="anchor-heading">
            3. Lists and Structural Text Blocks
            <a href="#section-lists" className="heading-anchor-link">#</a>
          </h3>

          <p>
            Lists are vital components for content organization. Verify list bullet alignment, padding offsets, and nested list styles under active scaling:
          </p>

          <ul className="premium-list">
            <li>
              <strong className="list-node-title">First-level node:</strong> Highlighting critical parameters.
              <ul className="premium-nested-list">
                <li>Second-level nested node, showcasing list indents.</li>
                <li>A secondary child element illustrating nested bullet offsets.</li>
              </ul>
            </li>
            <li>
              <strong className="list-node-title">Second primary node:</strong> Demonstrating text line wraps inside bullet entries.
            </li>
          </ul>

          <h3 id="section-grid" className="anchor-heading">
            4. Rich Data Grid (Table Layout)
            <a href="#section-grid" className="heading-anchor-link">#</a>
          </h3>

          <div className="table-header-action-row">
            <p className="table-description">
              A crucial asset for test evaluation is a multi-column responsive data table. Test how table layouts scale, adjust border-collapse, and align cell numbers:
            </p>

            {/* Dynamic QA verification control */}
            <button
              className={`btn run-validation-btn ${isSimulatingQA ? 'btn-running' : ''} ${qaCompleted ? 'btn-verified' : ''}`}
              onClick={runQASimulation}
              disabled={isSimulatingQA}
            >
              {isSimulatingQA ? (
                <>
                  <span className="spinner-loader"></span>
                  Auditing Suite...
                </>
              ) : qaCompleted ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="btn-icon">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  QA Verified
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
                    <polygon points="12 2 2 22 22 22" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Run QA Scan
                </>
              )}
            </button>
          </div>

          {/* QA Success Feedback Toast inside content */}
          {qaCompleted && (
            <div className="qa-success-toast-banner">
              <div className="toast-icon">✓</div>
              <div className="toast-text">
                <strong>Regression Suite Verified:</strong> All typography nodes matching rendering constraints. (100% test pass).
              </div>
              <button className="toast-close" onClick={() => setQaCompleted(false)}>×</button>
            </div>
          )}

          <div className="table-responsive premium-table-responsive">
            <table className="custom-table premium-table">
              <thead>
                <tr>
                  <th>Module Name</th>
                  <th>Type</th>
                  <th>Target Viewport</th>
                  <th className="text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr
                    key={row.id}
                    className={`table-row-animate ${isSimulatingQA ? 'row-scanning' : ''} ${qaCompleted ? 'row-passed' : ''}`}
                  >
                    <td>
                      <div className="module-code-cell">
                        <code>{row.name}</code>
                      </div>
                    </td>
                    <td>
                      <span className="type-meta-tag">{row.type}</span>
                    </td>
                    <td>
                      <span className="viewport-meta-tag">{row.viewport}</span>
                    </td>
                    <td className="text-right">
                      <span className={`success-badge-pill rate-${row.status}`}>
                        {row.rate.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

      </div >
    </div >
  );
}
