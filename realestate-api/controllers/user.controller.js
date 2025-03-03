import prisma from "../lib/prisma.js ";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  let updatePassword = null;

  if (password) {
    updatePassword = await bcrypt.hash(password, 10);
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatePassword && { password: updatePassword }),
        ...(avatar && {avatar}),
      },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get updateUser!" });
  }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const tokenUserId = req.userId;
  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  
  
    try {

        await prisma.user.delete({
            where:{id}
        })

        res.status(200).json({message:"User Deleted!"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deleteUser!" });
  }
};
