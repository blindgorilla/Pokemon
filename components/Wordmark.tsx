/**
 * Original wordmark: "BUY OR PASS", with the pivot word carrying the accent so
 * the decision itself reads as the brand.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`text-[0.9375rem] font-bold tracking-[0.14em] text-bone-50 sm:text-base ${className}`}
    >
      BUY <span className="font-medium text-accent">OR</span> PASS
    </span>
  );
}
