import React, { useState } from 'react';

export default function Articles() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [lineHeight, setLineHeight] = useState(1.55);

  const resetTypography = () => {
    setFontSizeMultiplier(1);
    setLineHeight(1.55);
  };

  return (
    <div className="page-content articles-page">
      <div className="page-header">
        <div className="header-meta">
          <span className="badge badge-accent">Typography & Layout Sandbox</span>
          <h1>Structured Editorial & Text Testing</h1>
        </div>
        <p className="subtitle">
          A rich page structure containing standard typography tokens. Use this to verify text scaling, container wrapping, headings hierarchy, and table padding.
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

        <p className="lead-paragraph">
          This paragraph acts as a lead-in for typography rendering checks. Modern user interfaces require fluid type scaling, high color-contrast readability under variable monitor color temperatures, and strict alignment to pixel grids.
        </p>

        <h3>1. Heading Hierarchy</h3>
        <p>
          Below are the standard structural heading sizes defined in this project. Heading tags must maintain strict line-height overrides so that double-line wrapping does not overlap neighboring text blocks.
        </p>

        <div className="heading-spec-box">
          <h4>Heading 4 Element (H4)</h4>
          <p>Commonly used for subtitle labels and inner card partitions.</p>

          <h5>Heading 5 Element (H5)</h5>
          <p>Serves as secondary sub-headings within complex data clusters.</p>

          <h6>Heading 6 Element (H6)</h6>
          <p>Smallest heading tag, used primarily for meta labels, table headers, and form groupings.</p>
        </div>

        <h3>2. Decorative Blockquotes</h3>
        <blockquote>
          “The details are not the details. They make the design. Building automated tests for visual regression ensures that your details don’t break when shipping refactored modules.”
          <cite>— Charles Eames (QA Modified)</cite>
        </blockquote>

        <h3>3. Lists and Structural Text Blocks</h3>
        <p>
          Lists are vital components for content organization. Verify list bullet alignment, padding offsets, and nested list styles under active scaling:
        </p>

        <ul>
          <li>
            <strong>First-level node:</strong> Highlighting critical parameters.
            <ul>
              <li>Second-level nested node, showcasing list indents.</li>
              <li>A secondary child element illustrating nested bullet offsets.</li>
            </ul>
          </li>
          <li><strong>Second primary node:</strong> Demonstrating text line wraps inside bullet entries.</li>
        </ul>

        <h3>4. Rich Data Grid (Table Layout)</h3>
        <p>
          A crucial asset for test evaluation is a multi-column responsive data table. Test how table layouts scale, adjust border-collapse, and align cell numbers:
        </p>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Type</th>
                <th>Target Viewport</th>
                <th className="text-right">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Authentication</code></td>
                <td>System API</td>
                <td>Mobile / Desktop</td>
                <td className="text-right text-success">99.98%</td>
              </tr>
              <tr>
                <td><code>Dashboard Charts</code></td>
                <td>Visual UI</td>
                <td>Tablet / Desktop</td>
                <td className="text-right text-success">99.20%</td>
              </tr>
              <tr>
                <td><code>Telemetry Logger</code></td>
                <td>Background Node</td>
                <td>All Viewports</td>
                <td className="text-right text-warning">94.85%</td>
              </tr>
              <tr>
                <td><code>Form Validation</code></td>
                <td>Interactive Input</td>
                <td>Mobile Specific</td>
                <td className="text-right text-error">78.50%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
