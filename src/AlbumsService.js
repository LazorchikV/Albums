import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com/';

export default class AlbumsService{

    constructor(){}


    getAlbums() {
        const url = `${API_URL}/albums/`;
        return axios.get(url).then(response => response.data);
    }
    getAlbumsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getAlbum(pk) {
        const url = `${API_URL}/albums/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteAlbum(album){
        const url = `${API_URL}/albums/${album.pk}`;
        return axios.delete(url);
    }
    createAlbum(album){
        const url = `${API_URL}/albums/`;
        return axios.post(url,album);
    }
    updateAlbum(album){
        const url = `${API_URL}/albums/${album.pk}`;
        return axios.put(url,album);
    }
}