import define1 from "./197c2c16ae942e60@382.js";
import define2 from "./b02783c63cc0070b@251.js";
import define3 from "./d835a177217bb78a@331.js";

function _1(md){return(
md`# Bar Chart Hanseníase`
)}

function _munSelecionados(menuLocalidade,TL,flagColors){return(
menuLocalidade({
  placeholder: TL("Adicione um local"),
  value: ["RIO DE JANEIRO"],
  cores: flagColors
})
)}

function _variable(Inputs,variaveis){return(
Inputs.select(Object.keys(variaveis), {
  label: "indicador",
  value: "cn",
  format: (d) => variaveis[d].labelBarChart
})
)}

function _4(makeBarchartVis,munSelecionados,variable){return(
makeBarchartVis(munSelecionados, variable, { width: 300 })
)}

function _5(md){return(
md`<br>
## Imports`
)}

function _9(md){return(
md`<br>
## Implementação`
)}

function _TL(){return(
function (text) {
  return text;
}
)}

function _seriesIndicador(d3,getIndicadores){return(
function seriesIndicador(codigos, indicador = "cn") {
  const anos = d3.range(2001, 2023);
  const filtroCodigos = (codigo) => codigos.indexOf(codigo) >= 0;
  const series = [];
  for (let ano of anos) {
    for (let row of getIndicadores(ano, filtroCodigos)) {
      const obj = { ano, codigo: row.codigo, valor: row[indicador] };
      series.push(obj);
    }
  }
  return series;
}
)}

function _makeBarchartVis(seriesIndicador,svg,barChart,htl){return(
function makeBarchartVis(munSelecionados, variable = "cn", options = {}) {
  const { width = 300, height = 300 } = options;
  const codigos = munSelecionados.map((mun) => +mun.cod);
  const data = seriesIndicador(codigos, variable);
  const container = svg`<svg width=${width} height=${height} >`;
  const n = munSelecionados.length;
  const [rows, cols] = [
    [1, 1],
    [2, 1],
    [2, 2],
    [2, 2]
  ][n - 1];
  const [w, h] = [width / cols, height / rows];
  const xlabelfreq = cols > 1 ? 6 : 4;
  const domain = [0, Math.max(...data.map((d) => d.valor))];
  for (let i = 0; i < n; i++) {
    const col = ~~(i / 2);
    const row = i % 2;
    const chart = barChart(
      data.filter((d) => d.codigo == codigos[i]),
      {
        title: munSelecionados[i].nome,
        color: munSelecionados[i].cor,
        domain,
        xlabelfreq,
        width: w,
        height: h
      }
    );
    const group = htl.svg`<g transform=translate(${col * w},${
      row * h
    }) >${chart}</g>`;
    container.append(group);
  }
  return container;
}
)}

function _barChart(Plot,d3,svg){return(
function barChart(serie, options = {}) {
  const {
    domain = undefined,
    width = 400,
    height = 300,
    color = "green",
    title = "Título",
    xlabelfreq = 4
  } = options;
  let chart = Plot.plot({
    y: {
      grid: true,
      tickSize: 0,
      tickPadding: 3,
      label: "",
      domain
    },
    x: {
      tickSize: 0,
      label: "",
      domain: d3.range(2001, 2023),
      tickPadding: 4,
      tickFormat: (d, i) => (i % xlabelfreq == 0 ? `${d}` : "")
    },
    width,
    height,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 5,
    marginBottom: 15,
    marks: [
      Plot.barY(serie, {
        x: "ano",
        y: "valor",
        fill: color
      })
    ]
  });
  let titleElement = svg`<text x=25 y=20>${title}`;
  titleElement.style = `
    font-family: Roboto Condensed;
    font-size: 10px;
    text-anchor: start;
    font-weight: 700;
    line-height: 11px;
    letter-spacing: 0em;
    text-align: left;
  `;
  chart.append(titleElement);
  chart.style = `
    font-family: Roboto Condensed;
    display:inline-block;
    user-select: none;
    border : 1px solid gray;
  `;
  return chart;
}
)}

function _14(md){return(
md`## Vis Toggle`
)}

function _visToggle(visToggleInput){return(
visToggleInput()
)}

function _16(visToggle){return(
visToggle
)}

