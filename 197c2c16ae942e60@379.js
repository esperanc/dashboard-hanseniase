function _1(md){return(
md`# Dados Hanseníase

Amostragem de dados de Hanseníase no Brasil de 2001 a 2022. Dados retirados do SINAN, filtrados e convertidos para Parquet.

Dados de população por município por ano retirados de https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html?edicao=17283&t=downloads

Dicas sobre carregamento de arquivos Parquet em https://observablehq.com/@bmschmidt/hello-parquet-wasm
`
)}

function _ano(Inputs){return(
Inputs.range([2001, 2022], { label: "ano", step: 1, value: 2001 })
)}

function _3(__query,dados,invalidation){return(
__query(dados,{from:{table:"dados"},sort:[],names:[{name:"codigo ",column:"codigo"}],slice:{to:null,from:null},filter:[],select:{columns:["pop","total","total_cn","cn","cn_crianca","cn_gif_2","tx_prev","cn_mb","notif_outro_mun","codigo"]}},invalidation,"dados")
)}

function _dados(getIndicadores,ano){return(
getIndicadores(ano)
)}

function _5(md){return(
md`<br>
## Bibliotecas`
)}

async function _pq()
{
  const pq = await import('https://unpkg.com/parquet-wasm@0.1.1/web.js')
  // default seems to need to resolve first?
  await pq.default()
  return pq
}


function _ja(require){return(
require("apache-arrow")
)}

function _8(md){return(
md`<br>
## Tabela de casos de hanseníase por município por ano`
)}

async function _tab_hans(ja,pq,FileAttachment){return(
ja.tableFromIPC(
  pq.readParquet(
    new Uint8Array(await FileAttachment("hanseniase.parquet").arrayBuffer())
  )
)
)}

function _10(Inputs,tab_hans){return(
Inputs.table(tab_hans)
)}

function _hansIndexAno(tab_hans)
{
  let obj = {};
  for (let i = 0; i < tab_hans.numRows; i++) {
    let row = tab_hans.get(i);
    if (!obj[row.ano]) {
      obj[row.ano] = new Set();
    }
    let s = obj[row.ano];
    s.add(i);
  }
  return obj;
}


function _12(FileAttachment){return(
FileAttachment("hanseniase.parquet").url()
)}

function _13(md){return(
md`<br>
## Tabela de populações de municípios brasileiros de 2001 a 2021
`
)}

async function _tab_pop(ja,pq,FileAttachment)
{
  const table = await ja.tableFromIPC(
    pq.readParquet(
      new Uint8Array(
        await FileAttachment("populacao_por_ano.parquet").arrayBuffer()
      )
    )
  );
  let result = [];
  for (let p of table) {
    let obj = {};
    Object.assign(obj, p);
    result.push(obj);
  }
  return result;
}


function _15(Inputs,tab_pop){return(
Inputs.table(tab_pop)
)}

function _indexPop(tab_pop)
{
  let map = new Map();
  for (let row of tab_pop) {
    map.set(row.codigo, row);
  }
  return map;
}


function _getNomeMunicipio(indexPop){return(
function getNomeMunicipio(cod) {
  const row = indexPop.get(cod);
  return row.nome;
}
)}

function _getPop(indexPop)
{
  return (cod, ano) => {
    const row = indexPop.has(cod) ? indexPop.get(cod) : 0;
    let val = row[ano];
    if (!val) {
      // Try interpolation
      let prevVal = row[ano - 1];
      let nextVal = row[ano + 1];
      if (prevVal) {
        if (nextVal) return Math.round((prevVal + nextVal) / 2);
        else return prevVal;
      } else return nextVal;
    }
    return val;
  };
}


function _19(md){return(
md`<br>
## IDH por Município (2010)`
)}

async function _idhmap(FileAttachment){return(
new Map(
  (await FileAttachment("idhm.csv").csv()).map((d) => [+d.codigo, +d.idh])
)
)}

