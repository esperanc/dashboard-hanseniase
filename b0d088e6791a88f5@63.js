import define1 from "./197c2c16ae942e60@382.js";
import define2 from "./b95f17ec584a2b2b@290.js";
import define3 from "./95a6dd468792e4c1@159.js";

function _1(md){return(
md`# Ranking Hanseníase`
)}

function _menuMunicipio(menuLocalidade,flagColors){return(
menuLocalidade({
  value: ["RIO DE JANEIRO", "SÃO PAULO"],
  cores: flagColors
})
)}

function _3($0){return(
$0
)}

function _4($0){return(
$0
)}

function _varname(Inputs,variaveis){return(
Inputs.select(Object.keys(variaveis), {
  label: "variável rank",
  value: "cn",
  format: (d) => variaveis[d].name
})
)}

function _6(makeRankingBox,filteredData,varname,$0){return(
makeRankingBox(filteredData, varname, $0)
)}

function _data(getIndicadores,ano){return(
getIndicadores(ano)
)}

function _filteredData(data,filterDatum){return(
data.filter(filterDatum)
)}

function _9(md){return(
md`<br>
## Implementação`
)}

function _TL(){return(
(d) => d
)}

function _normalizeString(){return(
(s) =>
  s
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
)}

function _makeRankingBox(htl,variaveis,d3,aText,TL,alteraMenuLocalidade,municipioPorCodigo,normalizeString,html){return(
function makeRankingBox(data, varname, menuMunicipios) {
  const listContainer = htl.html`<div class=rankBox >`;
  const varInfo = variaveis[varname];
  const colorRange = varInfo.range;
  const escalaCores = d3.scaleThreshold(varInfo.thresholds, varInfo.range);
  const listSearch = aText({ width: 280, placeholder: TL("🔍 BUSCAR") });
  const altera = alteraMenuLocalidade(menuMunicipios);
  const rankedData = data.map((d) => {
    const obj = Object.assign({}, municipioPorCodigo.get(d.codigo));
    obj.val = d[varname];
    obj.codigo = d.codigo;
    return obj;
  });
  rankedData.sort((a, b) => b.val - a.val);

  const createBoxes = (d, i) => {
    const entry = htl.html`<div class=rankItem>`;
    const cor = escalaCores(d.val);
    const textColor = d3.hsl(cor).l > 0.5 ? "black" : "white";
    const rank = htl.html`<div class=rank style="color:${textColor};background:${cor};" >${
      i + 1
    }`;
    const name = htl.html`<div class=name>${d.nome}`;
    const uf = htl.html`<div class=uf>${d.uf}`;
    entry.append(rank, name, uf);
    entry.ondblclick = () => altera(d);
    return entry;
  };

  listSearch.style.marginBottom = "10px";
  const alteraCallback = 0;
  const fakeList = htl.html`<div style="position:relative;min-width:265px;min-height:${
    20 * data.length
  }px;" >`;
  const fakeContents = htl.html`<div style="position:absolute;min-width:265px;min-height:${
    20 * 8
  }px;" >`;
  fakeList.append(fakeContents);
  listContainer.append(fakeList);

  const showBoxes = (posY) => {
    fakeContents.style.top = posY + "px";
    fakeContents.innerHTML = "";
    const first = ~~(posY / 20);
    const last = Math.min(first + 10, rankedData.length);
    for (let i = first; i < last; i++) {
      const entry = createBoxes(rankedData[i], i);
      fakeContents.append(entry);
    }
  };
  listContainer.onscroll = (e) => {
    showBoxes(listContainer.scrollTop);
  };
  showBoxes(0);

  listSearch.oninput = (event) => {
    let s = normalizeString(listSearch.value);
    for (let i = 0; i < rankedData.length; i++) {
      if (rankedData[i].nome.includes(s)) {
        listContainer.scrollTo(0, 20 * i);
        break;
      }
    }
  };
  return html`<div>${listSearch}${listContainer}`;
}
)}

function _styles(htl){return(
htl.html`<style>
  div.rankBox {
    max-height:200px;
    max-width:280px;
    line-height: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  div.rankItem {
    display:block;
  }
  div.rankItem:hover {
    border: 1px solid black;
    cursor: pointer;
  }
  div.rankTitle {
    display: inline-block;
    vertical-align: middle;
    font-family: Roboto Condensed;
    font-size: 11px;
    font-weight: bold;
    margin-top:10px;
    margin-bottom:10px;
  }
  div.rankItem div {
    display:inline-block;
    font-family: Roboto Condensed;
    font-size: 10px;
    font-weight: 400;
    line-height: 11px;
    letter-spacing: 0em;
    text-align: left;
    padding: 3px 8px 3px 8px;
  }
  div.rankItem div.rank {
    min-width: 20px;
    max-width: 20px;
    text-align: right;
  }
  div.rankItem div.name {
    min-width: 175px;
    max-width: 175px;
  }
  div.rankItem div.uf {
    min-width: 20px;
    max-width: 20px;
  }
  </style>`
)}

function _14(md){return(
md`<br>
## Bibliotecas`
)}

function _18(stylesFilter){return(
stylesFilter
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof menuMunicipio")).define("viewof menuMunicipio", ["menuLocalidade","flagColors"], _menuMunicipio);
  main.variable(observer("menuMunicipio")).define("menuMunicipio", ["Generators", "viewof menuMunicipio"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof ano"], _3);
  main.variable(observer()).define(["viewof filtersUI"], _4);
  main.variable(observer("viewof varname")).define("viewof varname", ["Inputs","variaveis"], _varname);
  main.variable(observer("varname")).define("varname", ["Generators", "viewof varname"], (G, _) => G.input(_));
  main.variable(observer()).define(["makeRankingBox","filteredData","varname","viewof menuMunicipio"], _6);
  main.variable(observer("data")).define("data", ["getIndicadores","ano"], _data);
  main.variable(observer("filteredData")).define("filteredData", ["data","filterDatum"], _filteredData);
  main.variable(observer()).define(["md"], _9);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("normalizeString")).define("normalizeString", _normalizeString);
  main.variable(observer("makeRankingBox")).define("makeRankingBox", ["htl","variaveis","d3","aText","TL","alteraMenuLocalidade","municipioPorCodigo","normalizeString","html"], _makeRankingBox);
  main.variable(observer("styles")).define("styles", ["htl"], _styles);
  main.variable(observer()).define(["md"], _14);
  const child1 = runtime.module(define1);
  main.import("variaveis", child1);
  main.import("getIndicadores", child1);
  const child2 = runtime.module(define2);
  main.import("menuLocalidade", child2);
  main.import("municipios", child2);
  main.import("alteraMenuLocalidade", child2);
  main.import("municipioPorCodigo", child2);
  main.import("flagColors", child2);
  const child3 = runtime.module(define3);
  main.import("viewof ano", child3);
  main.import("ano", child3);
  main.import("viewof filtersUI", child3);
  main.import("filtersUI", child3);
  main.import("filterDatum", child3);
  main.import("aSelect", child3);
  main.import("aText", child3);
  main.import("styles", "stylesFilter", child3);
  main.variable(observer()).define(["stylesFilter"], _18);
  return main;
}
