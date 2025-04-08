import { useState } from "react";

export function Tabs({ tabs, onTabChange }) {
  const [active, setActive] = useState(tabs[0].value);
  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => { setActive(tab.value); onTabChange(tab.value); }}
          className={active === tab.value ? "font-bold underline" : "text-gray-500"}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}