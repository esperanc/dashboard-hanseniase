function _1(md){return(
md`# Sliders`
)}

function _2(md){return(
md`## Mapa`
)}

function _3(md){return(
md`### Ano`
)}

function _ano(sliderbase){return(
sliderbase({range:[2012,2019],value:2015,ticks:1,width:600})
)}

function _5(md){return(
md`### Intervalo Número de Nascimentos`
)}

function _fmt(){return(
function fmt(i) {
  return ["0","10","100","1K","10K","50K","100K","1M"][i];
}
)}

function _nascimentosTotais(sliderArray,fmt,sliderRangeBase){return(
sliderArray({range:[0,10,10e2,10e3,10e4,5*10e4,10e5,10e6],ticksLabelFormatter:fmt},sliderRangeBase)
)}

function _filtro(ano,anoMesTrilha,nascimentosTotais){return(
{ano, anoMesTrilha, nascimentosTotais}
)}

function _anoMesTrilha(meses,sliderArray,sliderRangeBase)
{
  let range = [];
  for(let ano=2012; ano<=2018; ano++) {
    for(let mes=1; mes<=12; mes++) {
      range.push(ano*100+mes);
    }
  }
  range.push(201901);
  const ticksLabelFormatter = i => ~~(range[i]/100);
  const handleLabelFormatter = i => meses[range[i]%100-1];
  return sliderArray({range,ticksLabelFormatter,handleLabelFormatter,ticks:12,width:600},sliderRangeBase)
}


function _meses(){return(
["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"]
)}

function _11(md){return(
md`## Componentes`
)}

function _sliderArray(){return(
function sliderArray(config, sliderFactory) {
  let range = config.range;
  config.range = [0,range.length-1];
  if(!config.ticksLabelFormatter) {
    config.ticksLabelFormatter = i=>range[i];
  }
  let resp = sliderFactory(config);
  return resp;
}
)}

function _sliderbase(sliderRangeBase,d3){return(
function sliderbase(config) {
  if(config.value !== undefined) {
    config.value = [config.range[0],config.value];
  }
  let resp = sliderRangeBase(config);
 
  d3.select(resp)
    .selectAll(".handle--custom")
    .each(function(d){
      if(d.type==="w"){
        d3.select(this).remove();
      }
    });

  d3.select(resp)
    .selectAll(".handle--w")
    .remove()
  ;

  d3.select(resp)
    .select(".selection")
    .attr("pointer-events","none")
    .attr("opacity",0)
  ;

  let _vl = resp.vl;
  resp.vl = function(newValue) {
    if(newValue === undefined) {
        return _vl.call(resp)[1];
    }
    return _vl.call(resp,[0,newValue])
  }
  
  return resp;
}
)}

