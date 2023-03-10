import axios from 'axios';

class Posts {
    constructor(apiPrefix) {
        if (!apiPrefix) throw new Error('apiPrefix is not valid');
        this.apiPrefix = apiPrefix;
    }

    async search(search) {
        const response = await axios.get(`${this.apiPrefix}/v1/searcharticle/?search=${search}`);
        console.log(response.data);
        return response.data;
    }
}

export default Posts;
