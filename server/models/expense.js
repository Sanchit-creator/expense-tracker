const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    exp_name: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: String,
    },
    des: {
        type: String,
    },
    category: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;