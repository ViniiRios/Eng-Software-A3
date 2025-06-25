import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"

export default function CreatePipe() {
    async function create() {
        const request = await fetch(`http://localhost:3000/pipes/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name})
        });
        const response = await request.json();
        await navigate(`/pipe/${response.id}`)
    }
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    return (
        <div className="container vw-100 vh-100 d-flex flex-column overflow-y-auto overflow-x-hidden">
            <div className="my-4">
                <Link className="text-decoration-none" to="/kanban/">Voltar para o Kanban</Link>
            </div>
            <div className="row m-auto">
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Nome da coluna</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text" id="title" placeholder="Escreva o nome"/>
                </div>
                <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
                    <button onClick={() => create()} className="btn btn-primary">Criar nova Coluna</button>
                </div>
            </div>
        </div>
    )
}