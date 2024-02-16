import api from "./api";
import { Component } from "react";

class app extends Component{

  state = {
    artigos: [],
  }

  async componentDidMount(){  
    const response = await api.get("/artigos/meet");
     this.setState({artigos: response.data})
  }

   render(){
    const {artigos} = this.state;
      return(
        <div style={{ textAlign: "center"}}>
          <h1>Lista de Artigos</h1>
          <ul style={{listStyle: "none"}}>
            {artigos.map(artigo => (
              <li key={artigo.id}>
                <h2>titulo: {artigo.titulo}</h2>
                <p>conteudo: {artigo.conteudo}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };

};

export default app;
