import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen text-white bg-black">
      <div className="w-full max-w-[600px] mx-auto px-4 md:px-0">
        <h1 className="mb-4 text-4xl md:text-6xl leading-tight">
          The best Journal app, period.
        </h1>
        <p className="mb-4 text-base md:text-2xl text-white/60 leading-relaxed">
          This is the best app for tracking your mood throughout your life. All
          you have to do is be honest.
        </p>
        <div>
          <Link href="/journal">
            <button className="w-full md:w-auto px-4 py-3 text-base md:text-xl bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
