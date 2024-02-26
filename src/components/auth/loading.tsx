import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Loading"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
}
