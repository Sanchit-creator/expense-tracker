const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const { default: mongoose } = require('mongoose');
const Expense = require('../models/expense')
const bcrypt = require('bcryptjs');


module.exports.signUp = async (req, res) => {
    try {
        const exist = await User.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'Admin already registered'});
        }
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();
        res.status(200).json({
            message: user
            
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email})
        if (user) {
            let isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                return res.status(200).json({
                    id: user._id,
                    user: 'user',
                    token: generateToken(user._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        res.status(500).json('Error ', error.message);
    }
}


module.exports.post = async(req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            const newexpense = new Expense({
                exp_name: req.body.exp_name,
                amount: req.body.amount,
                date: req.body.date,
                des: req.body.des,
                category: req.body.category,
                user: req.params.id
            })
            user.expense.push(newexpense)
            await user.save();
            await newexpense.save();
        }
        const products = await Expense.find({user: req.params.id})
        res.status(200).json(products)
    } catch (error) {
        // res.status(500).json('Error ', error.message);
        console.log(error);
    }
}

module.exports.get = async(req, res) => {
    try {
        const products = await Expense.find({user: req.params.id})
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

module.exports.getSingle = async(req, res) => {
    try {
        const products = await Expense.findOne({_id: req.params.id})
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

module.exports.edit = async (req, res) => {
    try {
        var newvalues = { $set: {
            exp_name: req.body.exp_name, 
            amount: req.body.amount,
            date: req.body.date,
            des: req.body.des,
            category: req.body.category
        } };
        const result = await Expense.updateOne({_id: req.params.id}, newvalues)
        const fetchData = await Expense.findOne({_id: req.params.id});
        res.status(200).json(fetchData)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const exist = await Expense.findById(req.body._id);
        if (exist) {
            await exist.deleteOne();
            await User.findByIdAndUpdate(req.params.id, { $pull: { products: req.body._id } })
            const products = await Expense.find({user: req.params.id})
            res.status(200).json(products)
        }
         else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


