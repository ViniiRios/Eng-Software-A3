import { useEffect, useState } from "react";
import { Link } from "react-router";
import Card from "~/components/Card";

async function getPipeInformation(): Promise<{id: number, title: string}[]> {
    const request = await fetch(`http://localhost:3000/pipes`)
    const response = request.json();
    return response
}

async function getAllTasksForPipe(pipeId: number) {
    const request = await fetch(`http://localhost:3000/tasks?pipe_id=${pipeId}`)
    let response = await request.json() as {title: string, description: string, id: number}[];
    return {pipeId, response}
}

const pipeStyling = {
    width: "400px"
}
export default function Kanban() {
    const [pipes, setPipes] = useState([] as IPipeArray);
    /** Call callback function on component load, and only once because of the [""] value */
    useEffect(() => {
        getPipeInformation()
        .then(_pipes => {
            const _pipesMap = new Map()
            _pipes.forEach(pipe => _pipesMap.set(pipe.id, pipe))
            const requests = _pipes.map(pipe => getAllTasksForPipe(pipe.id));
            Promise.all(requests)
            .then((tasks) => {
                tasks.forEach(({pipeId, response}) => {
                    const pipeData = _pipesMap.get(pipeId)
                    pipeData.cards = response;
                })
                const data = Array.from(_pipesMap, ([key, value]) => (value))
                setPipes(data)
            })
        })
    }, [""])
    return (
        <div className="vw-100 vh-100 d-flex flex-column bg-light">
            <div className="d-flex gap-3 p-4 w-100 justify-content-end">
                <Link to="/pipe/new" className="d-block text-end">
                    <button className="btn btn-sm px-3 py-1 btn-outline-secondary">Criar Pipe</button>
                </Link>
                <Link to="/task/new" className="d-block text-end">
                    <button className="btn btn-sm px-3 py-1 btn-outline-secondary">Criar Task</button>
                </Link>

            </div>
            <div className="container-fluid d-flex bg-light align-items-end p-4 pt-0 pb-0 overflow-x-auto overflow-y-hidden gap-3">
                    {
                        pipes.map(({name, cards}, pipeIndex) => 
                            <div key={pipeIndex} className="bg-light p-3 pb-0 rounded d-flex flex-column h-100 flex-shrink-0" style={pipeStyling}>
                                <div className="d-flex justify-content-between">
                                    <h2 className="h5 m-0 text-capitalize">{name}</h2>
                                </div>
                                <hr className="mt-2 mb-0 mx-0 border-primary border-bottom border-2"/>
                                <div className="d-flex pt-4 flex-column overflow-y-auto flex-grow-1 gap-3">
                                    {
                                        cards.map((card, cardIndex) => (
                                            <Link key={cardIndex} className="text-decoration-none" to={`/task/${card.id}`}>
                                                <Card key={cardIndex} title={card.title} description={card.description} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

type IPipeArray = Array<{name: string, cards: Array<{id: number, title: string, description: string}>}>