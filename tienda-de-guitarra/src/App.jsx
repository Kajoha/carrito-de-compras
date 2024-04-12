import { useState } from 'react'
import Headers from "./components/Headers"
import Guitar from "./components/Guitar"
import { db } from './data/db'

function App() { //Un componente es un a función de JS y siempre debe iniciar con mayuscula el nombre, se usan para la creación de aplicaciones y sitios web se recomienda usar .jsx o .tsx, los componentes deben ser reutilizables o separados por funcionalidad

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([]) //El valor inicial del state preferiblemente deberia ser vacio, o false, si luego de iterar encuentra algo que cambie a true
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCard(item) {
    //un state es inmutable, por lo que tenemos que usar el useState para poder manipularlo
    //ver este enlace https://doesitmutate.xyz/ para saber que funcion lo muta y cual no

    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  //Los Statements - pueden ir antes del return
  /* Cada app de Js es una serie de statements, cada staatement es una instrucción para hacer algo 
   - Creacion de variable
   - Codigo condicional if
   - Lanzar errres con throw new Error()
   - Iterar con while o for*/

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item, //mantengo el resto de propiedades, nombre, imagen precio
          quantity: item.quantity + 1 //pero modifico la cantidad
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id) {
    const updateCartRest = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCartRest)
  }


  return ( //El return es lo que se muestra en pantalla
    //Las Expressions - pueden ir despues del return
    /* Una expresión es algo que produce un valor
     - Ternarios
     - Utilizar un array method que genere un nuevo array
     -.map que genera un nuevo array a diferencia de forEach */

    <>
      <Headers
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCard={addToCard}
            />
          ))}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>


    </>
  )
}

export default App
