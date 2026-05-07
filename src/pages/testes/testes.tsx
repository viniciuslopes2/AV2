import React from 'react';
import { Plus } from 'lucide-react';
import { MOCK_TESTES, MOCK_AERONAVES, NivelPermissao } from '../../types';
import styles from './testes.module.css';

interface TestesProps {
  openModal: (name: string) => void;
  role: NivelPermissao;
}

function resultadoBadge(resultado: string): string {
  return resultado === 'Aprovado'
    ? `${styles.badge} ${styles.bGreen}`
    : `${styles.badge} ${styles.bRed}`;
}

function tipoIcon(tipo: string): string {
  if (tipo === 'Elétrico') return '⚡';
  if (tipo === 'Hidráulico') return '💧';
  return '🌬️';
}

function modeloByCode(codigo: string): string {
  return MOCK_AERONAVES.find(a => a.codigo === codigo)?.modelo ?? codigo;
}

export default function Testes({ openModal, role }: TestesProps) {
  const aprovados = MOCK_TESTES.filter(t => t.resultado === 'Aprovado').length;
  const reprovados = MOCK_TESTES.filter(t => t.resultado === 'Reprovado').length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Testes</div>
          <div className={styles.pageSubtitle}>
            {MOCK_TESTES.length} testes · {aprovados} aprovado(s) · {reprovados} reprovado(s)
          </div>
        </div>
        {role !== 'Operador' && (
          <button className={styles.addBtn} onClick={() => openModal('teste')}>
            <Plus size={14} strokeWidth={2.5} /> Registrar Teste
          </button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Aeronave</th>
              <th className={styles.th}>Modelo</th>
              <th className={styles.th}>Tipo de Teste</th>
              <th className={styles.th}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TESTES.map(t => (
              <tr key={t.id} className={styles.tr}>
                <td className={styles.tdCode}>{t.aeronave}</td>
                <td className={styles.tdSec}>{modeloByCode(t.aeronave)}</td>
                <td className={styles.td}>
                  <span style={{ marginRight: 6 }}>{tipoIcon(t.tipo)}</span>
                  {t.tipo}
                </td>
                <td className={styles.td}>
                  <span className={resultadoBadge(t.resultado)}>
                    <span className={styles.bdot} />{t.resultado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
