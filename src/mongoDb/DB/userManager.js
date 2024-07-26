import { UserModel } from "../schema/user.model.js";
import { createHash, isValidPassword } from "../../utils/bcryptHash.js";

import CartsManager from "./carts.Manager.js";
const cartManager = new CartsManager()

export default class UserManager {

    async findByEmail(email) {
        try {
            const response = await UserModel.find({ email });
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    async findById(id) {
        try {
            const response = await UserModel.find({ id });
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    async register(userData) {
        try {
            const existingUser = await UserModel.findOne({ email: userData.email });

            //vrifica si el usuario email existe
            if (existingUser) {
                throw new Error("Email is already registered");
            }

            //verifica que el password sea mas de 6 caracteres
            if (userData.password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            // Verifica si el correo electrónico es "adminCoder@coder.com" y asigna el rol correspondiente
            if (userData.email === "adminCoder@coder.com") {
                userData.role = "admin";
            }

            //crear el cart id unico para el usuario
            const cart = await cartManager.createCart({ products: [] })

            //Hashea la constraseña bcrypt
            const hashedPassword = createHash(userData.password);

            //Al crear el usuario combina los datos con la contraseña hasheada y el cart.
            const newUser = await UserModel.create({ ...userData, password: hashedPassword, cartId: cart._id });

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const userExist = await UserModel.findOne({ email });

            if (!userExist) {
                throw new Error("Email is not exist");
            }

            if (!isValidPassword(password, userExist.password)) {
                throw new Error("Incorrect password");
            }

            // userExist.last_connection = new Date();

            return userExist;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(email, oldPassword, newPassword) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            // Verificar si la contraseña antigua es correcta comparando hashes
            if (!isValidPassword(oldPassword, user.password)) {
                throw new Error("Old password is incorrect");
            }

            //verifica que el password sea mas de 6 caracteres
            if (newPassword.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            // Asegúrate de que la nueva contraseña no es la misma que la antigua
            if (isValidPassword(newPassword, user.password)) {
                throw new Error("New password cannot be the same as the old password");
            }

            user.password = createHash(newPassword);
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async forgetPassword(email, newPassword) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("Email not found");
            }

            if (newPassword.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            // Asegúrate de que la nueva contraseña no es la misma que la antigua
            if (isValidPassword(newPassword, user.password)) {
                throw new Error("New password cannot be the same as the old password");
            }

            user.password = createHash(newPassword);
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

     async updateUserDocuments(userId, updateData) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Actualiza o añade los documentos
            Object.keys(updateData).forEach(docType => {
                const existingDocIndex = user.documents.findIndex(doc => doc.name === docType);
                if (existingDocIndex >= 0) {
                    user.documents[existingDocIndex].reference = updateData[docType];
                } else if (updateData[docType]) {
                    user.documents.push({ name: docType, reference: updateData[docType] });
                }
            });

            await user.save();
            return user;
        } catch (error) {
            console.error('Error updating user documents:', error);
            throw error;
        }
    }

    async updateUserToPremium(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Verifica si todos los documentos están cargados
            const requiredDocs = ["profile", "serviceBill", "product"];
            const userDocs = user.documents.map(doc => doc.name);

            const allDocsUploaded = requiredDocs.every(doc => userDocs.includes(doc));

            if (allDocsUploaded) {
                user.role = "premium";
                await user.save();
                return { success: true, message: 'User upgraded to premium successfully.' };
            } else {
                return { success: false, message: 'Not all required documents are uploaded.' };
            }
        } catch (error) {
            console.error('Error updating user to premium:', error);
            throw error;
        }
    }

    async lastConnection(email) {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error("User not found");
            }

            user.last_connection = new Date();
            await user.save();

            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUsersAdmin() {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.error("Error displaying user", error);
            throw error;
        }
    }
    async deleteUserAdmin(userId) {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
    
    
}