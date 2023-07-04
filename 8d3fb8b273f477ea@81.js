import define1 from "./adeb415e37a21944@154.js";

function _1(md){return(
md`# ADrawer`
)}

function _2(aDrawer,$0){return(
aDrawer($0, {
  shown: true,
  title: "Nascimentos",
  subtitle: "Exibir somente municípios com total de nascimentos entre:"
})
)}

function _filtroNascimentos(aSlider){return(
aSlider({
  values: [0, 10, 100, 1000, 100000, 1000000],
  value: [0, 1000000],
  width: 300,
  rulerThickness: 16,
  thumbHeight: 20,
  height: 50,
  margin: 20
})
)}

function _4(filtroNascimentos){return(
filtroNascimentos
)}

function _chevronDown(htl){return(
() => htl.html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.76426 4.76462C3.89443 4.63445 4.10549 4.63445 4.23566 4.76462L5.99996 6.52892L7.76426 4.76462C7.89443 4.63445 8.10549 4.63445 8.23566 4.76462C8.36584 4.8948 8.36584 5.10585 8.23566 5.23603L6.23566 7.23603C6.10549 7.3662 5.89443 7.3662 5.76426 7.23603L3.76426 5.23603C3.63408 5.10585 3.63408 4.8948 3.76426 4.76462Z" fill="#E5E5E5"/>
</svg>
`
)}

function _chevronRight(htl){return(
() => htl.html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.09763 3.76462C5.22781 3.63445 5.43886 3.63445 5.56904 3.76462L7.56904 5.76462C7.69921 5.8948 7.69921 6.10585 7.56904 6.23603L5.56904 8.23603C5.43886 8.3662 5.22781 8.3662 5.09763 8.23603C4.96746 8.10585 4.96746 7.8948 5.09763 7.76462L6.86193 6.00033L5.09763 4.23603C4.96746 4.10585 4.96746 3.8948 5.09763 3.76462Z" fill="#E5E5E5"/>
</svg>
`
)}

function _aDrawer(htl,chevronDown,chevronRight){return(
function aDrawer(contents, conf = {}) {
  let { shown = false, title = "title", subtitle = null } = conf;
  const drawerElement = htl.html`<div class=adrawer>`;
  const titleArea = htl.html`<div class=titleArea>`;
  const icon = htl.html`<div class=icon>`;
  const titleLabel = htl.html`<div class=title>${title}`;
  titleArea.append(icon, titleLabel);
  const contentArea = htl.html`<div class=contentArea>`;
  if (subtitle) {
    contentArea.append(htl.html`<div class=subtitle >${subtitle}`);
  }
  contentArea.append(contents);
  const showOrHide = () => {
    icon.innerHTML = "";
    icon.append(shown ? chevronDown() : chevronRight());
    contentArea.style.display = shown ? "block" : "none";
  };
  showOrHide();
  titleArea.onclick = () => {
    shown = !shown;
    showOrHide();
  };
  drawerElement.append(titleArea, contentArea);
  return drawerElement;
}
)}

function _aDrawerStyles(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
  div.adrawer .titleArea {
    display:inline-block;
    font-family: Roboto Condensed;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    user-select: none;
  }
  div.adrawer div.subtitle {
    display:block;
    font-family: Roboto Condensed;
    font-size: 10px;
    font-weight: 400;
    line-height: 11px;
    letter-spacing: 0em;
    text-align: left;
  }
  
 div.adrawer div.titleArea .icon {
   display:inline-block;
   padding-right:5px;
 }
 div.adrawer div.titleArea .title {
   vertical-align: top;
   color: #151472;
   display:inline-block;    
 }
</style>`
)}

function _10(aSliderStyles){return(
aSliderStyles
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["aDrawer","viewof filtroNascimentos"], _2);
  main.variable(observer("viewof filtroNascimentos")).define("viewof filtroNascimentos", ["aSlider"], _filtroNascimentos);
  main.variable(observer("filtroNascimentos")).define("filtroNascimentos", ["Generators", "viewof filtroNascimentos"], (G, _) => G.input(_));
  main.variable(observer()).define(["filtroNascimentos"], _4);
  main.variable(observer("chevronDown")).define("chevronDown", ["htl"], _chevronDown);
  main.variable(observer("chevronRight")).define("chevronRight", ["htl"], _chevronRight);
  main.variable(observer("aDrawer")).define("aDrawer", ["htl","chevronDown","chevronRight"], _aDrawer);
  main.variable(observer("aDrawerStyles")).define("aDrawerStyles", ["htl"], _aDrawerStyles);
  const child1 = runtime.module(define1);
  main.import("aSlider", child1);
  main.import("aSliderStyles", child1);
  main.variable(observer()).define(["aSliderStyles"], _10);
  return main;
}
