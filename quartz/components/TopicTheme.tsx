import { QuartzComponent, QuartzComponentProps } from "./types"

/**
 * TopicTheme — Intelligent Folder-Based Theme Router
 *
 * Reads the current page's slug to extract the root folder segment,
 * then injects a `data-topic` attribute onto `<html>` on every page
 * navigation (SPA-safe via the "nav" event).
 *
 * Supported topics: engineering | projects | canvas | orbit | log | default
 */

const TOPIC_MAP: Record<string, string> = {
  engineering: "engineering",
  projects: "projects",
  canvas: "canvas",
  orbit: "orbit",
  log: "log",
}

const TopicTheme: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const rootSegment = slug.split("/")[0] ?? ""
  const topic = TOPIC_MAP[rootSegment] ?? "default"

  return (
    <div
      id="topic-meta"
      data-topic={topic}
      style="display:none;position:absolute;pointer-events:none;"
      aria-hidden="true"
    />
  )
}

TopicTheme.css = `
  #topic-meta { display: none !important; }
`

TopicTheme.afterDOMLoaded = `
(function() {
  const TOPIC_MAP = {
    engineering: "engineering",
    projects: "projects",
    canvas: "canvas",
    orbit: "orbit",
    log: "log",
  };

  function applyTopic() {
    const meta = document.getElementById("topic-meta");
    const topic = meta ? (meta.dataset.topic || "default") : "default";
    const html = document.documentElement;
    const prev = html.dataset.topic;
    if (prev !== topic) {
      html.dataset.topic = topic;
    }
  }

  // Apply immediately on first load
  applyTopic();

  // Re-apply on every SPA navigation
  document.addEventListener("nav", applyTopic);
})();
`

export default TopicTheme
