import { useEffect, useState } from "react";
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
        <div className="container-fluid d-flex vw-10 vh-100 bg-light align-items-end p-4 pb-0 overflow-x-auto overflow-y-hidden gap-3">
                {
                    pipes.map(({name, cards}, pipeIndex) => 
                        <div key={pipeIndex} className="bg-light p-3 pb-0 rounded d-flex flex-column h-100 flex-shrink-0" style={pipeStyling}>
                            <h2 className="h5 m-0 text-capitalize">{name}</h2>
                            <hr className="mt-2 mb-0 mx-0 border-primary border-bottom border-2"/>
                            <div className="d-flex pt-4 flex-column overflow-y-auto flex-grow-1 gap-3">
                                {
                                    cards.map((card, cardIndex) => <Card key={cardIndex} title={card.title} description={card.description} />)
                                }
                            </div>
                        </div>
                    )
                }
        </div>
    )
}

type IPipeArray = Array<{name: string, cards: Array<{title: string, description: string}>}>