import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className=" text-center my-4 bg-red-200 text-red-700 font-bold p-3 text-sm">
      {children}
    </div>
  );
}
