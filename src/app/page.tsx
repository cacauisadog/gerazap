"use client";

import { useMemo, useState } from "react";
import GithubIcon from "./ui/icons/GithubIcon";

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
  const [link, setLink] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [copyClicked, setCopyClicked] = useState(false);
  const [hasCopyError, setHasCopyError] = useState(false);

  const maskedPhoneNumber = useMemo(() => {
    const phoneLength = phone.length;
    if (phoneLength === 0) {
      return phone;
    }
    if (phoneLength <= 2) {
      return `(${phone}`;
    }
    if (phoneLength <= 3) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    }
    if (phoneLength <= 7) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3)}`;
    }
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  }, [phone]);

  function validatePhone() {
    const phoneLength = phone.length;
    if (phoneLength === 0) {
      setPhoneError("Número de telefone é obrigatório.");
      return false;
    }
    if (phoneLength < 11) {
      setPhoneError("Número de telefone inválido.");
      return false;
    }
    if (phone[2] !== "9") {
      setPhoneError("Celulares precisam ter o dígito 9.");
      return false;
    }
    const ddd = phone.slice(0, 2);
    if (invalidDDDNumbers.includes(ddd)) {
      setPhoneError("DDD inválido.");
      return false;
    }
    clearErrors();
    return true;
  }

  function clearErrors() {
    setPhoneError("");
    setHasCopyError(false);
  }

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    if (!validatePhone()) {
      return;
    }
    clearErrors();
    let url = `https://wa.me/55${phone}`;
    if (message.length > 0) {
      url += `?text=${encodeURIComponent(message)}`;
    }
    setLink(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopyClicked(true);
    } catch (error: unknown) {
      console.error(error);
      setHasCopyError(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center space-between p-4">
      <main className="flex justify-center">
        <div className="flex flex-col space-y-6 w-full max-w-lg">
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
              onBlur={validatePhone}
              onChange={(event) =>
                setPhone(event.target.value.replace(/\D/g, ""))
              }
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
              className="flex rounded border border-green-500 w-full max-w-lg bg-green-500 text-white py-3 shadow shadow-gray-500 font-bold hover:bg-green-600 transition-colors duration-300 focus:ring-2 focus:ring-green-800 focus:outline-none"
              aria-label="Gerar link"
            >
              <span className="flex-1">Gerar e copiar link!</span>
            </button>
          </form>

          {!hasCopyError && copyClicked && phoneError.length === 0 && (
            <p className="text-xl text-center text-green-500 mt-4">
              O link foi gerado e já está copiado para você! Agora basta apenas
              colar e usá-lo onde quiser :)
            </p>
          )}

          {hasCopyError && copyClicked && phoneError.length === 0 && (
            <p className="text-al text-center mt-4">
              Algo deu errado ao copiar o link, mas ele foi gerado e você pode
              copiá-lo manualmente:
              <br />
              <br />
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 max-w-full underline break-all whitespace-pre-wrap hover:text-blue-700"
              >
                {link}
              </a>
            </p>
          )}
        </div>
      </main>
      <footer className="flex flex-col items-center justify-center text-center mt-5">
        <p className="text-sm text-gray-400 mb-1">
          Este site não utiliza <strong>nenhum tipo de cookie</strong> e não
          coleta <strong>nenhum dado</strong> inserido nele e nem de seus
          usuários.
        </p>
        <a
          href="https://github.com/cacauisadog/gerazap"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full hover:bg-gray-200 p-2"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      </footer>
    </div>
  );
}
