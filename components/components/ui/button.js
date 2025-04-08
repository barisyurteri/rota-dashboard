export function Button({ children, className, ...props }) {
  return <button {...props} className={`bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 ${className}`}>{children}</button>;
}