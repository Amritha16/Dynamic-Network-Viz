// https://observablehq.com/@amritha16/contact-network@1423
import define1 from "./6be05c6c4b4db0de@455.js";
import define2 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["mean_of_graph_durations@1.json",new URL("./data/mean_of_graph_durations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Copenhagen Contact Network`
)});
  main.variable(observer()).define(["md","btn","fas"], function(md,btn,fas){return(
md`## Buttons:
||
--------------------- | ----------------------- | -------------|
${btn(fas`play`)} to start play | ${btn(fas`pause`)} to pause | ${btn(fas`step-forward`)} to step forward 
${btn(fas`step-backward`)} to step backward | ${btn(fas`chevron-up`)} Increase the stride range | ${btn(fas`chevron-down`)} Decrease the stride range
${btn(
  fas`arrow-right`
)} Increase no.of strides/s |${btn(
  fas`arrow-left`
)} Decrease no.of strides/s`
)});
  main.variable(observer()).define(["legend","d3"], function(legend,d3){return(
legend({width:400,
  color: d3.scaleSequential([-100, 0], d3.interpolateBlues),
  title: "Signal strength (dBm) "
})
)});
  main.variable(observer("viewof t")).define("viewof t", ["time"], function(time){return(
time.first
)});
  main.variable(observer("t")).define("t", ["Generators", "viewof t"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","update"], function(md,update){return(
md `No.of links: ${update}`
)});
  main.variable(observer("chart")).define("chart", ["data","d3","width","height","zoom","invalidation"], function(data,d3,width,height,zoom,invalidation)
{
  const nodes = data.node.map(d => Object.create(d));
  const simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink().id(d => d.id))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

  const svg = d3.create("svg")
      .attr("viewBox", [-width/2, -height/2, width, height]);
  
    data.node.forEach(function (d) {
    d.fx = d.position.x/5;
    d.fy = d.position.y/5;
  });
  
  var container = svg.append('g');
  svg.call(zoom(container));
  
  const node = container.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", function(d){ return d.size.value/3;});



  let link = container.append("g")
      .attr("stroke", "#799")
      .attr("stroke-opacity", 10)
    .selectAll("line");

  function ticked() {
    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  }
  
   function zoomed({transform}) {
    node.attr("transform", transform);
    link.attr("transform", transform);
  }

  invalidation.then(() => simulation.stop());

  return Object.assign(svg.node(), {
    update({links}) {

      // Make a shallow copy to protect against mutation, while
      // recycling old nodes to preserve position and velocity.
       const old = new Map(node.data().map(d => [d.id, d]));
      links = links.map(d => Object.assign({}, d));
      link = link
        .data(links, d => [d.source, d.target])
        .join("line") 
        .style("stroke-width", 4)
        .style("stroke", function(d){ if(d.weight > -30) {
                                        return d3.color(" #1b4f72");} //darkblue
                                     else if (d.weight > -50) {
                                        return d3.color(" #2874a6");} //blue
                                     else if (d.weight > -90) {
                                        return d3.color("#5dade2");} //dodgerblue
                                     else {
                                        return d3.color("#aed6f1");} //lightskyblue
                                    })
    ;
      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart().tick();
      ticked(); // render now!
    }
  });
}
);
  main.variable(observer("zoom")).define("zoom", ["d3"], function(d3){return(
container => {
  // Zooming function translates the size of the svg container.
  function zoomed() {
      container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
  }
  
  return d3.zoom().scaleExtent([0.5,3]).on('zoom', zoomed)
}
)});
  main.variable(observer("time")).define("time", ["Player","times"], function(Player,times){return(
Player(times, {
  loop: true,
  format: date => date.toLocaleString("en", {
    month: "long", 
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
    //timeZone: "UTC"
  }),
  width : 600
})
)});
  main.variable(observer("rgbToHex")).define("rgbToHex", function(){return(
(r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')
)});
  main.variable(observer("update")).define("update", ["data","contains","t","chart"], function(data,contains,t,chart)
{
  const links = data.links.filter(d => contains(new Date(d.attvalues.attvalue[0].value), new Date(d.attvalues.attvalue[1].value), t));
  var c = links.length;
  chart.update({links});
  return c;
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], async function(FileAttachment){return(
JSON.parse(await FileAttachment("mean_of_graph_durations@1.json").text(), (key, value) => key === "start" || key === "end" ? new Date(value) : value)
)});
  main.variable(observer("times")).define("times", ["d3","data"], function(d3,data){return(
d3.scaleTime()
  .domain([d3.min(data.links, d => new Date(d.attvalues.attvalue[0].value)), d3.max(data.links, d => new Date(d.attvalues.attvalue[1].value))])
  .ticks(30000)
)});
  main.variable(observer("contains")).define("contains", ["getDelay"], function(getDelay){return(
(start, end, time) => {
  let x = getDelay();
  var time1 = new Date(new Date(time).getTime());
  var time2 = new Date(new Date(time).getTime());
  if (x == 0) { //1m
    return (start <= time && end > time);
  }
  else if(x == 1) {//1hr
    time1.setMinutes(0);
    time2.setHours(time1.getHours() + 1);
    time2.setMinutes(0);
  }
  else if(x == 2) {//3hrs
    time1.setMinutes(0);
    time1.setHours(parseInt(time1.getHours() / 3));
    time2.setHours(time1.getHours() + 3);
    time2.setMinutes(0);
  }
  else if(x == 3) {//6hrs
    time1.setMinutes(0);
    time1.setHours(parseInt(time1.getHours() / 6));
    time2.setHours(time1.getHours() + 6);
    time2.setMinutes(0);
  }
  else if(x == 4) {//12hrs
    time1.setMinutes(0);
    time1.setHours(parseInt(time1.getHours() / 12));
    time2.setHours(time1.getHours() + 12);
    time2.setMinutes(0);
  }
  else if(x == 5) {//1day
    time1.setMinutes(0);
    time1.setHours(0);
    time2.setHours(23);
    time2.setMinutes(59);
  }
  else if(x == 6) {//2days
    time1.setMinutes(0);
    time1.setHours(0);
    time2.setHours(23);
    time2.setMinutes(59);
    time2.setDate(time1.getDate() + 1);
    
  }
  else if(x == 7) {//10days
    time1.setMinutes(0);
    time1.setHours(0);
    time1.setDate(parseInt(time1.getDate() / 10) + 1);
    time2.setHours(23);
    time2.setMinutes(59);
    time2.setDate(time1.getDate() + 10);
  }
  return ((start >= time1 && start <= time2) || (end >= time1 && end <= time2));
}
)});
  main.variable(observer("height")).define("height", function(){return(
750
)});
  main.variable(observer("drag")).define("drag", ["d3"], function(d3){return(
simulation => {
  
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer("updateDisplay")).define("updateDisplay", function(){return(
function updateDisplay (i) {
 // var i = document.getElementById("btnDelay").value;
  var str = '';
  var range = ["1 min", "5 min", "15 min", "30 min", "1 hour", "2 hour", "4 hour", "6 hour"];
  str =  'range: ' + range[i] + ' snaps';
  document.getElementById("lblDelay").innerHTML = str;
}
)});
  main.variable(observer("Player")).define("Player", ["html","fas","sb","updateDisplay"], function(html,fas,sb,updateDisplay){return(
function Player(
  values,
  {
    format = value => value,
    index = false,
    initial = 0,
    autoplay = true,
    loop = false,
    alternate = false,
    width = 50,
    time = false,
    speedFactor = 1.5,
    debug = false
  } = {}
) {
  const delay0 = 1000;
  const alternate0 = alternate;
  const loop0 = loop;

  values = Array.from(values);
  let idx = initial;
  let isPlay = false;
  let isAlternate = null;
  let delay = 100;
  let isLoop = null;
  let isForward = true;
  let timer = null;
  let t0 = null;
  let t1 = null; 
  var i = 0;
  var speed = [1, 60, 180, 360, 720, 1440, 2880, 14400];
  
  delay = 100;
  const sf = `
    font: 12px var(--sans-serif);
    font-variant-numeric: tabular-nums;
    display: flex;
    height: 33px;
    align-items: center;
  `;

  const icons = {
    play: html`${fas`play`}`,
    pause: html`${fas`pause`}`,
    stop: html`${fas`stop`}`,
    speedUp: html`${fas`chevron-up`}`,
    speedDown: html`${fas`chevron-down`}`,
    toRight: html`${fas`arrow-right`}`,
    toLeft: html`${fas`arrow-left`}`,
    alternate: html`${fas`exchange-alt`}`,
    loop: html`${fas`redo`}`,
    stepRight: html`${fas`step-forward`}`,
    stepLeft: html`${fas`step-backward`}`
  };

  const form = html`  
<form style="${sf}">
  <button name=p type=button style="${sb}">${icons.play}</button>
  <button name=l type=button style="${sb}">${icons.stepLeft}</button>
  <button name=r type=button style="${sb}">${icons.stepRight}</button>
  <button name=u type=button style="${sb}">${icons.speedUp}</button>
  <button name=d type=button style="${sb}">${icons.speedDown}</button>
  <button name=sp type=button style="${sb}">${icons.toRight}</button>
  <button name=sl type=button style="${sb}">${icons.toLeft}</button>
  <button type=button style="display:none;" id = "btnDelay">0</button>

  <label style="display: flex; align-items: center;">
    <input name=i type=range min=0 max=${values.length -
      1} value=${idx} step=1 style="width: ${width}px;">
    <output name=o style="margin-left: 0.4em;">${format(values[idx])}</output>
  </label>
  
</form>
`;
  const h = html`
<form style="display:flex; justify-content:space-between;">
  <div>${form}</div>
  <output name=t style="${sf}"></output>
</form>

<form style="display:flex; justify-content:space-between;height:25px;">
  <div><label id="lblDelay" style="position:absolute;">range: 1 min snaps
</label></div>

<br>
</form>
`;
    
  icons.speedUp.value = 0;
  function log(txt) {
    if (debug) console.log(txt);
  }
  function updateIconP() {
    const before = form.p.firstChild;
    const after = isPlay ? icons.pause : icons.play;
    form.p.replaceChild(after, before);
  }
  function updateForm() {
    form.i.valueAsNumber = idx;
    form.value = values[idx];
    form.o.value = format(form.value, form.i.valueAsNumber, values);
    dispatchEvent();
  }
  
  function dispatchEvent() {
    h.value = index ? idx : values[idx];
    icons.speedUp.value = i;
    h.dispatchEvent(new CustomEvent("input", { bubbles: true }));
  }
  function resetTime() {
    t0 = new Date();
  }
  function clearTime() {
    h.t.value = '';
  }
  function updateTime() {
    const t1 = new Date();
    const dt = (t1.getTime() - t0.getTime()) / 1000;
    if (time) h.t.value = `${dt.toFixed(2)} s`;
  }

  function step() {
    const first = 0;
    const last = values.length - 1;
    let move = true;
    if (isForward) {
      if (idx + speed[i] < last) {
        idx += speed[i];
      } else if (isLoop) {
        if (isAlternate) {
          idx = last - 1;
          isForward = false;
          //updateIconW();
        } else {
          idx = first;
        }
      } else {
        updateIconP();
        move = false;
      }
    } else if (idx - speed[i] > first) {
        idx -= speed[i];
    } else if (isLoop) {
      if (isAlternate) {
        idx = first + 1;
        isForward = true;
        //updateIconW();
      } else {
        idx = last;
      }
    } else {
      move = false;
    }
    if (!move) {
      log('no move');
      clearInterval(timer);
      isPlay = false;
      updateIconP();
    }
    updateForm();
    updateTime();
    log(idx);
  }

  function setTimer() {
    step();
    if (isPlay) timer = setTimeout(setTimer, delay);
  }

  function clickPlayPause() {
    if (isPlay) {
      log('clicked pause');
      isPlay = false;
      clearTimeout(timer);
    } else {
      log('clicked play');
      isPlay = true;
      resetTime();
      if (isForward && idx === values.length - 1) idx = 0;
      if (!isForward && idx === 0) idx = values.length - 1;
      updateIconP();
      setTimer();
    }
    updateIconP();
  }
  function clickStepLeft() {
    log('clicked step left');
    if (!isPlay) {
      if (isForward) {
        isForward = false;
       // updateIconW();
      }
      step();
    }
  }
  function clickStepRight() {
    log('clicked step right');
    if (!isPlay) {
      if (!isForward) {
        isForward = true;
        //updateIconW();
      }
      step();
    }
  }
  function clickSpeedUp() {
    console.log('clicked speed up');
    if (i < 7) { i += 1; }
    icons.speedUp.value = i;
    //updateDelay(i);
    //updateDisplay(i);
    document.getElementById("btnDelay").innerHTML = i;
    document.getElementById("lblDelay").innerHTML = i;
    updateDisplay(i);
    console.log(i);
  }
  function clickSpeedDown() {
    log('clicked speed down');
    if (i > 0) {i -= 1;}
    icons.speedUp.value = i;
    document.getElementById("btnDelay").innerHTML = i;
    document.getElementById("lblDelay").innerHTML = i;
    updateDisplay(i);
    log(delay);
  }
    
  function clickDelayDecrease() {
    delay /= speedFactor;
    console.log("clicked delay decrease");
  }
  function clickDelayIncrease() {
    delay *= speedFactor;
    console.log("clicked delay increase");
  }  
  

  form.p.onclick = clickPlayPause;
  form.l.onclick = clickStepLeft;
  form.r.onclick = clickStepRight;
  form.u.onclick = clickSpeedUp;
  form.d.onclick = clickSpeedDown;
  form.sp.onclick = clickDelayDecrease;
  form.sl.onclick = clickDelayIncrease;

  form.i.oninput = event => {
    console.log('form.i event', event, form.i.valueAsNumber, form.i.value);
    idx = form.i.valueAsNumber;
    updateForm();
  };
  if (autoplay) clickPlayPause();
  dispatchEvent();

  return {first: h, delay: icons.speedUp};
}
)});
  main.variable(observer("getDelay")).define("getDelay", function(){return(
function getDelay() {
  var x = document.getElementById("btnDelay").innerHTML;
 // document.getElementById("lblDelay").value = " changed"
  console.log("button value is " + x);
  return x;
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>p { max-width: none; }</style>`
)});
  main.variable(observer("bgc2")).define("bgc2", function(){return(
"#cdcdcd"
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 175, bottom: 20, left: 187}
)});
  const child1 = runtime.module(define1);
  main.import("style", "faStyle", child1);
  main.variable(observer()).define(["faStyle"], function(faStyle){return(
faStyle({ solid: true })
)});
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  main.variable(observer("fas")).define("fas", function(){return(
function fas(s) {
  return `<i class="fas fa-${String.raw(...arguments)} fa-xs"></i>`;
}
)});
  main.variable(observer("btn")).define("btn", ["html","sb"], function(html,sb){return(
function(x) {
  return html`<button name=p type=button style="${sb}">${x}</button>`;
}
)});
  main.variable(observer("sb")).define("sb", ["bgc"], function(bgc){return(
`
margin-right: 0.3em;
width: 2em;
border-radius:0;
background-color:${bgc};
border: 1px solid #bbb;
outline: none
`
)});
  main.variable(observer("bgc")).define("bgc", function(){return(
"#f5f5f5"
)});
  return main;
}
