export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block mb-4">SAKAMORI</span>
            <span className="block text-indigo-600 text-2xl sm:text-3xl md:text-4xl">
              酒類小売業者向け統合管理システム
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-base text-gray-500 sm:text-lg md:text-xl leading-relaxed">
            ライセンス管理、在庫管理、売上管理を一元化。
            <br className="hidden sm:block" />
            あなたのビジネスの効率化をサポートします。
          </p>
        </div>
      </div>
    </div>
  );
}
