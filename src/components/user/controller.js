import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json({
      ok: true,
      data: users,
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

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    res.json({
      ok: true,
      data: {
        user: user,
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
    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });
    res.json({
      ok: true,
      data: user,
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
    const updateUser  = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...body
      },
    })

    res.json({
      ok: true,
      data: updateUser ,
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
  
    const deleteUser  = await prisma.user.delete({
      where: {
        id: id,
      }
    })

    res.json({
      ok: true,
      data: deleteUser ,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};