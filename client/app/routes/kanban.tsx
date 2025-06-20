import Card from "~/components/Card";

async function getPipeInformation() {
    const request = await fetch(`http://localhost:3000/pipes`)
    const response = request.json();
    return response
}

async function getAllCardsOrderedByPipe() {
    const request = await fetch(`http://localhost:3000/tasks`)
    let response = await request.json();
    return response
}

const pipeStyling = {
    width: "400px"
}
export default async function Kanban() {
    let cards = [
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        },
        {
            title: "title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo, amet inventore modi iusto voluptatem ratione, quam vel corporis qui impedit, ipsa sapiente necessitatibus sit? Obcaecati explicabo reprehenderit est nihil."
        }
    ]
    return (
        <div className="container-fluid d-flex vw-10 vh-100 bg-light align-items-end p-4 overflow-x-visible gap-3">
                <div className="bg-light p-3 rounded d-flex flex-column h-100" style={pipeStyling}>
                    <h2 className="h5 m-0">Teste</h2>
                    <hr className="mt-2 mb-4 mx-0 border-primary border-bottom border-2"/>
                    <div className="d-flex flex-column overflow-y-auto flex-grow-1 gap-3">
                        {
                            cards.map((card, index) => <Card key={index} title={card.title} description={card.description} />)
                        }
                    </div>
                </div>
        </div>
    )
}