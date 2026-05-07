import React from 'react';
import { Plane, Users, Clock } from 'lucide-react';
import { MOCK_AERONAVES, MOCK_ETAPAS } from '../../types';
import styles from './dashboard.module.css';

const ACTIVITY = [
  { color: 'var(--primary)', title: 'Instalação Elétrica iniciada', meta: 'AAA-101 · Embraer E175 · Fulano' },
  { color: 'var(--green)', title: 'Fuselagem concluída', meta: 'AAA-101 · Embraer E175 · Vinícius Lopes' },
  { color: 'var(--yellow)', title: 'Teste Hidráulico — Aprovado', meta: 'BBB-101 · Dassault Rafale' },
  { color: 'var(--green)', title: 'BBB-102 marcada como Concluída', meta: 'Airbus A400M · Gerson Penha' },
];

function statusBadge(status: string): { cls: string; label: string } {
  if (status === 'Em Produção') return { cls: `${styles.badge} ${styles.bBlue}`, label: 'Em Produção' };
  if (status === 'Testes') return { cls: `${styles.badge} ${styles.bYellow}`, label: 'Em Teste' };
  return { cls: `${styles.badge} ${styles.bGreen}`, label: 'Concluída' };
}

export default function Dashboard() {
  const emProd = MOCK_AERONAVES.filter(a => a.status === 'Em Produção').length;
  const emTeste = MOCK_AERONAVES.filter(a => a.status === 'Testes').length;
  const concluidas = MOCK_AERONAVES.filter(a => a.status === 'Finalizado').length;
  const emAndamento = MOCK_ETAPAS.filter(e => e.status === 'Andamento').length;
  const concEtapas = MOCK_ETAPAS.filter(e => e.status === 'Concluído').length;

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });
  
  const dateLabel = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Dashboard</div>
          <div className={styles.pageSubtitle}>Visão geral — {dateLabel}</div>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Total de Aeronaves</span>
            <div className={styles.kpiIcon} style={{ background: 'var(--primary-light)' }}>
              <Plane size={18} color="var(--primary)" />
            </div>
          </div>
          <div className={styles.kpiValue}>{MOCK_AERONAVES.length}</div>
          <div className={styles.kpiMeta}>{emProd} em produção · {emTeste} em teste · {concluidas} concluída(s)</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Funcionários</span>
            <div className={styles.kpiIcon} style={{ background: 'var(--green-bg)' }}>
              <Users size={18} color="var(--green-text)" />
            </div>
          </div>
          <div className={styles.kpiValue}>3</div>
          <div className={styles.kpiMeta}>1 admin · 1 engenheiro · 1 operador</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Etapas em Andamento</span>
            <div className={styles.kpiIcon} style={{ background: 'var(--yellow-bg)' }}>
              <Clock size={18} color="var(--yellow-text)" />
            </div>
          </div>
          <div className={styles.kpiValue}>{emAndamento}</div>
          <div className={styles.kpiMeta}>{concEtapas} concluída(s) · {emAndamento} ativa(s)</div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <span className={styles.tableTitle}>Atividade Recente</span>
          </div>
          <div className={styles.actList}>
            {ACTIVITY.map((a, i) => (
              <div key={i} className={styles.actItem}>
                <div className={styles.actDot} style={{ background: a.color }} />
                <div>
                  <div className={styles.actTitle}>{a.title}</div>
                  <div className={styles.actMeta}>{a.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <span className={styles.tableTitle}>Status da Frota</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Código</th>
                <th className={styles.th}>Modelo</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AERONAVES.map(a => {
                const { cls, label } = statusBadge(a.status);
                return (
                  <tr key={a.codigo} className={styles.tr}>
                    <td className={styles.tdCode}>{a.codigo}</td>
                    <td className={styles.td}>{a.modelo}</td>
                    <td className={styles.td}>
                      <span className={cls}><span className={styles.bdot} />{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}