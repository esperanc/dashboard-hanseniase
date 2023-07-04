function _1(md){return(
md`# Ícones hanseníase`
)}

function _icon(Inputs,makeIcon){return(
Inputs.select(Object.keys(makeIcon))
)}

function _3(makeIcon,icon){return(
makeIcon[icon]()
)}

function _makeIcon(makeZoomInIcon,makeEnlargeIcon,makeReduceIcon,makeRollUpIcon,makeRollDownIcon,makeClearButton){return(
{
  zoomIn: makeZoomInIcon,
  zoomOut: makeZoomInIcon,
  enlarge: makeEnlargeIcon,
  reduce: makeReduceIcon,
  rollUp: makeRollUpIcon,
  rollDown: makeRollDownIcon,
  clear: makeClearButton
}
)}

function _makeZoomInIcon(html){return(
() => html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6C7.567 6 6 7.567 6 9.5C6 11.433 7.567 13 9.5 13C10.443 13 11.2988 12.6271 11.9282 12.0207C11.9414 12.0036 11.9558 11.9871 11.9714 11.9714C11.9871 11.9558 12.0036 11.9414 12.0207 11.9282C12.6271 11.2988 13 10.443 13 9.5C13 7.567 11.433 6 9.5 6ZM13.0159 12.3088C13.6318 11.539 14 10.5625 14 9.5C14 7.01472 11.9853 5 9.5 5C7.01472 5 5 7.01472 5 9.5C5 11.9853 7.01472 14 9.5 14C10.5625 14 11.539 13.6318 12.3088 13.0159L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L13.0159 12.3088ZM9.5 7.5C9.77614 7.5 10 7.72386 10 8V9H11C11.2761 9 11.5 9.22386 11.5 9.5C11.5 9.77614 11.2761 10 11 10H10V11C10 11.2761 9.77614 11.5 9.5 11.5C9.22386 11.5 9 11.2761 9 11V10H8C7.72386 10 7.5 9.77614 7.5 9.5C7.5 9.22386 7.72386 9 8 9H9V8C9 7.72386 9.22386 7.5 9.5 7.5Z" fill="#E5E5E5"/>
</svg>`
)}

function _makeZoomOutIcon(html){return(
() => html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#151472"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6C7.567 6 6 7.567 6 9.5C6 11.433 7.567 13 9.5 13C10.443 13 11.2988 12.6271 11.9282 12.0207C11.9414 12.0036 11.9558 11.9871 11.9714 11.9714C11.9871 11.9558 12.0036 11.9414 12.0207 11.9282C12.6271 11.2988 13 10.443 13 9.5C13 7.567 11.433 6 9.5 6ZM13.0159 12.3088C13.6318 11.539 14 10.5625 14 9.5C14 7.01472 11.9853 5 9.5 5C7.01472 5 5 7.01472 5 9.5C5 11.9853 7.01472 14 9.5 14C10.5625 14 11.539 13.6318 12.3088 13.0159L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L13.0159 12.3088ZM7.5 9.5C7.5 9.22386 7.72386 9 8 9H11C11.2761 9 11.5 9.22386 11.5 9.5C11.5 9.77614 11.2761 10 11 10H8C7.72386 10 7.5 9.77614 7.5 9.5Z" fill="#E5E5E5"/>
</svg>`
)}

function _makeEnlargeIcon(html){return(
() => html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 2C7.22386 2 7 1.77614 7 1.5C7 1.22386 7.22386 1 7.5 1H10.5C10.7761 1 11 1.22386 11 1.5V4.5C11 4.77614 10.7761 5 10.5 5C10.2239 5 10 4.77614 10 4.5V2.70711L7.35355 5.35355C7.15829 5.54882 6.84171 5.54882 6.64645 5.35355C6.45118 5.15829 6.45118 4.84171 6.64645 4.64645L9.29289 2H7.5ZM4.64645 6.64645C4.84171 6.45118 5.15829 6.45118 5.35355 6.64645C5.54882 6.84171 5.54882 7.15829 5.35355 7.35355L2.70711 10H4.5C4.77614 10 5 10.2239 5 10.5C5 10.7761 4.77614 11 4.5 11H1.5C1.22386 11 1 10.7761 1 10.5V7.5C1 7.22386 1.22386 7 1.5 7C1.77614 7 2 7.22386 2 7.5V9.29289L4.64645 6.64645Z" fill="black"/>
</svg>`
)}

function _makeReduceIcon(html){return(
() => html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.1464 1.14645C10.3417 0.951184 10.6583 0.951184 10.8536 1.14645C11.0488 1.34171 11.0488 1.65829 10.8536 1.85355L8.20711 4.5H10C10.2761 4.5 10.5 4.72386 10.5 5C10.5 5.27614 10.2761 5.5 10 5.5H7C6.72386 5.5 6.5 5.27614 6.5 5V2C6.5 1.72386 6.72386 1.5 7 1.5C7.27614 1.5 7.5 1.72386 7.5 2V3.79289L10.1464 1.14645ZM1.5 7C1.5 6.72386 1.72386 6.5 2 6.5H5C5.27614 6.5 5.5 6.72386 5.5 7V10C5.5 10.2761 5.27614 10.5 5 10.5C4.72386 10.5 4.5 10.2761 4.5 10V8.20711L1.85355 10.8536C1.65829 11.0488 1.34171 11.0488 1.14645 10.8536C0.951184 10.6583 0.951184 10.3417 1.14645 10.1464L3.79289 7.5H2C1.72386 7.5 1.5 7.27614 1.5 7Z" fill="black"/>
</svg>`
)}

