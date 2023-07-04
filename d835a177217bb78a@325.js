import define1 from "./197c2c16ae942e60@370.js";
import define2 from "./b95f17ec584a2b2b@290.js";
import define3 from "./a33468b95d0b15b0@808.js";
import define4 from "./d4a4b18562e2e145@26.js";

function _1(md){return(
md`# Scatterplot Hanseniase`
)}

function _munSelecionados(menuLocalidade,TL,flagColors){return(
menuLocalidade({
  placeholder: TL("Adicione um local"),
  value: ["RIO DE JANEIRO"],
  cores: flagColors
})
)}

function _ano(Inputs){return(
Inputs.range([2001, 2022], { label: "ano", step: 1, value: 2022 })
)}

function _variables(Inputs,variaveis){return(
Inputs.form({
  x: Inputs.select(Object.keys(variaveis), {
    label: "x",
    value: "cn",
    format: (d) => variaveis[d].name
  }),
  y: Inputs.select(Object.keys(variaveis), {
    label: "y",
    value: "cn_crianca",
    format: (d) => variaveis[d].name
  }),
  color: Inputs.select(Object.keys(variaveis), {
    label: "color",
    value: "cn_gif_2",
    format: (d) => variaveis[d].name
  })
})
)}

function _colorLegend(Legend,colorScale,TL,variaveis,variables){return(
Legend(colorScale, {
  width: 300,
  title: TL(variaveis[variables.color].label)
})
)}

function _6(htl,$0,noRange)
{
  const button = htl.html`<button>reset window`;
  button.onclick = () => {
    $0.value = noRange;
  };
  return button;
}


function _scatter(dblClickInteraction,applyDotAnimation,rectSelect,scatterPlot,scatterData,flagsData,scatterConfig,TL,variaveis,colorScale,getNomeMunicipio,$0,alteraMenuLocalidade,htl,dataRange,makeIcon,noRange)
{
  const plot = dblClickInteraction(
    applyDotAnimation(
      rectSelect(
        scatterPlot(scatterData, flagsData, {
          width: scatterConfig.width,
          height: scatterConfig.height,
          xlabel: TL(variaveis[scatterConfig.varx].label),
          ylabel: TL(variaveis[scatterConfig.vary].label),
          color: (d) => colorScale(d[scatterConfig.varcolor]),
          flagColor: (d, i) =>
            scatterConfig.menuMunicipio.value.find(
              ({ cod }) => +cod == d.codigo
            ).cor,
          title: (d) =>
            getNomeMunicipio(d.codigo) +
            ` (${d.codigo})` +
            `\n${TL("População")}: ${d.pop}` +
            `\n${TL("Casos")}: ${d.total}` +
            `\n${TL("Casos novos")}: ${d.total_cn}` +
            `\n${TL(variaveis[scatterConfig.varx].label)}: ${d.x.toFixed(2)}` +
            `\n${TL(variaveis[scatterConfig.vary].label)}: ${d.y.toFixed(2)}` +
            `\n${TL(
              variaveis[scatterConfig.varcolor].label
            )}: ${d.color.toFixed(2)}`
        }),
        (range) => {
          $0.value = range;
        }
      ),
      [scatterData, flagsData]
    ),
    [scatterData, flagsData],
    alteraMenuLocalidade(scatterConfig.menuMunicipio)
  );

  const container = htl.html`<div>`;
  container.style.maxWidth = scatterConfig.width + "px";
  container.style.position = "relative";
  container.append(plot);

  if (dataRange.xmin != -Infinity) {
    const clearButton = makeIcon.clear();
    container.append(clearButton);
    clearButton.style.position = "absolute";
    clearButton.style.right = "30px";
    clearButton.style.top = "30px";
    clearButton.onclick = () => {
      $0.value = noRange;
    };
  }
  return container;
}


function _scatterConfig(getIndicadores,ano,variables,$0){return(
{
  data: getIndicadores(ano),
  varx: variables.x,
  vary: variables.y,
  varcolor: variables.color,
  width: 500,
  height: 400,
  menuMunicipio: $0
}
)}

