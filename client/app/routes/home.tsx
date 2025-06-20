import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cardume!" },
    { name: "description", content: "Construa e gerencie seu kanban!" },
  ];
}

export default function Home() {
  return (
    <div className="container-fluid d-flex vw-10 vh-100 bg-dark text-light align-items-end p-4">
      <div className="col-12 col-sm-8">
        <h1 className="display-3 mb-5">Bem vindo a nossa página inicial</h1>
        <div className="d-flex gap-3 mb-5">
          <Link className="btn btn-outline-light btn-lg text-decoration-none" to="/sign-up">Cadastre-se</Link>
          <Link className="btn btn-outline-light btn-lg text-decoration-none" to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}
