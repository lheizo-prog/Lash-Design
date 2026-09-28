import { useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { SERVICES } from "../data/services";
import { SITE_CONFIG } from "../config/site";

// o quiz recomenda apenas entre os estilos de extensão de cílios —
// sobrancelhas e remoção não fazem sentido como "resultado de personalidade"
const QUIZ_SERVICES = SERVICES.filter((s) => s.tipo === "Hyper Fio a Fio");

// cada opção soma pontos para os ids de serviço mais relacionados a ela.
// ids não citados numa opção somam 0 automaticamente.
type Points = Partial<Record<string, number>>;

type Question = {
  q: string;
  options: { label: string; points: Points }[];
};

const QUESTIONS: Question[] = [
  {
    q: "Qual vibe você quer transmitir com o olhar?",
    options: [
      {
        label: "Discreta e natural",
        points: { "hyper-classic": 2, "hyper-eyeliner": 2 },
      },
      {
        label: "Elegante e refinada",
        points: { "hyper-elite": 2, "hyper-luxo": 1 },
      },
      { label: "Romântica e suave", points: { "hyper-plume": 2 } },
      {
        label: "Ousada, quero chamar atenção",
        points: { "hyper-fantasy": 1, "hyper-supreme": 2 },
      },
    ],
  },
  {
    q: "Como você imagina o canto externo dos cílios?",
    options: [
      {
        label: "Igual do início ao fim, sem efeito",
        points: { "hyper-classic": 2, "hyper-elite": 1 },
      },
      { label: "Levemente puxado pra cima", points: { "hyper-fox": 2 } },
      {
        label: "Bem alongado, tipo 'gatinho'",
        points: { "hyper-cisne-negro": 2 },
      },
      {
        label: "Alternado, com fios de tamanhos diferentes",
        points: { "hyper-californiano": 2 },
      },
    ],
  },
  {
    q: "Qual nível de volume você prefere?",
    options: [
      {
        label: "O mínimo possível",
        points: { "hyper-classic": 2, "hyper-eyeliner": 2 },
      },
      {
        label: "Um volume médio, nem muito nem pouco",
        points: { "hyper-elite": 1, "hyper-plume": 1 },
      },
      {
        label: "Bastante volume, quero um olhar denso",
        points: { "hyper-luxo": 2, "hyper-supreme": 1 },
      },
      { label: "O máximo que existir", points: { "hyper-supreme": 2 } },
    ],
  },
  {
    q: "Você toparia cílios coloridos ou com brilho?",
    options: [
      {
        label: "De jeito nenhum, só clássico",
        points: { "hyper-classic": 1, "hyper-eyeliner": 1 },
      },
      {
        label: "Talvez, em uma ocasião especial",
        points: { "hyper-fantasy": 1 },
      },
      { label: "Sim! Adoro inovar", points: { "hyper-fantasy": 2 } },
    ],
  },
  {
    q: "Para qual ocasião é esse cílios?",
    options: [
      {
        label: "Uso no dia a dia",
        points: { "hyper-classic": 2, "hyper-eyeliner": 1 },
      },
      {
        label: "Trabalho, ambiente mais formal",
        points: { "hyper-elite": 2, "hyper-luxo": 1 },
      },
      {
        label: "Praia, viagem, estilo despojado",
        points: { "hyper-californiano": 2 },
      },
      {
        label: "Um evento especial (festa, casamento)",
        points: { "hyper-supreme": 1, "hyper-cisne-negro": 1, "hyper-luxo": 1 },
      },
    ],
  },
  {
    q: "Quanto tempo você quer investir em manutenção?",
    options: [
      {
        label: "O mínimo possível",
        points: { "hyper-classic": 2, "hyper-eyeliner": 2 },
      },
      {
        label: "Não me importo de cuidar bem se o efeito valer a pena",
        points: { "hyper-luxo": 1, "hyper-supreme": 2 },
      },
    ],
  },
  {
    q: "O que você mais busca no formato do seu olhar?",
    options: [
      {
        label: "Alongar o olho",
        points: { "hyper-cisne-negro": 2, "hyper-fox": 1 },
      },
      { label: "Levantar o canto externo", points: { "hyper-fox": 2 } },
      { label: "Suavizar e arredondar", points: { "hyper-plume": 2 } },
      {
        label: "Só realçar o que já tenho, sem mudar o formato",
        points: { "hyper-classic": 2, "hyper-eyeliner": 1 },
      },
    ],
  },
  {
    q: "Como é sua relação com maquiagem nos olhos?",
    options: [
      {
        label: "Quase nunca uso, prefiro algo pronto",
        points: { "hyper-eyeliner": 2, "hyper-classic": 1 },
      },
      {
        label: "Sempre capricho, gosto de um efeito marcante",
        points: { "hyper-luxo": 1, "hyper-fantasy": 1 },
      },
      {
        label: "Depende do dia",
        points: { "hyper-elite": 1, "hyper-plume": 1 },
      },
    ],
  },
  {
    q: "Qual palavra combina mais com você?",
    options: [
      { label: "Minimalista", points: { "hyper-classic": 2 } },
      { label: "Glamourosa", points: { "hyper-luxo": 2 } },
      { label: "Criativa", points: { "hyper-fantasy": 2 } },
      { label: "Despojada", points: { "hyper-californiano": 2 } },
    ],
  },
  {
    q: "Se seu olhar fizesse uma declaração, qual seria?",
    options: [
      {
        label: '"Discreto, mas impecável"',
        points: { "hyper-eyeliner": 2, "hyper-classic": 1 },
      },
      {
        label: '"Sofisticado e denso"',
        points: { "hyper-supreme": 2, "hyper-luxo": 1 },
      },
      {
        label: '"Alongado e felino"',
        points: { "hyper-cisne-negro": 2, "hyper-fox": 1 },
      },
      { label: '"Leve como uma pluma"', points: { "hyper-plume": 2 } },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  function handleAnswer(points: Points) {
    setScores((prev) => {
      const next = { ...prev };
      for (const id of Object.keys(points)) {
        next[id] = (next[id] || 0) + (points[id] || 0);
      }
      return next;
    });

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setStep(0);
    setScores({});
    setFinished(false);
  }

  // em caso de empate, prevalece o serviço que aparece primeiro no catálogo
  // (regra de desempate explícita, não é acidental)
  const result = QUIZ_SERVICES.reduce((best, current) => {
    const bestScore = scores[best.id] || 0;
    const currentScore = scores[current.id] || 0;
    return currentScore > bestScore ? current : best;
  }, QUIZ_SERVICES[0]);

  const progress = Math.round(
    ((step + (finished ? 1 : 0)) / QUESTIONS.length) * 100,
  );

  return (
    <div style={styles.body}>
      <style>{css}</style>

      <header className="quiz-header" style={styles.header}>
        <Link to="/" style={styles.logo}>
          {SITE_CONFIG.brandName}
        </Link>
        <Link to="/" style={styles.backLink}>
          ← voltar ao site
        </Link>
      </header>

      <main className="quiz-main" style={styles.main}>
        {!finished ? (
          <div key={step} className="fade-in" style={styles.quizCard}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <div style={styles.stepLabel}>
              Pergunta {step + 1} de {QUESTIONS.length}
            </div>
            <h2 style={styles.question}>{QUESTIONS[step].q}</h2>
            <div style={styles.optionsList}>
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.points)}
                  style={styles.optionBtn}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fade-in result-grid" style={styles.resultCard}>
            <img
              src={result.image}
              alt={result.title}
              style={styles.resultImg}
            />
            <div style={styles.resultBody}>
              <div style={styles.eyebrow}>O cílios ideal para você é</div>
              <h2 style={styles.resultTitle}>{result.title}</h2>
              <p style={styles.resultDesc}>{result.desc}</p>
              <div style={styles.price}>{result.price}</div>
              <div className="quiz-actions" style={styles.resultActions}>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.btn, ...styles.btnSolid }}
                >
                  Agendar esse serviço
                </a>
                <button
                  onClick={restart}
                  style={{ ...styles.btn, ...styles.btnOutline }}
                >
                  Refazer o quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

  :root{
    --ink:#0c0c0c;
    --ivory:#f6f1e7;
    --gold:#c8a24d;
    --gold-soft:#e3c98a;
    --muted:#8f8a7e;
    --line: rgba(200,162,77,0.35);
  }

  /* reset global — evita cantos brancos causados pela margem padrão do body */
  *{ box-sizing: border-box; }
  html, body, #root{
    margin: 0;
    height: 100%;
  }
  body{
    background: var(--ink);
    overflow: hidden; /* impede rolagem da página inteira */
  }

  @keyframes fadeIn{
    from{ opacity:0; transform:translateY(10px); }
    to{ opacity:1; transform:translateY(0); }
  }
  .fade-in{
    animation: fadeIn .5s ease;
  }

  @media (prefers-reduced-motion: reduce){
    .fade-in{ animation:none; }
  }

  @media (max-width:700px){
    .result-grid{ grid-template-columns:1fr !important; gap:1.8rem !important; }
    .quiz-header{ padding: 20px 6vw !important; }
    .quiz-main{ padding: 2.5rem 6vw !important; }
    .quiz-actions{ flex-direction: column !important; }
    .quiz-actions a, .quiz-actions button{ width: 100% !important; text-align: center !important; }
  }
`;

const styles: { [key: string]: CSSProperties } = {
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--ink)",
    color: "var(--ivory)",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
  },
  header: {
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 6vw",
    borderBottom: "1px solid var(--line)",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    letterSpacing: "0.08em",
    fontStyle: "italic",
    color: "var(--ivory)",
    textDecoration: "none",
  },
  backLink: {
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    minHeight: 0, // necessário para o overflow funcionar corretamente dentro do flex
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 6vw",
    overflowY: "auto", // rede de segurança: só rola se o conteúdo realmente não couber
  },
  quizCard: {
    maxWidth: "560px",
    width: "100%",
  },
  progressTrack: {
    width: "100%",
    height: "3px",
    background: "var(--line)",
    marginBottom: "2rem",
  },
  progressFill: {
    height: "100%",
    background: "var(--gold)",
    transition: "width .4s ease",
  },
  stepLabel: {
    fontSize: "0.72rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "1rem",
  },
  question: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
    marginBottom: "2.2rem",
    lineHeight: 1.3,
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  optionBtn: {
    textAlign: "left",
    padding: "1rem 1.4rem",
    background: "none",
    border: "1px solid var(--line)",
    color: "var(--ivory)",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.98rem",
    cursor: "pointer",
    transition: "border-color .25s ease, background .25s ease",
  },
  resultCard: {
    maxWidth: "900px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    alignItems: "center",
  },
  resultImg: {
    width: "100%",
    aspectRatio: "4/5",
    objectFit: "cover",
    filter: "grayscale(0.5) contrast(1.05)",
    border: "1px solid var(--line)",
  },
  resultBody: {},
  eyebrow: {
    fontSize: "0.72rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "0.8rem",
  },
  resultTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    marginBottom: "1rem",
  },
  resultDesc: {
    color: "var(--muted)",
    lineHeight: 1.8,
    marginBottom: "1.2rem",
  },
  price: {
    fontSize: "0.85rem",
    letterSpacing: "0.15em",
    color: "var(--gold-soft)",
    marginBottom: "2rem",
  },
  resultActions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  btn: {
    padding: "0.95rem 2rem",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    border: "1px solid var(--gold)",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
  },
  btnSolid: { background: "var(--gold)", color: "var(--ink)" },
  btnOutline: { background: "none", color: "var(--ivory)" },
};
