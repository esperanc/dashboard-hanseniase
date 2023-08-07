import define1 from "./197c2c16ae942e60@382.js";
import define2 from "./a03100565802fa6a@293.js";
import define3 from "./adeb415e37a21944@154.js";
import define4 from "./f493b3d6ad410bbc@445.js";
import define5 from "./8d3fb8b273f477ea@81.js";
import define6 from "./10a3ff86db04e2ff@54.js";

function _1(md){return(
md`# Filtros Hanseníase`
)}

function _ano(sliderbase)
{
  return sliderbase({
    range: [2001, 2022],
    value: 2001,
    ticks: 2,
    width: 400,
    height: 56
  });
}


function _variavel(Inputs,variaveis){return(
Inputs.select(Object.keys(variaveis), {
  label: "variavel",
  value: "cn",
  format: (d) => variaveis[d].name
})
)}

function _filtersUI(html,regionFilterInfo,makeRegionFilterDrawer,variaveis,makeDrawer)
{
  let ui = html`<div class='indicatorFilters'>`;
  let value = {};
  let listeners = [];
 for (let varname of Object.keys(regionFilterInfo)) {
   const drawer = makeRegionFilterDrawer(varname);
   ui.append(drawer);
   const listener = (event) => {
     value[varname] = drawer.filter.value;
     ui.dispatchEvent(new CustomEvent("input"));
   };
   listener(), drawer.filter.addEventListener("input", listener);
 }
  for (let varname of Object.keys(variaveis)) {
    const drawer = makeDrawer(varname);
    ui.append(drawer);
    const listener = (event) => {
      const [min, max] = drawer.filter.value.map(
        (i) => variaveis[varname].filterRange[i]
      );
      value[varname] = { min, max };
      ui.dispatchEvent(new CustomEvent("input"));
    };
    listener();
    drawer.filter.addEventListener("input", listener);
  }
 
  ui.value = value;
  return ui;
}


function _5(Plot,variaveis,variavel,data,filterIndicators,filterRegion){return(
Plot.plot({
  marginTop: 0,
  marginBottom: 40,
  x: { label: variaveis[variavel].label, labelOffset: 35, tickPadding: 10 },
  y: { axis: null },
  marks: [
    Plot.tickX(data, {
      x: (d) => d[variavel],
      y: 0,
      stroke: (d) => filterIndicators(d) && filterRegion(d)
    })
  ]
})
)}

function _data(getIndicadores,ano){return(
getIndicadores(ano)
)}

function _7(md){return(
md`<br>
## Implementação`
)}

function _TL(URLSearchParams,setTLConfig,tradDb,TLoriginal)
{
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get("lang") || "en";
  setTLConfig("orig", lang, tradDb);
  return TLoriginal;
  // (d) => d
}


function _makeFilter(sliderArray,sliderRangeBase){return(
function makeFilter(filterRange) {
  return sliderArray(
    {
      range: filterRange,
      value: [0, filterRange.length],
      ticksLabelFormatter: (i) => {
        let d = `${filterRange[i]}`;
        return d.slice(-3) == "000" ? d.slice(0, -3) + "k" : d;
      },
      width: 300,
      height: 56
    },
    sliderRangeBase
  );
}
)}

function _makeDrawer(variaveis,makeFilter,aDrawer,TL){return(
function makeDrawer(varname) {
  const { filterRange, name, filterSubtitle } = variaveis[varname];
  const filter = makeFilter(filterRange);
  const drawer = aDrawer(filter, {
    shown: false,
    title: TL(name),
    subtitle: TL(filterSubtitle)
  });
  drawer.filter = filter;
  return drawer;
}
)}

function _filterIndicators(variaveis,filtersUI){return(
(d) => {
  for (let varname of Object.keys(variaveis)) {
    const { min, max } = filtersUI[varname];
    if (d[varname] < min || d[varname] > max) return false;
  }
  return true;
}
)}

function _regionFilterInfo(ufnome,codigoToRegiaoSaude){return(
{
  region: {
    options: [
      "Selecionar uma região",
      "Centro-oeste",
      "Nordeste",
      "Norte",
      "Sudeste",
      "Sul"
    ],
    title: "Região",
    subtitle: "Mostrar apenas uma região:"
  },
  state: {
    options: ["Selecionar um estado", ...ufnome.map((d) => d.name).sort()],
    title: "Unidade da federação",
    subtitle: "Mostrar apenas uma UF:"
  },
  healthRegion: {
    options: [
      "Selecionar região de saúde",
      ...new Set(codigoToRegiaoSaude.values())
    ],
    title: "Região de saúde",
    subtitle: "Mostrar apenas uma reg. saúde:"
  }
}
)}

function _makeRegionFilterDrawer(regionFilterInfo,aSelect,TL,aDrawer){return(
function makeRegionFilterDrawer(varname) {
  const { options, title, subtitle } = regionFilterInfo[varname];
  const filter = aSelect({ options, format: TL, width: 250 });
  filter.style.marginTop = "8px";
  filter.style.marginBottom = "8px";
  const drawer = aDrawer(filter, {
    shown: true,
    title: TL(title)
    //subtitle: TL(subtitle)
  });
  drawer.filter = filter;
  return drawer;
}
)}

function _filterRegion(filtersUI,ufnome,codigoToRegiaoSaude)
{
  const regionIndex = [
    "Norte",
    "Nordeste",
    "Sudeste",
    "Sul",
    "Centro-oeste"
  ].indexOf(filtersUI.region);
  const estado = ufnome.filter((d) => d.name == filtersUI.state);
  const codEstado = estado.length ? +estado[0].uf : null;
  const regSaude =
    filtersUI.healthRegion.slice(0, 2) == "Se"
      ? null
      : filtersUI.healthRegion;

  return (d) =>
    (regionIndex == -1 || regionIndex == Math.floor(d.codigo / 100000) - 1) &&
    (!codEstado || codEstado == Math.floor(d.codigo / 10000)) &&
    (!regSaude || codigoToRegiaoSaude.get(d.codigo) == regSaude);
}


