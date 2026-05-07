import React from 'react';
import { Plus } from 'lucide-react';
import { MOCK_AERONAVES, Aeronave, NivelPermissao } from '../../types';
import styles from './frota.module.css';

interface FrotaProps {
  onVerDetalhes: (aero: Aeronave) => void;
  openModal: (name: string) => void;
  role: NivelPermissao;
}

function statusBadge(status: string): { cls: string; label: string } {
  if (status === 'Em Produção') return { cls: `${styles.badge} ${styles.bBlue}`, label: 'Em Produção' };
  if (status === 'Testes') return { cls: `${styles.badge} ${styles.bYellow}`, label: 'Em Teste' };
  return { cls: `${styles.badge} ${styles.bGreen}`, label: 'Concluída' };
}

export default function Frota({ onVerDetalhes, openModal, role }: FrotaProps) {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Frota de Aeronaves</div>
          <div className={styles.pageSubtitle}>{MOCK_AERONAVES.length} aeronaves cadastradas</div>
        </div>
        {role !== 'Operador' && (
          <button className={styles.addBtn} onClick={() => openModal('aeronave')}>
            <Plus size={14} strokeWidth={2.5} /> Adicionar Aeronave
          </button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Código</th>
              <th className={styles.th}>Modelo</th>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th}>Capacidade</th>
              <th className={styles.th}>Alcance</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_AERONAVES.map(a => {
              const { cls, label } = statusBadge(a.status);
              return (
                <tr key={a.codigo} className={styles.tr} onClick={() => onVerDetalhes(a)}>
                  <td className={styles.tdCode}>{a.codigo}</td>
                  <td className={styles.tdModel}>{a.modelo}</td>
                  <td className={styles.tdSec}>{a.tipo}</td>
                  <td className={styles.tdSec}>{a.capacidade} pax</td>
                  <td className={styles.tdSec}>{a.alcance}</td>
                  <td className={styles.td}>
                    <span className={cls}><span className={styles.bdot} />{label}</span>
                  </td>
                  <td className={styles.td}>
                    <button
                      className={styles.detailBtn}
                      onClick={e => { e.stopPropagation(); onVerDetalhes(a); }}
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}