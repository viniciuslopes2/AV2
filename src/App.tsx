import React, { useState } from 'react';
import { ViewState, Aeronave, NivelPermissao } from './types';
import './index.css';
import './App.css';

import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Frota from './pages/frota/frota';
import Equipe from './pages/equipe/equipe';
import Detalhes from './pages/detalhes/detalhes';
import Testes from './pages/testes/testes';
import Relatorio from './pages/relatorio/relatorio';

import ModaisContainer from './components/modais/modais-container';
import Sidebar from './components/sidebar/sidebar';

const VIEW_LABELS: Record<ViewState, string> = {
  login: 'Login',
  dashboard: 'Dashboard',
  frota: 'Frota',
  equipe: 'Equipe',
  detalhes: 'Detalhes',
  testes: 'Testes',
  relatorio: 'Relatório',
};

const ROLE_USERS: Record<NivelPermissao, { primeiroNome: string; iniciais: string }> = {
  Administrador: { primeiroNome: 'Gerson', iniciais: 'GP' },
  Engenheiro:    { primeiroNome: 'Vinícius',   iniciais: 'VL' },
  Operador:      { primeiroNome: 'Fulano', iniciais: 'F' },
};

export default function App() {
  const [view, setView] = useState<ViewState>('login');
  const [selectedAero, setSelectedAero] = useState<Aeronave | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [role, setRole] = useState<NivelPermissao>('Engenheiro');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (newView: ViewState) => {
    setSelectedAero(null);
    setView(newView);
    setSidebarOpen(false);
  };

  const handleVerDetalhes = (aero: Aeronave) => {
    setSelectedAero(aero);
    setView('detalhes');
    setSidebarOpen(false);
  };

  const handleRelatorio = () => {
    setView('relatorio');
    setSidebarOpen(false);
  };

  const user = ROLE_USERS[role];

  const renderView = () => {
    if (view === 'login') {
      return <Login onLogin={() => setView('dashboard')} />;
    }

    return (
      <div className="app-layout">
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        <Sidebar
          activeView={view}
          navigate={navigate}
          onLogout={() => { setSelectedAero(null); setView('login'); }}
          role={role}
          onRoleChange={setRole}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="main-area">
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen(s => !s)}>
                ☰
              </button>
              <div className="breadcrumb">
                <span>Aerocode</span>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-cur">{VIEW_LABELS[view]}</span>
              </div>
            </div>
            <div className="topbar-right">
              <span className="topbar-greet">Bem-vindo, <strong>{user.primeiroNome}</strong></span>
              <div className="topbar-avatar">{user.iniciais}</div>
            </div>
          </header>

          <div className="page-scroll">
            {view === 'dashboard' && <Dashboard />}
            {view === 'frota' && (
              <Frota onVerDetalhes={handleVerDetalhes} openModal={setIsModalOpen} role={role} />
            )}
            {view === 'equipe' && <Equipe openModal={setIsModalOpen} role={role} />}
            {view === 'testes' && <Testes openModal={setIsModalOpen} role={role} />}
            {view === 'relatorio' && (
              <Relatorio preselectedAero={selectedAero} role={role} />
            )}
            {view === 'detalhes' && selectedAero && (
              <Detalhes
                aero={selectedAero}
                onBack={() => navigate('frota')}
                openModal={setIsModalOpen}
                role={role}
                onRelatorio={handleRelatorio}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderView()}
      {isModalOpen && (
        <ModaisContainer
          modalType={isModalOpen}
          onClose={() => setIsModalOpen(null)}
          selectedAero={selectedAero}
        />
      )}
    </>
  );
}
