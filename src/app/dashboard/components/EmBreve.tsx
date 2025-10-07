export default function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20 w-full">
      <img
        src="/assets/app.svg"
        alt="Em breve"
        className="w-64 h-64 mb-8 opacity-80"
      />
      <h1 className="text-3xl font-bold text-purple-700 mb-2">{titulo}</h1>
      <p className="text-gray-500">Estamos trabalhando nessa funcionalidade 🚀</p>
    </div>
  );
}
