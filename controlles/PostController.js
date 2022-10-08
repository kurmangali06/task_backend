import { validationResult } from "express-validator";
import  PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const doc = new PostModel({
      text: req.body.text,
    });
  
    const post = await doc.save()
  
    res.json(post)
  } catch(err) {
    res.status(500).json({
      message: "НЕ УДАЛОСТЬ СОЗДАТЬ ПОСТ!"
    })
  }
  }

export const getAll = async (req, res) => {
  try{
    const posts = await PostModel.find();

    res.json(posts)
  }catch(err) {
    console.log(err);
    res.status(500).json({
      message: "не удалость получить посты"
    })
  }
}
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndUpdate({
      _id: postId,
    },{
      returnDocument: 'after',
    },
    (err, doc) => {
if(err) {
  console.log(err);
  return res.status(500).json({
    message:"Не удалось вернуть поста!"
  })
} 
if(!doc) {
  return res.status(404).json({
    message: "Пост не найдена",
  })
}
 res.json(doc)
    })
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message:"Не удалось получить Пост!"
    })
  }
}

export const remove = async(req, res) => {
  try{
    const postId = req.params.id;

    PostModel.findByIdAndRemove({
      _id: postId,
    }, (err, doc) => {
      if(err) {
        console.log(err);
        res.status(500).json({
          message: "не удалость удалить пост"
        })
      }
      if(!doc) {
        return res.status(404).json({
          message: "Пост не найден"
        })
      }

      res.json({
        success:true,
      })
    })
  }catch(err) {
    console.log(err);
    res.status(500).json({
      message: "не удалость удалить пост"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate({
      _id : postId,
    }, {
      text: req.body.text,
    })
    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удалость изменить пост"
    })
  }
}