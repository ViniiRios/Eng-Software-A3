export default function Login() {
    return (
        <div className="container-fluid d-flex vw-10 vh-100 bg-dark align-items-center justify-content-center p-4">
            <div className="bg-white rounded p-3">
                <h2 className="mb-3">Login</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary px-3">Entrar</button>
                </form>
            </div>
        </div>
    )
}