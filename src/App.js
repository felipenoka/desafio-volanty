import React, { Component, Fragment } from "react";

import api from "./service/api";

import AppContent from "./main/main";
import Header from "./components/header/header";
import Loading from "./components/layout/layout";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentIdVehicle: null,
      currentIdModel: null,
      currentIdVehicleFinal: null,
      marca: [],
      veiculo: [],
      modelo: [],
      vehicleFinal: [],
      infoTable: []
    };
  }

  componentDidMount() {
    this.getMarca();
  }

  getMarca = () => {
    this.setState({ marca: [], veiculo: [], modelo: [] });
    api.get(`/marcas.json`).then(res => {
      // eslint-disable-next-line array-callback-return
      res.data.map(item =>
        this.setState(prevState => {
          const joined = prevState.marca.concat([
            { name: item.name, id: item.id }
          ]);
          return { marca: joined };
        })
      );
    });
  };

  getVehicle = idVehicle => {
    this.setState({ veiculo: [], modelo: [] });
    api.get(`veiculos/${idVehicle}.json`).then(res => {
      // eslint-disable-next-line array-callback-return
      res.data.map(item => {
        this.setState(prevState => {
          const joined = prevState.veiculo.concat([
            { name: item.name, id: item.id }
          ]);
          return { veiculo: joined };
        });
      });
    });
  };

  getModelAndYear = idVehicle => {
    this.setState({ modelo: [] });
    api
      .get(`veiculo/${this.state.currentIdVehicle}/${idVehicle}.json`)
      .then(res => {
        // eslint-disable-next-line array-callback-return
        res.data.map(item => {
          this.setState(prevState => {
            const joined = prevState.modelo.concat([
              { name: item.name, id: item.id }
            ]);
            return { modelo: joined };
          });
        });
      });
  };

  getVehicleFinal = key => {
    if (
      this.state.currentIdVehicle === null ||
      this.state.currentIdModel === null ||
      key === null
    ) {
      return false;
    }

    api
      .get(
        `veiculo/${this.state.currentIdVehicle}/${this.state.currentIdModel}/${key}.json`
      )
      .then(res => {
        this.setState({ infoTable: [res.data] });
      });
  };

  handleChange = e => {
    if (e.target.name === "marca") {
      const idVehicle = e.target.value;
      this.getVehicle(idVehicle);
      this.setState({ currentIdVehicle: e.target.value });
    }

    if (e.target.name === "veiculo") {
      const idVehicle = e.target.value;
      this.getModelAndYear(idVehicle);
      this.setState({ currentIdModel: e.target.value });
    }

    if (e.target.name === "modelo") {
      const key = e.target.value;
      this.setState({ currentIdVehicleFinal: key });
    }
  };

  handleSubmit = () => {
    this.getVehicleFinal(this.state.currentIdVehicleFinal);
  };

  render() {
    if (this.state.marca.length > 0) {
      return (
        <Fragment>
          <Header />
          <AppContent
            marca={this.state.marca}
            veiculo={this.state.veiculo}
            modelo={this.state.modelo}
            veiculofinal={this.state.vehicleFinal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            infoTable={this.state.infoTable}
          />
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

export default App;
