db = db.getSiblingDB('liverpool_db');

db.orders.drop();

db.orders.insertMany([
  {
    customer: {
      firstName: "Luis",
      firstLastName: "Ruiz",
      secondLastName: "Vega",
      email: "luis.ruiz@gmail.com"
    },
    shippingAddress: "Privada de las Gardenias 321, Jardines del Moral, León, Gto., 37140",
    productCode: "78291",
    quantity: 2,
    price: 1899.50,
    status: "PENDING",
    createdAt: new Date()
  },
  {
    customer: {
      firstName: "Karla",
      firstLastName: "Sanchez",
      secondLastName: "Torres",
      email: "karla.sanchez@hotmail.com"
    },
    shippingAddress: "Calle de los Lirios 123, Jardines del Moral, León, Gto., 37140",
    productCode: "10482",
    quantity: 1,
    price: 4500.00,
    status: "IN_PROGRESS",
    createdAt: new Date()
  },
  {
    customer: {
      firstName: "Juanito",
      firstLastName: "Bodoque",
      secondLastName: "Garcia",
      email: "juanito.bodoque@gmail.com"
    },
    shippingAddress: "Privada de las Gardenias 321, Jardines del Moral, León, Gto., 37140",
    productCode: "33019",
    quantity: 3,
    price: 650.00,
    status: "SHIPPED",
    createdAt: new Date()
  }
]);