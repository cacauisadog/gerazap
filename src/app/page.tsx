"use client";

import { useMemo, useState } from "react";
import CopyIcon from "./ui/icons/CopyIcon";

const invalidDDDNumbers = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "20",
  "23",
  "25",
  "26",
  "29",
  "30",
  "36",
  "39",
  "40",
  "50",
  "52",
  "56",
  "57",
  "58",
  "59",
  "60",
  "70",
  "72",
  "76",
  "78",
  "80",
  "90",
];

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [copyClicked, setCopyClicked] = useState(false);
  const [copyError, setCopyError] = useState("");

  const maskedPhoneNumber = useMemo(() => {
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
  }, [phone]);

  function validatePhone() {
    const phoneNumbers = phone.replace(/\D/g, "");
    const phoneLength = phoneNumbers.length;
    if (phoneLength < 11) {
      setPhoneError("Número de telefone inválido.");
      return false;
    }
    if (phoneNumbers[0] === "0") {
      setPhoneError("Número de telefone inválido.");
      return false;
    }
    const ddd = phoneNumbers.slice(0, 2);
    if (invalidDDDNumbers.includes(ddd)) {
      setPhoneError("DDD inválido.");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (!validatePhone()) {
      return;
    }
    setPhoneError("");
    setCopyClicked(false);
    const phoneNumbers = phone.replace(/\D/g, "");
    let url = `https://wa.me/55${phoneNumbers}`;
    if (message) {
      url += `?text=${encodeURIComponent(message)}`;
    }
    setLink(url);
  }

  async function handleClickCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopyClicked(true);
    } catch (error: DOMException | any) {
      setCopyError(error.message);
    }
  }

  return (
    <main className="flex justify-center min-h-screen pt-5">
      <div className="flex flex-col gap-8 w-full max-w-lg px-4">
        <h1 className="text-4xl text-center text-green-500">
          <b>Gerazap</b>
        </h1>
        <h2 className="text-2xl text-center text-green-800">
          Gerador de links para WhatsApp <i>grátis</i>.
        </h2>

        <form className="flex flex-col items-center justify-center gap-3 w-full">
          <input
            type="tel"
            placeholder="(99) 9 9999-9999"
            maxLength={16}
            required
            className="rounded shadow shadow-gray-400 px-4 py-2 w-full max-w-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={maskedPhoneNumber}
            onChange={(event) => setPhone(event.target.value)}
          />
          {phoneError.length > 0 && (
            <span className="text-red-500 text-sm self-start mb-4">
              {phoneError}
            </span>
          )}
          <textarea
            placeholder="Mensagem (opcional)"
            maxLength={500}
            className="rounded shadow shadow-gray-400 px-4 py-2 w-full max-w-lg h-full min-h-64 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(event) => setMessage(event.target.value)}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded border border-green-500 w-full max-w-lg bg-green-500 text-white py-3 shadow shadow-gray-500 font-bold hover:bg-green-600 transition-colors duration-300 focus:ring-2 focus:ring-green-800 focus:outline-none"
            aria-label="Gerar link"
          >
            Gerar link
          </button>
        </form>

        {link && phoneError.length === 0 && (
          <div>
            <button
              className="flex justify-between gap-2 bg-green-50 rounded shadow shadow-gray-400 px-4 py-2 w-full max-w-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              aria-label="Copiar link gerado"
              onClick={handleClickCopy}
            >
              <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {link}
              </span>
              <CopyIcon className="w-6 h-6 flex-none" />
            </button>
            {copyClicked && copyError.length === 0 && (
              <span className="text-green-500 text-sm self-start mt-4">
                Link copiado!
              </span>
            )}
            {copyError.length > 0 && (
              <span className="text-red-500 text-sm self-start mt-4">
                {copyError}
              </span>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
