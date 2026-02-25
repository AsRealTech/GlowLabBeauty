// Render Navigation
export function RenderNavigation() {
    return (

        <nav>
            <a href="/" className="logo" style={{fontSize:"20px"}}>GlowLab Beauty</a>
            <ul style={{display:"flex", gap:"20px"}}>
                <li><a href="/">Home</a></li>
                <li><a href="#ingredients">Ingredients</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#tips">Tips</a></li>
                <li><a href="#">About</a></li> 
                <li><a href="/login">Login</a></li> 
            </ul>   
        </nav>
    
    )
}