function _filterDatum(filterIndicators,filterRegion){return(
function filterDatum(d) {
  return filterIndicators(d) && filterRegion(d);
}
)}

function _16(md){return(
md`<br>
## Dados`
)}

function _tradDb(FileAttachment){return(
FileAttachment("translations@1.tsv").tsv()
)}

async function _codigoToRegiaoSaude(d3,FileAttachment){return(
new Map(
  d3
    .dsvFormat(";")
    .parse(await FileAttachment("regiaosaude@1.csv").text())
    .map((d) => [+d.CODMUNRES, `${d.UF}, ${d.REGIAOSAUDE}`])
)
)}

function _ufnome(FileAttachment){return(
FileAttachment("ufnomes.json").json()
)}

function _20(md){return(
md`<br>
## Bibliotecas`
)}

function _styles(html,aSelectStyles,aSliderStyles,aDrawerStyles,style_slider){return(
html`${aSelectStyles}${aSliderStyles}${aDrawerStyles}${style_slider}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["ufnomes.json", {url: new URL("./files/a820f83d427242a747d73ad5750428d17c82a0e428c4a40ee6ae0fee60bad9c53898d85fea4a4931ded34a932b8e2bee069202857c1ef4e2ed75c8fdd17ba15c.json", import.meta.url), mimeType: "application/json", toString}],
    ["translations@1.tsv", {url: new URL("./files/5c267d4f3cfee2a77141d6e2619bd5f20345f2f491a9654fa50ffee212eacce6aa3e501f7ff90ee385cd7a55e25e720b520b74eddf73528de113d12f56cbd3b2.tsv", import.meta.url), mimeType: "text/tab-separated-values", toString}],
    ["regiaosaude@1.csv", {url: new URL("./files/076a7e631974011ed9f0358b8255b6a19f58b12301ff44f3f2953b95960ade2285be2be8fbbb04d46a82d20edbc15fe17adb3d70d758aac937d20240cc4336f9.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof ano")).define("viewof ano", ["sliderbase"], _ano);
  main.variable(observer("ano")).define("ano", ["Generators", "viewof ano"], (G, _) => G.input(_));
  main.variable(observer("viewof variavel")).define("viewof variavel", ["Inputs","variaveis"], _variavel);
  main.variable(observer("variavel")).define("variavel", ["Generators", "viewof variavel"], (G, _) => G.input(_));
  main.variable(observer("viewof filtersUI")).define("viewof filtersUI", ["html","regionFilterInfo","makeRegionFilterDrawer","variaveis","makeDrawer"], _filtersUI);
  main.variable(observer("filtersUI")).define("filtersUI", ["Generators", "viewof filtersUI"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","variaveis","variavel","data","filterIndicators","filterRegion"], _5);
  main.variable(observer("data")).define("data", ["getIndicadores","ano"], _data);
  main.variable(observer()).define(["md"], _7);
  main.define("initial TL", ["URLSearchParams","setTLConfig","tradDb","TLoriginal"], _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("makeFilter")).define("makeFilter", ["sliderArray","sliderRangeBase"], _makeFilter);
  main.variable(observer("makeDrawer")).define("makeDrawer", ["variaveis","makeFilter","aDrawer","TL"], _makeDrawer);
  main.variable(observer("filterIndicators")).define("filterIndicators", ["variaveis","filtersUI"], _filterIndicators);
  main.variable(observer("regionFilterInfo")).define("regionFilterInfo", ["ufnome","codigoToRegiaoSaude"], _regionFilterInfo);
  main.variable(observer("makeRegionFilterDrawer")).define("makeRegionFilterDrawer", ["regionFilterInfo","aSelect","TL","aDrawer"], _makeRegionFilterDrawer);
  main.variable(observer("filterRegion")).define("filterRegion", ["filtersUI","ufnome","codigoToRegiaoSaude"], _filterRegion);
  main.variable(observer("filterDatum")).define("filterDatum", ["filterIndicators","filterRegion"], _filterDatum);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("tradDb")).define("tradDb", ["FileAttachment"], _tradDb);
  main.variable(observer("codigoToRegiaoSaude")).define("codigoToRegiaoSaude", ["d3","FileAttachment"], _codigoToRegiaoSaude);
  main.variable(observer("ufnome")).define("ufnome", ["FileAttachment"], _ufnome);
  main.variable(observer()).define(["md"], _20);
  const child1 = runtime.module(define1);
  main.import("variaveis", child1);
  main.import("getIndicadores", child1);
  const child2 = runtime.module(define2);
  main.import("aSelect", child2);
  main.import("aText", child2);
  main.import("aSelectStyles", child2);
  const child3 = runtime.module(define3);
  main.import("aSlider", child3);
  main.import("aSliderStyles", child3);
  const child4 = runtime.module(define4);
  main.import("sliderbase", child4);
  main.import("sliderArray", child4);
  main.import("sliderRangeBase", child4);
  main.import("style_slider", child4);
  const child5 = runtime.module(define5);
  main.import("aDrawer", child5);
  main.import("aDrawerStyles", child5);
  const child6 = runtime.module(define6);
  main.import("translate", "TLoriginal", child6);
  main.import("setConfig", "setTLConfig", child6);
  main.import("config", "TLConfig", child6);
  main.variable(observer("styles")).define("styles", ["html","aSelectStyles","aSliderStyles","aDrawerStyles","style_slider"], _styles);
  return main;
}