function _makeRollDownIcon(htl){return(
() => htl.html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.20544 6.45505C5.36816 6.29233 5.63198 6.29233 5.7947 6.45505L8.00007 8.66042L10.2054 6.45505C10.3682 6.29233 10.632 6.29233 10.7947 6.45505C10.9574 6.61777 10.9574 6.88158 10.7947 7.0443L8.2947 9.5443C8.13198 9.70702 7.86816 9.70702 7.70544 9.5443L5.20544 7.0443C5.04272 6.88158 5.04272 6.61777 5.20544 6.45505Z" fill="#151472"/>
</svg>`
)}

function _makeRollUpIcon(htl){return(
() => htl.html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.70541 6.45505C7.86813 6.29233 8.13195 6.29233 8.29467 6.45505L10.7947 8.95505C10.9574 9.11776 10.9574 9.38158 10.7947 9.5443C10.632 9.70702 10.3681 9.70702 10.2054 9.5443L8.00004 7.33893L5.79467 9.5443C5.63195 9.70702 5.36813 9.70702 5.20541 9.5443C5.04269 9.38158 5.04269 9.11776 5.20541 8.95505L7.70541 6.45505Z" fill="#151472"/>
</svg>
`
)}

function _makeClearButton(svg){return(
() => svg`<svg width="18" height="18" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="padding:5px;background:white;border-radius:10px;">
<path d="M7.1595 0H3.47242C1.56577 0 0 1.55368 0 3.47373V6.50535C0 6.78325 0.227241 7.01057 0.505035 7.01057C0.782828 7.01057 1.01007 6.78325 1.01007 6.50535L1.01016 3.47373C1.01016 2.12209 2.10868 1.02317 3.45979 1.02317H7.13425C8.51057 1.02317 9.60914 2.12211 9.60914 3.47373V6.1264C9.60914 7.47804 8.51061 8.57696 7.1595 8.57696L2.60116 8.57687L4.12907 7.04838C4.33112 6.84625 4.33112 6.53046 4.12907 6.32833C3.92702 6.1262 3.61134 6.1262 3.40929 6.32833L1.01016 8.72836C0.808105 8.93049 0.808105 9.24628 1.01016 9.44841L3.40929 11.8484C3.51031 11.9495 3.63653 12 3.77542 12C3.90173 12 4.04063 11.9495 4.14156 11.8484C4.34361 11.6463 4.34361 11.3305 4.14156 11.1284L2.60116 9.60017H7.1595C9.07882 9.60017 10.6319 8.04649 10.6319 6.12644V3.47378C10.6319 1.55373 9.06615 4.72183e-05 7.1595 4.72183e-05L7.1595 0Z" fill="#151472"/>
</svg>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof icon")).define("viewof icon", ["Inputs","makeIcon"], _icon);
  main.variable(observer("icon")).define("icon", ["Generators", "viewof icon"], (G, _) => G.input(_));
  main.variable(observer()).define(["makeIcon","icon"], _3);
  main.variable(observer("makeIcon")).define("makeIcon", ["makeZoomInIcon","makeEnlargeIcon","makeReduceIcon","makeRollUpIcon","makeRollDownIcon","makeClearButton"], _makeIcon);
  main.variable(observer("makeZoomInIcon")).define("makeZoomInIcon", ["html"], _makeZoomInIcon);
  main.variable(observer("makeZoomOutIcon")).define("makeZoomOutIcon", ["html"], _makeZoomOutIcon);
  main.variable(observer("makeEnlargeIcon")).define("makeEnlargeIcon", ["html"], _makeEnlargeIcon);
  main.variable(observer("makeReduceIcon")).define("makeReduceIcon", ["html"], _makeReduceIcon);
  main.variable(observer("makeRollDownIcon")).define("makeRollDownIcon", ["htl"], _makeRollDownIcon);
  main.variable(observer("makeRollUpIcon")).define("makeRollUpIcon", ["htl"], _makeRollUpIcon);
  main.variable(observer("makeClearButton")).define("makeClearButton", ["svg"], _makeClearButton);
  return main;
}
