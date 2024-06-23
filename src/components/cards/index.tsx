"use client";

import React from "react";

interface countProps {
  id?: number | string;
  label: string;
  count: number;
}

const CounterCard = ({ count, label }: countProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;

    const rect = target?.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--border--x", `${x}px`);
    target.style.setProperty("--border--y", `${y}px`);
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative max-[410px]:min-w-[70px] w-full sm:max-w-[214px] sm:h-[148px] flex justify-center items-center border-gray-300 border rounded-md sm:rounded-2xl all-card min-[500px]:p-[1px] select-none"
    >
      <div className="card-border" />
      <div className="card-content  w-full h-full flex justify-center items-center flex-col gap-y-2 py-2 sm:gap-y-4 bg-white p-1">
        <span className="font-semibold text-2xl sm:text-5xl text-primary">
          {count < 10 ? `0${count}` : count}
        </span>
        <span className="font-medium text-[12px] sm:text-lg text-primary">
          {label}
        </span>
      </div>
    </div>
  );
};

export { CounterCard };
