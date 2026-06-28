'use client';

import { useEffect, useState } from 'react';

// ─── Tipos de resposta da API ──────────────────────────────────────────────────
interface ApiHealthResponse {
  status: string;
  timestamp: string;
}

interface DbHealthResponse {
  status: 'ok' | 'error';
  dbConnected: boolean;
  message: string;
  timestamp: string;
}

type ServiceStatus = 'pending' | 'ok' | 'error';

interface StatusEntry {
  status: ServiceStatus;
  label: string;
  info: string;
  hint?: string;
}

// ─── Configuração dos cards de funcionalidades do sistema ──────────────────────
const FEATURES = [
  {
    icon: '📋',
    title: 'Ordens de Serviço',
    description: 'Controle completo do ciclo de vida do item recebido.',
    tag: 'Em breve',
  },
  {
    icon: '👤',
    title: 'Clientes',
    description: 'Cadastro e histórico de clientes e itens.',
    tag: 'Em breve',
  },
  {
    icon: '💳',
    title: 'Pagamentos',
    description: 'Sinal, saldo e controle financeiro por OS.',
    tag: 'Em breve',
  },
  {
    icon: '📦',
    title: 'Entrega',
    description: 'Registro de entrega e retirada por terceiros.',
    tag: 'Em breve',
  },
] as const;

// ─── URL base da API ───────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

// ─── Componente de Item de Status ──────────────────────────────────────────────
function StatusItem({ entry }: { entry: StatusEntry }) {
  const modifierClass =
    entry.status === 'ok'
      ? 'status-item--ok'
      : entry.status === 'error'
        ? 'status-item--error'
        : 'status-item--pending';

  return (
    <div className={`status-item ${modifierClass}`}>
      <span className="status-item__dot" aria-hidden="true" />
      <span className="status-item__label">{entry.label}</span>
      <span className="status-item__info">{entry.info}</span>
    </div>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<StatusEntry>({
    status: 'pending',
    label: 'API (NestJS)',
    info: 'Verificando…',
  });

  const [dbStatus, setDbStatus] = useState<StatusEntry>({
    status: 'pending',
    label: 'Banco de dados (PostgreSQL)',
    info: 'Verificando…',
  });

  const [dbHint, setDbHint] = useState<string | null>(null);

  useEffect(() => {
    // ── Verificar status da API ────────────────────────────────────────────────
    fetch(`${API_BASE}/health`)
      .then<ApiHealthResponse>((r) => r.json())
      .then((data) => {
        setApiStatus({
          status: data.status === 'ok' ? 'ok' : 'error',
          label: 'API (NestJS)',
          info: data.status === 'ok' ? 'Online' : 'Offline',
        });
      })
      .catch(() => {
        setApiStatus({
          status: 'error',
          label: 'API (NestJS)',
          info: 'Sem resposta',
        });
      });

    // ── Verificar status do banco de dados ────────────────────────────────────
    fetch(`${API_BASE}/health/db`)
      .then<DbHealthResponse>((r) => r.json())
      .then((data) => {
        setDbStatus({
          status: data.dbConnected ? 'ok' : 'error',
          label: 'Banco de dados (PostgreSQL)',
          info: data.dbConnected ? 'Conectado' : 'Indisponível',
        });
        if (!data.dbConnected) {
          setDbHint(
            'Configure o DATABASE_URL no .env e suba o PostgreSQL com: docker compose --env-file .env up -d postgres',
          );
        }
      })
      .catch(() => {
        setDbStatus({
          status: 'error',
          label: 'Banco de dados (PostgreSQL)',
          info: 'Sem resposta',
        });
        setDbHint('A API não está acessível. Verifique se o servidor NestJS está em execução.');
      });
  }, []);

  return (
    <main className="status-page">
      {/* ── Hero / Apresentação ──────────────────────────────────────────── */}
      <section className="status-hero" aria-labelledby="system-title">
        <div className="status-hero__icon" aria-hidden="true">
          🥿
        </div>
        <span className="status-hero__badge">Bootstrap técnico · v0.1.0</span>
        <h1 className="status-hero__title" id="system-title">
          Sistema Web da Sapataria
        </h1>
        <p className="status-hero__description">
          Plataforma de gestão operacional para sapataria de consertos, renovação e restauração de
          sapatos, tênis, bolsas, malas, mochilas, sandálias, jaquetas e demais itens.
        </p>
      </section>

      {/* ── Cards de Funcionalidades ─────────────────────────────────────── */}
      <section
        className="status-features"
        aria-label="Funcionalidades previstas no sistema"
        id="features"
      >
        {FEATURES.map((f) => (
          <article key={f.title} className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              {f.icon}
            </span>
            <h2 className="feature-card__title">{f.title}</h2>
            <p className="feature-card__description">{f.description}</p>
            <span className="feature-card__tag">{f.tag}</span>
          </article>
        ))}
      </section>

      {/* ── Painel de Status do Ambiente ─────────────────────────────────── */}
      <section className="status-panel" aria-labelledby="env-status-title">
        <p className="status-panel__title" id="env-status-title">
          Status do ambiente
        </p>
        <ul className="status-panel__list" role="list">
          <li>
            <StatusItem entry={apiStatus} />
          </li>
          <li>
            <StatusItem entry={dbStatus} />
          </li>
        </ul>

        {dbHint && (
          <p className="status-hint" role="alert" aria-live="polite">
            ⚠️ {dbHint.includes('docker') ? (
              <>
                Configure o <code>DATABASE_URL</code> no <code>.env</code> e suba o PostgreSQL com:{' '}
                <code>docker compose --env-file .env up -d postgres</code>
              </>
            ) : (
              dbHint
            )}
          </p>
        )}
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="status-footer">
        <p>
          Bootstrap técnico ·{' '}
          <a href={`${API_BASE}/health`} target="_blank" rel="noopener noreferrer">
            API Health
          </a>{' '}
          ·{' '}
          <a href={`${API_BASE}/health/db`} target="_blank" rel="noopener noreferrer">
            DB Health
          </a>
        </p>
      </footer>
    </main>
  );
}
