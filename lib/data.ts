import type { Project } from "./types";

// Dados estáticos — utilizados quando Supabase não está configurado.
// Para adicionar/editar projetos: basta alterar este array.
// Quando Supabase estiver ativo, estes dados serão ignorados.
export const PROJECTS: Project[] = [
  {
    id: "orca",
    slug: "orca",
    name: "Orca — Sistema de Orçamentos Web",
    description:
      "Plataforma web de gestão de orçamentos B2B multi-tenant desenvolvida para centralizar fluxos comerciais, controle de aprovação e geração de documentos PDF.",
    fullDescription:
      "Plataforma web de gestão de orçamentos B2B multi-tenant desenvolvida para centralizar fluxos comerciais, controle de aprovação e geração de documentos PDF.",
    problemSolved:
      "Muitas empresas ainda dependem de processos manuais para criação e aprovação de orçamentos, dificultando controle operacional, rastreabilidade e padronização comercial.\n\nO Orca organiza esse fluxo em uma plataforma única com permissões por perfil, regras de desconto e geração automatizada de PDFs.",
    mainFeatures: [
      "Gestão de clientes, produtos e vendedores",
      "Controle de aprovação de orçamentos",
      "Geração dinâmica de PDFs",
      "Parcelamento financeiro avançado",
      "Controle de desconto por empresa",
      "Dashboard operacional",
      "Estrutura multi-tenant com isolamento por empresa",
    ],
    technicalDifferentials: [
      "State Machine para gerenciamento de status",
      "PDF reproduzível gerado no cliente",
      "Regras financeiras desacopladas da interface",
      "Segurança multi-tenant via RLS no Postgres",
      "Arquitetura modular baseada em domínio",
    ],
    architectureStack: [
      { category: "Frontend", value: "React 19 + TypeScript + Vite" },
      { category: "Backend", value: "Supabase + PostgreSQL + Edge Functions" },
      { category: "Testes", value: "Vitest + Playwright" },
      { category: "PDF", value: "pdf-lib" },
    ],
    systemStructure: [
      { folder: "domain/", description: "Lógica de negócio pura, cálculos financeiros, FSM e validações" },
      { folder: "application/", description: "Orquestração de fluxos e serviços" },
      { folder: "repositories/", description: "Integração com Supabase e persistência" },
      { folder: "pages/", description: "Camada visual e navegação" },
      { folder: "pdf/", description: "Construção dinâmica dos documentos PDF" },
    ],
    architectureNotes: [
      "TypeScript strict em toda aplicação",
      "Separação clara entre domínio e interface",
      "Repository Pattern para persistência",
      "Hooks reutilizáveis para autenticação e CRUD",
      "Componentização focada em manutenção",
      "Lazy loading das páginas principais",
    ],
    architectureFinancial:
      "O sistema suporta múltiplos modelos de pagamento: dinheiro, débito, PIX, crédito parcelado, boleto e financiamento com entrada + taxa.\n\nAs regras financeiras foram centralizadas na domain layer para garantir previsibilidade e testabilidade.",
    architectureSecurity:
      "O isolamento entre empresas é realizado diretamente no banco utilizando Row Level Security (RLS), garantindo que vendedores não tenham acesso aos dados de outras empresas.",
    testsCoverage:
      "A aplicação possui cobertura focada principalmente nas regras críticas de negócio, cálculos financeiros e fluxos de aprovação.\n\nOs testes foram estruturados para validar cenários reais do sistema, incluindo regras de desconto, máquina de estados, parcelamentos financeiros e geração de PDFs.",
    testsScenarios: [
      "Máquina de estados dos orçamentos",
      "Permissões por perfil de usuário",
      "Regras de desconto por empresa",
      "Parcelamentos e vencimentos",
      "Distribuição de centavos",
      "Geração dinâmica de PDFs",
      "Validação de CNPJ",
      "Fluxos principais E2E",
      "Integração de repositórios",
    ],
    testsStrategy:
      "A lógica crítica do sistema foi isolada na domain layer para permitir testes previsíveis, independentes da interface e com foco em regras de negócio.\n\nA aplicação utiliza testes unitários para cálculos e validações, além de testes E2E para os principais fluxos operacionais.",
    testsTools: ["Vitest", "Playwright", "Characterization Tests", "Mocks de Edge Functions"],
    testsCodeExample: `describe('calcularResumoFinanciamento (fronteiras)', () => {
  it('parcelas 0 com taxa aplicada: valorParcela converge ao totalComTaxa', () => {
    const input: PagamentoFinanciamentoInput = {
      total: 900,
      valor_entrada: 100,
      num_parcelas: 0,
      taxa_servico_percentual: 5,
      aplicar_taxa: true,
    }`,
    testsCodeContext:
      "Esse cenário valida comportamentos de fronteira no cálculo de financiamento, garantindo consistência financeira mesmo em cenários incomuns de parcelamento.\n\nOs testes financeiros recebem atenção especial no projeto por impactarem diretamente os valores apresentados ao usuário e os documentos gerados pelo sistema.",
    technologies: ["React", "Node.js", "TypeScript"],
    type: "Caso de estudo",
    coverImage: "/images/capaProOrca.png",
    desktopMockup: "/images/thumbNewOrcaPort.webp",
    vercelUrl: "https://neworca.vercel.app",
    githubUrl: "https://github.com/Thiago-Vinicius-M/Orcamento",
    flowcharts: ["/docs/orca/flowchart.svg"],
    entityRelationshipDiagrams: ["/docs/orca/er-diagram.svg"],
    featured: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export const FOOTER_LINKS = {
  linkedin: "https://linkedin.com/in/thiagoviniciusm",
  github: "https://github.com/Thiago-Vinicius-M",
  email: "thi.vinicius01@gmail.com",
  whatsapp: "https://wa.me/62993974177",
};

export const TECH_STACK = [
  { name: "Java" },
  { name: "React" },
  { name: "Python" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "CSS3" },
  { name: "JavaScript" },
  { name: "HTML5" },
];
