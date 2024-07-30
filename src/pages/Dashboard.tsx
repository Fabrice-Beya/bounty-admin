import React, { useState, useEffect } from 'react';
import { summaryService } from '../services/summaryService';
import { tipService } from '../services/tipService';
import { Tip } from '../types';
 
// import css
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [recentTips, setRecentTips] = useState<Tip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const summaryData = await summaryService.getSummary();
      setSummary(summaryData);
      const tips = await tipService.getAllTips();
      setRecentTips(tips);
    };
    fetchData();
  }, []);

  const filteredTips = recentTips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {summary && (
        <div className="summary-cards">
          <SummaryCard title="Total Bounties" value={summary.totalBounties} icon="🏴‍☠️" />
          <SummaryCard title="Total Tips" value={summary.totalTips} icon="💡" />
          <SummaryCard title="Total Budget" value={`R${summary.totalRevenue.toFixed(2)}`} icon="💰" />
        </div>
      )}

      <div className="recent-tips">
        <h2>Recent Tips</h2>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTips.map(tip => (
              <tr key={tip.id}>
                <td>{tip.id}</td>
                <td>{tip.title}</td>
                <td>{tip.category}</td>
                <td>{new Date(tip.datetime).toLocaleDateString()}</td>
                <td>{tip.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ title: string; value: string | number; icon: string }> = ({ title, value, icon }) => (
  <div className="summary-card">
    <span className="icon">{icon}</span>
    <div className="content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

export default Dashboard;