function _21(md){return(
md`<br>
## Indicadores

|   | variável | legenda | Descrição |
|---|----------| --------| ----------|
| 1 | cn | **casos novos / 100k hab** | Coeficiente de detecção de casos novos por 100 mil habitantes. |
| 2 | cn_crianca | **c.n. < 15 anos / 100k hab** | Coeficiente de detecção de casos novos em menores de 15 anos por 100 mil habitantes. |
| 3 | cn_gif_2 |  **c.n. GIF 2 / 1M hab** | Coeficiente de detecção de casos novos diagnosticados com grau de incapacidade 2 por milhão de habitantes. |
| 4 | tx_prev |  **tx. prevalência / 10k hab** | Taxa de prevalência por 10 mil habitantes. |
| 5 | cn_mb |  **% casos novos MB** | Proporção de casos novos com classificação MB. |
| 6 | notif_outro_mun |  **% notif. em outro município** | Taxa de notificação em município diferente do de residência. |`
)}

function _22(md){return(
md`1 coeficiente de detecção de casos novos por 100mil habitantes => casos novos/100k hab.  
taxa detecção/100k hab

  Faixas:
  
  - "hiperendêmico" = >=40, 
  - "muito alto"= 20-39,99, 
  - "alto" = 10-19,99, 
  - "médio"= 2-9,99, 
  - "baixo"<2/100.000hab
  
2 coeficiente de detecção de casos novos em menores de 15 anos por 100mil habitantes ; => c.n. < 15 anos / 100k hab.
taxa detecção <15anos/100k hab

  Faixas:

  - Baixa: < 0,50/100.000 habitantes 
  - Médio: 0,50 a 2,49/100.000 habitantes
  - Alto: 2,50 a 4,99/100.000 habitantes
  - Muito alto: 5,00 a 9,99/100.000 habitantes 
  - Hiperendêmico: ≥ 10,00/100.000 habitantes

3 coeficiente de detecção de casos novos diagnosticados com grau de incapacidade 2 por milhão de habitantes; 
=> c.n. GIF 2 / 1M hab.
taxa detecção GIF2/1M hab

  - Sem parâmetro - pode ser o quartil?

4 taxa de prevalência por 10000 habitantes => tx. prevalência / 10k hab.
taxa prevalência/10k hab

  - Hiperendêmico: ≥20,0 por 10 mil hab. 
  - Muito alto: 10,0 a 19,9 por 10 mil hab. 
  - Alto: 5,0 a 9,9 por 10 mil hab. 
  - Médio: 1,0 a 4,9 por 10 mil hab. 
  - Baixo: <1,0 por  10 mil hab.

5 proporção de casos novos com classificação MB => % casos novos MB

  - Sem parâmetro - pode ser o quartil?

6 taxa de notificação em município diferente do de residência => % notif. em outro município.`
)}