function _visToggleInput(htl,barChartSelected,rankingSelected){return(
() => {
  const container = htl.html`<div class=visToggle>`;
  container.style = `
    display:inline-block;
    vertical-align: middle;
    line-height:0;
  `;
  container.value = "barchart";
  let picture = barChartSelected();
  container.append(picture);
  container.onclick = () => {
    container.removeChild(picture);
    if (container.value == "ranking") {
      container.value = "barchart";
      picture = barChartSelected();
    } else {
      container.value = "ranking";
      picture = rankingSelected();
    }
    container.append(picture);
    container.dispatchEvent(new CustomEvent("input"));
  };
  return container;
}
)}

function _rankingSelected(htl){return(
() => htl.svg`<svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="52" height="24" rx="4" fill="#151472"/>
<rect x="2" y="2" width="24" height="20" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.40078C8 8.06941 8.26863 7.80078 8.6 7.80078H8.606C8.93737 7.80078 9.206 8.06941 9.206 8.40078C9.206 8.73215 8.93737 9.00078 8.606 9.00078H8.6C8.26863 9.00078 8 8.73215 8 8.40078ZM11 8.40078C11 8.06941 11.2686 7.80078 11.6 7.80078H19.4C19.7314 7.80078 20 8.06941 20 8.40078C20 8.73215 19.7314 9.00078 19.4 9.00078H11.6C11.2686 9.00078 11 8.73215 11 8.40078ZM8 12.0008C8 11.6694 8.26863 11.4008 8.6 11.4008H8.606C8.93737 11.4008 9.206 11.6694 9.206 12.0008C9.206 12.3322 8.93737 12.6008 8.606 12.6008H8.6C8.26863 12.6008 8 12.3322 8 12.0008ZM11 12.0008C11 11.6694 11.2686 11.4008 11.6 11.4008H19.4C19.7314 11.4008 20 11.6694 20 12.0008C20 12.3322 19.7314 12.6008 19.4 12.6008H11.6C11.2686 12.6008 11 12.3322 11 12.0008ZM8 15.6008C8 15.2694 8.26863 15.0008 8.6 15.0008H8.606C8.93737 15.0008 9.206 15.2694 9.206 15.6008C9.206 15.9322 8.93737 16.2008 8.606 16.2008H8.6C8.26863 16.2008 8 15.9322 8 15.6008ZM11 15.6008C11 15.2694 11.2686 15.0008 11.6 15.0008H19.4C19.7314 15.0008 20 15.2694 20 15.6008C20 15.9322 19.7314 16.2008 19.4 16.2008H11.6C11.2686 16.2008 11 15.9322 11 15.6008Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.975 17C32.6298 17 32.35 16.7202 32.35 16.375L32.35 11.625C32.35 11.2798 32.6298 11 32.975 11C33.3202 11 33.6 11.2798 33.6 11.625L33.6 16.375C33.6 16.7202 33.3202 17 32.975 17Z" fill="#E5E5E5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M36.3251 17C35.9799 17 35.7001 16.7202 35.7001 16.375L35.7001 7.625C35.7001 7.27982 35.9799 7 36.3251 7C36.6703 7 36.9501 7.27982 36.9501 7.625L36.9501 16.375C36.9501 16.7202 36.6703 17 36.3251 17Z" fill="#E5E5E5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39.6752 17C39.33 17 39.0502 16.7202 39.0502 16.375L39.0502 9.625C39.0502 9.27982 39.33 9 39.6752 9C40.0203 9 40.3002 9.27982 40.3002 9.625L40.3002 16.375C40.3002 16.7202 40.0203 17 39.6752 17Z" fill="#E5E5E5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.0253 17C42.6801 17 42.4003 16.7202 42.4003 16.375L42.4003 14.625C42.4003 14.2798 42.6801 14 43.0253 14C43.3704 14 43.6503 14.2798 43.6503 14.625L43.6503 16.375C43.6503 16.7202 43.3704 17 43.0253 17Z" fill="#E5E5E5"/>
</svg>`
)}

