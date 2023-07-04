import define1 from "./b95f17ec584a2b2b@286.js";
import define2 from "./95a6dd468792e4c1@158.js";
import define3 from "./197c2c16ae942e60@368.js";
import define4 from "./b0d088e6791a88f5@63.js";
import define5 from "./97eea99cb34218de@330.js";
import define6 from "./d835a177217bb78a@322.js";
import define7 from "./d4a4b18562e2e145@26.js";
import define8 from "./a33468b95d0b15b0@808.js";
import define9 from "./e095826084f87170@303.js";

function _1(md){return(
md`# Dashboard Hanseníase`
)}

function _mainWindow(htl){return(
htl.html` <style>
  .containerPrincipal {
    display: grid; 
    background: #FAFAFA;
    padding:10px;
    margin:0;
    column-gap:10px;
    row-gap:10px;
    grid-template-columns: 318px 200px auto 325px;
    grid-template-rows: 55px 55px 50px 175px 140px 300px 100px;
  }
  .containerPrincipal>div {
    margin:0;
    border-radius:8px;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #151472;
    padding:16px;
  }
  div.menuPrincipal {
    display: flex;
    justify-content: space-between;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 2;
    padding:0;
  }
  div.indicadorChave {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 4;
    background:white;
    z-index:10;
    box-shadow: 2px 2px 6px lightgray;
  }
  div.rankingBarChart {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 6;
    background:white;
    z-index:10;
    box-shadow: 2px 2px 6px lightgray;
  }
  div.scatterplot {
    position:relative;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 6;
    grid-row-end: 7;
    border:none;
    background:white;
    z-index:10;
    box-shadow: 2px 2px 6px lightgray;
  }
  div.scatterplotBig {
    position:relative;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 7;
    border:none;
    background:white;
    z-index:9;
    box-shadow: 2px 2px 6px lightgray;
  }
   div.filtrarPorSmall {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
    background:white;
    z-index:10;
     box-shadow: 2px 2px 6px lightgray;
  }
   div.filtrarPor {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 7;
    background:white;
    z-index:10;
     box-shadow: 2px 2px 6px lightgray;
     overflow-x: hidden;
     overflow-y: auto;
  }
  div.mapa {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 8;
    padding:0;
  }
 
</style>
<div class=containerPrincipal>
  <div class=menuPrincipal> MENU </div>
  <div class=indicadorChave> INDICADOR CHAVE </div>
  <div class=rankingBarChart> RANKING BARCHART </div>
  <div class=scatterplot> SCATTERPLOT </div>
  <div class=scatterplotBig>BIG</div>
  <div class=mapa> MAPA </div>
  <div class=filtrarPor> FILTRAR POR </div>
  <div class=filtrarPorSmall> FILTRAR POR SMALL</div>
</div>`
)}

function _3(md){return(
md`<br>
## Elementos`
)}

function _munSelecionados(menuLocalidade,flagColors){return(
menuLocalidade({
  value: ["RIO DE JANEIRO", "SÃO PAULO"],
  cores: flagColors
})
)}

function _colorSelect(aSelect,variaveis,TL)
{
  return aSelect({
    options: Object.keys(variaveis),
    width: 280,
    format: (d) => TL(variaveis[d].name)
  });
}


function _xAxisSelect(aSelect,variaveis,TL)
{
  return aSelect({
    options: Object.keys(variaveis),
    value: "cn_crianca",
    width: 120,
    format: (d) => TL(variaveis[d].name)
  });
}


function _yAxisSelect(aSelect,variaveis,TL)
{
  return aSelect({
    options: Object.keys(variaveis),
    value: "cn_gif_2",
    width: 120,
    format: (d) => TL(variaveis[d].name)
  });
}


function _legendaEscalaCores(Legend,escalaCores,TL,variaveis,colorSelect,d3)
{
  const leg = Legend(escalaCores, {
    width: 280,
    title: TL(variaveis[colorSelect].label),
    tickSize: 0
  });
  d3.select(leg).selectAll("text").style("font-family", "Roboto Condensed");
  d3.select(leg).selectAll(".tick").selectAll("line").style("stroke", "white");
  d3.select(leg).selectAll(".tick").selectAll("text").style("color", "#C4C4C4");
  return leg;
}


