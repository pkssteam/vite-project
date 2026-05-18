import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import Articles from './pages/Articles.jsx';
import FormTest from './pages/FormTest.jsx';
import Gallery from './pages/Gallery.jsx';
import './App.css';
import './pages/pages.css';

function App() {
  // Sync page state with URL query parameters for test stability & direct linking
  const [activePage, setActivePage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const validPages = ['dashboard', 'articles', 'form', 'gallery'];
    return validPages.includes(pageParam) ? pageParam : 'dashboard';
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const validPages = ['dashboard', 'articles', 'form', 'gallery'];
      if (validPages.includes(pageParam)) {
        setActivePage(pageParam);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (pageName) => {
    setActivePage(pageName);
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageName);
    window.history.pushState({}, '', url);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'articles':
        return <Articles />;
      case 'form':
        return <FormTest />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {/* Premium App Shell Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">▲</div>
          <div>
            <span className="logo-title">CoreQA Sandbox</span>
            <span className="logo-sub">Interface QA Engine</span>
          </div>
        </div>

        {/* Dynamic Route Switcher Tabs */}
        <nav className="app-nav">
          <button 
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigate('dashboard')}
            id="nav-dashboard"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            System Metrics
          </button>
          
          <button 
            className={`nav-item ${activePage === 'articles' ? 'active' : ''}`}
            onClick={() => navigate('articles')}
            id="nav-articles"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Typography
          </button>

          <button 
            className={`nav-item ${activePage === 'form' ? 'active' : ''}`}
            onClick={() => navigate('form')}
            id="nav-form"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            Inputs Form
          </button>

          <button 
            className={`nav-item ${activePage === 'gallery' ? 'active' : ''}`}
            onClick={() => navigate('gallery')}
            id="nav-gallery"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Node Cluster
          </button>
        </nav>
      </header>

      {/* Main Page Layout Wrapper */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {renderActivePage()}
      </main>

      {/* App Shell Footer */}
      <footer className="app-footer">
        <div className="footer-status">
          <span className="status-dot"></span>
          <span>Ecosystem Nodes Online • All systems functional</span>
        </div>
        <div className="footer-meta-info">
          <span>Active Viewport: Responsive Grid</span>
          <span>Target Schema: v2.54.1</span>
        </div>
      </footer>
    </>
  );
}

export default App;
