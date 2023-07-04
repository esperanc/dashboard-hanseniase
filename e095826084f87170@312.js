import define1 from "./197c2c16ae942e60@370.js";
import define2 from "./b95f17ec584a2b2b@290.js";
import define3 from "./d835a177217bb78a@325.js";
import define4 from "./13f8329f2c6d6972@66.js";

function _1(md){return(
md`# Mapa de hanseníase`
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
    label: "tooltip 1",
    value: "cn",
    format: (d) => variaveis[d].name
  }),
  y: Inputs.select(Object.keys(variaveis), {
    label: "tooltip 2",
    value: "cn_crianca",
    format: (d) => variaveis[d].name
  }),
  color: Inputs.select(Object.keys(variaveis), {
    label: "cor",
    value: "cn_gif_2",
    format: (d) => variaveis[d].name
  })
})
)}

function _mapaMunicipio(variables,makeColorScale,variaveis,makeTooltipFunc,d3tip,alteraMenuLocalidade,$0,mapConfig,indicadoresPorCodigo,posicaoPorCodigo,bubbleMap,posicoesMunicipios,d3,invalidation,$1)
{
  const vars = Object.values(variables);
  const colorScale = makeColorScale(variaveis[variables.color]);
  const tooltip = makeTooltipFunc(vars);
  const tip = d3tip().attr("class", "d3-tip").html(tooltip);
  const altera = alteraMenuLocalidade($0);
  const ondblclick = (event, d) => {
    altera(d);
  };
  const options = {
    translation: mapConfig.translation || [0, 0],
    scale: mapConfig.scale || 1,
    title: (d) => d.codigo,
    color: (d) => {
      const dado = indicadoresPorCodigo.get(+d.codigo);
      if (dado) return colorScale(dado[variables.color]);
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
  $0.oninput = (d) => {
    map.setFlags($0.value, options.flags.options);
  };
  d3.select(map).select("svg").call(tip);
  invalidation.then((d) => {
    $1.value.scale = map.scale;
    $1.value.translation = map.translation;
  });
  return map;
}


function _mapConfig(){return(
{}
)}

function _indicadoresPorCodigo(getIndicadoresPorCodigo,ano){return(
getIndicadoresPorCodigo(ano)
)}

function _8(md){return(
md`<br>
## Imports`
)}

function _13(toolTipStyles){return(
toolTipStyles
)}

function _d3tip(require){return(
require("d3-tip")
)}

function _15(md){return(
md`<br>
## Implementation`
)}

function _TL(){return(
function (text) {
  return text;
}
)}

function _bubbleMap(d3,html,flagPath){return(
function (data, options = {}) {
  let {
    width = 800,
    height = 800,
    x = (d) => d.x,
    y = (d) => d.y,
    r = (d) => d.r,
    color = (d) => "gray",
    title = (d) => null,
    onmouseover = (d) => null,
    onmouseout = (d) => null,
    ondblclick = (d) => null,
    flags = null,
    scale = 1,
    translation = [0, 0]
  } = options;

  //
  // O svg principal
  //
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("id", "dorling");

  //
  // Container onde o svg será incluso
  //
  const container = html`<div style="position:relative;width:${width}px;height:${height}px;">`;

  // Um grupo para conter o mapa propriamente dito.
  // Precisamos dele para poder aplicar translações mais facilmente
  //
  const mainGroup = svg
    .append("g")
    .attr("class", "mainGroup")
    .attr("transform", `translate(${translation})`);

  //
  // Grupo contendo os círculos. Só este é escalado
  //
  let circlesGroup = mainGroup
    .append("g")
    .classed("circles", true)
    .attr("transform", `scale(${scale},${scale})`);

  //
  // The circles - one for each datum
  //
  let circles = circlesGroup
    .selectAll("circle")
    .data(data)
    .join("circle") // joins the data to the empty circles selected
    .on("dblclick", function (event, d) {
      ondblclick.call(this, event, d, d3.select(this));
    })
    .on("mouseover", function (event, d) {
      onmouseover.call(this, event, d, d3.select(this));
    })
    .on("mouseout", function (event, d) {
      onmouseout.call(this, event, d, d3.select(this));
    })
    .classed("circle", true)
    .attr("r", r)
    .attr("fill", color)
    .attr("cx", x)
    .attr("cy", y)
    .append("title")
    .text(title);

  //
  // As bandeirinhas para os municípios selecionados
  //
  const flagsGroup = mainGroup.append("g").classed("flags", true);
  function setFlags(data, options = {}) {
    flags = { data, options };
    const {
      x = (d) => d.x,
      y = (d) => d.y,
      color = (d) => d.color,
      ondblclick = function (event, d, sel) {}
    } = options;
    flagsGroup
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("transform", (d) => {
        return `translate(${x(d) * scale},${y(d) * scale})`;
      })
      .attr("d", flagPath(12))
      .attr("fill", color)
      .attr("stroke", "black")
      .on("dblclick", function (event, d) {
        ondblclick.call(event, d, d3.select(this));
      });
  }
  if (flags) setFlags(flags.data, flags.options);

  //
  // Realiza o zoom dos círculos mantendo o ponto center fixo
  // Se center não for passado, assume-se o centro do svg
  //
  function doZoom(scaleFactor, center) {
    const [cx, cy] = center || [width / 2, height / 2];
    const [tx, ty] = translation;
    const newScale = Math.max(0.5, Math.min(3, scale * scaleFactor));
    const [x0, y0] = [(cx - tx) / scale, (cy - ty) / scale];
    const [newTx, newTy] = [cx - x0 * newScale, cy - y0 * newScale];
    translation = [newTx, newTy];
    scale = newScale;
    container.scale = scale;
    container.translation = translation;
    mainGroup.attr("transform", `translate(${translation})`);
    circlesGroup.attr("transform", `scale(${scale},${scale})`);
    if (flags) setFlags(flags.data, flags.options);
  }

  //
  // Interação de panning e zooming
  //
  let mousedown = null;
  svg
    .on("mousedown", function (e) {
      mousedown = [e.offsetX, e.offsetY];
      svg.style("cursor", "grab");
    })
    .on("mousemove", function (e) {
      if (!mousedown) return;
      let mouse = [e.offsetX, e.offsetY];
      let displacement = [mouse[0] - mousedown[0], mouse[1] - mousedown[1]];
      translation[0] += displacement[0];
      translation[1] += displacement[1];
      mainGroup.attr("transform", `translate(${translation})`);
      mousedown = mouse;
    })
    .on("mouseup", function (e) {
      if (!mousedown) return;
      svg.style("cursor", "auto");
      mousedown = null;
    })
    .on("wheel", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const scaleFactor = e.deltaY < 0 ? 11 / 10 : 10 / 11;
      const center = [e.offsetX, e.offsetY];
      doZoom(scaleFactor, center);
    });

  container.append(svg.node());
  container.doZoom = doZoom;
  container.setFlags = setFlags;
  container.translation = translation;
  container.scale = scale;
  return container;
}
)}

function _debug(){return(
0
)}

function _centroidesMunicipios(FileAttachment){return(
FileAttachment("centroidesMunicipios.json").json()
)}

function _recomputePositions(){return(
false
)}

function _posicoesMunicipios(recomputePositions,dorlingPositions,centroidesMunicipios,getPop,FileAttachment){return(
recomputePositions
  ? dorlingPositions(centroidesMunicipios, {
      x: (d) => d.centroide[0],
      y: (d) => d.centroide[1],
      value: (d) => getPop(d.codigo, 2022) || 0,
      rmin: 0.5,
      rmax: 20,
      rmargin: 0.75,
      ticks: 250
    }).map((d) => ({ x: d.x, y: d.y, r: d.r, codigo: d.d.codigo }))
  : FileAttachment("finalPositions.csv").csv()
)}

function _posicaoPorCodigo(posicoesMunicipios){return(
new Map(
  posicoesMunicipios.map(({ x, y, codigo }) => [+codigo, { x, y }])
)
)}

function _dorlingPositions(d3){return(
function dorlingPositions(data, options = {}) {
  const {
    x = (d) => d.x,
    y = (d) => d.y,
    width = 800,
    height = 800,
    margin = 50,
    value = (d) => d.value,
    rmin = 2,
    rmax = 20,
    rmargin = 0.5,
    ticks = 100
  } = options;
  const extent = d3.extent(data, value);
  const radiusScale = d3.scaleSqrt().domain(extent).range([rmin, rmax]);
  const origPositions = data.map((d) => [x(d), y(d)]);
  const projection = d3.geoMercator().fitExtent(
    [
      [margin, margin],
      [width - margin, height - margin]
    ],
    {
      type: "Feature",
      geometry: {
        type: "MultiPoint",
        coordinates: origPositions
      }
    }
  );
  const nodes = data.map((d, i) => {
    const [x, y] = projection(origPositions[i]);
    return {
      x,
      y,
      x0: x,
      y0: y,
      r: radiusScale(value(d)),
      d
    };
  });
  const simulacao = d3
    .forceSimulation(nodes)
    .force(
      "x",
      d3.forceX((d) => d.x0)
    )
    .force(
      "y",
      d3.forceY((d) => d.y0)
    )
    .force(
      "collide",
      d3.forceCollide(
        // colision control
        (d) => d.r + rmargin
      )
    );
  for (let i = 0; i < ticks; i++) simulacao.tick();
  return nodes;
}
)}

function _flagPath(){return(
function (size) {
  const bias = 0.6;
  const tall = 1.8;
  const bt = (a, b, c, d, e, f) => `C${a},${b} ${c},${d} ${e},${f}`;
  return (
    "M 0,0" +
    bt(0, -size * bias, -size, -size * (tall - bias), -size, -size * tall) +
    bt(
      -size,
      -size * (tall + bias),
      -size * bias,
      -size * (1 + tall),
      0,
      -size * (1 + tall)
    ) +
    bt(
      size * bias,
      -size * (1 + tall),
      size,
      -size * (tall + bias),
      size,
      -size * tall
    ) +
    bt(size, -size * (tall - bias), 0, -size * bias, 0, 0) +
    "Z"
  );
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["centroidesMunicipios.json", {url: new URL("./files/44d13b5f189eadc536d00b851ebb5bfca26af70154e1a58cda9b64dff1cc902f18c0c38e4cd1af26c2cdbb076e8488c1197652eb1f86f78881bdded3099f5ab5.json", import.meta.url), mimeType: "application/json", toString}],
    ["finalPositions.csv", {url: new URL("./files/2d59ac9f003b9fbc94aeaa8c9cf926a6ebabdac733ef713c40dfc871a2bea0ec9b53244c23138e95e2f19a3736d6d4e420d38e0bf47b749addcbe4869b9f0982.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof munSelecionados")).define("viewof munSelecionados", ["menuLocalidade","TL","flagColors"], _munSelecionados);
  main.variable(observer("munSelecionados")).define("munSelecionados", ["Generators", "viewof munSelecionados"], (G, _) => G.input(_));
  main.variable(observer("viewof ano")).define("viewof ano", ["Inputs"], _ano);
  main.variable(observer("ano")).define("ano", ["Generators", "viewof ano"], (G, _) => G.input(_));
  main.variable(observer("viewof variables")).define("viewof variables", ["Inputs","variaveis"], _variables);
  main.variable(observer("variables")).define("variables", ["Generators", "viewof variables"], (G, _) => G.input(_));
  main.variable(observer("mapaMunicipio")).define("mapaMunicipio", ["variables","makeColorScale","variaveis","makeTooltipFunc","d3tip","alteraMenuLocalidade","viewof munSelecionados","mapConfig","indicadoresPorCodigo","posicaoPorCodigo","bubbleMap","posicoesMunicipios","d3","invalidation","mutable mapConfig"], _mapaMunicipio);
  main.define("initial mapConfig", _mapConfig);
  main.variable(observer("mutable mapConfig")).define("mutable mapConfig", ["Mutable", "initial mapConfig"], (M, _) => new M(_));
  main.variable(observer("mapConfig")).define("mapConfig", ["mutable mapConfig"], _ => _.generator);
  main.variable(observer("indicadoresPorCodigo")).define("indicadoresPorCodigo", ["getIndicadoresPorCodigo","ano"], _indicadoresPorCodigo);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1);
  main.import("getPop", child1);
  main.import("getIndicadoresPorCodigo", child1);
  main.import("variaveis", child1);
  const child2 = runtime.module(define2);
  main.import("menuLocalidade", child2);
  main.import("municipios", child2);
  const child3 = runtime.module(define3);
  main.import("alteraMenuLocalidade", child3);
  main.import("flagColors", child3);
  main.import("makeColorScale", child3);
  const child4 = runtime.module(define4);
  main.import("makeTooltipFunc", child4);
  main.import("toolTipStyles", child4);
  main.variable(observer()).define(["toolTipStyles"], _13);
  main.variable(observer("d3tip")).define("d3tip", ["require"], _d3tip);
  main.variable(observer()).define(["md"], _15);
  main.define("initial TL", _TL);
  main.variable(observer("mutable TL")).define("mutable TL", ["Mutable", "initial TL"], (M, _) => new M(_));
  main.variable(observer("TL")).define("TL", ["mutable TL"], _ => _.generator);
  main.variable(observer("bubbleMap")).define("bubbleMap", ["d3","html","flagPath"], _bubbleMap);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer("centroidesMunicipios")).define("centroidesMunicipios", ["FileAttachment"], _centroidesMunicipios);
  main.variable(observer("recomputePositions")).define("recomputePositions", _recomputePositions);
  main.variable(observer("posicoesMunicipios")).define("posicoesMunicipios", ["recomputePositions","dorlingPositions","centroidesMunicipios","getPop","FileAttachment"], _posicoesMunicipios);
  main.variable(observer("posicaoPorCodigo")).define("posicaoPorCodigo", ["posicoesMunicipios"], _posicaoPorCodigo);
  main.variable(observer("dorlingPositions")).define("dorlingPositions", ["d3"], _dorlingPositions);
  main.variable(observer("flagPath")).define("flagPath", _flagPath);
  return main;
}
