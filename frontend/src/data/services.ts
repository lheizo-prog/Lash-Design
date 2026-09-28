export type Service = {
  id: string;
  num: string;
  tipo: "Hyper Fio a Fio" | "Sobrancelhas" | "Outros";
  title: string;
  desc: string;
  price: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    id: "hyper-classic",
    num: "01",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Classic",
    desc: "Aplicação clássica, um fio sintético por cílio natural, para um efeito natural e alongado.",
    price: "a partir de R$ 197,00",
    image: "https://picsum.photos/seed/lash-fio-a-fio/700/900",
  },
  {
    id: "hyper-elite",
    num: "02",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Elite",
    desc: "Leques de fios ultrafinos aplicados por cílio, criando densidade e um olhar marcante.",
    price: "a partir de R$ 227,00",
    image: "https://picsum.photos/seed/lash-volume-russo/700/900",
  },
  {
    id: "hyper-plume",
    num: "03",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Plume",
    desc: "Efeito pluma leve, com fios finos e volume gradual do canto interno ao externo do olho.",
    price: "a partir de R$ 247,00",
    image: "https://picsum.photos/seed/lash-plume/700/900",
  },
  {
    id: "hyper-luxo",
    num: "04",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Luxo",
    desc: "Volume alto com curvatura acentuada, para um efeito sofisticado e cheio de personalidade.",
    price: "a partir de R$ 267,00",
    image: "https://picsum.photos/seed/lash-luxo/700/900",
  },
  {
    id: "hyper-fantasy",
    num: "05",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Fantasy",
    desc: "Aplicação com fios coloridos ou texturizados, para quem quer um visual criativo e único.",
    price: "a partir de R$ 280,00",
    image: "https://picsum.photos/seed/lash-fantasy/700/900",
  },
  {
    id: "hyper-supreme",
    num: "06",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Supreme",
    desc: "Máximo volume e densidade, técnica mais elaborada para um efeito dramático e duradouro.",
    price: "a partir de R$ 287,00",
    image: "https://picsum.photos/seed/lash-supreme/700/900",
  },
  {
    id: "hyper-californiano",
    num: "07",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Californiano",
    desc: "Fios alternados em comprimentos diferentes, criando um efeito esvoaçante e despojado.",
    price: "a partir de R$ 257,00",
    image: "https://picsum.photos/seed/lash-californiano/700/900",
  },
  {
    id: "hyper-cisne-negro",
    num: "08",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Cisne Negro",
    desc: "Fios mais longos nos cantos externos, alongando o formato do olho com efeito dramático.",
    price: "a partir de R$ 357,00",
    image: "https://picsum.photos/seed/lash-cisne-negro/700/900",
  },
  {
    id: "hyper-fox",
    num: "09",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Fox",
    desc: "Efeito raposa: cantos externos puxados para cima, alongando e levantando o olhar.",
    price: "a partir de R$ 297,00",
    image: "https://picsum.photos/seed/lash-fox/700/900",
  },
  {
    id: "hyper-eyeliner",
    num: "10",
    tipo: "Hyper Fio a Fio",
    title: "Hyper Eyeliner",
    desc: "Fios aplicados rente à raiz, simulando um delineado natural sem precisar de maquiagem.",
    price: "a partir de R$ 287,00",
    image: "https://picsum.photos/seed/lash-eyeliner/700/900",
  },
  {
    id: "designer-tintura",
    num: "11",
    tipo: "Sobrancelhas",
    title: "Designer com Tintura",
    desc: "Modelagem das sobrancelhas com tintura para uniformizar a cor e definir o formato.",
    price: "a partir de R$ 80,00",
    image: "https://picsum.photos/seed/sobrancelha-tintura/700/900",
  },
  {
    id: "designer-sobrancelhas",
    num: "12",
    tipo: "Sobrancelhas",
    title: "Designer de Sobrancelhas",
    desc: "Modelagem que respeita o formato natural do rosto, alinhando e definindo as sobrancelhas.",
    price: "a partir de R$ 50,00",
    image: "https://picsum.photos/seed/sobrancelha-designer/700/900",
  },
  {
    id: "remocao-cilios",
    num: "13",
    tipo: "Outros",
    title: "Remoção de Cílios",
    desc: "Remoção segura da extensão de cílios, sem danificar os fios naturais.",
    price: "a partir de R$ 70,00",
    image: "https://picsum.photos/seed/remocao-cilios/700/900",
  },
];
