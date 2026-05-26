-- Tabela de projetos do portfólio
-- Execute este script no SQL Editor do Supabase Dashboard

CREATE TABLE IF NOT EXISTS projects (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        UNIQUE NOT NULL,
  name          text        NOT NULL,
  description   text        NOT NULL,
  technologies  text[]      NOT NULL DEFAULT '{}',
  documentation text,
  type          text        NOT NULL,
  status        text        NOT NULL,
  desktop_mockup text       NOT NULL,
  mobile_mockup  text       NOT NULL,
  github_url    text,
  deploy_url    text,
  featured      boolean     NOT NULL DEFAULT false,
  technical_breakdown jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS projects_slug_idx     ON projects (slug);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects (featured) WHERE featured = true;

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security: leitura pública, escrita apenas autenticada
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Escrita autenticada" ON projects
  FOR ALL USING (auth.role() = 'authenticated');
