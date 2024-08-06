"use client";

import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function maskPhone(phone: string) {
    const phoneNumbers = phone.replace(/\D/g, "");
    const phoneLength = phoneNumbers.length;
    if (phoneLength <= 2) {
      return phoneNumbers;
    }
    if (phoneLength <= 3) {
      return `(${phoneNumbers.slice(0, 2)})${phoneNumbers.slice(2)}`;
    }
    if (phoneLength <= 7) {
      return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 3)} ${phoneNumbers.slice(3)}`;
    }
    return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 3)} ${phoneNumbers.slice(3, 7)}-${phoneNumbers.slice(7, 11)}`;
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const phoneNumbers = phone.replace(/\D/g, "");
    let url = `https://wa.me/55${phoneNumbers}`;
    if (message) {
      url += `?text=${encodeURIComponent(message)}`;
    }
    console.log(url);
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-10 w-full max-w-lg px-4">
        <h1 className="text-4xl text-center text-green-500">
          <b>Gerazap</b>
        </h1>
        <h2 className="text-2xl text-center text-green-800">
          Gerador de links para WhatsApp <i>grátis</i>
        </h2>

        <form className="flex flex-col items-center justify-center gap-3 w-full">
          <input
            type="tel"
            placeholder="(99) 9 9999-9999"
            maxLength={16}
            required
            className="rounded shadow shadow-gray-400 px-4 py-2 w-full max-w-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={maskPhone(phone)}
            onChange={(event) => setPhone(event.target.value)}
          />
          <textarea
            placeholder="Mensagem (opcional)"
            maxLength={50}
            className="rounded shadow shadow-gray-400 px-4 py-2 w-full max-w-lg resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(event) => setMessage(event.target.value)}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded border border-green-500 w-full max-w-lg bg-green-500 text-white py-3 shadow shadow-gray-500 font-bold hover:bg-green-600 transition-colors duration-300"
          >
            Gerar link
          </button>
        </form>
      </div>
    </main>
  );
}