function _sliderRangeBase(d3,DOM){return(
function sliderRangeBase(config) {
  let { 
    range = [0,10],
    width = 400, 
    height = 60, 
    marginTop = 20,
    marginBottom = 20,
    marginRight = 20,
    marginLeft = 20,
    ticks = 1,
    value = null,
    dispatchOnDrag = false,
    ticksLabelFormatter = (v=>v),
    handleLabelFormatter = null
  } = config;
  
  if(value == null) {
    value = [...range];
  }
  let w = width-marginLeft-marginRight;
  let h = height-marginTop-marginBottom;
  let ticksData = [];
  for(let i=range[0]; i<=range[1]; i+=ticks) {
    ticksData.push(i);
  }

  let x = d3.scaleLinear()
    .domain(range)
    .range([0, w])
  ;
  
  let svg = d3.select(DOM.svg(width,height));
  let node = svg.node();
  const g = svg.append('g').attr('transform', `translate(${marginLeft},${marginTop})`);

  svg.on("click touch",ev=>{
    let mx = ev.offsetX - marginLeft;
    if(mx >= 0 && mx <=w) {
      let sel = d3.brushSelection(gBrush.node()) || [0,0];
      let vSel = sel.map(d=>Math.round(x.invert(d)));
      let v = Math.round(x.invert(mx));
      sel[v<vSel[0]?0:1] = x(v);
      gBrush.call(brush.move, sel);
    }
  });

  let lastValid = [0,0];
  
  function onBrush(ev) {
      let s = ev.selection;
      lastValid = s;
      let size = s[1]-s[0];
      handle.attr("transform",(d,i)=>`translate(${s[i]},0)`);
      if(handleLabelFormatter) {
        let indexRange = s.map(x.invert).map(Math.round);
        handle
          .select("text")
          .attr("text-anchor",d=>size>30?"middle":d.type=='w'?"end":"start")
          .text(d=>handleLabelFormatter(d.type=='w'?indexRange[0]:indexRange[1]))
        ;
      }
      if(dispatchOnDrag) {
        node.dispatchEvent(new CustomEvent("input"));
      }
  }

  function onBrushEnd(ev) {
      if(ev.sourceEvent) {
        let s = ev.selection || lastValid;
        let d0 = s.map(x.invert);
        let d1 = d0.map(Math.round);
        d3.select(this).transition().call(ev.target.move, d1.map(x));
        if(!dispatchOnDrag) {
          setTimeout(_=>{node.dispatchEvent(new CustomEvent("input"))});
        }
      }
  }
  
  var brush = d3.brushX()
    .extent([[0,0], [w, h]])
    .on('brush',onBrush)
    .on('end',onBrushEnd)
  ;

  let gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush)
  ;

  gBrush.select(".selection")
    .attr("fill","#151472CC")
    .style("cursor","grab")
  ;
  
  gBrush.select(".overlay")
    .attr("fill","#E5E5E5")
    .attr("pointer-events","none")
  ;

  let gTicks = gBrush
    .insert("g",".selection")
    .attr("class","ticks")
  ;
  
  let tick = gTicks.selectAll('.tick')
    .data(ticksData)
    .enter()
    .append('g')
    .attr('class','tick')
    .attr('transform',d=>`translate(${x(d)},0)`)
  ;

  tick.append('line')
    .attr("x1",0)
    .attr("x2",0)
    .attr("y1",0)
    .attr("y2",h)
    .attr("stroke","#999")
  ;

  if(ticksLabelFormatter) {
    tick.append('text')
      .attr("x",0)
      .attr("y",h+4)
      .attr("dominant-baseline","hanging")
      .attr("text-anchor","middle")
      .attr('font-size','12px')
      .attr('font-weight','400')
      .attr('fill','#151472')
      .text(ticksLabelFormatter)
    ;
  }

  let handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("g")
    .attr("class", "handle--custom")
  ;

  handle.append("rect")
    .attr("stroke", "#000")
    .attr("fill", '#151472')
    .attr("cursor", "ew-resize")
    .attr("width",8)
    .attr("height",h+4)
    .attr("y",-2)
    .attr("x",-4)
    .attr("rx",4)
  ;

  if(handleLabelFormatter) {
    handle.append("text")
      .attr("fill","#F00")
      .attr("y",-4)
      .attr('font-size','12px')
      .attr('font-weight','400')
      .attr('fill','#151472')
    ;
  }
  
  node.vl = function(newValue) {
    if(newValue === undefined) {
      let sel = d3.brushSelection(gBrush.node()) || [0,0];
      return sel.map(d => Math.round(x.invert(d)));
    }
    if(newValue[0]>newValue[1]) {
      let aux = newValue[0];
      newValue[0] = newValue[1];
      newValue[1] = aux;
    }
    if(newValue[1]<range[0]) {
      newValue[0] = range[0];
      newValue[1] = range[0];
    } else if(newValue[0] > range[1]) {
      newValue[0] = range[1];
      newValue[1] = range[1];
    } else {
      if(newValue[0]<range[0]) {
        newValue[0] = range[0];
      }
      if(newValue[1]>range[1]) {
        newValue[1] = range[1];
      }
    }
    gBrush.call(brush.move, newValue.map(x));
    node.dispatchEvent(new CustomEvent("input"));
    return node;
  }
  
  Object.defineProperty(node, "value", {
    get() {
      return this.vl();
    },
    set(newValue) {
      this.vl(newValue);
    }
  });

  node.value = value;
  
  return node;
}
)}

function _style_slider(html){return(
html`
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
svg {
	font-family: "Roboto Condensed";
}

* { user-select: none;  }


</style>
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof ano")).define("viewof ano", ["sliderbase"], _ano);
  main.variable(observer("ano")).define("ano", ["Generators", "viewof ano"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("fmt")).define("fmt", _fmt);
  main.variable(observer("viewof nascimentosTotais")).define("viewof nascimentosTotais", ["sliderArray","fmt","sliderRangeBase"], _nascimentosTotais);
  main.variable(observer("nascimentosTotais")).define("nascimentosTotais", ["Generators", "viewof nascimentosTotais"], (G, _) => G.input(_));
  main.variable(observer("filtro")).define("filtro", ["ano","anoMesTrilha","nascimentosTotais"], _filtro);
  main.variable(observer("viewof anoMesTrilha")).define("viewof anoMesTrilha", ["meses","sliderArray","sliderRangeBase"], _anoMesTrilha);
  main.variable(observer("anoMesTrilha")).define("anoMesTrilha", ["Generators", "viewof anoMesTrilha"], (G, _) => G.input(_));
  main.variable(observer("meses")).define("meses", _meses);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("sliderArray")).define("sliderArray", _sliderArray);
  main.variable(observer("sliderbase")).define("sliderbase", ["sliderRangeBase","d3"], _sliderbase);
  main.variable(observer("sliderRangeBase")).define("sliderRangeBase", ["d3","DOM"], _sliderRangeBase);
  main.variable(observer("style_slider")).define("style_slider", ["html"], _style_slider);
  return main;
}
