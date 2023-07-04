function _1(md){return(
md`# Menu Localidade`
)}

function _sels(menuLocalidade,flagColors){return(
menuLocalidade({
  value: ["RIO DE JANEIRO", "SÃO PAULO"],
  cores: flagColors
})
)}

function _3(htl,$0)
{
  const button = htl.html`<button style="font-family:'Roboto Condensed'">configurar menu com rio e bh`;
  button.onclick = () => {
    $0.value = ["RIO DE JANEIRO", "BELO HORIZONTE"];
  };
  return button;
}


function _4(htl,alteraMenuLocalidade,$0)
{
  const button = htl.html`<button>acrescentar ou retirar rio`;
  const datum = { codigo: 330455 };
  const altera = alteraMenuLocalidade($0);
  button.onclick = () => altera(datum);
  return button;
}


function _5(sels){return(
sels
)}

function _menuLocalidade(municipios,Event){return(
function menuLocalidade(config) {
  let coresDisponiveis = [...config.cores];
  let selecionados = new Map();
  let placeholder = config["placeholder"] || "Adicione um local";

  function createDropDown() {
    let input, dataList, option;

    input = document.createElement("input");
    dataList = document.createElement("datalist");

    input.setAttribute("list", "menu-municipios-options");
    input.setAttribute("placeholder", placeholder);
    input.style.borderRadius = "6px";
    input.style.backgroundColor = "white";
    input.style.border = "dashed 2px #c4c4c4";
    input.style.fontFamily = "Roboto Condensed";
    input.style.padding = "3px";
    input.style.minWidth = "150px";
    input.style.maxWidth = "240px";
    input.style.height = "20px";

    dataList.setAttribute("id", "menu-municipios-options");

    municipios.forEach((mun) => {
      option = document.createElement("option");
      option.setAttribute("value", mun.nome);
      dataList.appendChild(option);
    });

    input.appendChild(dataList);
    input.addEventListener("input", (ev) => {
      ev.stopPropagation();
    });
    input.addEventListener("change", (ev) => {
      let nome = input.value;
      input.value = "";
      let loc = municipios.find((m) => m.nome === nome);
      if (loc && !selecionados.has(loc.cod) && coresDisponiveis.length > 0) {
        let cor = coresDisponiveis.pop();
        let mun = { nome, cor, cod: loc.cod };
        if (loc.uf) {
          mun.uf = loc.uf;
        }
        selecionados.set(mun.cod, mun);
        update();
      }
    });
    return input;
  }

  function botaoRemove(mun) {
    let button = document.createElement("button");
    let spanNome = document.createElement("span");
    button.style.backgroundColor = mun.cor;
    button.style.display = "inline-flex";
    button.style.alignItems = "flex-center";
    button.style.borderRadius = "6px";
    button.style.border = "none";
    button.style.fontFamily = "Roboto Condensed";
    button.style.fontWeight = "700";
    button.style.fontSize = "14px";
    button.style.marginRight = "6px";
    button.style.padding = "3px 5px";
    spanNome.style.lineHeight = "16px";
    spanNome.style.color = "black";
    if (mun.nome.indexOf("(") > 0 || mun.cod < 100) {
      spanNome.textContent = mun.nome;
    } else {
      spanNome.textContent = mun.nome + " (" + mun.uf + ")";
    }
    button.appendChild(spanNome);
    if (selecionados.size > 1) {
      let spanIcone = document.createElement("span");
      spanIcone.style.paddingLeft = "5px";
      spanIcone.style.fontWeight = "400";
      spanIcone.textContent = "✖";
      spanIcone.style.lineHeight = "16px";
      spanIcone.style.color = "black";
      button.appendChild(spanIcone);
    }
    button.addEventListener("click", (ev) => {
      if (selecionados.size > 1) {
        selecionados.delete(mun.cod);
        coresDisponiveis.push(mun.cor);
        update();
      }
    });
    return button;
  }

  function update() {
    botoesRemocao.innerHTML = "";
    for (let mun of selecionados.values()) {
      botoesRemocao.appendChild(botaoRemove(mun));
    }
    if (selecionados.size == 4) {
      if (dropDown) {
        root.removeChild(dropDown);
        dropDown = null;
      }
    } else {
      if (dropDown === null) {
        dropDown = createDropDown();
        root.appendChild(dropDown);
      }
    }
    root.dispatchEvent(new Event("input"));
  }

  let root = document.createElement("div");
  let botoesRemocao = document.createElement("div");
  let dropDown = createDropDown();

  botoesRemocao.style.display = "inline";
  root.appendChild(botoesRemocao);
  root.appendChild(dropDown);

  Object.defineProperty(root, "value", {
    get() {
      return [...selecionados.values()];
    },
    set(values) {
      selecionados.clear();
      coresDisponiveis = [...config.cores];
      for (let mun of values) {
        if (typeof mun === "string") {
          mun = { nome: mun };
        }
        if (mun.cor === undefined) {
          mun.cor = coresDisponiveis.pop();
        } else {
          let pos = coresDisponiveis.indexOf(mun.cor);
          if (pos >= 0) {
            coresDisponiveis.splice(pos, 1);
          }
        }
        if (mun.cod === undefined) {
          let loc = municipios.find((m) => m.nome.localeCompare(mun.nome) == 0);
          if (loc) {
            mun.cod = loc.cod;
            if (loc.uf) {
              mun.uf = loc.uf;
            }
          }
        }
        if (mun.cod) {
          if (!selecionados.has(mun.cod)) {
            selecionados.set(mun.cod, mun);
          }
        }
      }
      update();
    }
  });

  root.value = config.value || [];

  return root;
}
)}

