import  React, { Component } from  'react';
import  AlbumsService  from  './AlbumsService';

const  albumsService  =  new  AlbumsService();

class  AlbumsList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            albums: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

componentDidMount() {
    var  self  =  this;
    albumsService.getAlbums().then(function (result) {
        console.log(result);
        self.setState({ albums:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    albumsService.deleteAlbum({pk :  pk}).then(()=>{
        var  newArr  =  self.state.albums.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({albums:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    albumsService.getAlbumsByURL(this.state.nextPageURL).then((result) => {
        self.setState({ alums:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="albums--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.albums.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/album/" + c.pk}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default   AlbumsList;
