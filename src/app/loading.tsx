export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center pt-24">
      <div className="flex items-center gap-2" aria-label="Loading">
        {["bg-cobalt", "bg-navy", "bg-butter"].map((c, i) => (
          <span key={c} className={`h-4 w-4 animate-bounce rounded-full ${c}`} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}
