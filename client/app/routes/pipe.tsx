import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"

async function getPipeById(): Promise<IPipe | boolean> {
    let response = false
    try {
        const request = await fetch(`http://localhost:3000/pipes/${id}`)
        response = await request.json();
    }
    catch(e) {
        console.error(e)
    }
    return response;
}

export default function Pipe() {
    async function updatePipe() {
        const request = await fetch(`http://localhost:3000/pipes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name})
        });
    }
    async function deletePipe() {
        const request = await fetch(`http://localhost:3000/pipes/${id}`, {
            method: "DELETE"
        });
        const response = await request.json();
        if(response === true) return navigate("/kanban/")
        alert("Houve algum erro, tente novamente")
    }
    const {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    
    useEffect(() => {
        if(!id) return;
        getPipeById(id).then((data: boolean | IPipe)=> {
            if(data === false) return;
            console.log({data})
            setName(data.name);
        })

    }, [""])
    return (
        <div className="container vw-100 vh-100 d-flex flex-column overflow-y-auto overflow-x-hidden">
            <div className="my-4">
                <Link className="text-decoration-none" to="/kanban/">Voltar para o Kanban</Link>
            </div>
            <div className="row m-auto">
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Titulo</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" id="title" placeholder="Escreva o titulo"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows={5} placeholder="Escreva a descrição"></textarea>
                </div>
                <div className="mb-3 d-flex flex-wrap">
                    <div className="col-12 col-sm-6 pe-2">
                        <label className="form-label" htmlFor="pipe">Coluna</label>
                        <select value={pipe} onChange={(e) => setPipe(e.target.value)} className="form-select" id="pipe">
                            {pipeList.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                        </select>
                    </div>
                    <div className="col-12 col-sm-6 ps-2">
                        <label className="form-label" htmlFor="status">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select" id="status">
                            {statusList.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
                    <button onClick={() => deletePipe()} className="btn btn-outline-danger">Deletar Pipe</button>
                    <button onClick={() => updatePipe()} className="btn btn-primary">Salvar Pipe</button>
                </div>
            </div>
        </div>
    )
}


type IPipe = {
    id: number,
    name: string
}