import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

export class BucketService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.bucket = new Storage(this.client);
    }

    async createFile(file) {
        try {
            console.log('stating')
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error is here", error);
            return false
        }
    }
    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            return false
        }
    }

    async getFilePreview(fileID) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileID,
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            return false
        }
    }
}
const bucketService = new BucketService()
export default bucketService;