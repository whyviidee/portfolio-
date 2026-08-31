export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { overflow: hidden !important; margin: 0; padding: 0; }`}</style>
      {children}
    </>
  );
}