function _barChartSelected(htl){return(
() => htl.svg`<svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="52" height="24" rx="4" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.40078C8 8.06941 8.26863 7.80078 8.6 7.80078H8.606C8.93737 7.80078 9.206 8.06941 9.206 8.40078C9.206 8.73215 8.93737 9.00078 8.606 9.00078H8.6C8.26863 9.00078 8 8.73215 8 8.40078ZM11 8.40078C11 8.06941 11.2686 7.80078 11.6 7.80078H19.4C19.7314 7.80078 20 8.06941 20 8.40078C20 8.73215 19.7314 9.00078 19.4 9.00078H11.6C11.2686 9.00078 11 8.73215 11 8.40078ZM8 12.0008C8 11.6694 8.26863 11.4008 8.6 11.4008H8.606C8.93737 11.4008 9.206 11.6694 9.206 12.0008C9.206 12.3322 8.93737 12.6008 8.606 12.6008H8.6C8.26863 12.6008 8 12.3322 8 12.0008ZM11 12.0008C11 11.6694 11.2686 11.4008 11.6 11.4008H19.4C19.7314 11.4008 20 11.6694 20 12.0008C20 12.3322 19.7314 12.6008 19.4 12.6008H11.6C11.2686 12.6008 11 12.3322 11 12.0008ZM8 15.6008C8 15.2694 8.26863 15.0008 8.6 15.0008H8.606C8.93737 15.0008 9.206 15.2694 9.206 15.6008C9.206 15.9322 8.93737 16.2008 8.606 16.2008H8.6C8.26863 16.2008 8 15.9322 8 15.6008ZM11 15.6008C11 15.2694 11.2686 15.0008 11.6 15.0008H19.4C19.7314 15.0008 20 15.2694 20 15.6008C20 15.9322 19.7314 16.2008 19.4 16.2008H11.6C11.2686 16.2008 11 15.9322 11 15.6008Z" fill="#E5E5E5"/>
<rect x="26" y="2" width="24" height="20" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.975 17C32.6298 17 32.35 16.7202 32.35 16.375L32.35 11.625C32.35 11.2798 32.6298 11 32.975 11C33.3202 11 33.6 11.2798 33.6 11.625L33.6 16.375C33.6 16.7202 33.3202 17 32.975 17Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M36.3251 17C35.9799 17 35.7001 16.7202 35.7001 16.375L35.7001 7.625C35.7001 7.27982 35.9799 7 36.3251 7C36.6703 7 36.9501 7.27982 36.9501 7.625L36.9501 16.375C36.9501 16.7202 36.6703 17 36.3251 17Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39.6752 17C39.33 17 39.0502 16.7202 39.0502 16.375L39.0502 9.625C39.0502 9.27982 39.33 9 39.6752 9C40.0203 9 40.3002 9.27982 40.3002 9.625L40.3002 16.375C40.3002 16.7202 40.0203 17 39.6752 17Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.0253 17C42.6801 17 42.4003 16.7202 42.4003 16.375L42.4003 14.625C42.4003 14.2798 42.6801 14 43.0253 14C43.3704 14 43.6503 14.2798 43.6503 14.625L43.6503 16.375C43.6503 16.7202 43.3704 17 43.0253 17Z" fill="#151472"/>
</svg>`
)}

function _20(htl){return(
htl.html`<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof munSelecionados")).define("viewof munSelecionados", ["menuLocalidade","TL","flagColors"], _munSelecionados);
  main.variable(observer("munSelecionados")).define("munSelecionados", ["Generators", "viewof munSelecionados"], (G, _) => G.input(_));
  main.variable(observer("viewof variable")).define("viewof variable", ["Inputs","variaveis"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer()).define(["makeBarchartVis","munSelecionados","variable"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("getPop", child1);
  main.import("getNomeMunicipio", child1);
  main.import("getIndicadores", child1);
  main.import("variaveis", child1);
  const child2 = runtime.module(define2);
  main.import("menuLocalidade", child2);
  main.import("municipios", child2);
  const child3 = runtime.module(define3);
  main.import("flagColors", child3);
  main.variable(observer()).define(["md"], _9);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("seriesIndicador")).define("seriesIndicador", ["d3","getIndicadores"], _seriesIndicador);
  main.variable(observer("makeBarchartVis")).define("makeBarchartVis", ["seriesIndicador","svg","barChart","htl"], _makeBarchartVis);
  main.variable(observer("barChart")).define("barChart", ["Plot","d3","svg"], _barChart);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof visToggle")).define("viewof visToggle", ["visToggleInput"], _visToggle);
  main.variable(observer("visToggle")).define("visToggle", ["Generators", "viewof visToggle"], (G, _) => G.input(_));
  main.variable(observer()).define(["visToggle"], _16);
  main.variable(observer("visToggleInput")).define("visToggleInput", ["htl","barChartSelected","rankingSelected"], _visToggleInput);
  main.variable(observer("rankingSelected")).define("rankingSelected", ["htl"], _rankingSelected);
  main.variable(observer("barChartSelected")).define("barChartSelected", ["htl"], _barChartSelected);
  main.variable(observer()).define(["htl"], _20);
  return main;
}
