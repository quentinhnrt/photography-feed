export default class InstagramApi {
    static async getPosts() {
        const response = await fetch('https://www.instagram.com/username/?__a=1')
        const data = await response.json()
        return data
    }
}