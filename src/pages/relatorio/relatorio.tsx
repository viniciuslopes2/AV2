import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Aeronave, NivelPermissao, MOCK_AERONAVES, MOCK_ETAPAS, MOCK_PECAS, MOCK_TESTES } from '../../types';
import styles from './relatorio.module.css';

interface RelatorioProps {
  preselectedAero?: Aeronave | null;
  role: NivelPermissao;
}

interface ReportData {
  aero: Aeronave;
  cliente: string;
  dataEntrega: string;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default function Relatorio({ preselectedAero, role }: RelatorioProps) {
  const [selectedCode, setSelectedCode] = useState(preselectedAero?.codigo ?? '');
  const [cliente, setCliente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState('');

  const canGenerate = role !== 'Operador';

  const handleGerar = (e: React.FormEvent) => {
    e.preventDefault();
    const aero = MOCK_AERONAVES.find(a => a.codigo === selectedCode);
    if (!aero) { setError('Selecione uma aeronave válida.'); return; }
    if (!cliente.trim()) { setError('Informe o nome do cliente.'); return; }
    if (!dataEntrega) { setError('Informe a data de entrega.'); return; }
    setError('');
    setReport({ aero, cliente: cliente.trim(), dataEntrega });
  };

  const testes = report ? MOCK_TESTES.filter(t => t.aeronave === report.aero.codigo) : [];

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Relatório de Entrega</div>
          <div className={styles.pageSubtitle}>Gere o relatório técnico consolidado de uma aeronave</div>
        </div>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleGerar}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Aeronave</label>
              <select
                className={styles.input}
                value={selectedCode}
                onChange={e => { setSelectedCode(e.target.value); setReport(null); }}
                required
                disabled={!canGenerate}
              >
                <option value="">Selecione a aeronave...</option>
                {MOCK_AERONAVES.map(a => (
                  <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Nome do Cliente</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ex: Boeing Brasil Ltda."
                value={cliente}
                onChange={e => { setCliente(e.target.value); setReport(null); }}
                required
                disabled={!canGenerate}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Data de Entrega</label>
              <input
                className={styles.input}
                type="date"
                value={dataEntrega}
                onChange={e => { setDataEntrega(e.target.value); setReport(null); }}
                required
                disabled={!canGenerate}
              />
            </div>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          {canGenerate ? (
            <button type="submit" className={styles.gerarBtn}>
              <FileText size={16} /> Gerar Relatório
            </button>
          ) : (
            <p className={styles.noPermMsg}>Operadores não têm permissão para gerar relatórios.</p>
          )}
        </form>
      </div>

      {report && (
        <div className={styles.reportCard}>
          <div className={styles.reportHeader}>
            <span className={styles.reportTitle}>Relatório Gerado</span>
            <span className={styles.reportBadge}>PDF Demo</span>
          </div>
          <pre className={styles.reportBody}>
{`===========================================
  AEROCODE — RELATÓRIO TÉCNICO DE ENTREGA
===========================================

AERONAVE
  Código    : ${report.aero.codigo}
  Modelo    : ${report.aero.modelo}
  Tipo      : ${report.aero.tipo}
  Capacidade: ${report.aero.capacidade} passageiro(s)
  Alcance   : ${report.aero.alcance}
  Status    : ${report.aero.status}

ENTREGA
  Cliente   : ${report.cliente}
  Data      : ${formatDate(report.dataEntrega)}

ETAPAS DE PRODUÇÃO
${MOCK_ETAPAS.map(e => `  [${e.status === 'Concluído' ? '✓' : e.status === 'Andamento' ? '▶' : '○'}] ${e.nome} — Prazo: ${formatDate(e.prazo)}`).join('\n')}

PEÇAS UTILIZADAS
${MOCK_PECAS.map(p => `  • ${p.nome} (${p.tipo}) · ${p.fornecedor} — ${p.status}`).join('\n')}

TESTES REALIZADOS
${testes.length === 0
  ? '  Nenhum teste registrado para esta aeronave.'
  : testes.map(t => `  [${t.resultado === 'Aprovado' ? '✓' : '✗'}] ${t.tipo} — ${t.resultado}`).join('\n')}

==========================================
  Gerado em ${new Date().toLocaleString('pt-BR')}
==========================================`}
          </pre>
        </div>
      )}
    </div>
  );
}
