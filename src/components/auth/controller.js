import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

export const signup = async (req, res) => {
  try {

    const {username, email, password, name, phone_number} = req.body;

    // Validando usuario
    if (!(email && password)) {
      return res.status(400).send("Email y password son campos obligatorios.");
    }

    // Comprobar si el usuario es existen
    // Validar si el usuario existe en la bd
    const existingUser = await prisma.user.findUnique({ 
      where: {
        email: email
      }
     });

    if (existingUser) {
      return res.status(409).send("Usuario existente.");
    }

    //Cifrado de la contraseña
    let encryptedPassword = await bcrypt.hash(password, 10);
  
    //Crear usuario en la base de datos
    const user = await prisma.user.create({
      data:{
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        name,
        phone_number,
      }
    });

    // Crear tocken 
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "7d",
      }
    );
    
    // Guardar el tocken del usuario
    user.token = token;

    // Retorna usuario
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Logica de registro (Fin)
};
export const signin = async (req, res) => {
  try {
    // Obtener usuario
    const { email, password } = req.body;

    // Validar usuario
    if (!(email && password)) {
      res.status(400).send("Se requiere todos los campos.");
    }
    // Validar si el usuario ya existe en la bd
    const user = await prisma.user.findUnique({ 
      where: {
        email: email
      }
     });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Crear tocken
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Guardar tocken
      user.token = token;

      // Usuario
      return res.status(200).json(`Welcome ${user.name}`);
    }
    return res.status(400).send("Datos incorrectos.");
  } catch (err) {
    console.log(err);
  }
};


