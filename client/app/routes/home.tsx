import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cardume!" },
    { name: "description", content: "Construa e gerencie seu kanban!" },
  ];
}

export default function Home() {
  return (
    <div className="container-fluid">
      
    </div>
  )
}
