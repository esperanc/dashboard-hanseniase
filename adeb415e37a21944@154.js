function _1(md){return(
md`# ASlider`
)}

function _testSingle(aSlider,d3){return(
aSlider({ values: d3.range(100), value: 3 })
)}

function _testInterval(aSlider,d3){return(
aSlider({ values: d3.range(100), value: [5, 59] })
)}

function _aSlider(htl,d3){return(
function aSlider(conf = {}) {
  let {
    height = 80,
    rulerThickness = 10,
    thumbThickness = 6,
    thumbHeight = 16,
    margin = 10,
    labelDy = 2,
    width = 400,
    values = [1, 2, 3, 4, 5, 6],
    value = [3, 4]
  } = conf;
  const singleValue = !(value instanceof Array);
  const svgElement = htl.svg`<svg width=${width} height=${height} >`;
  const main = d3.select(svgElement).attr("class", "aslider");
  const xmin = margin,
    xmax = width - margin;
  const ymin = (height - rulerThickness) / 2,
    ymax = ymin + rulerThickness;
  const xToValue = (x) => {
    x = Math.max(xmin, Math.min(xmax, x));
    let i = Math.round(((x - xmin) / (xmax - xmin)) * (values.length - 1));
    return values[i];
  };
  const valueToX = (val) => {
    let closest = xmin,
      closestDval = Number.MAX_VALUE;
    for (let i = 0; i < values.length; i++) {
      let x = ((xmax - xmin) / (values.length - 1)) * i + xmin;
      let dval = Math.abs(xToValue(x) - val);
      if (dval < closestDval) [closest, closestDval] = [x, dval];
    }
    return closest;
  };
  const ruler = main
    .append("rect")
    .attr("class", "ruler")
    .attr("width", width - margin * 2)
    .attr("height", rulerThickness)
    //.attr("rx", rulerThickness / 2)
    .attr("x", xmin)
    .attr("y", ymin);
  const range = main
    .append("rect")
    .attr("class", "range")
    .attr("y", ymin)
    .attr("height", rulerThickness);
  const ticks = main
    .selectAll("line.tick")
    .data(values.slice(1, -1))
    .join("line")
    .attr("class", "tick")
    .attr("x1", valueToX)
    .attr("x2", valueToX)
    .attr("y1", ymin)
    .attr("y2", ymax);
  const labels = main
    .selectAll("text.label")
    .data([values[0], values[values.length - 1]])
    .join("text")
    .attr("class", "label")
    .attr("dominant-baseline", "hanging")
    .attr("x", valueToX)
    .attr("y", (ymax + ymin + thumbHeight) / 2 + labelDy)
    .text((d) => d);
  const thumbMin = main
    .append("rect")
    .attr("class", "thumb min")
    .attr("width", thumbThickness)
    .attr("height", thumbHeight)
    .attr("rx", thumbThickness / 2);
  const thumbMax = main
    .append("rect")
    .attr("class", "thumb max")
    .attr("width", thumbThickness)
    .attr("height", thumbHeight)
    .attr("rx", thumbThickness / 2);
  if (singleValue) thumbMax.remove();
  const setValue = (val) => {
    value = val;
    let min, max;
    if (!singleValue) {
      [min, max] = value;
    } else {
      [min, max] = [value, value];
    }
    if (min == max && !singleValue) {
      thumbMin.attr("x", valueToX(min) - thumbThickness);
      thumbMax.attr("x", valueToX(max));
    } else {
      thumbMin.attr("x", valueToX(min) - thumbThickness / 2);
      thumbMax.attr("x", valueToX(max) - thumbThickness / 2);
    }
    thumbMin.attr("y", (ymax + ymin - thumbHeight) / 2);
    thumbMax.attr("y", (ymax + ymin - thumbHeight) / 2);
    range.attr("x", valueToX(min)).attr("width", valueToX(max) - valueToX(min));
    main.selectAll("text.thumbLabel").remove();
    main
      .selectAll("text.thumbLabel")
      .data([min, max])
      .join("text")
      .attr("class", "thumbLabel")
      .attr("dominant-baseline", "auto")
      .attr("x", valueToX)
      .attr("y", (ymax + ymin - thumbHeight) / 2 - labelDy)
      .text((d) => d);
    svgElement.value = value;
    svgElement.dispatchEvent(new CustomEvent("input"));
  };
  let dragging = null;
  let thumbType = null;
  main.selectAll(".thumb").on("mousedown", function (e) {
    if (e.buttons == 1) {
      dragging = d3.select(this);
      thumbType = dragging.classed("min") ? "min" : "max";
    }
  });
  main
    .on("mousemove", function (e) {
      if (!dragging) return;
      const x = e.offsetX;
      const v = xToValue(x);
      let [min, max] = singleValue ? [value, value] : value;
      if (thumbType == "min") {
        if (v <= max || singleValue) min = v;
      } else {
        if (v >= min) max = v;
      }
      setValue(singleValue ? min : [min, max]);
    })
    .on("mouseup mouseleave", (e) => {
      dragging = null;
    });
  setValue(value);
  return svgElement;
}
)}

function _aSliderStyles(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
  .aslider {
    stroke: darkgray;
    fill: lightgray;
    user-select:none;
  }
  .aslider>.range {
    fill: #151472;
    opacity: 50%;
  }
  .aslider>.thumb {
    fill: #151472;
    stroke: #151472;
  } 
  .aslider>.label, .aslider>.thumbLabel {
    fill: #151472;
    stroke: none;
    text-anchor: middle;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
  }

</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof testSingle")).define("viewof testSingle", ["aSlider","d3"], _testSingle);
  main.variable(observer("testSingle")).define("testSingle", ["Generators", "viewof testSingle"], (G, _) => G.input(_));
  main.variable(observer("viewof testInterval")).define("viewof testInterval", ["aSlider","d3"], _testInterval);
  main.variable(observer("testInterval")).define("testInterval", ["Generators", "viewof testInterval"], (G, _) => G.input(_));
  main.variable(observer("aSlider")).define("aSlider", ["htl","d3"], _aSlider);
  main.variable(observer("aSliderStyles")).define("aSliderStyles", ["htl"], _aSliderStyles);
  return main;
}
