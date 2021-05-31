// https://observablehq.com/@airbornemint/fontawesome@455
import define1 from "./ff5e5ca6026e25f5@130.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["brands.min.css",new URL("./files/81b5abcf22c4b4ba9a7b916256ad80b3b5cb488859a53828413df8be43093b1536c916b7fa475aa5024bb7787348c4234f9f610f7ad00d49709cdcae9ae01967",import.meta.url)],["regular.min.css",new URL("./files/22fcd10882b7964395ae3304483445d83548daabe1236b3c17f598b34598b86cc5b7ad224a6e9769a4c66d405b250de407f96f62dc42f685ae7dfbf17f3d0e00",import.meta.url)],["solid.min.css",new URL("./files/9e1de0a9905751a15ed132b1129f49eecf3639526c9dde8942abe7f6363fdb456ccf1898157d77f949eb40e7172489a319725223b4fd6503b5feb07d88b44fc6",import.meta.url)],["fa-regular-400.woff2",new URL("./files/c55c869e1217e5cd26f968c441d1d2a9d6ca1221a55a4169c93a9f87e5fb7c55aa162383cc26c0bd22a9f86193d92dca4d6e9560e70c4362dfeb4cd967d05689",import.meta.url)],["fa-brands-400.eot",new URL("./files/036dbf001cda0be66933efe5b28dddf9752afd707c88d220351b63cd090a71bdb02ce91ca8ec3dbd94adcfe29edc2e2b47f4923e70d49ab03a4738202507f972",import.meta.url)],["fa-solid-900.eot",new URL("./files/a74bd003af5d91a4cbd97f10b8912369ca169de582390a460eeb5f6e8f229876f647999ec3add56b62178ef834e02ac161f65e1998834c053fdcc712f25227d5",import.meta.url)],["fa-brands-400.woff2",new URL("./files/1942623933986e4768808461a62880f1d3735923350bc1831f3bd95358a3867b68f45d54d122eea0cd0f5d053a18ba4d6214be07843b0f3502f5b0ac24a0213c",import.meta.url)],["fa-brands-400.woff",new URL("./files/b28a924e3cc4c66f4f20933327213f6cb10287c4021f273c958e480c3793e30aec52ab73ba86a7305a0395775bca1b9678989a01cbb56a1e40a560b9e699fe4c",import.meta.url)],["fa-regular-400.eot",new URL("./files/0f8c90b306aac48f5f3d8c9d2a53ae93559345849eaf0e4463684363f598bfb6221c595f2d5c4d709595ef83c4f6430efc7c82bd7ef96504f54e0cd6bff2c5fc",import.meta.url)],["fa-regular-400.woff",new URL("./files/ee3b6bca57357b8cc6359d79fd241660b3b9f437cbea9ba5958a7e0a61e0492531da9c0d65018590a91fef214ae54c2e27a74011f2cb7700bb87c3ad7b173427",import.meta.url)],["fa-regular-400.ttf",new URL("./files/7faa629cce56c686b90c4828581b5dedc771b59c2a3fd7957159acdce1e0d1a67505a246a9f1d40c12849d57073a9991c5c486fd2df0d6d203a6205f7dce9a6a",import.meta.url)],["fa-brands-400.ttf",new URL("./files/dd7641774db0b25ae06f0a9c7cc545aa004b8048a8aba588a61c1bb8180db8415e9c20aa7c1175b0dc7fd421f65a266508763aa69d81a7b6667ab235520199f8",import.meta.url)],["fa-solid-900.woff",new URL("./files/e08d5ca384f288f408e0a4a3751ca620176290b10b03ba8a3ed8d35081304235664664eaf49f6eeb10c2a056da8dd3c779548b32a5cf5bc4c1e153d26a793250",import.meta.url)],["fa-regular-400.svg",new URL("./files/62cc4363b96aa2972c2f7e4f6bf354bbec98ad52334101f77f5d3d5b7b0ac05d000c27554e274119458f5a55cf59af292391ad500960050352e0b212155d485f",import.meta.url)],["fa-solid-900.woff2",new URL("./files/3bb68efd2d2512d1fb6d09cf29b76b7461ccd91f29bbc6570f99d1e363f443435edf35d89c7b20fc79b055cd4dade48bcc51b4b7a3742093ec547233ee98743d",import.meta.url)],["fa-solid-900.ttf",new URL("./files/66b7cf633deab54ac88b9778a70e590d27774acb857dd60f265f57ca910427fe473faa3bb4483a4c5c4687910b66f15ffac90c662de24669f26bcef2ee9e97e6",import.meta.url)],["fa-solid-900.svg",new URL("./files/b0252bda402ce3058231a124fb37cd5ffb987bd83f9257416acaa39678ac73f3f31da57761252bd794f65e4bb896fefe3751c964f0e33eee6db38e98e2218935",import.meta.url)],["fa-brands-400.svg",new URL("./files/4b864641c8cc9a0a787a8c7f6d53b923884dd72f4464a0d46d91d5e8d5c56ee43d21823fa6de7887ebcf14d21b7730e6c0c8eb58b0ae5837ddd87819f78d170e",import.meta.url)],["fontawesome.min.css",new URL("./files/a3a9273f6f8072066f02f7a0f36ef0b2085639f80bbdc1625aeb987c87f1bac506435180152b9d1dab39c4eeb2c6881e8a978cb85d454261d67a03b63cb7edc9",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","version"], function(md,version){return(
md`# Font Awesome v${version}

To use the free version of [Font Awesome](https://fontawesome.com) in your Observable notebook, simply:

~~~js
import { style as faStyle, fa } from "@airbornemint/fontawesome"
~~~

and then choose which of regular, solid, and brand icons you need:

~~~js
faStyle({regular: true, solid: true, brands: true})
~~~

At that point, you can use \`fa\` or \`far\` for regular icons, \`fas\` for solid icons, and \`fab\` for brand icons:`
)});
  main.variable(observer()).define(["html","fa","far","fas","fab"], function(html,fa,far,fas,fab){return(
html`${fa`user`} ${far`user`} ${fas`user`} ${fab`apple`}`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Preact users can also use the \`FA\`, \`FAS\`, \`FAR\`, and \`FAB\` components:`
)});
  main.variable(observer()).define(["render","htm","FA","FAR","FAS","FAB"], function(render,htm,FA,FAR,FAS,FAB){return(
render(htm)`<${FA} name="user"/> <${FAR} name="user"/> <${FAS} name="user"/> <${FAB} name="apple"/>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Enter an icon name to preview it here:`
)});
  main.variable(observer()).define(["render","htm","FAR","iconName","FAS","FAB"], function(render,htm,FAR,iconName,FAS,FAB){return(
render(htm)`<div class="preview">
  <figure><${FAR} name=${iconName}/><figcaption>Regular</></>
  <figure><${FAS} name=${iconName}/><figcaption>Solid</></> 
  <figure><${FAB} name=${iconName}/><figcaption>Brand</></>
</>`
)});
  main.variable(observer("viewof iconName")).define("viewof iconName", ["html"], function(html){return(
html`<input type=text placeholder="Icon name" value="user">`
)});
  main.variable(observer("iconName")).define("iconName", ["Generators", "viewof iconName"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Implementation`
)});
  main.variable(observer("faCommon")).define("faCommon", function(){return(
function faCommon(kind) {
  return function(s) {
    return `<i class="fa${kind} fa-${String.raw(...arguments)}"></i>`;
  };
}
)});
  main.variable(observer("fa")).define("fa", ["far"], function(far){return(
far
)});
  main.variable(observer("far")).define("far", ["faCommon"], function(faCommon){return(
faCommon("r")
)});
  main.variable(observer("fas")).define("fas", ["faCommon"], function(faCommon){return(
faCommon("s")
)});
  main.variable(observer("fab")).define("fab", ["faCommon"], function(faCommon){return(
faCommon("b")
)});
  main.variable(observer("FA")).define("FA", ["htm","classnames"], function(htm,classnames){return(
({kind="r", name, ...props}) => name ? htm`<i class=${classnames([`fa${kind}`, `fa-${name}`])} ...${props}/>` : null
)});
  main.variable(observer("FAR")).define("FAR", ["htm","FA"], function(htm,FA){return(
(props) => htm`<${FA} kind=r ...${props} />`
)});
  main.variable(observer("FAS")).define("FAS", ["htm","FA"], function(htm,FA){return(
(props) => htm`<${FA} kind=s ...${props} />`
)});
  main.variable(observer("FAB")).define("FAB", ["htm","FA"], function(htm,FA){return(
(props) => htm`<${FA} kind=b ...${props} />`
)});
  main.variable(observer("style")).define("style", ["FileAttachment","objectAll","objectMap","html"], function(FileAttachment,objectAll,objectMap,html){return(
async function style(flavors) {
  // Pull the CSS from the attached files, but then replace the links to font files to point to the attachments
  let cssFiles = {
    regular: FileAttachment("regular.min.css"),
    solid: FileAttachment("solid.min.css"),
    brands: FileAttachment("brands.min.css"),
  }
  
  // Load all requested CSS files
  cssFiles = await objectAll(objectMap(cssFiles, val => val.text()))
  
  let fontFiles = {
    regular: {
      truetype: FileAttachment("fa-regular-400.ttf"),
      svg: FileAttachment("fa-regular-400.svg"),
      woff: FileAttachment("fa-regular-400.woff"),
      woff2: FileAttachment("fa-regular-400.woff2"),
      "embedded-opentype": FileAttachment("fa-regular-400.eot"),
    }, 
    solid: {
      truetype: FileAttachment("fa-solid-900.ttf"),
      svg: FileAttachment("fa-solid-900.svg"),
      woff: FileAttachment("fa-solid-900.woff"),
      woff2: FileAttachment("fa-solid-900.woff2"),
      "embedded-opentype": FileAttachment("fa-solid-900.eot"),
    },
    brands: {
      truetype: FileAttachment("fa-brands-400.ttf"),
      svg: FileAttachment("fa-brands-400.svg"),
      woff: FileAttachment("fa-brands-400.woff"),
      woff2: FileAttachment("fa-brands-400.woff2"),
      "embedded-opentype": FileAttachment("fa-brands-400.eot"),
    },
  }

  // Resolve URLs for all requested font files
  fontFiles = await objectAll(objectMap(fontFiles, function(flavor) {
    return objectAll(objectMap(flavor, attachment => attachment.url()))
  }))
  
  // Merge all CSS files
  let merged = Object.keys(flavors).map(flavor => cssFiles[flavor]).join("\n")
  
  // Replace font file references
  let re = /(url\("?)\.\.\/webfonts\/fa-([^-]+)-[^")#?]+([#?][^")]+)?("?\))(?:( format\(")([^"]+)("\)))?/g
  let replaced = merged.replace(re, function(_, part1, flavor, part3, part4, part5, format, part7) {
    let realFormat
    ({ format: realFormat="embedded-opentype" } = { format });
    ({ part3="", part5="", format="", part7="" } = {part3, part5, format, part7});
    return `${part1}${fontFiles[flavor][realFormat]}${part3}${part4}${part5}${format}${part7}`
  })
  return html`<style>
${replaced}
${ await FileAttachment("fontawesome.min.css").text() }
</style>`
}
)});
  main.variable(observer("objectAll")).define("objectAll", function(){return(
async function objectAll(obj, xform) {
  let keys = Object.keys(obj)
  let values = await Promise.all(keys.map(k => obj[k]))
  return keys.reduce(function(current, key, idx) {
    current[key] = values[idx]
    return current
  }, {})
}
)});
  main.variable(observer("objectMap")).define("objectMap", function(){return(
function objectMap(obj, func) {
  let keys = Object.keys(obj)
  return keys.reduce(function(current, k) {
    current[k] = func(obj[k])
    return current
  }, {})
}
)});
  main.variable(observer("version")).define("version", ["FileAttachment"], async function(FileAttachment)
{
  let css = await FileAttachment("fontawesome.min.css").text()
  let version = css.match(/Font Awesome Free (.*) by @fontawesome/)
  return version[1]
}
);
  main.variable(observer()).define(["style"], function(style){return(
style({regular: true, solid: true, brands: true})
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>.preview figure { display: inline-block; margin: 1em; text-align: center; } </style>`
)});
  const child1 = runtime.module(define1);
  main.import("render", child1);
  main.import("htm", child1);
  main.variable(observer("classnames")).define("classnames", ["require"], function(require){return(
require('classnames@2.2.6/index.js')
)});
  return main;
}
