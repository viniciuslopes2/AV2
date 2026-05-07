import React from 'react';
import { X, Check } from 'lucide-react';
import { Aeronave, MOCK_AERONAVES, MOCK_ETAPAS, MOCK_FUNCIONARIOS } from '../../types';
import styles from './modal.module.css';

interface ModaisProps {
  modalType: string;
  onClose: () => void;
  selectedAero?: Aeronave | null;
}

export default function ModaisContainer({ modalType, onClose, selectedAero }: ModaisProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const renderOptions = (arr: string[]) => arr.map(opt => <option key={opt} value={opt}>{opt}</option>);

  const renderModalContent = () => {
    switch (modalType) {
      case 'aeronave':
        return (
          <>
            <h2 className={styles.title}>Cadastrar Aeronave</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}><label className={styles.label}>Código</label><input className={styles.input} placeholder="Ex: AAA-101" required /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Modelo</label><input className={styles.input} placeholder="Ex: Phenom" required /></div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Tipo</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Comercial', 'Militar'])}</select>
              </div>
              <div className={styles.inputGroup}><label className={styles.label}>Capacidade</label><input className={styles.input} placeholder="Ex: 8" /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Alcance</label><input className={styles.input} placeholder="Ex: 3000km" /></div>
            </div>
          </>
        );
      
      case 'peca':
        return (
          <>
            <h2 className={styles.title}>Adicionar Peça</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Nome da Peça</label><input className={styles.input} required /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Tipo</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Nacional', 'Importada'])}</select>
              </div>
              <div className={styles.inputGroup}><label className={styles.label}>Fornecedor</label><input className={styles.input} required /></div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Status da Peça</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Em Produção', 'Em Transporte', 'Pronta'])}</select>
              </div>
            </div>
          </>
        );

      case 'etapa':
        return (
          <>
            <h2 className={styles.title}>Adicionar Etapa</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Nome da Etapa</label><input className={styles.input} required /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Prazo</label><input type="date" className={styles.input} required /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Status</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Pendente', 'Andamento', 'Concluído'])}</select>
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Ligar a Funcionário</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(MOCK_FUNCIONARIOS.map(f => f.nome))}</select>
              </div>
            </div>
          </>
        );

      case 'seletorEtapaInic':
      case 'seletorEtapaConc':
        return (
          <>
            <h2 className={styles.title}>{modalType === 'seletorEtapaInic' ? 'Iniciar Etapa' : 'Concluir Etapa'}</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Selecione a Etapa</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(MOCK_ETAPAS.map(e => e.nome))}</select>
              </div>
            </div>
            {modalType === 'seletorEtapaInic' && (
              <p style={{ fontSize: '11px', color: '#7a8ce8', fontWeight: '700', marginTop: '-10px', marginBottom: '20px' }}>
                O sistema verificará se todas as etapas anteriores estão concluídas antes de processar.
              </p>
            )}
          </>
        );

      case 'teste':
        return (
          <>
            <h2 className={styles.title}>Registrar Teste</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Aeronave</label>
                {selectedAero ? (
                  <input
                    className={styles.input}
                    value={`${selectedAero.codigo} — ${selectedAero.modelo}`}
                    readOnly
                    style={{ background: '#f3f4f6', color: 'var(--text-2)', cursor: 'default' }}
                  />
                ) : (
                  <select className={styles.input} required>
                    <option value="">Selecione...</option>
                    {renderOptions(MOCK_AERONAVES.map(a => `${a.codigo} — ${a.modelo}`))}
                  </select>
                )}
              </div>
              <div className={styles.inputGroup}><label className={styles.label}>Tipo de Teste</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Elétrico', 'Hidráulico', 'Aerodinâmico'])}</select>
              </div>
              <div className={styles.inputGroup}><label className={styles.label}>Resultado</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Aprovado', 'Reprovado'])}</select>
              </div>
            </div>
          </>
        );

      case 'usuario':
        return (
          <>
            <h2 className={styles.title}>Novo Funcionário</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Nome Completo</label><input className={styles.input} required /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Telefone</label><input className={styles.input} placeholder="(00) 00000-0000" /></div>
              <div className={styles.inputGroup}><label className={styles.label}>Usuário</label><input className={styles.input} placeholder="login.ac" required /></div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Endereço</label><input className={styles.input} placeholder="Rua, número — Cidade" /></div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}><label className={styles.label}>Nível de Permissão</label>
                <select className={styles.input} required><option value="">Selecione...</option>{renderOptions(['Administrador', 'Engenheiro', 'Operador'])}</select>
              </div>
            </div>
          </>
        );

      default:
        return <h2 className={styles.title}>Formulário em Construção</h2>;
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <button type="button" onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <form onSubmit={handleSubmit}>
          
          {renderModalContent()}

          <button type="submit" className={styles.submitBtn}>
            <Check size={18} /> {modalType === 'relatorio' ? 'Baixar PDF' : 'Confirmar Ação'}
          </button>
        </form>
      </div>
    </div>
  );
}