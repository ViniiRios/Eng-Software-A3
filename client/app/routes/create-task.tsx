import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"

async function getTaskStatus() {
    const request = await fetch(`http://localhost:3000/status`);
    const response = await request.json();
    return response
}

async function getUsers() {
    const request = await fetch(`http://localhost:3000/users`);
    const response = await request.json();
    return response
}

async function getPipes() {
    const request = await fetch(`http://localhost:3000/pipes`);
    const response = await request.json();
    return response
}

export default function CreateTask() {
    async function create() {
        const request = await fetch(`http://localhost:3000/tasks/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                statusId: status,
                pipeId: pipe,
                ownerId: owner
            })
        });
        const response = await request.json();
        await navigate(`/task/${response.id}`)
    }
    const navigate = useNavigate();
    const [statusList, setStatusList] = useState([] as IStatus[]);
    const [userList, setUserList] = useState([] as IOwner[]);
    const [pipeList, setPipeList] = useState([] as IPipe[]);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [pipe, setPipe] = useState("");
    const [owner, setOwner] = useState("");
    useEffect(() => {
        getTaskStatus().then(statusList => {
            setStatusList(statusList);
        })
        getUsers().then(userList => setUserList(userList))
        getPipes().then(pipeList => setPipeList(pipeList))

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
                            <option selected disabled>Selecione...</option>
                            {pipeList.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                        </select>
                    </div>
                    <div className="col-12 col-sm-6 ps-2">
                        <label className="form-label" htmlFor="status">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select" id="status">
                            <option selected disabled>Selecione...</option>
                            {statusList.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
                    <button onClick={() => create()} className="btn btn-primary">Criar Task</button>
                </div>
            </div>
        </div>
    )
}


type IPipe = {
    id: number,
    name: string
}
type IStatus = {
    id: number,
    name: string
}
type IOwner = {
    id: number,
    name: string,
    email: string,
}
type ITask = {
    id: number,
    title: string,
    description: string,
    fk_status: number,
    fk_pipe: number,
}