function _variaveis(){return(
{
  idh: {
    label: "Índice de Desenvolvimento Humano (2010)",
    labelBarChart: "IDH (2010)",
    labelRanking: "Ranking por IDH(2010).",
    labelTooltip: "IDH (2010)",
    name: "IDH (2010)",
    domain: [0, 1200],
    thresholds: [0.5, 0.6, 0.7, 0.8],
    filterRange: [0, 0.5, 0.6, 0.7, 0.8, 1],
    filterSubtitle: "Mostrar municipios IDH (2010) entre:",
    range: ["#262800", "#664514", "#B28B59", "#E5D8AC", "#FFF6CC"].reverse()
  },
  cn: {
    label: "Casos novos por 100 mil habitantes",
    labelBarChart: "Casos novos por 100k habitantes",
    labelRanking: "Ranking por taxa de casos novos / 100k hab.",
    labelTooltip: "por 100k hab",
    name: "Casos novos",
    domain: [0, 1200],
    thresholds: [2, 10, 20, 40],
    filterRange: [0, 2, 10, 20, 40, 100, 1500],
    filterSubtitle:
      "Mostrar municipios com taxa de casos novos por 100k hab. entre:",
    range: ["#260800", "#662514", "#B26B59", "#E5B8AC", "#FFD6CC"].reverse()
  },
  cn_crianca: {
    label: "Casos novos em crianças por 100 mil habitantes",
    labelBarChart: "c.n. < 15 anos / 100k hab",
    labelRanking: "Ranking de casos novos < 15 anos / 100k hab.",
    labelTooltip: "por 100k hab",
    name: "C. n. em crianças",
    domain: [0, 1200],
    thresholds: [0.5, 2.5, 5, 10],
    filterRange: [0, 0.5, 2.5, 5, 10, 100, 400],
    filterSubtitle: "C.n. em menores de 15 anos por 100k hab. entre",
    range: ["#00261D", "#125948", "#4D9986", "#99CCC0", "#CEF2E9"].reverse()
  },
  cn_gif_2: {
    label: "Casos novos com grau de incapacidade 2 por milhão de habitantes",
    labelBarChart: "c.n. GIF 2 / 1M hab",
    labelRanking: "ranking por c.n. GIF 2",
    labelTooltip: "por 1M hab",
    name: "C. n. com GIF 2",
    domain: [0, 1200],
    thresholds: [20, 30, 50, 80],
    filterRange: [0, 20, 30, 50, 80, 4000],
    filterSubtitle: "C.n. com grau de incap. 2  por 1M hab. entre",
    range: ["#070040", "#291C8C", "#6359B2", "#A9A3D9", "#DDD9FF"].reverse()
  },
  tx_prev: {
    label: "Taxa de prevalência por 10 mil habitantes",
    labelBarChart: "tx. prevalência / 10k hab",
    labelRanking: "ranking por tx. prevalência",
    labelTooltip: "por 10k hab",
    name: "Tx. prevalência",
    domain: [0, 1200],
    thresholds: [1, 5, 10, 20],
    filterRange: [0, 0.1, 1, 2, 5, 10, 20, 250],
    filterSubtitle: "Tx de prevalência por 10k hab. entre",
    range: ["#200040", "#541C8C", "#8659B2", "#BEA3D9", "#ECD9FF"].reverse()
  },
  cn_mb: {
    label: "Proporção de casos novos do tipo MB (%)",
    labelBarChart: "% casos novos MB",
    labelRanking: "ranking por proporção de casos novos MB",
    labelTooltip: "(%)",
    name: "C. n. do tipo MB",
    domain: [0, 100],
    thresholds: [20, 40, 60, 80],
    filterRange: [0, 10, 20, 40, 60, 80, 100],
    filterSubtitle: "% de casos novos do tipo MB entre",
    range: ["#260024", "#661461", "#B259AD", "#E5ACE2", "#FFD9FD"].reverse()
  },
  notif_outro_mun: {
    label: "Proporção de notificação em outro município (%)",
    labelBarChart: "% notif. em outro município",
    labelRanking: "% notif. em outro município",
    labelTooltip: "(%)",
    name: "Notif. outro mun.",
    domain: [0, 100],
    thresholds: [5, 10, 25, 50],
    filterRange: [0, 5, 10, 25, 50, 100],
    filterSubtitle: "% de casos notificados em outro mun. entre",
    range: ["#001A40", "#1C498C", "#597DB2", "#A3B8D9", "#D9E8FF"].reverse()
  }
}
)}

function _getIndicadores(hansIndexAno,tab_hans,indexPop,getPop,idhmap,resumoAno)
{
  return (ano, filtroCodigo = (codigo) => true) => {
    let munRows = new Map();
    for (let irow of hansIndexAno[ano]) {
      const row = tab_hans.get(irow);
      if (row.ano != ano) throw "Indice de Ano de Tab_hans incorreto";
      if (filtroCodigo(row.municipio)) {
        const {
          notif_outro,
          caso_novo,
          crianca,
          gif_2,
          mb,
          prevalente,
          contagem
        } = row;
        let sum;
        if (munRows.has(row.municipio)) sum = munRows.get(row.municipio);
        else {
          sum = [0, 0, 0, 0, 0, 0, 0];
          munRows.set(row.municipio, sum);
        }
        sum[0] += contagem;
        if (caso_novo) sum[1] += contagem;
        if (caso_novo && crianca) sum[2] += contagem;
        if (caso_novo && gif_2) sum[3] += contagem;
        if (prevalente) sum[4] += contagem;
        if (caso_novo && mb) sum[5] += contagem;
        if (notif_outro) sum[6] += contagem;
      }
    }
    let result = [];
    let resumo = {
      casos: 0,
      municipiosNaoConsiderados: [],
      casosNaoConsiderados: 0,
      casosNovos: 0,
      casosNovosEmCriancas: 0,
      casosNovosGif2: 0,
      casosNovosMb: 0,
      casosNotifOutro: 0,
      prevalentes: 0,
      populacao: 0
    };
    for (let [codigo, sum] of munRows.entries()) {
      if (!indexPop.has(codigo)) {
        resumo.municipiosNaoConsiderados.push(codigo);
        resumo.casosNaoConsiderados += sum[0];
        continue;
      }
      let pop = getPop(codigo, ano);
      let total = sum[0];
      let total_cn = sum[1];
      let cn = (sum[1] / pop) * 100000;
      let cn_crianca = (sum[2] / pop) * 100000;
      let cn_gif_2 = (sum[3] / pop) * 1000000;
      let tx_prev = (sum[4] / pop) * 10000;
      let cn_mb = (sum[5] / sum[1]) * 100;
      let notif_outro_mun = (sum[6] / total) * 100;
      resumo.populacao += pop;
      resumo.casos += sum[0];
      resumo.casosNovos += sum[1];
      resumo.casosNovosEmCriancas += sum[2];
      resumo.casosNovosGif2 += sum[3];
      resumo.prevalentes += sum[4];
      resumo.casosNovosMb += sum[5];
      resumo.casosNotifOutro += sum[6];
      result.push({
        codigo,
        pop,
        total,
        idh: idhmap.get(codigo),
        total_cn,
        cn,
        cn_crianca,
        cn_gif_2,
        tx_prev,
        cn_mb,
        notif_outro_mun
      });
    }
    resumoAno[ano] = resumo;
    return result;
  };
}


