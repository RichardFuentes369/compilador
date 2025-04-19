let productos = [
  { nombre: "Camiseta", precio: 25 },
  { nombre: "Pantalón", precio: 50 },
  { nombre: "Zapatos", precio: 80 },
  { nombre: "Gorra", precio: 15 }
];

if (productos.length > 3) {
  productos.Push({ nombre: "Bufanda", precio: 20 });
  console.log("Lista actualizada");
} else {
  console.log("La lista de productos no es mayor a tres");
}

console.log(productos);