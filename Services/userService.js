const User = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwtProvider = require('../Config/jwtProvider')

const createUser = async (userData) => {
    try {

        let { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error('User Already Exist With:', email)
        }
        password = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password });


        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}


const findUserById = async (userId) => {
    try {

        const user = await User.findById(userId).populate('address')

        if (!user) {
            throw new Error('User Not Found Id', userId)
        }

        return user

    } catch (error) {
        throw new Error(error.message)

    }
}

const findUserByEmail = async (email) => {
    try {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User Not Found Email', email)
        }

        return user

    } catch (error) {
        throw new Error(error.message)

    }
}



const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);

        if (!user) {
            console.error('User Not Found'); // Log user not found
            throw new Error('User Not Found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user profile:', error.message); // Log any errors
        throw new Error('Invalid Token or User Not Found');
    }
};



const getAllUsers = async () => {
    try {

        const users = await User.find();
        return users

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createUser, findUserById, findUserByEmail, getUserProfileByToken, getAllUsers };