import { useState } from "react";
import { Link } from "react-router-dom";

// troque pelo seu número real: 55 + DDD + número, sem espaços/traços
const WHATSAPP_LINK = "https://wa.me/5500000000000";

// cada opção soma pontos para um dos 3 serviços: [Fio a Fio, Volume Russo, Lash Lifting]
const QUESTIONS = [
  {
    q: "Como você descreveria seu estilo no dia a dia?",
    options: [
      { label: "Discreto e natural", points: [2, 0, 1] },
      { label: "Marcante, gosto de me destacar", points: [0, 2, 0] },
      { label: "Prático, sem muita produção", points: [0, 0, 2] },
    ],
  },
  {
    q: "Qual efeito você mais gosta em fotos de referência?",
    options: [
      { label: "Cílios alongados, mas sutis", points: [2, 0, 0] },
      { label: "Volume denso e dramático", points: [0, 2, 0] },
      { label: "Cílios naturais só mais curvados", points: [0, 0, 2] },
    ],
  },
  {
    q: "Quanto tempo você tem para manutenção?",
    options: [
      { label: "Posso voltar a cada 2-3 semanas", points: [1, 2, 0] },
      { label: "Prefiro algo que dure mais sem retoque", points: [1, 0, 2] },
      { label: "Tanto faz, o que for melhor pro efeito", points: [1, 1, 1] },
    ],
  },
  {
    q: "Seus cílios naturais são...",
    options: [
      { label: "Curtos e retinhos", points: [1, 1, 2] },
      { label: "Já tenho bastante fio", points: [1, 2, 0] },
      { label: "Médios, sem nada muito marcante", points: [2, 1, 1] },
    ],
  },
  {
    q: "O que mais pesa na sua decisão?",
    options: [
      { label: "Parecer o mais natural possível", points: [2, 0, 1] },
      { label: "Impacto visual, quero um olhar poderoso", points: [0, 2, 0] },
      {
        label: "Não usar nada extra, só realçar o que já tenho",
        points: [0, 0, 2],
      },
    ],
  },
  {
    q: "Você usa maquiagem nos olhos no dia a dia?",
    options: [
      { label: "Raramente, prefiro algo pronto", points: [1, 0, 2] },
      { label: "Sempre capricho, gosto de make marcante", points: [0, 2, 0] },
      { label: "Às vezes, depende da ocasião", points: [2, 1, 0] },
    ],
  },
  {
    q: "Como é sua rotina de cuidados?",
    options: [
      { label: "Gosto de algo de baixa manutenção", points: [1, 0, 2] },
      {
        label: "Não me importo de cuidar bem se o resultado vale a pena",
        points: [1, 2, 0],
      },
      { label: "Prefiro o mínimo de produtos possível", points: [1, 0, 2] },
    ],
  },
  {
    q: "Para qual ocasião é esse cílios?",
    options: [
      { label: "Uso no dia a dia, discreto", points: [2, 0, 1] },
      {
        label: "Quero para um evento especial, algo marcante",
        points: [0, 2, 0],
      },
      {
        label: "Só quero acordar com os olhos já 'prontos'",
        points: [0, 0, 2],
      },
    ],
  },
];

const RESULTS = [
  {
    title: "Fio a Fio",
    desc: "Seu estilo pede um efeito natural, alongado e discreto — perfeito para quem quer realçar o olhar sem parecer que fez algo. É o clássico que nunca sai de moda.",
    image: "https://picsum.photos/seed/lash-fio-a-fio/700/900",
    price: "a partir de R$ 120",
  },
  {
    title: "Volume Russo",
    desc: "Você gosta de impacto! O volume russo cria densidade e um olhar marcante, ideal para quem não tem medo de se destacar.",
    image: "https://picsum.photos/seed/lash-volume-russo/700/900",
    price: "a partir de R$ 180",
  },
  {
    title: "Lash Lifting",
    desc: "Praticidade é a sua prioridade. O lash lifting realça seus cílios naturais com curvatura e nutrição, sem adicionar fios — acorda pronta.",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
    price: "a partir de R$ 90",
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0); // índice da pergunta atual
  const [scores, setScores] = useState([0, 0, 0]);
  const [finished, setFinished] = useState(false);

  function handleAnswer(points) {
    const newScores = scores.map((s, i) => s + points[i]);
    setScores(newScores);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setStep(0);
    setScores([0, 0, 0]);
    setFinished(false);
  }

  const resultIndex = scores.indexOf(Math.max(...scores));
  const result = RESULTS[resultIndex];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  return (
    <div style={styles.body}>
      <style>{css}</style>

      <header className="quiz-header" style={styles.header}>
        <Link to="/" style={styles.logo}>
          Cílios <span style={{ color: "var(--gold)" }}>&amp;</span> Cia
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
                  href={WHATSAPP_LINK}
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
    .quiz-actions a, .quiz-actions button{ width: 70% !important; text-align: center !important; }
  }
`;

const styles = {
  body: {
    minHeight: "100vh",
    background: "var(--ink)",
    color: "var(--ivory)",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 6vw",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 6vw",
    minHeight: "calc(100vh - 90px)",
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
