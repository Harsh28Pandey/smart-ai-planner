import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-3xl px-10 py-4 flex justify-between items-center transition-all duration-300">

            <Link to="/" className="text-2xl font-extrabold bg-linear-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer">
                AI Study Planner
            </Link>

            <div className="hidden md:flex space-x-10 font-medium text-gray-300">
                {[
                    { name: "Home", path: "/" },
                    { name: "Features", path: "/features" },
                    { name: "About", path: "/about" },
                    { name: "Contact", path: "/contact" },
                ].map((item, i) => (
                    <Link key={i} to={item.path} className="relative hover:text-white transition-all duration-300 cursor-pointer group">
                        {item.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-yellow-400 via-orange-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex space-x-4">
                <button className="text-yellow-400 hover:text-white transition cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

                <button className="px-6 py-2 rounded-xl bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                    onClick={() => navigate("/signup")}
                >
                    Get Started
                </button>
            </div>

        </nav>
    );
};

export default Navbar;