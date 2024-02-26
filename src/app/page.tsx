import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <p>Hello Board!</p>
      <UserButton />
    </main>
  );
}
