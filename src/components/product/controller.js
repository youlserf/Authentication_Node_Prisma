import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// test with run code
/* let x = 10;
if (true){
  let y = 20;
  var z = 30;
  console.log(x + y +z);
}
console.log(x + z)
 */
export const findAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json({
      ok: true,
      data: products,
    });
    } catch (error) {
      res.json({
        ok: false,
        data: error.message,
      });
    }
};

export const detalle = async (req, res) => {
  try {

    const id = parseInt(req.params.id)

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    })

    res.json({
      ok: true,
      data: {
        product: product,
      },
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};


export const create = async (req, res) => {
  try {
    const { body } = req;
    const product = await prisma.product.create({
      data: {
        ...body,
      },
    });
    res.json({
      ok: true,
      data: product,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { body } = req;
    body.id = id;
    const updateProduct  = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...body
      },
    })

    res.json({
      ok: true,
      data: updateProduct ,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

export const deleteById = async (req, res) => {
  try {

    const id = parseInt(req.params.id)
  
    const deleteProduct  = await prisma.product.delete({
      where: {
        id: id,
      }
    })

    res.json({
      ok: true,
      data: deleteProduct ,
    });
    
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};