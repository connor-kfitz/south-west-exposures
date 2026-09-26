export default function AboutHeader() {
  return (
    <header className="flex flex-col gap-6 sm:gap-4 max-w-[763px]">
      <h1 className="flex flex-col gap-4 text-d3 max-sm:text-[41px]! max-sm:leading-[44px]! font-bold text-gray-900 sm:gap-0">
        <span>Driven by<br className="hidden max-[479px]:inline"/> purpose</span>
        <span>Defined by<br className="hidden max-[479px]:inline"/> <span className="text-violet-600">expertise</span></span>
      </h1>
      <p className="text-b5 text-gray-900 max-sm:text-gray-600">
        We bring together science, design, and experience to make radiation protection safer and smarter.
      </p>
    </header>
  );
}
