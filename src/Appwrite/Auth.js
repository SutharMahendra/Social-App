
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount
            }
        }
        catch (error) {
            console.log('error in create Account', error)
        }
    }

    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            return userLogin;
        } catch (error) {
            console.log('error in login', error);
        }
    }



    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user) {
                console.log('here is your user', user)
                return user

            }
        } catch (error) {
            console.log('error in get current user', error)
            return 'user is not found';
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log('error in logout page', error)
        }
    }

}

const authService = new AuthService();

export default authService;