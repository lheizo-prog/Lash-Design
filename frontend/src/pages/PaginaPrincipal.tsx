import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

// troque pelo seu número real: 55 + DDD + número, sem espaços/traços
const WHATSAPP_LINK = "https://wa.me/5513996844270";

const NAV_ITEMS = [
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "galeria", label: "Galeria" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Agendar" },
];

const SERVICES = [
  {
    num: "01",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Classic",
    desc: "Aplicação clássica, um fio sintético por cílio natural, para um efeito natural e alongado.",
    price: "a partir de R$ 197,00",
    image: "https://picsum.photos/seed/lash-fio-a-fio/700/900",
  },
  {
    num: "02",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Elite",
    desc: "Leques de fios ultrafinos aplicados por cílio, criando densidade e um olhar marcante.",
    price: "a partir de R$ 227,00",
    image: "https://picsum.photos/seed/lash-volume-russo/700/900",
  },
  {
    num: "03",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Plume",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 247,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "04",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Luxo",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 267,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "05",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Fantasy",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 280,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "06",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Supreme",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 287,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "07",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Californiano",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 257,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "08",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Cisne Negro",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 357,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "09",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Hyper Fox",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 297,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "10",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Eyeliner",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 287,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "11",
    tipo: "Sobrancelhas",
    title: "Designer com Tintura",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 80,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "12",
    tipo: "Sobrancelhas",
    title: "Designer de sobrancelhas",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 50,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
  {
    num: "13",
    tipo: "Outros",
    title: "Remoçaõ de Cílios",
    desc: "Curvatura e nutrição dos cílios naturais, com efeito de máscara por até 6 semanas.",
    price: "a partir de R$ 70,00",
    image: "https://picsum.photos/seed/lash-lifting/700/900",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Nunca vi um trabalho tão delicado e duradouro. Meus cílios ficaram naturais, mas com um efeito impressionante.",
    author: "Juliana M., cliente há 2 anos",
  },
  {
    quote:
      "Marquei sem saber o que esperar e saí encantada. O atendimento é super cuidadoso do início ao fim.",
    author: "Renata S., cliente há 8 meses",
  },
  {
    quote:
      "Já testei outros lugares e nenhum durou tanto quanto o volume russo daqui. Virei cliente fiel.",
    author: "Camila F., cliente há 1 ano",
  },
];

const FAQ_ITEMS = [
  {
    q: "Dói para aplicar os cílios?",
    a: "Não. O procedimento é indolor — você fica com os olhos fechados e relaxa durante toda a aplicação, que costuma durar entre 1h30 e 2h30.",
  },
  {
    q: "Quanto tempo dura o efeito?",
    a: "Em média de 3 a 4 semanas, acompanhando o ciclo natural de queda dos seus cílios. Recomendamos manutenção a cada 2-3 semanas para manter o volume.",
  },
  {
    q: "Posso molhar os cílios normalmente?",
    a: "Sim, após 24h da aplicação. Evite apenas produtos oleosos (removedores de maquiagem à base de óleo), que enfraquecem a colagem.",
  },
  {
    q: "Tem alguma contraindicação?",
    a: "Alergia comprovada a adesivos de cílios ou infecções oculares ativas. Em caso de dúvida, converse com a gente antes de agendar.",
  },
];

export default function LashDesignSite() {
  // guarda qual item do menu está "brilhando" no momento
  const [glowingId, setGlowingId] = useState<string | null>(null);
  // controla se o menu hambúrguer está aberto no mobile
  const [menuOpen, setMenuOpen] = useState(false);
  // guarda qual pergunta do FAQ está aberta (null = nenhuma)
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // índice atual dos carrosséis de serviços e depoimentos
  const [serviceIndex, setServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  // guarda qual serviço está aberto no popup (null = fechado)
  const [openService, setOpenService] = useState<{
    num: string;
    title: string;
    desc: string;
    price: string;
    image: string;
  } | null>(null);

  function nextService() {
    setServiceIndex((i) => (i + 1) % SERVICES.length);
  }
  function prevService() {
    setServiceIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
  }
  function nextTestimonial() {
    setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
  }
  function prevTestimonial() {
    setTestimonialIndex(
      (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }

  // autoplay: avança sozinho a cada 4s, reinicia a contagem sempre que
  // o índice muda (inclusive por clique manual nas setas/bolinhas)
  useEffect(() => {
    const timer = setInterval(nextService, 4000);
    return () => clearInterval(timer);
  }, [serviceIndex]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 4000);
    return () => clearInterval(timer);
  }, [testimonialIndex]);

  function handleNavClick(id: string) {
    // reinicia a animação mesmo se o mesmo item for clicado de novo
    setGlowingId(null);
    requestAnimationFrame(() => setGlowingId(id));
    setMenuOpen(false); // fecha o menu ao navegar
  }

  return (
    <div style={styles.body}>
      <style>{css}</style>

      <header style={styles.header}>
        <div style={styles.logo}>
          Luciana <span style={{ color: "var(--gold)" }}>&amp;</span>{" "}
          Lash-Designer
        </div>

        <button
          className="hamburger-btn"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          style={styles.hamburgerBtn}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <ul style={styles.navList} className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={glowingId === item.id ? "glow" : ""}
                  onClick={() => handleNavClick(item.id)}
                  onAnimationEnd={() => setGlowingId(null)}
                  style={styles.navLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {menuOpen && (
          <div
            className="nav-overlay"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>

      <section style={styles.hero}>
        <div style={styles.eyebrow}>Studio Hikari</div>
        <h1 style={styles.h1}>
          Olhares que <em style={{ color: "var(--gold-soft)" }}>contam</em>
          <br />
          uma história
        </h1>
        <p style={styles.heroText}>
          Extensão de cílios{" "}
          <strong style={{ color: "var(--ivory)", fontWeight: 400 }}>
            Hyper Fio a Fio
          </strong>{" "}
          , feitos à mão com técnica e delicadeza — para um olhar que é só seu.
        </p>
        <div style={styles.ctaRow}>
          <a href="#contato" style={{ ...styles.btn, ...styles.btnSolid }}>
            Agendar horário
          </a>
          <a href="#servicos" style={{ ...styles.btn, ...styles.btnOutline }}>
            Ver serviços
          </a>
          <Link to="/quiz" style={{ ...styles.btn, ...styles.btnOutline }}>
            Descubra seu cílio ideal
          </Link>
        </div>
      </section>

      <svg
        viewBox="0 0 400 40"
        preserveAspectRatio="xMidYMid meet"
        style={styles.simpleDivider}
      >
        <path
          d="M0,20 C60,20 70,4 100,4 C130,4 140,20 200,20 C260,20 270,4 300,4 C330,4 340,20 400,20"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <section id="sobre" className="about-grid" style={styles.about}>
        <div style={styles.aboutVisual}>
          <img
            src="https://picsum.photos/seed/lash-studio/640/800"
            alt="Foto do estúdio"
            style={styles.aboutImg}
          />
        </div>
        <div>
          <div style={styles.eyebrow}>Sobre nós</div>
          <h2
            style={{ ...styles.h2, marginBottom: "1.6rem", fontSize: "2.2rem" }}
          >
            Técnica que respeita
            <br />o seu cílio natural
          </h2>
          <p style={styles.aboutP}>
            Cada aplicação começa com uma{" "}
            <strong style={{ color: "var(--ivory)", fontWeight: 400 }}>
              avaliação do formato do olho
            </strong>{" "}
            e da curvatura natural dos fios, para desenhar um mapeamento sob
            medida.
          </p>
          <p style={styles.aboutP}>
            Usamos apenas fibras de seda importadas e adesivos de baixa
            irritação, com protocolo de higienização entre cada atendimento.
          </p>
          <p style={styles.aboutP}>
            Mais de{" "}
            <strong style={{ color: "var(--ivory)", fontWeight: 400 }}>
              2 anos
            </strong>{" "}
            dedicados exclusivamente à lash design, com diversos olhares
            transformados.
          </p>
          <p style={styles.aboutP}>
            {" "}
            <strong style={{ color: "var(--ivory)", fontWeight: 400 }}>
              Certificados Internacionais
            </strong>{" "}
            dedicados exclusivamente ao lash design.
          </p>
        </div>
      </section>

      <section id="servicos">
        <div style={styles.sectionHead}>
          <div style={styles.eyebrow}>O que fazemos</div>
          <h2 style={styles.h2}>Serviços</h2>
        </div>
        <div style={styles.carouselRow}>
          <button
            onClick={prevService}
            aria-label="Serviço anterior"
            style={styles.carouselArrow}
          >
            ‹
          </button>

          <div
            key={serviceIndex}
            style={styles.serviceCard}
            className="carousel-fade"
            onClick={() => setOpenService(SERVICES[serviceIndex])}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setOpenService(SERVICES[serviceIndex]);
            }}
          >
            <span style={styles.serviceNum}>{SERVICES[serviceIndex].num}</span>
            <h4 style={styles.tipo}>Tipo: {SERVICES[serviceIndex].tipo}</h4>
            <h3 style={styles.h3}>{SERVICES[serviceIndex].title}</h3>
            <p style={styles.serviceDesc}>{SERVICES[serviceIndex].desc}</p>
            <div style={styles.price}>{SERVICES[serviceIndex].price}</div>
            <span style={styles.seeMore}>ver detalhes</span>
          </div>

          <button
            onClick={nextService}
            aria-label="Próximo serviço"
            style={styles.carouselArrow}
          >
            ›
          </button>
        </div>
        <div style={styles.dotsRow}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setServiceIndex(i)}
              aria-label={`Ir para o serviço ${i + 1}`}
              style={{ ...styles.dot, opacity: i === serviceIndex ? 1 : 0.35 }}
            />
          ))}
        </div>
      </section>

      <section id="galeria">
        <div style={styles.sectionHead}>
          <div style={styles.eyebrow}>Portfólio</div>
          <h2 style={styles.h2}>Alguns trabalhos</h2>
        </div>
        <div className="gallery-grid" style={styles.galleryGrid}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={styles.galleryItem}>
              <img
                src={`https://picsum.photos/seed/lash-gallery-${n}/400/540`}
                alt={`Trabalho ${n}`}
                style={styles.galleryImg}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="faq">
        <div style={styles.sectionHead}>
          <div style={styles.eyebrow}>Dúvidas</div>
          <h2 style={styles.h2}>Perguntas frequentes</h2>
        </div>
        <div style={styles.faqList}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} style={styles.faqItem}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={styles.faqQuestion}
                >
                  <span>{item.q}</span>
                  <span style={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                </button>
                <div className={`faq-answer-wrap ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p style={styles.faqAnswer}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={styles.testimonial}>
        <div style={styles.carouselRow}>
          <button
            onClick={prevTestimonial}
            aria-label="Depoimento anterior"
            style={styles.carouselArrow}
          >
            ‹
          </button>

          <div
            key={testimonialIndex}
            className="carousel-fade"
            style={styles.testimonialText}
          >
            <blockquote style={styles.blockquote} className="testimonial-quote">
              "{TESTIMONIALS[testimonialIndex].quote}"
            </blockquote>
            <cite style={styles.cite}>
              — {TESTIMONIALS[testimonialIndex].author}
            </cite>
          </div>

          <button
            onClick={nextTestimonial}
            aria-label="Próximo depoimento"
            style={styles.carouselArrow}
          >
            ›
          </button>
        </div>
        <div style={styles.dotsRow}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIndex(i)}
              aria-label={`Ir para o depoimento ${i + 1}`}
              style={{
                ...styles.dot,
                opacity: i === testimonialIndex ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </section>

      <footer id="contato" style={styles.footer}>
        <div style={styles.eyebrow}>Agende seu horário</div>
        <h2 style={styles.h2}>
          Vamos desenhar
          <br />o seu olhar
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem" }}>
          Atendimento com hora marcada, de terça a sábado.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.btn, ...styles.btnSolid }}
        >
          Falar no WhatsApp
        </a>
        <div style={styles.footerMeta}>
          <span>Luciana | Lash-Designer</span>
          <span>Seg-Sáb · 9h às 19h</span>
          <span>&copy; 2026</span>
        </div>
      </footer>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappFloat}
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" fill="var(--ink)">
          <path d="M16 3C9 3 3 9 3 16c0 2.5.7 4.8 1.9 6.8L3 29l6.4-1.8c1.9 1 4 1.6 6.6 1.6 7 0 13-6 13-13S23 3 16 3zm0 23.8c-2.3 0-4.4-.6-6.2-1.7l-.4-.3-4 1.1 1.1-3.9-.3-.4C5 20 4.2 18 4.2 16c0-6.5 5.3-11.8 11.8-11.8S27.8 9.5 27.8 16 22.5 26.8 16 26.8z" />
          <path d="M22 19.3c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7.2-.2.4-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.3 2.4 3.7 5.9 5.1.8.3 1.5.5 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>

      {openService && (
        <div style={styles.modalBackdrop} onClick={() => setOpenService(null)}>
          <div
            style={styles.modalCard}
            className="modal-card carousel-fade"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenService(null)}
              aria-label="Fechar"
              style={styles.modalClose}
            >
              ✕
            </button>
            <img
              src={openService.image}
              alt={openService.title}
              style={styles.modalImg}
            />
            <div style={styles.modalBody}>
              <span style={styles.serviceNum}>{openService.num}</span>
              <h3 style={styles.h3}>{openService.title}</h3>
              <p style={styles.serviceDesc}>{openService.desc}</p>
              <div style={styles.price}>{openService.price}</div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.btn,
                  ...styles.btnSolid,
                  marginTop: "1.5rem",
                }}
              >
                Agendar este serviço
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* CSS global: variáveis, fontes, animação de brilho e responsividade.
   Fica em uma tag <style> porque usa @keyframes, @import de fonte
   e media queries que o CSS-in-JS inline não cobre. */
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

  html{scroll-behavior:smooth;}

  @keyframes navGlow{
    0%{ color:var(--gold); text-shadow:0 0 0 rgba(200,162,77,0); }
    35%{ color:var(--gold-soft); text-shadow:0 0 12px rgba(232,201,138,0.85); }
    100%{ color:var(--gold); text-shadow:0 0 0 rgba(200,162,77,0); }
  }
  a.glow{ animation:navGlow .7s ease-out; }

  @media (prefers-reduced-motion: reduce){
    html{scroll-behavior:auto;}
    a.glow{ animation:none; }
  }

  /* botão hambúrguer: escondido no desktop por padrão */
  .hamburger-btn{
    display:none;
  }

  @media (max-width:860px){
    .about-grid{ grid-template-columns:1fr !important; gap:2.5rem !important; }
    .gallery-grid{ grid-template-columns:repeat(2,1fr) !important; }
    .testimonial-quote{ font-size: 0.8rem !important; }
    .modal-card{ grid-template-columns:1fr !important; }

    /* mostra o botão hambúrguer e esconde o menu por padrão */
    .hamburger-btn{
      display:block;
      background:none;
      border:1px solid var(--gold);
      color:var(--gold);
      font-size:1.2rem;
      width:44px;
      height:44px;
      line-height:1;
      cursor:pointer;
    }

    .main-nav{
      position:fixed;
      top:0;
      right:0;
      height:100vh;
      width:70vw;
      max-width:320px;
      background:var(--ink);
      border-left:1px solid var(--line);
      transform:translateX(100%);
      transition:transform .35s ease;
      padding:6rem 2rem 2rem;
      z-index: 55;
    }
    .main-nav.open{
      transform:translateX(0);
    }
    .nav-overlay{
      position:fixed;
      inset:0;
      background: rgba(0,0,0,0.5);
      z-index: 54;
    }
    .main-nav .nav-list{
      flex-direction:column !important;
      gap:2rem !important;
    }
  }

  @media (prefers-reduced-motion: reduce){
    .main-nav{ transition:none; }
    .faq-answer-wrap{ transition:none; }
  }

  /* --- acordeão do FAQ: expande/recolhe com transição suave --- */
  .faq-answer-wrap{
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows .4s ease;
  }
  .faq-answer-wrap.open{
    grid-template-rows: 1fr;
  }
  .faq-answer-inner{
    overflow: hidden;
  }

  /* --- transição elegante do carrossel a cada troca --- */
  @keyframes carouselFade{
    from{ opacity: 0; transform: translateY(8px); }
    to{ opacity: 1; transform: translateY(0); }
  }
  .carousel-fade{
    animation: carouselFade .6s cubic-bezier(.22,.61,.36,1);
  }

  @media (prefers-reduced-motion: reduce){
    .carousel-fade{ animation: none; }
  }
`;

// estilos inline reaproveitando as variáveis CSS definidas acima
const styles: { [key: string]: CSSProperties } = {
  body: {
    background: "var(--ink)",
    color: "var(--ivory)",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 6vw",
    background: "#121110",
    borderBottom: "1px solid var(--line)",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    letterSpacing: "0.08em",
    fontStyle: "italic",
  },
  navList: { listStyle: "none", display: "flex", gap: "2.5rem" },
  hamburgerBtn: {
    background: "none",
    border: "none",
    color: "var(--gold)",
  },
  navLink: {
    fontSize: "0.75rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--muted)",
    textDecoration: "none",
  },
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 6vw",
  },
  eyebrow: {
    fontSize: "0.86rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginTop: "1rem",
    marginBottom: "1.6rem",
  },
  h1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "clamp(2.8rem, 7vw, 5.6rem)",
    lineHeight: 1.05,
    maxWidth: "16ch",
  },
  heroText: {
    marginTop: "1.8rem",
    maxWidth: "42ch",
    color: "var(--muted)",
    fontSize: "1.05rem",
    lineHeight: 1.7,
  },
  ctaRow: {
    marginTop: "2.8rem",
    display: "flex",
    gap: "1.2rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btn: {
    padding: "0.95rem 2.3rem",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    border: "1px solid var(--gold)",
    textDecoration: "none",
    display: "inline-block",
  },
  btnSolid: { background: "var(--gold)", color: "var(--ink)" },
  btnOutline: { color: "var(--ivory)" },
  simpleDivider: {
    width: "100%",
    maxWidth: "400px",
    height: "40px",
    margin: "0 auto",
    display: "block",
  },
  about: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "center",
    padding: "8rem 6vw",
    maxWidth: "1180px",
    margin: "0 auto",
  },
  aboutVisual: {
    aspectRatio: "4/5",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  aboutImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(0.5) contrast(1.05)",
  },
  mutedSmall: {
    color: "var(--muted)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  aboutP: {
    color: "var(--muted)",
    lineHeight: 1.85,
    marginBottom: "1.3rem",
    fontSize: "0.98rem",
  },
  sectionHead: { textAlign: "center", marginBottom: "4.5rem" },
  h2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
  },
  serviceCard: {
    background: "var(--ink)",
    border: "1px solid var(--line)",
    padding: "3rem 2.2rem",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
    cursor: "pointer",
  },
  seeMore: {
    display: "block",
    marginTop: "1.2rem",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--gold)",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  serviceNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "var(--gold)",
    fontSize: "0.95rem",
    display: "block",
    marginBottom: "1.2rem",
  },
  h3: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "clamp(12px, 5vw, 2rem)",
    marginBottom: "0.8rem",
  },
  tipo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
    fontSize: "clamp(10px, 4vw, 1.2rem)",
  },
  serviceDesc: {
    color: "var(--muted)",
    fontSize: "clamp(8px, 12px, 24px)",
    lineHeight: 1.7,
    marginBottom: "1.2rem",
  },
  price: {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    color: "var(--gold-soft)",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 6vw",
  },
  galleryItem: {
    aspectRatio: "3/4",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(0.5) contrast(1.05)",
  },
  testimonial: { textAlign: "center", maxWidth: "1000px", margin: "8rem auto" },
  testimonialText: {
    padding: "0 1rem",
  },
  carouselRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 6vw",
  },
  carouselArrow: {
    flexShrink: 0,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid var(--gold)",
    background: "none",
    color: "var(--gold)",
    fontSize: "1.4rem",
    lineHeight: 1,
    cursor: "pointer",
  },
  dotsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "0.6rem",
    marginTop: "2rem",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--gold)",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  faqList: {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "0 6vw",
  },
  faqItem: {
    borderBottom: "1px solid var(--line)",
    padding: "1.4rem 0",
  },
  faqQuestion: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    background: "none",
    border: "none",
    color: "var(--ivory)",
    fontFamily: "'Jost', sans-serif",
    fontSize: "1.02rem",
    textAlign: "left",
    cursor: "pointer",
    padding: 0,
  },
  faqIcon: {
    color: "var(--gold)",
    fontSize: "1.3rem",
    flexShrink: 0,
  },
  faqAnswer: {
    color: "var(--muted)",
    fontSize: "0.92rem",
    lineHeight: 1.7,
    paddingTop: "1rem",
  },
  whatsappFloat: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "var(--gold)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
    zIndex: 60,
  },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    zIndex: 100,
  },
  modalCard: {
    background: "var(--ink)",
    border: "1px solid var(--line)",
    maxWidth: "760px",
    width: "100%",
    maxHeight: "88vh",
    overflowY: "auto",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  modalClose: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid var(--gold)",
    background: "var(--ink)",
    color: "var(--gold)",
    cursor: "pointer",
    zIndex: 1,
  },
  modalImg: {
    width: "100%",
    height: "100%",
    minHeight: "280px",
    objectFit: "cover",
    filter: "grayscale(0.5) contrast(1.05)",
  },
  modalBody: {
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  blockquote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
    lineHeight: 1.6,
  },
  cite: {
    display: "block",
    marginTop: "1.8rem",
    fontStyle: "normal",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold)",
  },
  footer: {
    padding: "6rem 6vw 3rem",
    textAlign: "center",
    borderTop: "1px solid var(--line)",
  },
  footerMeta: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    color: "var(--muted)",
    textTransform: "uppercase",
  },
};
