import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Select from '../components/select/select';
import AboutCar from '../components/infolabel/infocar';

const styles = theme => ({
  select: {
    width: '100%',
    height: 40,
    margin: '10px 0'
  },
  bgcontainer: {
    background: 'linear-gradient(90deg, #009ddf, #2167b2 49%, #2f4f98)'
  },
  footer: {
    background: 'linear-gradient(90deg, #009ddf, #2167b2 49%, #2f4f98)',
    bottom: 0,
    padding: '0 10px',
    height: '25px',
    decoration: 'none',
  }

});

class AppContent extends Component {

  state = {
    activeStep: 0,
    receivingAccount: '',
    termsChecked: false,
    loading: true,
    labelWidth: 0
  }

  render() {
    const { classes, marca, veiculo, modelo, handleChange, infoTable, handleSubmit } = this.props;
    const { activeStep } = this.state;


    return (
      <React.Fragment>
        <div className='container-fluid d-flex' style={{ minHeight: '70vh', alignItems: 'center', justifyContent: 'center' }}>
          <Container>
            {activeStep === 0 && (
              <React.Fragment>
                <Row className="text-center justify-content-center mt-2 fase-1">
                  <Col md={5}>
                    <Select
                      name="marca"
                      placeholder="Marca"
                      options={marca}
                      classe={classes.select}
                      handleChange={handleChange}
                    />
                  </Col>
                  <br />
                  <Col md={5}>
                    <Select
                      name="veiculo"
                      placeholder="Veículo"
                      options={veiculo}
                      classe={classes.select}
                      handleChange={handleChange}
                    />
                  </Col>
                  <br />
                  <Col md={2}>
                    <Select
                      name="modeloeano"
                      placeholder="Modelo"
                      options={modelo}
                      classe={classes.select}
                      handleChange={handleChange}
                    />
                  </Col>
                </Row>
                <br />
                <Row className="text-center justify-content-center mt-0 fase-1 flex-wrap">
                  <Col md={5}>
                    <Button
                      id="BuscaVeiculo"
                      size="lg"
                      block
                      className={classes.bgcontainer}
                      onClick={handleSubmit}
                    >
                      <span>Buscar veículo</span>
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {!!infoTable.length && (
              <Row className="text-center justify-content-center mt-2 fase-1">
                {!!infoTable.length && <AboutCar info={infoTable} />}
              </Row>
            )}
          </Container>
        </div>
        <footer className={`fixed-bottom ${classes.footer}`}>
          <div className="text-center">
            <a href="https://github.com/felipenoka" style={{ color: '#fff' }} className="decoration-none">
              <FontAwesomeIcon
                icon={faGithub}
                color='#fff'
                size='1x'
                className='mr-1' />
              Felipe Noka
            </a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(AppContent);