function _rankingBox(makeRankingBox,filteredData,colorSelect,$0){return(
makeRankingBox(filteredData, colorSelect, $0)
)}

function _barchartVis(makeBarchartVis,munSelecionados,colorSelect){return(
makeBarchartVis(munSelecionados, colorSelect, {
  width: 280,
  height: 260
})
)}

function _rankingBarChartContents(htl,visToggle,TL,colorVar,biglayoutToggle,makeIcon,$0,rankingBox,$1,barchartVis)
{
  const topDiv = htl.html`<div>`;
  topDiv.style = `
    display:flex; 
    justify-content: space-between;
    line-height:0;
    margin-bottom: 10px;
  `;
  const titleString =
    visToggle == "ranking"
      ? TL(colorVar.labelRanking)
      : TL(colorVar.labelBarChart);
  const listTitle = htl.html`<div class=rankTitle>${titleString}`;
  const expandReduce = biglayoutToggle
    ? makeIcon.rollDown()
    : makeIcon.rollUp();
  expandReduce.style.cursor = "pointer";
  expandReduce.onclick = () =>
    ($0.value = !$0.value);
  rankingBox
    .querySelector("div.rankBox")
    .dispatchEvent(new CustomEvent("scroll", { scrollTop: 0 }));
  topDiv.append($1, listTitle, expandReduce);
  const contents = htl.html`<div class=${
    visToggle == "ranking" ? "rankingChartDiv" : "barChartDiv"
  } style="max-width:290px">`;
  contents.append(topDiv);
  if (visToggle == "ranking") {
    contents.append(rankingBox);
  } else {
    contents.append(barchartVis);
  }
  return contents;
}


function _scatterplotComponent(scatter){return(
scatter
)}

function _mapaMunicipio(xAxisSelect,yAxisSelect,colorSelect,escalaCores,makeTooltipFunc,d3tip,alteraMenuLocalidade,$0,panel,indicadoresPorCodigo,posicaoPorCodigo,bubbleMap,posicoesMunicipios,d3)
{
  const vars = [xAxisSelect, yAxisSelect, colorSelect];
  const colorScale = escalaCores;
  const tooltip = makeTooltipFunc(vars);
  const tip = d3tip().attr("class", "d3-tip").html(tooltip);
  const altera = alteraMenuLocalidade($0);
  const ondblclick = (event, d) => {
    altera(d);
  };
  const options = {
    width: panel.mapa.w,
    height: panel.mapa.h,
    title: (d) => d.codigo,
    translation: [300, 0],
    color: (d) => {
      const dado = indicadoresPorCodigo.get(+d.codigo);
      if (dado) return colorScale(dado[colorSelect]);
      else return "rgb(220,220,220)";
    },
    onmouseover: function (event, d, sel) {
      sel.attr("stroke", "rgba(255,0,0,0.5)").attr("stroke-width", 4);
      const dado = indicadoresPorCodigo.get(+d.codigo);
      if (dado) tip.show.call(this, dado);
    },
    onmouseout: function (event, d, sel) {
      sel.attr("stroke", "none");
      const dado = indicadoresPorCodigo.get(+d.codigo);
      if (dado) tip.hide.call(this, dado);
    },
    flags: {
      data: $0.value,
      options: {
        x: (d) => posicaoPorCodigo.get(+d.cod).x,
        y: (d) => posicaoPorCodigo.get(+d.cod).y,
        color: (d) => d.cor
      }
    },
    ondblclick: function (event, d) {
      altera(d);
      map.setFlags($0.value, options.flags.options);
    }
  };
  const map = bubbleMap(posicoesMunicipios, options);
  d3.select(map).select("svg").call(tip);
  return map;
}


function _15(md){return(
md`<br>
## Implementação`
)}

function _TL(){return(
(d) => d
)}

function _colorVar(variaveis,colorSelect){return(
variaveis[colorSelect]
)}

function _escalaCores(d3,variaveis,colorSelect){return(
d3.scaleThreshold(
  variaveis[colorSelect].thresholds,
  variaveis[colorSelect].range
)
)}

function _data(getIndicadores,ano){return(
getIndicadores(ano)
)}

function _filteredData(data,filterDatum){return(
data.filter(filterDatum)
)}

