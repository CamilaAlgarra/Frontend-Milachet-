
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Almacena los detalles de cada producto, incluyendo descripción, imagen y estilos disponibles//
const detallesProductos = {
  bufanda: {
    descripcion: "Bufanda tejida a crochet con diseño personalizado.",
    imagen: "/assets/img/Bufanda-Dos-Colores.jpeg",
    estilos: [
      {
        nombre: "Bufanda Dos Tonos",
        etiqueta: "Bufanda Dos Tonos",
        imagen: "/assets/img/Bufanda-Dos-Colores.jpeg",
      },
    ],
  },
  bolso: {
    descripcion: "Bolso tejido a crochet con diseño personalizado.",
    imagen: "/assets/img/Bolso-Morado-Flores.jpeg",
    estilos: [
      {
        nombre: "Bolso Morado Flores",
        etiqueta: "Bolso de Flores",
        imagen: "/assets/img/Bolso-Morado-Flores.jpeg",
      },
      {
        nombre: "Bolso Granny",
        etiqueta: "Bolso Granny",
        imagen: "/assets/img/Bolso-Granny.jpeg",
      },
    ],
  },
  llaveros: {
    descripcion: "Llaveros tejidos con diseños personalizados.",
    imagen: "/assets/img/Llavero_personalizado.jpeg",
    estilos: [
      {
        nombre: "Llavero Personalizado",
        etiqueta: "Llavero Personalizado",
        imagen: "/assets/img/logo-final.png",
      },
    ],
  },
  separadores: {
    descripcion: "Separadores tejidos a crochet.",
    imagen: "/assets/img/Separador-de-Colombia.jpeg",
    estilos: [
      {
        nombre: "Separador Colombia",
        etiqueta: "Separador Colombia",
        imagen: "/assets/img/Separador-de-Colombia.jpeg",
      },
    ],
  },
  aretes: {
    descripcion: "Aretes tejidos con diseños personalizados.",
    imagen: "/assets/img/Aretes-Circulo-Medio.jpeg",
    estilos: [
      {
        nombre: "Aretes Círculo",
        etiqueta: "Aretes Círculo Medio",
        imagen: "/assets/img/Aretes-Circulo-Medio.jpeg",
      },
      {
        nombre: "Aretes Flor",
        etiqueta: "Aretes Flor",
        imagen: "/assets/img/Aretes-Flor.jpeg",
      },
    ],
  },
};

function Productos() {
  const [productos, setProductos] = useState([]);
  const [elegidos, setElegidos] = useState({});
  const [abierto, setAbierto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
//Carga la lista de productos desde el servidor al montar el componente, manejando errores de conexión//
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los productos.");
        setCargando(false);
      });
  }, []);
//Permite al usuario elegir un estilo para cada producto, actualizando el estado de los productos elegidos//
  const elegir = (idProducto, nombreEstilo) => {
    setElegidos((prev) => ({
      ...prev,
      [idProducto]: nombreEstilo,
    }));
  };

  const alternar = (e, id) => {
    if (e.target.open) {
      setAbierto(id);
    } else if (abierto === id) {
      setAbierto(null);
    }
  };
//Formate a el precio de cada producto para mostrarlo en la interfaz, agregando el símbolo de moneda y separadores de miles//
  const formatoPrecio = (precio) => {
    if (typeof precio === "number" || !isNaN(Number(precio))) {
      return "$" + Number(precio).toLocaleString("es-CO");
    }
    return precio;
  };

  return (
    <section id="productos" className="main-section">
      <div className="section-title-wrapper">
        <h2>Productos</h2>
      </div>

  
      {error && <p>{error}</p>}

      <div className="catalogo">
        {productos.map((p) => {
          const id = p._id;
          const detalle =
            detallesProductos[p.nombre.toLowerCase().trim()] || {
              descripcion: "Producto tejido con diseño personalizado.",
              imagen: "/assets/img/logo-final.png",
              estilos: [],
            };

          const productoPedido = elegidos[id] || p.nombre;

          return (
            <div className="producto" key={id}>
              <div className="producto-img-placeholder">
                <img src={detalle.imagen} alt={p.nombre} />
              </div>

              <div className="producto-info">
                <h3>{p.nombre}</h3>
                <p>{detalle.descripcion}</p>
                <span className="precio">
                  {formatoPrecio(p.precio)}
                </span>

                <details
                  className="detalles-producto"
                  open={abierto === id}
                  onToggle={(e) => alternar(e, id)}
                >
                  <summary className="btn-hero">
                    Ver Estilos
                  </summary>

                  <div className="contenido-desplegable">
                    <p className="titulo-estilos">Estilos:</p>

                    <div className="mini-galeria active-galeria">
                      {detalle.estilos.map((estilo) => (
                        <figure
                          key={estilo.nombre}
                          className={
                            "item-galeria" +
                            (elegidos[id] === estilo.nombre
                              ? " foto-seleccionada"
                              : "")
                          }
                        >
                          <img
                            src={estilo.imagen}
                            alt={estilo.nombre}
                            onClick={() =>
                              elegir(id, estilo.nombre)
                            }
                          />
                          <figcaption>
                            {estilo.etiqueta}
                          </figcaption>
                        </figure>
                      ))}
                    </div>

                    <Link
                      to={
                        "/contacto?producto=" +
                        encodeURIComponent(productoPedido)
                      }
                      className="btn-pedir"
                    >
                      Pedir
                    </Link>
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Productos;