function _getIndicadoresPorCodigo(getIndicadores){return(
function getIndicadoresPorCodigo(ano) {
  return new Map(getIndicadores(ano).map((d) => [d.codigo, d]));
}
)}

function _resumoAno(){return(
{}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["hanseniase.parquet", {url: new URL("./files/7e06bfc94667e02fc9c676b1451d68ccdb60f9911289f51c8844ba33048cb87687f76c6757dd3c484ae4b40c1dc11005bdc418c2c2f124630c43765ac3651218.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["populacao_por_ano.parquet", {url: new URL("./files/cd60758697d631cd9cb843c0561d4cd3a2f0c5aa58e59301c62029384eb9868f860ecea1eef3abfd610df01970864fa530d606368b34c97aa9f4ecf5fa841fce.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["idhm.csv", {url: new URL("./files/44e4faa2b69376c01a2def57663d723b5e4220fce64423e6e01a75418ca5b8572680b22495a077a274e9e0b97dda9b69410c948e181ed0bba7e7a8b1115503da.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof ano")).define("viewof ano", ["Inputs"], _ano);
  main.variable(observer("ano")).define("ano", ["Generators", "viewof ano"], (G, _) => G.input(_));
  main.variable(observer()).define(["__query","dados","invalidation"], _3);
  main.variable(observer("dados")).define("dados", ["getIndicadores","ano"], _dados);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("pq")).define("pq", _pq);
  main.variable(observer("ja")).define("ja", ["require"], _ja);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("tab_hans")).define("tab_hans", ["ja","pq","FileAttachment"], _tab_hans);
  main.variable(observer()).define(["Inputs","tab_hans"], _10);
  main.variable(observer("hansIndexAno")).define("hansIndexAno", ["tab_hans"], _hansIndexAno);
  main.variable(observer()).define(["FileAttachment"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("tab_pop")).define("tab_pop", ["ja","pq","FileAttachment"], _tab_pop);
  main.variable(observer()).define(["Inputs","tab_pop"], _15);
  main.variable(observer("indexPop")).define("indexPop", ["tab_pop"], _indexPop);
  main.variable(observer("getNomeMunicipio")).define("getNomeMunicipio", ["indexPop"], _getNomeMunicipio);
  main.variable(observer("getPop")).define("getPop", ["indexPop"], _getPop);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("idhmap")).define("idhmap", ["FileAttachment"], _idhmap);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("variaveis")).define("variaveis", _variaveis);
  main.variable(observer("getIndicadores")).define("getIndicadores", ["hansIndexAno","tab_hans","indexPop","getPop","idhmap","resumoAno"], _getIndicadores);
  main.variable(observer("getIndicadoresPorCodigo")).define("getIndicadoresPorCodigo", ["getIndicadores"], _getIndicadoresPorCodigo);
  main.define("initial resumoAno", _resumoAno);
  main.variable(observer("mutable resumoAno")).define("mutable resumoAno", ["Mutable", "initial resumoAno"], (M, _) => new M(_));
  main.variable(observer("resumoAno")).define("resumoAno", ["mutable resumoAno"], _ => _.generator);
  return main;
}
