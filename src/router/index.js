import { AuthRouter, ProductRouter, UserRouter } from "../components";

// cada vez que quiera agregar una ruta nueva,
// creo el path e importo el componente

const listRoutes = [
  ["/auth",AuthRouter],
  ["/user", UserRouter],
  ["/product", ProductRouter],
];



export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};