function _indicadoresPorCodigo(filteredData){return(
new Map(filteredData.map((d) => [d.codigo, d]))
)}

function _biglayoutToggle(){return(
false
)}

function _filtrarPorRolldownToggle(){return(
false
)}

function _updateScatterConfig(biglayoutToggle,$0,filteredData,xAxisSelect,yAxisSelect,colorSelect,$1)
{
  let w = biglayoutToggle ? 496 : 286;
  $0.value.data = filteredData;
  $0.value.width = w;
  $0.value.height = (w * 3) / 4;
  $0.value.varx = xAxisSelect;
  $0.value.vary = yAxisSelect;
  $0.value.varcolor = colorSelect;
  $0.value.menuMunicipio = $1;
  $0.value = $0.value;
}


function _25(menuListener){return(
menuListener
)}

function _panel(mainWindow)
{
  let panel = {};
  for (let className of [
    "menuPrincipal",
    "indicadorChave",
    "rankingBarChart",
    "mapa",
    "scatterplot",
    "scatterplotBig",
    "filtrarPor",
    "filtrarPorSmall"
  ]) {
    let elem = mainWindow.querySelector(`div.${className}`);
    panel[className] = { elem, w: elem.clientWidth, h: elem.clientHeight };
  }
  return panel;
}


function _populate(panel,htl,$0,TL,$1,$2,legendaEscalaCores,biglayoutToggle,rankingBarChartContents,$3,$4,makeIcon,$5,scatterplotComponent,filtrarPorRolldownToggle,$6,$7,mapaMunicipio,mainWindow)
{
  //
  // Menu principal
  //
  panel.menuPrincipal.elem.innerHTML = "";
  panel.menuPrincipal.elem.append(
    htl.html`<div>${$0}<br><div style="margin-top:10px">${TL(
      "Selecione até 4 municípios com duplo clique nos gráficos"
    )}</div></div>`
  );
  $0.style.display = "inline";
  $0.style.paddingTop = "10px";

  const menuAno = htl.html`<div>${$1}`;
  panel.menuPrincipal.elem.append(menuAno);
  $1.style.display = "inline";

  //
  // Indicador chave
  //
  const indicadorChave = panel.indicadorChave;

  indicadorChave.elem.innerHTML = "";
  indicadorChave.elem.append(
    $2,
    htl.html`<br><br>`,
    legendaEscalaCores
  );

  //
  // Ranking / barchart
  //
  const rankingBarChart = panel.rankingBarChart;
  rankingBarChart.elem.innerHTML = "";
  if (!biglayoutToggle) {
    rankingBarChart.elem.append(rankingBarChartContents);
  }

  // Scatterplot
  const scatter = biglayoutToggle ? panel.scatterplotBig : panel.scatterplot;
  scatter.elem.innerHTML = "";

  $3.style.display = "inline-block";
  $3.style.marginBottom = "10px";
  $3.style.lineHeight = "15px";
  $4.style.display = "inline-block";
  $4.style.float = "right";
  $4.style.marginTop = "5px";
  $4.style.lineHeight = "15px";
  const relacionarExpandReduce = biglayoutToggle
    ? makeIcon.reduce()
    : makeIcon.enlarge();
  relacionarExpandReduce.style.marginLeft = "5px";
  relacionarExpandReduce.style.cursor = "pointer";
  relacionarExpandReduce.style.position = "absolute";
  relacionarExpandReduce.style.right = "10px";
  relacionarExpandReduce.style.top = "10px";
  relacionarExpandReduce.style.zIndex = 20;
  relacionarExpandReduce.onclick = () =>
    ($5.value = !$5.value);

  scatter.elem.append(
    relacionarExpandReduce,
    $3,
    scatterplotComponent,
    $4
  );

  //
  // Filtros
  //
  const filtrarPor = filtrarPorRolldownToggle
    ? panel.filtrarPor
    : panel.filtrarPorSmall;
  const filtrarPorDiv = htl.html`<div style = "display:flex; justify-content: space-between;margin-bottom:10px">`;
  const filtrarPorTitle = htl.html`<span style="display:inline">${TL(
    "FILTRAR POR"
  )}</span>`;
  const filtrarPorExpandReduce = filtrarPorRolldownToggle
    ? makeIcon.rollUp()
    : makeIcon.rollDown();
  filtrarPorDiv.onclick = () =>
    ($6.value = !$6.value);
  filtrarPorDiv.append(filtrarPorTitle, filtrarPorExpandReduce);
  filtrarPor.elem.innerHTML = "";
  filtrarPor.elem.append(filtrarPorDiv);
  if (filtrarPorRolldownToggle) filtrarPor.elem.append($7);

  //
  // O mapa
  //
  panel.mapa.elem.innerHTML = "";
  panel.mapa.elem.append(mapaMunicipio);

  //
  // Configura os paineis que serão visiveis
  //
  if (biglayoutToggle) {
    mainWindow.querySelector(`div.scatterplot`).style.display = "none";
    mainWindow.querySelector(`div.scatterplotBig`).style.display = "block";
    mainWindow.querySelector(`div.rankingBarChart`).style.display = "none";
  } else {
    mainWindow.querySelector(`div.scatterplotBig`).style.display = "none";
    mainWindow.querySelector(`div.scatterplot`).style.display = "block";
    mainWindow.querySelector(`div.rankingBarChart`).style.display = "block";
  }
  if (filtrarPorRolldownToggle) {
    mainWindow.querySelector(`div.filtrarPorSmall`).style.display = "none";
    mainWindow.querySelector(`div.filtrarPor`).style.display = "block";
  } else {
    mainWindow.querySelector(`div.filtrarPorSmall`).style.display = "block";
    mainWindow.querySelector(`div.filtrarPor`).style.display = "none";
  }
}


