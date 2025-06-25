import { useState } from "react"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    async function submitLogin() {
        try {
            const request = await fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            const response = await request.json();
            if(response == false) {
                setShowErrorMessage(true);
                return;
            }
        }
        catch(e) {
            setShowErrorMessage(true);
            return
        }
    }

    return (
        <div className="container-fluid d-flex vw-10 vh-100 bg-dark align-items-center justify-content-center p-4">
            <div className="bg-white rounded p-3">
                <h2 className="mb-3">Login</h2>
                <form action="#">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" id="email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" id="password" />
                    </div>
                    <button onClick={submitLogin} type="submit" className="btn btn-primary px-3">Entrar</button>
                    { showErrorMessage ?
                        <div>
                            <small className="text-danger">Usuário ou senha incorreta</small>
                        </div>
                        : null
                    }
                </form>
            </div>
        </div>
    )
}