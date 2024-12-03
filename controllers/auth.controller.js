import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json(["The email is already in use"]);

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });

      const userSaved = await newUser.save();
      const token = await createAccessToken({
        id: userSaved._id,
      });
  
      res.cookie("token", token);
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (!userFound) return res.status(400).json({
          message: "user not found"});
  
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) 
        return res.status(400).json({
          message: "The password is incorrect"});
      
  
      const token = await createAccessToken({
        id: userFound._id});
  
      res.cookie("token", token);
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const logout = async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };

  export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
   
      if (!userFound) return res.status(400).json({ message: "user not found"});
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    
  };

  export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: "Unauthorided"});
  
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorided"});
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorided"});
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };
  