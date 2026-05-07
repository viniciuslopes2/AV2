import React from 'react';
import styles from './login.module.css';
import bgAviao from '../../assets/bg-aviao.png';
import logo from '../../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${bgAviao})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <img src={logo} alt="AeroCODE Logo" style={{ height: '100px', width: 'auto', marginBottom: '12px' }} />
          <div className={styles.tagline}>Sistema de Gestão Aeronáutica</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Usuário</label>
            <input className={styles.input} type="text" placeholder="Digite seu usuário" defaultValue="vinicius.lopes" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input className={styles.input} type="password" placeholder="Digite sua senha" defaultValue="senha123" />
          </div>
          <button type="submit" className={styles.submitBtn}>Entrar no sistema</button>
        </form>
      </div>
    </div>
  );
}