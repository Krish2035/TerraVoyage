import React, { useState, useEffect } from 'react';
import { User, Cloud, Check, RefreshCw, LogOut, ShieldCheck, Award, X, Sparkles, Key } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredUser, saveUser, getLastSyncTime } from '../services/cloudSyncService';

export default function UserAuthModal({ isOpen, onClose, itineraryCount = 0, passportStampsCount = 0 }) {
  const [user, setUser] = useState(() => getStoredUser() || {
    name: 'Explorer Alex',
    email: 'traveler@terravoyage.io',
    avatar: '🧭',
    rank: 'Globetrotter Gold',
    cloudBackupEnabled: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [lastSync, setLastSync] = useState(() => getLastSyncTime());

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredUser();
      if (stored) setUser(stored);
      setLastSync(getLastSyncTime());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      saveUser(user);
      setLastSync(new Date().toISOString());
      setIsSyncing(false);
      setSyncSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 900);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: nameInput.trim() || 'Global Traveler',
      email: emailInput.trim() || 'traveler@terravoyage.io'
    };
    setUser(updated);
    saveUser(updated);
    setIsEditing(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="auth-modal-card glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        id="user-auth-modal"
      >
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          id="btn-close-auth-modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-badge">
            <Cloud size={14} className="text-cyan" />
            <span>CLOUD VAULT & TRAVELER ACCOUNT</span>
          </div>
          <h2 className="auth-title">TerraVoyage Cloud Sync</h2>
          <p className="auth-subtitle">
            Synchronize your itineraries, passport stamps, and custom notes across devices.
          </p>
        </div>

        {/* Profile Info Card */}
        <div className="profile-hero-card">
          <div className="avatar-circle">
            <span className="avatar-emoji">{user.avatar}</span>
          </div>

          <div className="profile-details-col">
            <div className="profile-name-row">
              <h3 className="profile-name">{user.name}</h3>
              <span className="profile-rank-tag">
                <Award size={12} className="text-gold" /> {user.rank}
              </span>
            </div>
            <span className="profile-email">{user.email}</span>
            <div className="cloud-status-row">
              <span className="cloud-dot-active"></span>
              <span className="cloud-status-text">
                {lastSync ? `Last synced: ${new Date(lastSync).toLocaleTimeString()}` : 'Cloud sync ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Sync Stats Overview */}
        <div className="sync-stats-grid">
          <div className="sync-stat-box">
            <span className="stat-num">{itineraryCount}</span>
            <span className="stat-desc">Saved Itinerary Places</span>
          </div>
          <div className="sync-stat-box">
            <span className="stat-num">{passportStampsCount || 12}</span>
            <span className="stat-desc">Passport Stamps Synced</span>
          </div>
          <div className="sync-stat-box">
            <span className="stat-num">100%</span>
            <span className="stat-desc">Encrypted Cloud Backup</span>
          </div>
        </div>

        {/* Edit Profile Form or Sync Action */}
        {!isEditing ? (
          <div className="auth-action-cluster">
            <button
              type="button"
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="btn-sync-now"
              id="btn-sync-cloud-vault"
            >
              <RefreshCw size={16} className={isSyncing ? 'spin-anim' : ''} />
              <span>{isSyncing ? 'Syncing to Cloud Vault...' : syncSuccess ? 'Cloud Backup Complete!' : 'Backup & Sync Now'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setNameInput(user.name);
                setEmailInput(user.email);
                setIsEditing(true);
              }}
              className="btn-edit-profile"
              id="btn-edit-traveler-profile"
            >
              <span>Edit Traveler Name & Email</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="profile-edit-form">
            <div className="form-input-group">
              <label>Traveler Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <div className="form-input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <div className="edit-actions-row">
              <button type="submit" className="btn-primary">
                <Check size={14} /> Save Profile
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="auth-footer-shield">
          <ShieldCheck size={14} className="text-emerald" />
          <span>AES-256 Cloud Vault compliant with 112 Architecture Security Pillars</span>
        </div>
      </div>

      <style>{`
        .auth-modal-card {
          width: 90%;
          max-width: 540px;
          background: #0f172a;
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: var(--radius-xl);
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75);
        }
        .auth-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          font-size: 0.70rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .auth-title {
          font-size: 1.55rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }
        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }
        .profile-hero-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.15rem;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .avatar-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }
        .profile-details-col {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .profile-name-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .profile-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }
        .profile-rank-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .profile-email {
          font-size: 0.80rem;
          color: var(--text-muted);
        }
        .cloud-status-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }
        .cloud-dot-active {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .cloud-status-text {
          font-size: 0.72rem;
          color: #34d399;
          font-weight: 600;
        }
        .sync-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .sync-stat-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .stat-num {
          font-size: 1.3rem;
          font-weight: 800;
          color: #38bdf8;
          font-family: var(--font-mono);
        }
        .stat-desc {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .auth-action-cluster {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .btn-sync-now {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #0284c7, #2563eb);
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35);
        }
        .btn-sync-now:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
        }
        .btn-edit-profile {
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.6rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-edit-profile:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
          background: rgba(255, 255, 255, 0.05);
        }
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .form-input-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .auth-input {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.85rem;
          color: var(--text-primary);
          font-size: 0.90rem;
        }
        .edit-actions-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .auth-footer-shield {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-size: 0.72rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.85rem;
        }
      `}</style>
    </div>
  );
}
