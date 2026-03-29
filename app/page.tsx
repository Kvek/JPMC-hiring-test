import data from "@/sampleData.json";
import { Table } from "./Table";
import type { Instrument } from "./Table/types";

export default async function Home() {
  return (
    <main className="flex h-screen w-full p-4">
      <div className="p-4">
        <Table data={data as Instrument[]} />
      </div>
    </main>
  );
}
