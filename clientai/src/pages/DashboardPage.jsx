import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Mail, MessageCircle, Calendar } from 'lucide-react';

export default function DashboardPage({ logoutUser, userProfile }) {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load campaigns from local storage
    const storedCampaigns = localStorage.getItem('clientai_campaigns');
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    }
  }, []);

  const handleGenerateCampaign = async () => {
    if (!userProfile) return;
    setLoading(true);

    try {
      const systemPrompt = `You are a client acquisition specialist. A freelancer has given you their profile. Build them a complete outreach campaign.

FREELANCER PROFILE:
Skill: ${userProfile.skill}
Best result: ${userProfile.best_result}
Ideal client: ${userProfile.ideal_client}
Pricing: ${userProfile.pricing}
Portfolio: ${userProfile.portfolio_url}

Return only a JSON object with this exact structure:
{
  "lead_targets": [
    { "company_type": "", "decision_maker_title": "", "where_to_find": "" }
  ],
  "email_sequence": [
    { "day": 1, "subject": "", "body": "" },
    { "day": 3, "subject": "", "body": "" },
    { "day": 7, "subject": "", "body": "" }
  ],
  "linkedin_dms": [
    { "message": 1, "text": "" },
    { "message": 2, "text": "" },
    { "message": 3, "text": "" }
  ],
  "objection_handlers": {
    "too_expensive": "",
    "not_interested": "",
    "have_someone": "",
    "send_more_info": ""
  },
  "follow_up_schedule": {
    "day_1": "",
    "day_3": "",
    "day_7": "",
    "day_14": ""
  }
}

RULES:
- Every email must be under 120 words
- Every LinkedIn DM must be under 60 words
- No hype words. Sound like a real human.
- Lead targets must be hyper specific (generate 20 lead targets in the array)
- Objection responses must be 2 to 3 sentences max`;

      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || import.meta.env.ANTHROPIC_API_KEY;

      if (!apiKey) {
        alert("API Key missing! Please set VITE_ANTHROPIC_API_KEY in your .env file.");
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20240620', // updated to a standard model as anthropic api may reject the other
          max_tokens: 4000,
          system: systemPrompt,
          messages: [
            { role: 'user', content: 'Generate the campaign as requested.' }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const campaignJsonStr = data.content[0].text;
      
      const jsonMatch = campaignJsonStr.match(/\{[\s\S]*\}/);
      const campaignData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(campaignJsonStr);

      let leads = campaignData.lead_targets || [];
      while(leads.length > 0 && leads.length < 20) {
        leads = [...leads, ...campaignData.lead_targets].slice(0, 20);
      }
      campaignData.lead_targets = leads;

      const newCampaign = {
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        leads: campaignData.lead_targets,
        email_sequence: campaignData.email_sequence,
        linkedin_dms: campaignData.linkedin_dms,
        objection_handlers: campaignData.objection_handlers,
        follow_up_schedule: campaignData.follow_up_schedule
      };

      const updatedCampaigns = [...campaigns, newCampaign];
      setCampaigns(updatedCampaigns);
      localStorage.setItem('clientai_campaigns', JSON.stringify(updatedCampaigns));

      navigate(\`/campaign/\${newCampaign.id}\`);

    } catch (err) {
      console.error("Error generating campaign:", err);
      alert("Failed to generate campaign. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const leadsCount = campaigns.length * 20;
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <header style={{ padding: '1.5rem 2rem', backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--text-main)' }}>ClientAI</div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{userProfile?.email}</span>
          <button onClick={logoutUser} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Sign out</button>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
          <p className="text-lg">Welcome back. Ready to find your next client?</p>
        </div>

        {/* Stat Cards */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Leads Generated</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{leadsCount}</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--primary)' }}>
              <Mail size={24} />
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Emails Sent</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>0</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--primary)' }}>
              <MessageCircle size={24} />
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Replies</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>0</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--primary)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Meetings Booked</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>0</div>
            </div>
          </div>
        </div>

        {/* Generate Button Area */}
        <div className="card text-center animate-fade-in" style={{ padding: '4rem 2rem', border: '2px dashed var(--border)', backgroundColor: 'transparent' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div className="spinner" style={{ width: '60px', height: '60px', borderWidth: '4px' }}></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Building your campaign...</h3>
              <p style={{ color: 'var(--text-muted)' }}>Analyzing your profile and finding the best targets.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--primary)' }}>
                <Plus size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Need more clients?</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>Generate a completely new outreach campaign tailored to your profile.</p>
              </div>
              <button onClick={handleGenerateCampaign} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', marginTop: '1rem' }}>
                Generate New Campaign
              </button>
            </div>
          )}
        </div>

        {/* Past Campaigns */}
        {campaigns.length > 0 && !loading && (
          <div style={{ marginTop: '4rem' }}>
            <h2 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Past Campaigns</h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {campaigns.map(camp => (
                <div key={camp.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(\`/campaign/\${camp.id}\`)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>Campaign #{camp.id.slice(0, 6)}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {new Date(camp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {camp.leads?.length || 0} leads targetted
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
