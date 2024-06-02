import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <>
      <header className=" bg-gray-800 py-4">
        <div className=" max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-60">
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
      </header>
      <section className="max-w-5xl mx-auto mt-6 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservador {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      />
    </>
  );
}