function _9(md){return(
md`<br>
## Imports`
)}

function _12(stylesMenuLoc){return(
stylesMenuLoc
)}

function _15(md){return(
md`<br>
## Implementação`
)}

function _TL(){return(
function (text) {
  return text;
}
)}

function _flagDraw()
{
  const bias = 0.6;
  const tall = 1.8;
  return (ctx, size) => {
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      0,
      -size * bias,
      -size,
      -size * (tall - bias),
      -size,
      -size * tall
    );
    ctx.bezierCurveTo(
      -size,
      -size * (tall + bias),
      -size * bias,
      -size * (1 + tall),
      0,
      -size * (1 + tall)
    );
    ctx.bezierCurveTo(
      size * bias,
      -size * (1 + tall),
      size,
      -size * (tall + bias),
      size,
      -size * tall
    );
    ctx.bezierCurveTo(size, -size * (tall - bias), 0, -size * bias, 0, 0);
  };
}


function _scatterPlot(Plot,flagDraw){return(
function scatterPlot(data, flagData, options = {}) {
  const {
    width = 600,
    height = 400,
    xlabel = "",
    ylabel = "",
    title = () => "",
    color = "color",
    flagColor = "color",
    fontFamily = "Roboto Condensed",
    fontSize = 11
  } = options;
  let marks = [
    Plot.dot(data, {
      x: "x",
      y: "y",
      title: title,
      fill: color,
      stroke: "rgba(0,0,0,0.1)"
    }),
    Plot.dot(flagData, {
      x: "x",
      y: "y",
      symbol: { draw: flagDraw },
      title,
      stroke: "currentColor",
      fill: flagColor,
      r: 1.7,
      strokeWidth: 1
    })
  ];
  const plot = Plot.plot({
    width,
    height,
    marginBottom: 40,
    x: {
      line: true,
      ticks: 10,
      label: xlabel
    },
    y: {
      line: true,
      label: ylabel
    },
    marks
  });
  plot.style.fontFamily = fontFamily;
  plot.style.fontSize = fontSize;
  plot.style.userSelect = "none";

  return plot;
}
)}

function _filterAndRename(noRange){return(
function filterAndRename(data, xvar, yvar, colorvar, range = noRange) {
  let result = [];
  for (let row of data) {
    let obj = { x: row[xvar], y: row[yvar], color: row[colorvar] };
    if (
      obj.x < range.xmin ||
      obj.x > range.xmax ||
      obj.y < range.ymin ||
      obj.y > range.ymax
    )
      continue;
    Object.assign(obj, row);
    result.push(obj);
  }
  return result;
}
)}

function _noRange(){return(
{ xmin: -Infinity, ymin: -Infinity, xmax: Infinity, ymax: Infinity }
)}

function _dataRange(noRange){return(
noRange
)}

function _data(scatterConfig){return(
scatterConfig.data
)}

function _scatterData(filterAndRename,data,scatterConfig,dataRange){return(
filterAndRename(
  data,
  scatterConfig.varx,
  scatterConfig.vary,
  scatterConfig.varcolor,
  dataRange
)
)}

function _menuMunicipioChanged(){return(
0
)}

function _menuListener(scatterConfig,$0)
{
  scatterConfig.menuMunicipio.addEventListener("input", (d) => {
    $0.value += 1;
  });
}


function _flagsData(menuMunicipioChanged,scatterConfig,scatterData)
{
  menuMunicipioChanged;
  const codigos = new Set(scatterConfig.menuMunicipio.value.map((d) => +d.cod));
  return scatterData.filter((d) => codigos.has(d.codigo));
}


function _colorScale(makeColorScale,variaveis,variables){return(
makeColorScale(variaveis[variables.color])
)}

function _makeColorScale(d3){return(
function makeColorScale(varInfo) {
  return d3.scaleThreshold(varInfo.thresholds, varInfo.range);
}
)}

