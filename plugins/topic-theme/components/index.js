// Topic Theme Router — Local Quartz Plugin
// Reads each page's slug to extract the root folder, then injects
// a data-topic attribute onto <html> for palette-based CSS switching.

/** @type {import('../../quartz/components/types').QuartzComponent} */
const TopicTheme = (props) => {
  const slug = props.fileData?.slug ?? ""
  const rootSegment = slug.split("/")[0] ?? ""
  const TOPIC_MAP = {
    engineering: "engineering",
    projects: "projects",
    canvas: "canvas",
    orbit: "orbit",
    log: "log",
  }
  const topic = TOPIC_MAP[rootSegment] ?? "default"

  // We use preact's h() — Quartz provides it globally in JSX context
  // Using raw object return for maximum compatibility
  return {
    type: "element",
    tagName: "div",
    properties: {
      id: "topic-meta",
      "data-topic": topic,
      style: "display:none;position:absolute;pointer-events:none;",
      "aria-hidden": "true",
    },
    children: [],
  }
}

TopicTheme.displayName = "TopicTheme"

TopicTheme.css = `#topic-meta { display: none !important; }`

TopicTheme.afterDOMLoaded = `
(function() {
  var TOPIC_MAP = {
    engineering: "engineering",
    projects: "projects",
    canvas: "canvas",
    orbit: "orbit",
    log: "log"
  };

  function applyTopic() {
    var meta = document.getElementById("topic-meta");
    var topic = (meta && meta.dataset && meta.dataset.topic) ? meta.dataset.topic : "default";
    var html = document.documentElement;
    if (html.dataset.topic !== topic) {
      html.dataset.topic = topic;
    }
  }

  applyTopic();
  document.addEventListener("nav", applyTopic);
})();
`

export { TopicTheme }
export default TopicTheme
