'use client'; // Add this at the very top

export default function RegisterButton() {
  return (
    <button
      onClick={() => window.open("https://register.wada.org", "_blank")}
      className="flex flex-row gap-2 items-center justify-center bg-wada-a/60 border-2 border-wada-a text-white font-bold px-6 py-[0.5rem] rounded-full cursor-pointer hover:scale-105 transition duration-200"
    >
      REGISTER
    </button>
  );
}
