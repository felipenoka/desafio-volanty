import React, { Component, Fragment } from 'react';

import api from './service/api';

import AppContent from './main/main';
import Header from './components/header/header';

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentIdVehicle: null,
      currentIdModel: null,
      currentIdVehicleFinal: null,
      marca: [],
      veiculo: [],
      modeloEAno: [],
      vehicleFinal: [],
      infoTable: []
    }
  }

  getMarca = () => {
    this.setState({ marca: [], veiculo: [], modeloEAno: [] })
    api.get(`/marcas.json`)
      .then((resp) => {
        // eslint-disable-next-line array-callback-return
        resp.data.map((item, index) => {
          const joined = this.state.marca.concat([{ name: item.name, id: item.id }])
          this.setState({ marca: joined })
        })
      })
  }

  getVehicle = (idVehicle) => {
    this.setState({ veiculo: [], modeloEAno: [] })
    api.get(`veiculos/${idVehicle}.json`)
      .then((resp) => {
        // eslint-disable-next-line array-callback-return
        resp.data.map((item, index) => {
          let joined = this.state.veiculo.concat([{ name: item.name, id: item.id }])
          this.setState({ veiculo: joined })
        })
      })
  }

  getModelAndYear = (idVehicle) => {
    this.setState({ modeloEAno: [] })
    api.get(`veiculo/${this.state.currentIdVehicle}/${idVehicle}.json`)
      .then((resp) => {
        // eslint-disable-next-line array-callback-return
        resp.data.map((item, index) => {
          let joined = this.state.modeloEAno.concat([{ name: item.name, id: item.id }])
          this.setState({ modeloEAno: joined })
        })
      })
  }

  getVehicleFinal = (key) => {
    this.setState({ infoTable: [] })
    if (this.state.currentIdVehicle === null || this.state.currentIdModel === null || key === null) {
      return false
    }

    api.get(`veiculo/${this.state.currentIdVehicle}/${this.state.currentIdModel}/${key}.json`)
      .then((resp) => {
        this.setState({ infoTable: [resp.data] })
      })
  }

  handleChange = (e) => {

    if (e.target.name === 'marca') {
      const idVehicle = e.target.value
      this.getVehicle(idVehicle)
      this.setState({ currentIdVehicle: e.target.value })
    }

    if (e.target.name === 'veiculo') {
      const idVehicle = e.target.value
      this.getModelAndYear(idVehicle)
      this.setState({ currentIdModel: e.target.value })
    }

    if (e.target.name === 'modeloeano') {
      const key = e.target.value
      this.setState({ currentIdVehicleFinal: key })
    }
  }

  // handleSubmit = (e) => {
  //     this.getVehicleFinal(this.state.currentIdVehicleFinal)
  // }

  handleSubmit = (e) => {
    this.getVehicleFinal(this.state.currentIdVehicleFinal)
  }


  componentDidMount() {
    this.getMarca();
  }

  render() {

    return (
      <Fragment>
        <Header />
        <AppContent
          marca={this.state.marca}
          veiculo={this.state.veiculo}
          modelo={this.state.modeloEAno}
          veiculofinal={this.state.vehicleFinal}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          infoTable={this.state.infoTable}
        />
      </Fragment>
    )
  }
}

export default App;
