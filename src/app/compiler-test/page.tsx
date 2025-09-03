"use client";

import { useState } from "react";

export default function CompilerTestPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Este componente se volverá a renderizar cuando cambie 'count'
  // Pero ChildComponent no debería volver a renderizarse si 'name' cambia
  // gracias a las optimizaciones del React Compiler
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">React Compiler Test</h1>
      <div className="mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count + 1)}
        >
          Increment Count: {count}
        </button>
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <ChildComponent name={name} />
    </div>
  );
}

// Este componente hijo no debería volver a renderizarse cuando 'name' cambia
// si el React Compiler está funcionando correctamente
function ChildComponent({ name }: { name: string }) {
  console.log("ChildComponent renderizado");
  
  // Operación que sería costosa sin memoización
  const expensiveValue = Array(1000)
    .fill(0)
    .map((_, i) => `Item ${i}: ${name}`)
    .join(", ");

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold">Child Component</h2>
      <p>Name: {name}</p>
      <p>Expensive value length: {expensiveValue.length}</p>
    </div>
  );
}