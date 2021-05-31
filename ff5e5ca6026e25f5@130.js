// https://observablehq.com/@airbornemint/preact@130
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Preact`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A utility for rendering preact in Observable notebooks. Use like so:

~~~js
import { render, htm } from "@airbornemint/preact"
~~~
`
)});
  main.variable(observer()).define(["render","htm"], function(render,htm){return(
render(htm)`
  <p>Lorem <i>ipsum</i></p>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`By default, the DOM is rendered inside a plain \`div\`, but you can customize it:`
)});
  main.variable(observer()).define(["render","htm","html"], function(render,htm,html){return(
render(htm, html`<div style="color: red"/>`)`
  <p>Lorem <i>ipsum</i></p>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Also works as an Observable view:`
)});
  main.variable(observer("viewof testValue")).define("viewof testValue", ["render","htm"], function(render,htm){return(
render(htm)`<input type="range"/>`
)});
  main.variable(observer("testValue")).define("testValue", ["Generators", "viewof testValue"], (G, _) => G.input(_));
  main.variable(observer()).define(["testValue"], function(testValue){return(
testValue
)});
  main.variable(observer("viewof t1")).define("viewof t1", ["render","htm","Test"], function(render,htm,Test){return(
render(htm)`<${Test}/>`
)});
  main.variable(observer("t1")).define("t1", ["Generators", "viewof t1"], (G, _) => G.input(_));
  main.variable(observer("Test")).define("Test", ["Preact","InputEvent","htm"], function(Preact,InputEvent,htm){return(
class Test extends Preact.Component {
  constructor() {
    super();
    this.ref = Preact.createRef();
    this.state = { value: 0 };
  }

  onInput() {
    return (evt => {
      var value = parseInt(evt.target.value);
      this.setState({ value: value });
      console.log('onInput', evt.target.value, this.state);
      evt.stopPropagation();
      this.ref.current.value = value;
      this.ref.current.dispatchEvent(
        new InputEvent('input', { bubbles: true })
      );
    }).bind(this);
  }

  componentDidMount() {
    debugger;
    this.ref.current.value = this.state.value;
    console.log("componentDidMount", this.state);
    this.ref.current.dispatchEvent(new InputEvent('input', { bubbles: true }));
  }

  render({ children }, { value }) {
    return htm`<div ref=${this.ref}><ul>${[
      ...Array(value).fill(false),
      true
    ].map((input, idx) =>
      input
        ? htm`<li key='input'><input onInput=${this.onInput()} value=${value}/></li>`
        : htm`<li key='not-input-${idx}'>Not an input (#${idx})</li>`
    )}
  </ul></div>`;
  }
}
)});
  main.variable(observer()).define(["t1"], function(t1){return(
t1
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Implementation`
)});
  main.variable(observer("render")).define("render", ["html","Preact"], function(html,Preact){return(
function render(vdommer, container = html`<div/>`) {
  return function() {
    Preact.render(vdommer(...arguments), container);
    container.addEventListener(
      'input',
      evt => {
        // Can allow event to bubble because not altering value
        container.value = evt.target.value;
      },
      { passive: true }
    );

    // If you need composite value from children, it's on you to construct it
    container.value = [...container.children]
      .map(child => child.value)
      .find(value => value !== undefined);
    return container;
  };
}
)});
  main.variable(observer("htm")).define("htm", ["require","Preact"], async function(require,Preact){return(
(await require("htm@2/dist/htm.umd.js")).bind(Preact.h)
)});
  main.variable(observer("Preact")).define("Preact", ["require"], function(require){return(
require('preact@10/dist/preact.umd.js')
)});
  return main;
}