function _municipioPorCodigo(municipios){return(
new Map(municipios.map((m) => [+m.cod, m]))
)}

function _alteraMenuLocalidade(flagColors,municipios){return(
function alteraMenuLocalidade(menu) {
  const cores = flagColors;
  return (d) => {
    const collection = menu.value;
    const colors = new Set(collection.map((d) => d.cor));
    const cod = `${d.codigo}`;
    const index = collection.map((d) => d.cod).indexOf(cod);
    if (index < 0 && collection.length < 4) {
      const cor = cores.find((d) => !colors.has(d));
      const municipio = municipios.find((d) => d.cod == cod);
      municipio.cor = cor;
      collection.push(municipio);
    } else {
      if (collection.length > 1) {
        collection.splice(index, 1);
      }
    }
    menu.value = collection;
  };
}
)}

function _9(md){return(
md`## Dados`
)}

function _flagColors(){return(
["#2F87F5", "#D8C56C", "#DC5988", "#6CC28D"]
)}

function _municipios(FileAttachment){return(
FileAttachment("municipios-ord@1.csv").csv({separator:";"})
)}

function _styles(html){return(
html`<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["municipios-ord@1.csv", {url: new URL("./files/c4a76bf56594363a92c77a42b5a59a5ceec64d0fc1d6d203a7e76e8952eba5fafa4106f11bb323e5636913f9a0377ca33c6e946cd1aa2203fab5767dbe312876.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof sels")).define("viewof sels", ["menuLocalidade","flagColors"], _sels);
  main.variable(observer("sels")).define("sels", ["Generators", "viewof sels"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl","viewof sels"], _3);
  main.variable(observer()).define(["htl","alteraMenuLocalidade","viewof sels"], _4);
  main.variable(observer()).define(["sels"], _5);
  main.variable(observer("menuLocalidade")).define("menuLocalidade", ["municipios","Event"], _menuLocalidade);
  main.variable(observer("municipioPorCodigo")).define("municipioPorCodigo", ["municipios"], _municipioPorCodigo);
  main.variable(observer("alteraMenuLocalidade")).define("alteraMenuLocalidade", ["flagColors","municipios"], _alteraMenuLocalidade);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("flagColors")).define("flagColors", _flagColors);
  main.variable(observer("municipios")).define("municipios", ["FileAttachment"], _municipios);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  return main;
}
