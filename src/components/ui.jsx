/* Small building blocks shared by the views. */

/* Page heading: eyebrow, title, one-line key message and an intro. */
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
