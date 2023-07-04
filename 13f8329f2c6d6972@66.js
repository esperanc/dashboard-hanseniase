import define1 from "./197c2c16ae942e60@370.js";
import define2 from "./b95f17ec584a2b2b@290.js";

function _1(md){return(
md`# Tooltip Hanseníase`
)}

function _2(html,ttip,indicadoresPorCodigo){return(
html`${ttip(indicadoresPorCodigo.get(211230))}`
)}

function _indicadoresPorCodigo(getIndicadoresPorCodigo){return(
getIndicadoresPorCodigo(2020)
)}

function _ttip(makeTooltipFunc){return(
makeTooltipFunc(["cn", "cn_crianca", "cn_gif_2"])
)}

function _5(md){return(
md`<br>
## Imports`
)}

function _8(md){return(
md`<br>
## Implementação`
)}

function _TL(){return(
function (text) {
  return text;
}
)}

function _toolTipStyles(html){return(
html`
  <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

  div.tooltip {
    font-family: 'Roboto Condensed';
    background: white;
    border-radius: 8px;
    box-shadow: 1px 1px 5px gray;
    display: block;
    padding: 12px;
    padding-right: 6px;
    display:block;
    min-height: 100px;
    width:224px;
    color: #151472;
    z-index:11;
    margin-bottom: 15px;
    white-space: normal;
  }

  div.tooltip p {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    color: #000;
    text-transform: lowercase;
  }

  div.tooltip p span.title {
      text-transform: capitalize;
      white-space:nowrap;
    }


  div.tooltip p span.value {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    color: #000;
    float: right;
    white-space:nowrap;
    margin-right: 6px;
  }

  div.tooltip p span.label {
    font-weight: 400;
    font-size: 10px;
    color: #A1A1A1;
    white-space:nowrap; 
    margin-left: 4px;
    text-transform:
  }

  div.tooltip h1 span {
    font-weight: 400;
  }

  div.tooltip h1 {
    font-size: 14px;
    color: #151472;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 16px;
  }


  div.tooltip h2 {
    font-size: 10px;
    font-weight: 400;
    color: #151472;
    line-height: 11px;
    margin-bottom: 16px;
  }
  
  table {
    width: 100%; 
    height: 4px;
    margin-left: -4px;
    margin-right: -6px;
    border-collapse: collapse;
    margin-top: -6px;
    margin-bottom: -1px;
  }

  th, td {
  	border: 1px solid white;
    border-collapse: collapse;
    width: 20%;
  }
  
  tr {
    background-color: #E5E5E5;
    height: 4px;
  }

  .clicked {
    stroke: black;
    stroke-width: 2px;
  }
</style>`
)}

function _ttipScale(d3,html,TL){return(
(value, varInfo) => {
  const scale = d3.scaleThreshold(varInfo.thresholds, varInfo.range);
  const color = scale(value);
  const nthChild = (scale.range().indexOf(color) + 1).toString();
  var table = html`<p><span class="title">${TL(
    varInfo.name
  )}</span><span class="label">${
    varInfo.labelTooltip
  }</span><span class="value">${d3
    .format(".3r")(value)
    .replace(/\./g, ",")}</span></p>
<table>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>`;
  d3.select(table)
    .selectAll("td:nth-child(" + nthChild + ")")
    .style("background", color);
  return table.outerHTML;
}
)}

function _makeTooltipFunc(d3,municipioPorCodigo,TL,ttipScale,variaveis){return(
(fields) => {
  const num = d3.format(",");
  return (dado) => {
    const mun = municipioPorCodigo.get(+dado.codigo);
    return `
      <div class="tooltip">
      <h1>${mun.nome} <span>${mun.uf}</span></h1>
      <h2>${num(dado.pop).replace(/,/g, ".")} ${TL("habitantes")}</h2>
      ${ttipScale(dado[fields[0]], variaveis[fields[0]])}
      ${ttipScale(dado[fields[1]], variaveis[fields[1]])}
      ${ttipScale(dado[fields[2]], variaveis[fields[2]])}
      </div>
    `;
  };
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","ttip","indicadoresPorCodigo"], _2);
  main.variable(observer("indicadoresPorCodigo")).define("indicadoresPorCodigo", ["getIndicadoresPorCodigo"], _indicadoresPorCodigo);
  main.variable(observer("ttip")).define("ttip", ["makeTooltipFunc"], _ttip);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("variaveis", child1);
  main.import("getIndicadoresPorCodigo", child1);
  const child2 = runtime.module(define2);
  main.import("menuLocalidade", child2);
  main.import("municipioPorCodigo", child2);
  main.variable(observer()).define(["md"], _8);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("toolTipStyles")).define("toolTipStyles", ["html"], _toolTipStyles);
  main.variable(observer("ttipScale")).define("ttipScale", ["d3","html","TL"], _ttipScale);
  main.variable(observer("makeTooltipFunc")).define("makeTooltipFunc", ["d3","municipioPorCodigo","TL","ttipScale","variaveis"], _makeTooltipFunc);
  return main;
}