function _rectSelect(d3){return(
function (plotElement, selFunction) {
  const xscale = plotElement.scale("x");
  const yscale = plotElement.scale("y");
  const rect = {};
  const svg = d3.select(plotElement).style("user-select", "none");

  plotElement.onmousedown = (e) => {
    rect.x0 = rect.x1 = e.offsetX;
    rect.y0 = rect.y1 = e.offsetY;
    rect.dx = rect.dy = 0;
    rect.sel = svg.append("rect").attr("fill", "rgba(0,0,0,0.2)");
  };
  plotElement.onmousemove = (e) => {
    if (!e.buttons) return;
    [rect.x1, rect.y1] = [e.offsetX, e.offsetY];
    rect.dx = Math.abs(rect.x1 - rect.x0);
    rect.dy = Math.abs(rect.y1 - rect.y0);
    rect.x = Math.min(rect.x0, rect.x1);
    rect.y = Math.min(rect.y0, rect.y1);
    rect.sel.attr("x", rect.x);
    rect.sel.attr("y", rect.y);
    rect.sel.attr("width", rect.dx);
    rect.sel.attr("height", rect.dy);
  };
  plotElement.onmouseup = (e) => {
    rect.sel.remove();
    if (rect.dx > 2 && rect.dy > 2) {
      selFunction({
        xmin: Math.min(xscale.invert(rect.x0), xscale.invert(rect.x1)),
        xmax: Math.max(xscale.invert(rect.x0), xscale.invert(rect.x1)),
        ymin: Math.min(yscale.invert(rect.y0), yscale.invert(rect.y1)),
        ymax: Math.max(yscale.invert(rect.y0), yscale.invert(rect.y1))
      });
    }
  };
  return plotElement;
}
)}

function _applyDotAnimation(d3)
{
  let oldDataMap = [];
  return function (plotElement, datasets, options = {}) {
    let { joinKey = (d) => d.codigo } = options;
    let dataMap = datasets.map((dataset, i) => ({
      dataset,
      map: new Map(),
      oldMap: oldDataMap[i] ? oldDataMap[i].map : new Map()
    }));
    d3.select(plotElement)
      .selectAll("g[aria-label=dot]")
      .each(function (_, markGroupIndex) {
        const markGroup = d3.select(this);
        const { dataset, map, oldMap } = dataMap[markGroupIndex];
        markGroup.selectAll("circle").each(function (_, circleIndex) {
          let circle = d3.select(this);
          let key = joinKey(dataset[circleIndex]);
          let newPos = {
            cx: +circle.attr("cx"),
            cy: +circle.attr("cy")
          };
          map.set(key, newPos);
          if (oldMap.has(key)) {
            const oldPos = oldMap.get(key);
            circle.attr("cx", oldPos.cx);
            circle.attr("newcx", newPos.cx);
            circle.attr("cy", oldPos.cy);
            circle.attr("newcy", newPos.cy);
          }
        });
      });
    d3.select(plotElement)
      .selectAll("circle[newcx]")
      .transition()
      .duration(1500)
      .attr("cx", function () {
        return d3.select(this).attr("newcx");
      })
      .attr("cy", function () {
        return d3.select(this).attr("newcy");
      });
    oldDataMap = dataMap;
    return plotElement;
  };
}


