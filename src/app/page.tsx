import PolicyList from "@/components/PolicyList";
import generateMockPolicy from "@/utils/generateMockPolicy";
import Link from "next/link";

export default function Home() {
  const policies = Array.from({ length: 5 }, () => generateMockPolicy());
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <PolicyList policies={policies} />
    </div>
  );
}
