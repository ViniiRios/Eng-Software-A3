export default function Card({title, description} = {title: "", description: ""}) {
    return (
        <div className="p-3 shadow-sm rounded-3 w-100 border">
            <h3 className="fw-semibold fs-6">{title}</h3>
            <p className="small mb-2">{description}</p>
        </div>
    )
}