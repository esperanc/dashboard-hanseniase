function _1(md){return(
md`# ASelect`
)}

function _example(aSelect){return(
aSelect({
  options: ["foo", "bar", "xpto"],
  width: 300,
  value: "xpto",
  format: (opt) => opt.toLocaleUpperCase(),
  placeholder: "Select one"
})
)}

function _term(aText){return(
aText({ width: 300, placeholder: "🔍 buscar" })
)}

function _4(term,example){return(
[term, example]
)}

function _aText(htl){return(
function aText(conf = {}) {
  let { placeholder = "", width = 200 } = conf;

  const theText = htl.html`<input type=text class=atext placeholder=${placeholder}>`;
  theText.style.width = `${width}px`;
  return theText;
}
)}

function _aSelect(htl){return(
function aSelect(conf = {}) {
  let {
    placeholder = "",
    options = ["abc", "def", "xpto"],
    format = (option) => option,
    width = 200,
    value = "xpto"
  } = conf;

  const theSelect = htl.html`<select class=aselect>`;
  theSelect.style.width = `${width}px`;
  if (placeholder && placeholder != "") {
    theSelect.append(
      htl.html`<option value="" disabled selected >${placeholder}`
    );
  }
  for (let o of options) {
    const selected = o == value ? "selected" : "";
    const theOption = htl.html`<option value="${o}" >${format(o)}`;
    if (selected) theOption.selected = true;
    theSelect.append(theOption);
  }
  return theSelect;
}
)}

function _aSelectStyles(daPath,htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
  
  select.aselect, input[type=text].atext {
    appearance: none;
    padding:1px 1px 1px 5px;
        box-sizing: border-box;
    margin:0;
    width: 100%;
    border: 1px solid #151472;
    border-radius: 4px;
    font-family: Roboto Condensed;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }
  select.aselect {
    background-image:url(${daPath}); 
    background-position: 98%;
    background-size:10px; 
    background-repeat:no-repeat;
  }
</style>`
)}

function _downArrow(htl){return(
() =>
  htl.html`<svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.646447 0.146447C0.841709 -0.0488155 1.15829 -0.0488155 1.35355 0.146447L4 2.79289L6.64645 0.146447C6.84171 -0.0488155 7.15829 -0.0488155 7.35355 0.146447C7.54882 0.341709 7.54882 0.658291 7.35355 0.853553L4.35355 3.85355C4.15829 4.04882 3.84171 4.04882 3.64645 3.85355L0.646447 0.853553C0.451184 0.658291 0.451184 0.341709 0.646447 0.146447Z" fill="black"/>
</svg>`
)}

async function _daPath(FileAttachment){return(
await FileAttachment("da.png").url()
)}

function _daUrl(daPath){return(
new URL(daPath)
)}

function _11(daPath,htl){return(
htl.html`<div style="background:url(${daPath}) right; background-size:10px; background-repeat:no-repeat;">XXX  `
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["da.png", {url: new URL("./files/a2301ed0ed118644a516238abc5408f2db17ee67772fd9b7bb61f4680aef60798b2b5e1e9073bdd79a64b00abcdb4491337be8919af1ef13759f229644763a56.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof example")).define("viewof example", ["aSelect"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer("viewof term")).define("viewof term", ["aText"], _term);
  main.variable(observer("term")).define("term", ["Generators", "viewof term"], (G, _) => G.input(_));
  main.variable(observer()).define(["term","example"], _4);
  main.variable(observer("aText")).define("aText", ["htl"], _aText);
  main.variable(observer("aSelect")).define("aSelect", ["htl"], _aSelect);
  main.variable(observer("aSelectStyles")).define("aSelectStyles", ["daPath","htl"], _aSelectStyles);
  main.variable(observer("downArrow")).define("downArrow", ["htl"], _downArrow);
  main.variable(observer("daPath")).define("daPath", ["FileAttachment"], _daPath);
  main.variable(observer("daUrl")).define("daUrl", ["daPath"], _daUrl);
  main.variable(observer()).define(["daPath","htl"], _11);
  return main;
}
