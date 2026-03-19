import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      {children}
    </div>
  );
}

export default Container;