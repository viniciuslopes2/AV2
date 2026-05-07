import React from 'react';
import { FileText, Plus, FlaskConical } from 'lucide-react';
import { Aeronave, MOCK_ETAPAS, MOCK_PECAS, MOCK_TESTES, NivelPermissao } from '../../types';
import styles from './detalhes.module.css';

interface DetalhesProps {
  aero: Aeronave;
  onBack: () => void;
  openModal: (name: string) => void;
  role: NivelPermissao;
  onRelatorio: () => void;
}

function aeroStatusBadge(status: string): { cls: string; label: string } {
  if (status === 'Em Produção') return { cls: `${styles.badge} ${styles.bBlue}`, label: 'Em Produção' };
  if (status === 'Testes') return { cls: `${styles.badge} ${styles.bYellow}`, label: 'Em Teste' };
  return { cls: `${styles.badge} ${styles.bGreen}`, label: 'Concluída' };
}

function pecaStatusBadge(status: string): string {
  if (status === 'Em Produção') return `${styles.badge} ${styles.bBlue}`;
  if (status === 'Pronta') return `${styles.badge} ${styles.bGreen}`;
  return `${styles.badge} ${styles.bYellow}`;
}

function etapaBadge(status: string): { cls: string; label: string } {
  if (status === 'Concluído') return { cls: `${styles.badge} ${styles.bGreen}`, label: 'Concluída' };
  if (status === 'Andamento') return { cls: `${styles.badge} ${styles.bBlue}`, label: 'Em Andamento' };
  return { cls: `${styles.badge} ${styles.bGray}`, label: 'Pendente' };
}

function testeBadge(resultado: string): string {
  return resultado === 'Aprovado'
    ? `${styles.badge} ${styles.bGreen}`
    : `${styles.badge} ${styles.bRed}`;
}

function stepClass(status: string): string {
  if (status === 'Concluído') return `${styles.estep} ${styles.estepDone}`;
  if (status === 'Andamento') return `${styles.estep} ${styles.estepActive}`;
  return `${styles.estep} ${styles.estepPending}`;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default function Detalhes({ aero, onBack, openModal, role, onRelatorio }: DetalhesProps) {
  const { cls: statusCls, label: statusLabel } = aeroStatusBadge(aero.status);
  const testes = MOCK_TESTES.filter(t => t.aeronave === aero.codigo);
  const canEdit = role !== 'Operador';

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <div className={styles.pageTitle}>{aero.modelo}</div>
            <span className={statusCls}><span className={styles.bdot} />{statusLabel}</span>
          </div>
          <div className={styles.codeLabel}>{aero.codigo}</div>
        </div>
        {canEdit && (
          <div className={styles.actionsRow}>
            <button className={styles.btnOutline} onClick={onRelatorio}>
              <FileText size={14} /> Relatório
            </button>
            <button className={styles.btnFilled} onClick={() => openModal('peca')}>
              <Plus size={14} strokeWidth={2.5} /> Nova Peça
            </button>
          </div>
        )}
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.card}>
          <div className={styles.secHeading}>Especificações</div>
          <div className={styles.dfield}>
            <div className={styles.dfieldLbl}>Tipo</div>
            <div className={styles.dfieldVal}>{aero.tipo}</div>
          </div>
          <div className={styles.dfield}>
            <div className={styles.dfieldLbl}>Capacidade</div>
            <div className={styles.dfieldVal}>{aero.capacidade} passageiro(s)</div>
          </div>
          <div className={styles.dfield}>
            <div className={styles.dfieldLbl}>Alcance máximo</div>
            <div className={styles.dfieldVal}>{aero.alcance}</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.secHeading}>Peças Vinculadas</div>
          {MOCK_PECAS.map((p, i) => (
            <div key={i} className={styles.dfield}>
              <div className={styles.dfieldRow}>
                <div>
                  <div className={styles.pecaNome}>{p.nome}</div>
                  <div className={styles.pecaCat}>{p.tipo} · {p.fornecedor}</div>
                </div>
                <span className={pecaStatusBadge(p.status)}>
                  <span className={styles.bdot} />{p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap} style={{ marginBottom: 20 }}>
        <div className={styles.tableHead}>
          <span className={styles.tableTitle}>Etapas de Produção</span>
          {canEdit && (
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={styles.btnSmOutline} onClick={() => openModal('seletorEtapaInic')}>▶ Iniciar</button>
              <button className={styles.btnSmOutline} onClick={() => openModal('seletorEtapaConc')}>✓ Concluir</button>
              <button className={styles.btnSmOutline} onClick={() => openModal('etapa')}>
                <Plus size={12} strokeWidth={2.5} /> Nova
              </button>
            </div>
          )}
        </div>
        <div>
          {MOCK_ETAPAS.map((e, idx) => {
            const { cls, label } = etapaBadge(e.status);
            return (
              <div key={e.id} className={styles.etapaItem}>
                <div className={stepClass(e.status)}>
                  {e.status === 'Concluído' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : idx + 1}
                </div>
                <div className={styles.etapaInfo}>
                  <div className={styles.etapaName}>{e.nome}</div>
                  <div className={styles.etapaResp}>{e.responsavel} · Prazo: {formatDate(e.prazo)}</div>
                </div>
                <span className={cls}><span className={styles.bdot} />{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHead}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FlaskConical size={15} color="var(--text-2)" />
            <span className={styles.tableTitle}>Testes Realizados</span>
          </div>
          {canEdit && (
            <button className={styles.btnSmOutline} onClick={() => openModal('teste')}>
              <Plus size={12} strokeWidth={2.5} /> Novo Teste
            </button>
          )}
        </div>
        {testes.length === 0 ? (
          <div style={{ padding: '24px 20px', fontSize: 13, color: 'var(--text-3)', textAlign: 'center' }}>
            Nenhum teste registrado para esta aeronave.
          </div>
        ) : (
          <div>
            {testes.map(t => (
              <div key={t.id} className={styles.etapaItem}>
                <div className={styles.etapaInfo}>
                  <div className={styles.etapaName}>{t.tipo}</div>
                </div>
                <span className={testeBadge(t.resultado)}>
                  <span className={styles.bdot} />{t.resultado}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
