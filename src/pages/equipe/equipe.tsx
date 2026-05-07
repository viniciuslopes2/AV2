import React from 'react';
import { Plus } from 'lucide-react';
import { MOCK_FUNCIONARIOS, NivelPermissao } from '../../types';
import styles from './equipe.module.css';

interface EquipeProps {
  openModal: (name: string) => void;
  role: NivelPermissao;
}

function getInitials(nome: string): string {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
}

function nivelConfig(nivel: string): { badgeCls: string; avCls: string } {
  if (nivel === 'Engenheiro')    return { badgeCls: `${styles.badge} ${styles.bBlue}`, avCls: styles.avBlue };
  if (nivel === 'Operador')      return { badgeCls: `${styles.badge} ${styles.bGreen}`, avCls: styles.avGreen };
  return { badgeCls: `${styles.badge} ${styles.bOrange}`, avCls: styles.avOrange };
}

export default function Equipe({ openModal, role }: EquipeProps) {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Equipe</div>
          <div className={styles.pageSubtitle}>{MOCK_FUNCIONARIOS.length} funcionários cadastrados</div>
        </div>
        {role === 'Administrador' && (
          <button className={styles.addBtn} onClick={() => openModal('usuario')}>
            <Plus size={14} strokeWidth={2.5} /> Adicionar Funcionário
          </button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Funcionário</th>
              <th className={styles.th}>Usuário</th>
              <th className={styles.th}>Telefone</th>
              <th className={styles.th}>Nível de Acesso</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FUNCIONARIOS.map(f => {
              const { badgeCls, avCls } = nivelConfig(f.nivelPermissao);
              return (
                <tr key={f.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.nameCell}>
                      <div className={`${styles.avatar} ${avCls}`}>{getInitials(f.nome)}</div>
                      <span style={{ fontWeight: 600 }}>{f.nome}</span>
                    </div>
                  </td>
                  <td className={styles.tdSec}>{f.usuario}</td>
                  <td className={styles.tdSec}>{f.telefone}</td>
                  <td className={styles.td}>
                    <span className={badgeCls}><span className={styles.bdot} />{f.nivelPermissao}</span>
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