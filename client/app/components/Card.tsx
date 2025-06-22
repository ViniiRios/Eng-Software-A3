export default function Card({title, description} = {title: "", description: ""}) {
    return (
        <div className="task w-100">
            <h3 className="fw-semibold fs-6">{title}</h3>
            <p className="small mb-2">{description}</p>
        </div>
    )
}