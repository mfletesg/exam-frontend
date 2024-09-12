import { useState } from "react"
import { NavbarComponent } from "./components/NavbarComponent"
import { NavleftComponent } from "./components/NavleftComponent"
import './css/figures.css'

import circle from "/img/circle.svg"
import square from "/img/square.svg"
import triangle from "/img/triangle.svg"
import { fetchData } from "./assets/helpers/fetchData"

interface Circle {
  radiusArea: number | ''
}

interface Square {
  squareBase: number | '',
  squareHeigh: number | '',
}

interface Triangle {
  triangleSide1: number | '',
  triangleSide2: number | '',
  triangleSide3: number | ''
}


export const Figures = () => {


  const [figureType, setFigureType] = useState<number>(1)

  const defaultFormCircle: Circle = {
    radiusArea: ''
  }

  const defaultFormSquare: Square = {
    squareBase: '',
    squareHeigh: '',
  }

  const defaultFormTriangle: Triangle = {
    triangleSide1: '',
    triangleSide2: '',
    triangleSide3: '',
  }

  const [formCircle, setFormCircle] = useState<Circle>(defaultFormCircle)
  const [formSquare, setFormSquare] = useState<Square>(defaultFormSquare)
  const [formTriangle, setFormTriangle] = useState<Triangle>(defaultFormTriangle)


  const [area, setArea] = useState<number>(0)
  const [perimeter, setPerimeter] = useState<number>(0)


  const [message, setMessage] = useState<boolean>(false)




  const handleSelectFigure = (value: number) => {
    setMessage(false)
    switch (value) {
      case 1:
        setFormSquare(defaultFormSquare)
        setFormTriangle(defaultFormTriangle)
        break;

      case 2:
        setFormCircle(defaultFormCircle)
        setFormTriangle(defaultFormTriangle)
        break;

      case 3:
        setFormCircle(defaultFormCircle)
        setFormSquare(defaultFormSquare)
        break;

      default:
        break;
    }

    setFigureType(value)
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: (value: any) => void) => {
    const { name, value } = e.target
    setState((prevValue: any) => ({
      ...prevValue,
      [name]: value
    }));
  };



  const handleCalculate = async () => {
    let url = ''
    let res = null
    switch (figureType) {
      case 1:
        if (formCircle.radiusArea === null || formCircle.radiusArea === '') {
          return false
        }

        url += `circulo?radio=${formCircle.radiusArea}`;
        break;

      case 2:

        if (formSquare.squareBase === null || formSquare.squareBase === '') {
          return false
        }

        if (formSquare.squareHeigh === null || formSquare.squareHeigh === '') {
          return false
        }

        url += `rectangulo?largo=${formSquare.squareBase}&ancho=${formSquare.squareHeigh} `;
        break;

      case 3:

        if (formTriangle.triangleSide1 === null || formTriangle.triangleSide1 === '') {
          return false
        }

        if (formTriangle.triangleSide2 === null || formTriangle.triangleSide2 === '') {
          return false
        }

        if (formTriangle.triangleSide3 === null || formTriangle.triangleSide3 === '') {
          return false
        }

        url += `triangulo?lado1=${formTriangle.triangleSide1}
                          &lado2=${formTriangle.triangleSide2}
                          &lado3=${formTriangle.triangleSide3} `;
        break
      default:
        break;
    }

    res = await fetchData(url, '', 'GET', {});

    if (res.status !== 200) {
      alert('Ocurrio un error en el sistema')
      return false
    }



    setArea(res.data.data.area)
    setPerimeter(res.data.data.perimetro)
    setMessage(true)
  }

  return (
    <>
      <NavbarComponent></NavbarComponent>

      <div className="container-fluid">
        <div className="row">
          <NavleftComponent></NavleftComponent>


          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Examen tecnico</h1>
            </div>


            <div className="text-center">

              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-primary active" onClick={() => handleSelectFigure(1)}>
                  <input
                    type="radio"
                    name="options"
                    id="circle"
                    autoComplete="off"
                    value="1"

                    checked={figureType === 1}
                  /> Circulo
                </label>
                <label className="btn btn-primary" onClick={() => handleSelectFigure(2)}>
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autoComplete="off"
                    value="2"

                    checked={figureType === 2}
                  /> Cuadrado
                </label>
                <label className="btn btn-primary" onClick={() => handleSelectFigure(3)} >
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autoComplete="off"
                    value="3"
                    checked={figureType === 3}
                  /> Triangulo
                </label>
              </div>

              <div className="col-lg-6 col-xxl-4 my-5 mx-auto">

                {
                  figureType === 1 ? (
                    <>
                      <img src={circle} className="rounded mx-auto d-block img-figure" alt="..."></img>
                      <div className="d-grid gap-2">
                        <form action="" className="form-figure">

                          <div className="input-group mb-3 input-group-radius">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Ingresa el radio"
                              aria-label="radius"
                              aria-describedby="basic-addon1"
                              name="radiusArea"
                              onChange={(e) => handleInputChange(e, setFormCircle)}
                            />
                            <span className="input-group-text" id="basic-addon1">cm</span>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : null
                }


                {
                  figureType === 2 ? (
                    <>
                      <img src={square} className="rounded mx-auto d-block img-figure" alt="..."></img>
                      <div className="d-grid gap-2">
                        <form action="" className="form-figure">

                          <div className="input-group mb-3 input-group-radius input-group-radius-figure-type">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Ingresa la base"
                              aria-label="base"
                              aria-describedby="basic-addon1"
                              name="squareBase"
                              onChange={(e) => handleInputChange(e, setFormSquare)}
                            />
                            <span className="input-group-text" id="basic-addon1">cm</span>
                            &nbsp;✖️&nbsp;
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Ingresa la altura"
                              aria-label="heigh"
                              aria-describedby="basic-addon1"
                              name="squareHeigh"
                              onChange={(e) => handleInputChange(e, setFormSquare)}
                            />
                            <span className="input-group-text" id="basic-addon1">cm</span>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : null
                }



                {
                  figureType === 3 ? (
                    <>
                      <img src={triangle} className="rounded mx-auto d-block img-figure" alt="..."></img>
                      <div className="d-grid gap-2">
                        <form action="" className="form-figure">

                          <div className="input-group mb-3 input-group-radius input-group-radius-figure-type">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="lado 1"
                              aria-label="base"
                              aria-describedby="basic-addon1"
                              name="triangleSide1"
                              onChange={(e) => handleInputChange(e, setFormTriangle)}
                            />

                            <span className="input-group-text" id="basic-addon1">cm</span>
                            &nbsp;✖️&nbsp;
                            <input
                              type="number"
                              className="form-control"
                              placeholder="lado 2"
                              aria-label="heigh"
                              aria-describedby="basic-addon1"
                              name="triangleSide2"
                              onChange={(e) => handleInputChange(e, setFormTriangle)}
                            />
                            <span className="input-group-text" id="basic-addon1">cm</span>
                            &nbsp;✖️&nbsp;
                            <input
                              type="number"
                              className="form-control"
                              placeholder="lado 3"
                              aria-label="heigh"
                              aria-describedby="basic-addon1"
                              name="triangleSide3"
                              onChange={(e) => handleInputChange(e, setFormTriangle)}
                            />
                            <span className="input-group-text" id="basic-addon1">cm</span>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : null
                }

                <button type="button" className="btn btn-primary" onClick={handleCalculate}>Calcular</button>


                {
                  message ? (
                    <div className="container">
                      <div className="alert alert-secondary" role="alert">
                        <h3 >El area es de:<b> {area} </b> cm²</h3>
                      </div>
                      <div className="alert alert-secondary" role="alert">
                        <h3 className="jumbotron-heading">El perimetro es de : <b>{perimeter}</b> cm</h3>
                      </div>

                    </div>

                  )
                    :
                    null
                }

              </div>
            </div>
          </main>
        </div>
      </div>


    </>
  )
}
