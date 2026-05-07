export type ViewState = 'login' | 'dashboard' | 'frota' | 'equipe' | 'detalhes' | 'testes' | 'relatorio';

export type TipoAeronave = 'Comercial' | 'Militar';
export type TipoPeca = 'Nacional' | 'Importada';
export type StatusPeca = 'Em Produção' | 'Em Transporte' | 'Pronta';
export type StatusEtapa = 'Pendente' | 'Andamento' | 'Concluído';
export type NivelPermissao = 'Administrador' | 'Engenheiro' | 'Operador';
export type TipoTeste = 'Elétrico' | 'Hidráulico' | 'Aerodinâmico';
export type ResultadoTeste = 'Aprovado' | 'Reprovado';

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: string;
  status: string;
}

export interface Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
}

export interface Etapa {
  id: string;
  nome: string;
  prazo: string;
  responsavel: string;
  status: StatusEtapa;
}

export interface Funcionario {
  id: string;
  nome: string;
  usuario: string;
  telefone: string;
  endereco: string;
  nivelPermissao: NivelPermissao;
}

export interface Teste {
  id: string;
  aeronave: string;
  tipo: TipoTeste;
  resultado: ResultadoTeste;
}

export const MOCK_AERONAVES: Aeronave[] = [
  { codigo: 'AAA-101', modelo: 'Embraer E175', tipo: 'Comercial', capacidade: 78, alcance: '3.750 km', status: 'Em Produção' },
  { codigo: 'BBB-101', modelo: 'Dassault Rafale', tipo: 'Militar', capacidade: 1, alcance: '3.700 km', status: 'Testes' },
  { codigo: 'BBB-102', modelo: 'Airbus A400M', tipo: 'Militar', capacidade: 37, alcance: '6.390 km', status: 'Finalizado' },
];

export const MOCK_ETAPAS: Etapa[] = [
  { id: '1', nome: 'Montagem da Fuselagem', prazo: '2025-03-15', responsavel: 'Ana Ferreira', status: 'Concluído' },
  { id: '2', nome: 'Instalação Elétrica', prazo: '2025-04-30', responsavel: 'Pedro Nascimento', status: 'Andamento' },
  { id: '3', nome: 'Pintura e Acabamento', prazo: '2025-05-30', responsavel: 'Não atribuído', status: 'Pendente' },
];

export const MOCK_FUNCIONARIOS: Funcionario[] = [
  { id: '1', nome: 'Vinícius Lopes', usuario: 'vinicius.lopes', telefone: '(11) 99999-0001', endereco: 'Rua das Aeronaves, 100 — São José dos Campos', nivelPermissao: 'Engenheiro' },
  { id: '2', nome: 'Fulano', usuario: 'fulano', telefone: '(11) 99999-0002', endereco: 'Av. Santos Dumont, 200 — São Paulo', nivelPermissao: 'Operador' },
  { id: '3', nome: 'Gerson Penha', usuario: 'gerson.penha', telefone: '(11) 99999-0003', endereco: 'Rua Embraer, 300 — Gavião Peixoto', nivelPermissao: 'Administrador' },
];

export const MOCK_PECAS: Peca[] = [
  { nome: 'Motor CFE738', tipo: 'Importada', fornecedor: 'CFE Company (EUA)', status: 'Em Produção' },
  { nome: 'Trem de Pouso', tipo: 'Nacional', fornecedor: 'Embraer Parts', status: 'Pronta' },
  { nome: 'Sistema Hidráulico', tipo: 'Importada', fornecedor: 'Moog Inc. (EUA)', status: 'Em Transporte' },
  { nome: 'Painel Aviónico', tipo: 'Nacional', fornecedor: 'AEL Sistemas', status: 'Pronta' },
];

export const MOCK_TESTES: Teste[] = [
  { id: '1', aeronave: 'AAA-101', tipo: 'Elétrico', resultado: 'Aprovado' },
  { id: '2', aeronave: 'BBB-101', tipo: 'Hidráulico', resultado: 'Aprovado' },
  { id: '3', aeronave: 'BBB-101', tipo: 'Aerodinâmico', resultado: 'Reprovado' },
  { id: '4', aeronave: 'BBB-102', tipo: 'Elétrico', resultado: 'Aprovado' },
  { id: '5', aeronave: 'BBB-102', tipo: 'Hidráulico', resultado: 'Aprovado' },
  { id: '6', aeronave: 'BBB-102', tipo: 'Aerodinâmico', resultado: 'Aprovado' },
];
