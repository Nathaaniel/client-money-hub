/* Small building blocks shared by every page. */
import { sectorLabel } from "../config.js";

/* tone: "ok" (green), "brand" (blue), "warn" (amber), "bad" (red), or empty (grey). */
export function Pill({ tone, children }) {
  return <span className={tone ? `pill ${tone}` : "pill"}>{children}</span>;
}

export function List({ items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="list">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
}

/* Page heading: eyebrow (section name), title, one-line key message and an intro. */
export function PageHead({ eyebrow, title, keyMessage, intro, children }) {
  return (
    <div className="panel-head">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {keyMessage && <p className="key">{keyMessage}</p>}
      {intro && <p>{intro}</p>}
      {children}
    </div>
  );
}

export function Section({ title, intro, className = "", children }) {
  return (
    <div className={`section ${className}`.trim()}>
      {(title || intro) && (
        <header>
          {title && <h3>{title}</h3>}
          {intro && <p>{intro}</p>}
        </header>
      )}
      {children}
    </div>
  );
}

/* tone: "warn", "brand" or empty. */
export function Callout({ tone, title, children }) {
  return (
    <div className={tone ? `callout ${tone}` : "callout"}>
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
}

/* A row of toggle buttons. items: [{ key, label }]. */
export function Chips({ items, value, onChange }) {
  return (
    <div className="chips">
      {items.map(item => (
        <button
          key={item.key}
          type="button"
          className={item.key === value ? "chip is-on" : "chip"}
          aria-pressed={item.key === value}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* A scrollable data table. rows: arrays of cells (text or elements). */
export function Table({ head, rows, plain = false }) {
  return (
    <div className="table-wrap">
      <table className={plain ? "data plain" : "data"}>
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* "Showing Lettings." note for pages that follow the sector selector. */
export function LensNote({ sector, text, as: Tag = "p" }) {
  return (
    <Tag className="lens-note">
      Showing <b>{sectorLabel(sector)}</b>.{text ? ` ${text}` : ""}
    </Tag>
  );
}
