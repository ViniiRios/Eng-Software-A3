import { useEffect, useState } from "react";
import { useParams } from "react-router"

async function getTaskData(taskId: string) {
    let response = false
    try {
        const request = await fetch(`http://localhost:3000/tasks/${taskId}`)
        response = await request.json();
    }
    catch(e) {
        console.error(e)
    }
    return response;
}

async function getTaskStatus() {
    return [
        {
            id: 1,
            name: "Pendente"
        },
        {
            id: 2,
            name: "Feito"
        }
    ]
}

export default function Task() {
    async function updateTask() {
        console.log({title, description, status, owner})
    }

    const {id} = useParams();
    const [statusList, setStatusList] = useState([] as IStatus[]);
    const [ownerList, setOwnerList] = useState([] as IOwner[]);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [owner, setOwner] = useState("");
    useEffect(() => {
        if(!id) return;
        // getTaskData(id).then(data => {})
        getTaskStatus().then(statusList => {
            setStatusList(statusList);
        })
    }, [""])
    return (
        <div className="container vw-100 vh-100 d-flex flex-column overflow-y-auto overflow-x-hidden">
            <div className="row m-auto">
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Titulo</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" id="title" placeholder="Escreva o titulo"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows={5} placeholder="Escreva a descrição"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select" id="status">
                        {statusList.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="owner">Responsável</label>
                    <select value={owner} onChange={(e) => setOwner(e.target.value)} className="form-select" id="owner">
                        {ownerList.map(({email, id}) => <option key={id} value={id}>{email}</option>)}
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
                    <button className="btn btn-outline-danger">Deletar Task</button>
                    <button onClick={() => updateTask()} className="btn btn-primary">Salvar Task</button>
                </div>
            </div>
        </div>
    )
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