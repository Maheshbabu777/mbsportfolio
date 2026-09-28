// Wrap the few words that matter in *asterisks* in data.js and they render in the italic serif accent.
const Rich = ({ text }) =>
  text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i} className="accent">{part.slice(1, -1)}</em> : part
  );

export default Rich;
