import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function CampaignPage() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('leads');
  const [copiedStates, setCopiedStates] = useState({});
  const [leadStatuses, setLeadStatuses] = useState({});

  useEffect(() => {
    // Load from local storage
    const storedCampaigns = localStorage.getItem('clientai_campaigns');
    if (storedCampaigns) {
      const parsedCampaigns = JSON.parse(storedCampaigns);
      const foundCampaign = parsedCampaigns.find(c => c.id === campaignId);
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
    }

    const storedStatuses = localStorage.getItem(`clientai_statuses_${campaignId}`);
    if (storedStatuses) {
      setLeadStatuses(JSON.parse(storedStatuses));
    }

    setLoading(false);
  }, [campaignId]);

  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = { ...leadStatuses, [index]: newStatus };
    setLeadStatuses(updatedStatuses);
    localStorage.setItem(`clientai_statuses_${campaignId}`, JSON.stringify(updatedStatuses));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  if (loading) {
    return <div className="flex-center" style={{ height: '100vh' }}><div className="spinner"></div></div>;
  }

  if (!campaign) {
    return <div className="container text-center mt-8">Campaign not found. <Link to="/dashboard">Go back</Link></div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <ArrowLeft size={20} />
        </Link>
        <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>Campaign Details</div>
      </header>

      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <div className="tabs-header">
          {['leads', 'emails', 'dms', 'objections', 'follow_up'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'leads' && 'Leads'}
              {tab === 'emails' && 'Email Sequence'}
              {tab === 'dms' && 'LinkedIn DMs'}
              {tab === 'objections' && 'Objection Scripts'}
              {tab === 'follow_up' && 'Follow Up'}
            </button>
          ))}
        </div>

        <div className="tab-content animate-fade-in">
          {activeTab === 'leads' && (
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company Type</th>
                      <th>Decision Maker</th>
                      <th>Where to Find</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaign.leads?.map((lead, idx) => (
                      <tr key={idx}>
                        <td style={{ color: 'var(--text-muted)' }}>{idx + 1}</td>
                        <td>{lead.company_type}</td>
                        <td>{lead.decision_maker_title}</td>
                        <td>{lead.where_to_find}</td>
                        <td>
                          <select 
                            className="form-select" 
                            style={{ padding: '0.5rem', minWidth: '160px' }}
                            value={leadStatuses[idx] || 'Not contacted'}
                            onChange={(e) => handleStatusChange(idx, e.target.value)}
                          >
                            <option value="Not contacted">Not contacted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Replied">Replied</option>
                            <option value="Meeting booked">Meeting booked</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="grid" style={{ gap: '1.5rem' }}>
              {campaign.email_sequence?.map((email, idx) => (
                <div key={idx} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary)' }}>Day {email.day}</div>
                    <button 
                      onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`, `email_${idx}`)}
                      className="btn btn-secondary" style={{ padding: '0.5rem' }}
                    >
                      {copiedStates[`email_${idx}`] ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Subject: {email.subject}</div>
                  <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>{email.body}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dms' && (
            <div className="grid" style={{ gap: '1.5rem' }}>
              {campaign.linkedin_dms?.map((dm, idx) => (
                <div key={idx} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary)' }}>Message {dm.message || idx + 1}</div>
                    <button 
                      onClick={() => copyToClipboard(dm.text, `dm_${idx}`)}
                      className="btn btn-secondary" style={{ padding: '0.5rem' }}
                    >
                      {copiedStates[`dm_${idx}`] ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>{dm.text}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'objections' && campaign.objection_handlers && (
            <div className="grid" style={{ gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {Object.entries(campaign.objection_handlers).map(([key, script], idx) => {
                const title = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return (
                  <div key={idx} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: '600' }}>"{title}"</div>
                      <button 
                        onClick={() => copyToClipboard(script, `obj_${idx}`)}
                        className="btn btn-secondary" style={{ padding: '0.5rem' }}
                      >
                        {copiedStates[`obj_${idx}`] ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>{script}</div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'follow_up' && campaign.follow_up_schedule && (
            <div className="card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.entries(campaign.follow_up_schedule).map(([day, action], idx) => {
                  const dayTitle = day.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: '600', color: 'var(--primary)', minWidth: '80px' }}>{dayTitle}</div>
                      <div style={{ color: 'var(--text-main)', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border)' }}>{action}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
