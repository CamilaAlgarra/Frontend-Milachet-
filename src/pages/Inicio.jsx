//Importa el componente Link de react-router-dom para la navegación entre páginas//
import { Link } from "react-router-dom";
//Letrero de bienvenida con el logo de Milachet y botones para ver productos y conocer la empresa//
function Inicio() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h3>Bienvenido a Milachet</h3>
        <h2>Creaciones únicas hechas a crochet</h2>
        <p>
          Diseños artesanales personalizados con amor, creatividad y
          dedicación para acompañar tus momentos favoritos.
        </p>

        //Botones de navegación a la página de productos y a la página sobre nosotros//
        <div className="hero-buttons">
          <Link to="/productos" className="btn-hero">
            Ver productos
          </Link>
          <Link to="/sobre" className="btn-hero btn-hero-outline">
            Conócenos
          </Link>
        </div>
      </div>
      <div className="hero-image-container logo-frame">
        <img src="/assets/img/Milachet_blanco.png" alt="Logo de Milachet" />
      </div>
    </section>
  );
}

export default Inicio;