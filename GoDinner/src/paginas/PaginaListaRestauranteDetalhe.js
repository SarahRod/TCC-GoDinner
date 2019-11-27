import React, {Component} from 'react';
import {DOMINIO, TOKEN, DOMINIO_IMG, FOTORESTAURANTEPADRAO} from '../link_config';
import $ from 'jquery';






export class PaginaListaRestauranteDetalhe extends Component{

    constructor(props){
        super();
        this.state = {
            restaurante:{
                email: '',
                cnpj: '',
                razaoSocial: '',
                telefone: '',
                criacao: '',
                foto:'',
                endereco:{
                    
                    bairro: '',
                    numero:'',
                    complemento: '',
                    referencia: '',
                    cep: '',
                    logradouro: '',
                    cidade:{
                        cidade:'',
                        estado:{
                            estado: ''
                        }
                    }

                }
            },
            
            categoria:[],

            lucro:{
                total: '',
            },

            avaliacao:{
                total: '',
            },

            totalPedido:{
                total:''
            },

            isChecked: true || false
            
           
        }   
    }


   componentDidMount() {
        this.carregarCategoria();
        this.carregarDadosRestaurante();
        this.carregarLucro();
        this.carregarAvaliacao();
        
       
    }



    /*verificaStatus() {

        const { id } = this.props.match.params;
        const token = localStorage.getItem('token');

        const url = `${DOMINIO}/produto/${id}`;

        if (id !== null) {



            $.ajax({
                url: url,
                type: 'get',
                headers: { 'token': token },
                success: function (resposta) {

                    this.setState({ produto: resposta })

                    switch (resposta.status) {
                        case "0":


                            break;
                        case "1":



                            $('#btn-status').attr("checked", "checked");

                            break;
                    }
                    $("#btn-lixeira").removeClass("d-none");
                    $("#btn-switch").removeClass("d-none");

                }.bind(this),
                error: function (data) {
                    console.log('Erro:', data);

                }
            });


        } else {

        }
    }*/

     //ATIVA E DESATIVA O PRODUTO
    //  desativarProduto() {

    //     const { id } = this.props.match.params;

    //     const url = `${DOMINIO}/produto/status/${id}`;

    //     $.ajax({
    //         url: url,
    //         type: 'PUT',
    //         headers: { 'token': TOKEN },
    //         success: function (data) {



    //         }
    //     });

    // }

    carregarCategoria(){

        const { id } = this.props.match.params;


        const url = `${DOMINIO}/restaurante/${id}`;

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'token': TOKEN },
            success: function (resposta) {

                this.setState({restaurante:resposta});
                console.log(resposta);
                console.log("FOTOO" + resposta.foto.length)
                if (resposta.foto.length === 0) {
                    $(".foto-restaurante").attr("src", FOTORESTAURANTEPADRAO);
                } else {
                    $(".foto-restaurante").attr("src", DOMINIO_IMG + resposta.foto);
                }

            }.bind(this),
            error: function (data) {
                console.log('Erro:', data);

            }
        });

    }

    carregarLucro(){
        const { id } = this.props.match.params;

        const url = `${DOMINIO}/restaurante/saldorestaurante/${id}`;

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'token': TOKEN },
            success: function (resposta) {

                this.setState({lucro:resposta});
                console.log(resposta);


            }.bind(this),
            error: function (data) {

            }
        });
    }

    carregarAvaliacao(){
        const { id } = this.props.match.params;

        const url = `${DOMINIO}/avaliacao/mediarestaurante/${id}`;

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'token': TOKEN },
            success: function (resposta) {

                this.setState({avaliacao:resposta});
                console.log(resposta);
                console.log("A cima")


            }.bind(this),
            error: function (data) {

            }
        });
    }

    carregarTotalPedido(){
        const { id } = this.props.match.params;

        const url = `${DOMINIO}/pedidos/pedidorestaurante/${id}`;

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'token': TOKEN },
            success: function (resposta) {

                this.setState({totalPedido:resposta});
                console.log(resposta);
                console.log("A cima");


            }.bind(this),
            error: function (data) {

            }
        });
    }    
    carregarDadosRestaurante(){

        const { id } = this.props.match.params;


        const url = `${DOMINIO}/categoriaproduto/categorias/${id}`;

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'token': TOKEN },
            success: function (resposta) {

                this.setState({categoria:resposta});
                console.log(resposta);


            }.bind(this),
            error: function (data) {
                console.log('Erro:', data);

            }
        });

    }

    

    render(){
        return(
            <div className=" container">
                <div className="row text-center">
                    <div className="col-8 text-center">
                    <h1 className="mb-3 mt-5">{this.state.restaurante.razaoSocial}</h1>
                    </div>
                    <div className="col-4 mt-5">
                        <label className="switch ml-5 mt-2" id="btn-switch">
                            <input id="btn-status" type="checkbox"  />
                            {/* value={isChecked} onChange={e => this.atualizaCampo} onClick={e => this.desativarProduto(e)} */}
                            <div className="slider"></div>
                        </label>
                    </div>
                </div>
                
                
                <hr/>
                <div className="row mt-5">
                    <div className="col-md-5">
                            <div className="row ml-0 mt-4">
                                <img  className="foto-restaurante"src='' style={{width: 100 + '%', height: 300 + 'px'}} alt={'Restaurante '+this.state.restaurante.razaoSocial}/>
                            </div>
                            <div className="row mt-4 ">
                                <div className="col-12">
                                    <h6 className="mt-2">Devendo: </h6>
                                    <h6 className="mt-2">Lucro: R$ {this.state.lucro.total}</h6>
                                    <h6 className="mt-2">Total de vendas: {this.state.totalPedido.total}</h6>
                                    <h6 className="mt-2">Avaliação: {this.state.avaliacao.total}</h6>
                                    <div className="row mb-5">
                                        <div className="col-3 mt-2 h6">Categorias:</div>
                                        {this.state.categoria.map(item => (
                                            <div className="col-4 float-left border rounded ml-1 mt-1 mr-1">
                                                 <div key={item.id} value={item.id}>
                                                    {item.nome}
                                                </div>
                                            </div>
                                        ))}
                                       
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-6 ml-5">
                        <div className="row">
                            <div className="col-md-6  mt-1">
                                <label className="h6">CNPJ:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.cnpj}/>
                            </div>
                            <div className="col-md-6  mt-1">
                                <label className="h6">Razão Social:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.razaoSocial}/>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="h6">E-mail:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.email}/>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="h6">Endereço:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.logradouro}/>
                            </div>
                            <div className="col-md-6  mt-3">
                                <label className="h6">Numero:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.numero}/>
                            </div>
                            <div className="col-md-6  mt-3">
                                <label className="h6">Bairro:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.bairro}/>
                            </div>
                            <div className="col-md-6  mt-3">
                                <label className="h6">Cidade:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.cidade.cidade}/>
                            </div>
                            
                            <div className="col-md-6  mt-3">
                                <label className="h6">Estado:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.cidade.estado.estado}/>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="h6">Complemento:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.complemento}/>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="h6">Referência:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.referencia}/>
                            </div>
                            <div className="col-md-6  mt-3">
                                <label className="h6">CEP:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.endereco.cep}/>
                            </div>
                            <div className="col-md-6  mt-3">
                                <label className="h6">Telefone:</label>
                                <input className="w3-input" readonly="readonly" value={this.state.restaurante.telefone}/>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}
