import React from 'react'
import { useState } from 'react';
import LastestApplications from './LastestApplications.jsx';
import AllAplications from './AllAplications.jsx';
import '../css/Dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('latest');
  return (
    <div className='py-4'>
        <h1>Your Applications</h1>
        <div className='tabs-container'> 
            <div className="mode-switch" role="tablist">
                <button 
                    type='button'
                    id="tab-latest"
                    className={`mode-btn ${activeTab === 'latest' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('latest')}
                    aria-selected={activeTab === 'latest'}
                    aria-controls="latest-panel"
                    role="tab"
                >
                    Latest Applications
                </button>
                <button 
                    type='button'
                    id="tab-all"
                    className={`mode-btn ${activeTab === 'all' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('all')}
                    aria-selected={activeTab === 'all'}
                    aria-controls="all-panel"
                    role="tab"
                >
                    All Applications
                </button>
            </div>
        </div>
        
        <div
            id="latest-panel"
            role="tabpanel"
            aria-labelledby='tab-latest'
            hidden={activeTab !== 'latest'}
        >            
          <LastestApplications />
        </div>
        <div
            id="all-panel"
            role="tabpanel"
            aria-labelledby='tab-all'
            hidden={activeTab !== 'all'}
        >
            <AllAplications />
        </div>        
    </div>
  )
}