function _28(md){return(
md`<br>
## Bibliotecas`
)}

function _estilos(htl,toolTipStyles,stylesFilter,stylesRanking,stylesMenuLoc){return(
htl.html`${toolTipStyles}${stylesFilter}${stylesRanking}${stylesMenuLoc}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("mainWindow")).define("mainWindow", ["htl"], _mainWindow);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof munSelecionados")).define("viewof munSelecionados", ["menuLocalidade","flagColors"], _munSelecionados);
  main.variable(observer("munSelecionados")).define("munSelecionados", ["Generators", "viewof munSelecionados"], (G, _) => G.input(_));
  main.variable(observer("viewof colorSelect")).define("viewof colorSelect", ["aSelect","variaveis","TL"], _colorSelect);
  main.variable(observer("colorSelect")).define("colorSelect", ["Generators", "viewof colorSelect"], (G, _) => G.input(_));
  main.variable(observer("viewof xAxisSelect")).define("viewof xAxisSelect", ["aSelect","variaveis","TL"], _xAxisSelect);
  main.variable(observer("xAxisSelect")).define("xAxisSelect", ["Generators", "viewof xAxisSelect"], (G, _) => G.input(_));
  main.variable(observer("viewof yAxisSelect")).define("viewof yAxisSelect", ["aSelect","variaveis","TL"], _yAxisSelect);
  main.variable(observer("yAxisSelect")).define("yAxisSelect", ["Generators", "viewof yAxisSelect"], (G, _) => G.input(_));
  main.variable(observer("legendaEscalaCores")).define("legendaEscalaCores", ["Legend","escalaCores","TL","variaveis","colorSelect","d3"], _legendaEscalaCores);
  main.variable(observer("rankingBox")).define("rankingBox", ["makeRankingBox","filteredData","colorSelect","viewof munSelecionados"], _rankingBox);
  main.variable(observer("barchartVis")).define("barchartVis", ["makeBarchartVis","munSelecionados","colorSelect"], _barchartVis);
  main.variable(observer("rankingBarChartContents")).define("rankingBarChartContents", ["htl","visToggle","TL","colorVar","biglayoutToggle","makeIcon","mutable biglayoutToggle","rankingBox","viewof visToggle","barchartVis"], _rankingBarChartContents);
  main.variable(observer("scatterplotComponent")).define("scatterplotComponent", ["scatter"], _scatterplotComponent);
  main.variable(observer("mapaMunicipio")).define("mapaMunicipio", ["xAxisSelect","yAxisSelect","colorSelect","escalaCores","makeTooltipFunc","d3tip","alteraMenuLocalidade","viewof munSelecionados","panel","indicadoresPorCodigo","posicaoPorCodigo","bubbleMap","posicoesMunicipios","d3"], _mapaMunicipio);
  main.variable(observer()).define(["md"], _15);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("colorVar")).define("colorVar", ["variaveis","colorSelect"], _colorVar);
  main.variable(observer("escalaCores")).define("escalaCores", ["d3","variaveis","colorSelect"], _escalaCores);
  main.variable(observer("data")).define("data", ["getIndicadores","ano"], _data);
  main.variable(observer("filteredData")).define("filteredData", ["data","filterDatum"], _filteredData);
  main.variable(observer("indicadoresPorCodigo")).define("indicadoresPorCodigo", ["filteredData"], _indicadoresPorCodigo);
  main.define("initial biglayoutToggle", _biglayoutToggle);
  main.variable(observer("mutable biglayoutToggle")).define("mutable biglayoutToggle", ["Mutable", "initial biglayoutToggle"], (M, _) => new M(_));
  main.variable(observer("biglayoutToggle")).define("biglayoutToggle", ["mutable biglayoutToggle"], _ => _.generator);
  main.define("initial filtrarPorRolldownToggle", _filtrarPorRolldownToggle);
  main.variable(observer("mutable filtrarPorRolldownToggle")).define("mutable filtrarPorRolldownToggle", ["Mutable", "initial filtrarPorRolldownToggle"], (M, _) => new M(_));
  main.variable(observer("filtrarPorRolldownToggle")).define("filtrarPorRolldownToggle", ["mutable filtrarPorRolldownToggle"], _ => _.generator);
  main.variable(observer("updateScatterConfig")).define("updateScatterConfig", ["biglayoutToggle","mutable scatterConfig","filteredData","xAxisSelect","yAxisSelect","colorSelect","viewof munSelecionados"], _updateScatterConfig);
  main.variable(observer()).define(["menuListener"], _25);
  main.variable(observer("panel")).define("panel", ["mainWindow"], _panel);
  main.variable(observer("populate")).define("populate", ["panel","htl","viewof munSelecionados","TL","viewof ano","viewof colorSelect","legendaEscalaCores","biglayoutToggle","rankingBarChartContents","viewof yAxisSelect","viewof xAxisSelect","makeIcon","mutable biglayoutToggle","scatterplotComponent","filtrarPorRolldownToggle","mutable filtrarPorRolldownToggle","viewof filtersUI","mapaMunicipio","mainWindow"], _populate);
  main.variable(observer()).define(["md"], _28);
  const child1 = runtime.module(define1);
  main.import("menuLocalidade", child1);
  main.import("municipios", child1);
  main.import("flagColors", child1);
  main.import("alteraMenuLocalidade", child1);
  main.import("styles", "stylesMenuLoc", child1);
  const child2 = runtime.module(define2);
  main.import("viewof ano", child2);
  main.import("ano", child2);
  main.import("viewof filtersUI", child2);
  main.import("filtersUI", child2);
  main.import("filterDatum", child2);
  main.import("aSelect", child2);
  main.import("aText", child2);
  main.import("styles", "stylesFilter", child2);
  const child3 = runtime.module(define3);
  main.import("getIndicadores", child3);
  main.import("variaveis", child3);
  const child4 = runtime.module(define4);
  main.import("makeRankingBox", child4);
  main.import("styles", "stylesRanking", child4);
  const child5 = runtime.module(define5);
  main.import("viewof visToggle", child5);
  main.import("visToggle", child5);
  main.import("makeBarchartVis", child5);
  const child6 = runtime.module(define6);
  main.import("scatter", child6);
  main.import("mutable scatterConfig", child6);
  main.import("scatterConfig", child6);
  main.import("menuListener", child6);
  const child7 = runtime.module(define7);
  main.import("makeIcon", child7);
  const child8 = runtime.module(define8);
  main.import("Legend", child8);
  const child9 = runtime.module(define9);
  main.import("bubbleMap", child9);
  main.import("posicoesMunicipios", child9);
  main.import("posicaoPorCodigo", child9);
  main.import("makeTooltipFunc", child9);
  main.import("d3tip", child9);
  main.import("toolTipStyles", child9);
  main.variable(observer("estilos")).define("estilos", ["htl","toolTipStyles","stylesFilter","stylesRanking","stylesMenuLoc"], _estilos);
  return main;
}