function _dblClickInteraction(d3){return(
function dblClickInteraction(plotElement, datasets, func) {
  d3.select(plotElement)
    .selectAll("g[aria-label=dot]")
    .each(function (_, markGroupIndex) {
      const dataset = datasets[markGroupIndex];
      const markGroup = d3.select(this);
      markGroup.selectAll("*").on("dblclick", (d, i) => func(dataset[i]));
    });
  return plotElement;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof munSelecionados")).define("viewof munSelecionados", ["menuLocalidade","TL","flagColors"], _munSelecionados);
  main.variable(observer("munSelecionados")).define("munSelecionados", ["Generators", "viewof munSelecionados"], (G, _) => G.input(_));
  main.variable(observer("viewof ano")).define("viewof ano", ["Inputs"], _ano);
  main.variable(observer("ano")).define("ano", ["Generators", "viewof ano"], (G, _) => G.input(_));
  main.variable(observer("viewof variables")).define("viewof variables", ["Inputs","variaveis"], _variables);
  main.variable(observer("variables")).define("variables", ["Generators", "viewof variables"], (G, _) => G.input(_));
  main.variable(observer("colorLegend")).define("colorLegend", ["Legend","colorScale","TL","variaveis","variables"], _colorLegend);
  main.variable(observer()).define(["htl","mutable dataRange","noRange"], _6);
  main.variable(observer("scatter")).define("scatter", ["dblClickInteraction","applyDotAnimation","rectSelect","scatterPlot","scatterData","flagsData","scatterConfig","TL","variaveis","colorScale","getNomeMunicipio","mutable dataRange","alteraMenuLocalidade","htl","dataRange","makeIcon","noRange"], _scatter);
  main.define("initial scatterConfig", ["getIndicadores","ano","variables","viewof munSelecionados"], _scatterConfig);
  main.variable(observer("mutable scatterConfig")).define("mutable scatterConfig", ["Mutable", "initial scatterConfig"], (M, _) => new M(_));
  main.variable(observer("scatterConfig")).define("scatterConfig", ["mutable scatterConfig"], _ => _.generator);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("getPop", child1);
  main.import("getNomeMunicipio", child1);
  main.import("getIndicadores", child1);
  main.import("variaveis", child1);
  main.import("mutable resumoAno", child1);
  main.import("resumoAno", child1);
  const child2 = runtime.module(define2);
  main.import("menuLocalidade", child2);
  main.import("municipios", child2);
  main.import("flagColors", child2);
  main.import("alteraMenuLocalidade", child2);
  main.import("styles", "stylesMenuLoc", child2);
  main.variable(observer()).define(["stylesMenuLoc"], _12);
  const child3 = runtime.module(define3);
  main.import("Legend", child3);
  const child4 = runtime.module(define4);
  main.import("makeIcon", child4);
  main.variable(observer()).define(["md"], _15);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("flagDraw")).define("flagDraw", _flagDraw);
  main.variable(observer("scatterPlot")).define("scatterPlot", ["Plot","flagDraw"], _scatterPlot);
  main.variable(observer("filterAndRename")).define("filterAndRename", ["noRange"], _filterAndRename);
  main.variable(observer("noRange")).define("noRange", _noRange);
  main.define("initial dataRange", ["noRange"], _dataRange);
  main.variable(observer("mutable dataRange")).define("mutable dataRange", ["Mutable", "initial dataRange"], (M, _) => new M(_));
  main.variable(observer("dataRange")).define("dataRange", ["mutable dataRange"], _ => _.generator);
  main.variable(observer("data")).define("data", ["scatterConfig"], _data);
  main.variable(observer("scatterData")).define("scatterData", ["filterAndRename","data","scatterConfig","dataRange"], _scatterData);
  main.define("initial menuMunicipioChanged", _menuMunicipioChanged);
  main.variable(observer("mutable menuMunicipioChanged")).define("mutable menuMunicipioChanged", ["Mutable", "initial menuMunicipioChanged"], (M, _) => new M(_));
  main.variable(observer("menuMunicipioChanged")).define("menuMunicipioChanged", ["mutable menuMunicipioChanged"], _ => _.generator);
  main.variable(observer("menuListener")).define("menuListener", ["scatterConfig","mutable menuMunicipioChanged"], _menuListener);
  main.variable(observer("flagsData")).define("flagsData", ["menuMunicipioChanged","scatterConfig","scatterData"], _flagsData);
  main.variable(observer("colorScale")).define("colorScale", ["makeColorScale","variaveis","variables"], _colorScale);
  main.variable(observer("makeColorScale")).define("makeColorScale", ["d3"], _makeColorScale);
  main.variable(observer("rectSelect")).define("rectSelect", ["d3"], _rectSelect);
  main.variable(observer("applyDotAnimation")).define("applyDotAnimation", ["d3"], _applyDotAnimation);
  main.variable(observer("dblClickInteraction")).define("dblClickInteraction", ["d3"], _dblClickInteraction);
  return main;
}
