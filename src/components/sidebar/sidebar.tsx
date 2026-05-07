import React from 'react';
import { LayoutDashboard, Plane, Users, FlaskConical, FileText, LogOut } from 'lucide-react';
import { ViewState, NivelPermissao } from '../../types';
import logo from '../../assets/logo.png';
import styles from './sidebar.module.css';

interface SidebarProps {
  activeView: ViewState;
  navigate: (view: ViewState) => void;
  onLogout: () => void;
  role: NivelPermissao;
  onRoleChange: (r: NivelPermissao) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_USERS: Record<NivelPermissao, { nome: string; iniciais: string }> = {
  Administrador: { nome: 'Gerson Penha',  iniciais: 'GP' },
  Engenheiro:    { nome: 'Vinícius Lopes',    iniciais: 'VL' },
  Operador:      { nome: 'Fulano', iniciais: 'F' },
};

export default function Sidebar({ activeView, navigate, onLogout, role, onRoleChange, isOpen, onClose }: SidebarProps) {
  const active = (v: ViewState) =>
    activeView === v ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem;

  const roleBtn = (r: NivelPermissao) =>
    role === r ? `${styles.roleBtn} ${styles.roleBtnActive}` : styles.roleBtn;

  const user = ROLE_USERS[role];

  return (
    <aside className={`${styles.sidebar}${isOpen ? ` ${styles.mobileOpen}` : ''}`}>
      <div className={styles.logoArea}>
        <img src={logo} alt="AeroCODE" className={styles.logoImg} />
      </div>

      <nav className={styles.nav}>
        <span className={styles.sectionLabel}>Geral</span>
        <button className={active('dashboard')} onClick={() => navigate('dashboard')}>
          <LayoutDashboard size={17} /> Dashboard
        </button>

        <span className={styles.sectionLabel}>Aeronaves</span>
        <button className={active('frota')} onClick={() => navigate('frota')}>
          <Plane size={17} /> Frota
        </button>
        <button className={active('testes')} onClick={() => navigate('testes')}>
          <FlaskConical size={17} /> Testes
        </button>
        <button className={active('relatorio')} onClick={() => navigate('relatorio')}>
          <FileText size={17} /> Relatório
        </button>

        <span className={styles.sectionLabel}>Equipe</span>
        <button className={active('equipe')} onClick={() => navigate('equipe')}>
          <Users size={17} /> Funcionários
        </button>
      </nav>

      <div className={styles.footer}>
        <div className={styles.roleSwitch}>
          <span className={styles.roleSwitchLabel}>Trocar permissão</span>
          <div className={styles.roleBtns}>
            <button className={roleBtn('Administrador')} onClick={() => onRoleChange('Administrador')}>Admin</button>
            <button className={roleBtn('Engenheiro')} onClick={() => onRoleChange('Engenheiro')}>Eng.</button>
            <button className={roleBtn('Operador')} onClick={() => onRoleChange('Operador')}>Oper.</button>
          </div>
        </div>

        <div className={styles.userRow}>
          <div className={styles.userAvatar}>{user.iniciais}</div>
          <div>
            <div className={styles.userName}>{user.nome}</div>
            <div className={styles.userRole}>{role}</div>
          </div>
        </div>
        <button className={`${styles.navItem} ${styles.logoutItem}`} onClick={onLogout}>
          <LogOut size={17} /> Sair
        </button>
      </div>
    </aside>
  );
}
