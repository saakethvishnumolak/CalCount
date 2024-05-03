import { Link } from "react-router-dom"

export default function notFound()
{
    return (
        <section className="container nf">
            <div className="not-found">
                <h1>404 | That's an error!</h1>
                <p><Link to="/register">Register</Link> Now to Use</p>
            </div>
        </section>
        
    )
}