function _1(md){return(
md`# Translation Layer

A very crude way for creating internationalized versions of your applications.`
)}

function _config(){return(
{
  source: "pt",
  target: "en",
  db: [],
  translations: new Map()
}
)}

function _translate(config){return(
function translate(text) {
  if (config.translations.has(text)) return config.translations.get(text);
  config.translations.set(text, text);
  const entry = {};
  entry[config.source] = text;
  config.db.push(entry);
  return text;
}
)}

function _setConfig(config){return(
function setConfig(source, target, db) {
  Object.assign(config, { source, target, db });
  config.translations = new Map();
  for (let row of db) {
    if (row[source] && row[source] != "" && row[target] && row[target] != "")
      config.translations.set(row[source], row[target]);
  }
}
)}

function _5(setConfig){return(
setConfig("pt", "en", [
  {
    pt: "Preencha um ou mais das caixas abaixo.",
    en: "Fill one or more of the boxes below."
  }
])
)}

function _6(translate){return(
translate("Preencha um ou mais das caixas abaixo.")
)}

function _7(translate){return(
translate("Use o botão central do mouse para ampliar o mapa.")
)}

function _8(Inputs,config){return(
Inputs.table(config.db)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("translate")).define("translate", ["config"], _translate);
  main.variable(observer("setConfig")).define("setConfig", ["config"], _setConfig);
  main.variable(observer()).define(["setConfig"], _5);
  main.variable(observer()).define(["translate"], _6);
  main.variable(observer()).define(["translate"], _7);
  main.variable(observer()).define(["Inputs","config"], _8);
  return main;
}
