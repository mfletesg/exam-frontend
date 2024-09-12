import { useEffect, useRef, useState } from "react"
import { fetchData } from "./assets/helpers/fetchData";
import { ModalComponent } from "./components/ModalComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { NavleftComponent } from "./components/NavleftComponent";



interface Employe {
    id?: number,
    name: string,
    identificationNumber: string | null,
    salary: number | null
}



export const Employe = () => {

    const url = 'empleado'
    const [employes, setEmployes] = useState<[]>([])
    const [search, setSearch] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false);


    const formDefault = {
        name: "",
        identificationNumber: null,
        salary: null,
    }

    const [formEmploye, setFormEmploye] = useState<Employe>(formDefault);


    const [modalTitle, setModalTitle] = useState<string>('');



    const [averageSalary, setAverageSalary] = useState<number>(0)
    const [minSalary, setMinSalary] = useState<Employe[]>([])
    const [maxSalary, setMaxSalary] = useState<Employe[]>([])






    const nameRef = useRef<HTMLInputElement>(null);
    const identificationRef = useRef<HTMLInputElement>(null);
    const salaryRef = useRef<HTMLInputElement>(null);

    const handleShowModal = () => {
        setModalTitle('Nuevo Empleado')
        setShowModal(true);
    }
        


    const handleCloseModal = async (value: number) => {
        setMessage("");
        switch (value) {
            case 1:
                setShowModal(false);
                break;

            case 2:
                await createEmploye()
                break;

            default:
                break;
        }

    }



    const getData = async () => {
        const res = await fetchData(url, search, 'GET', {});
        
        if (res) {

            setEmployes(res.data.data.employes)

            console.log(res.data.data.averageSalary);
            
            if (res.data.data.averageSalary !== null) {
                setAverageSalary(res.data.data.averageSalary)
            }

            if (res.data.data.maxSalary) {
                setMaxSalary(res.data.data.maxSalary);
            }

            if (res.data.data.minSalary) {
                setMinSalary(res.data.data.minSalary);
            }


        }
    }

    const createEmploye = async () => {
        setMessage("");
        if (formEmploye.name == '') {
            nameRef.current?.focus();
            return false;
        }

        if (formEmploye.identificationNumber == '' || formEmploye.identificationNumber == null) {
            identificationRef.current?.focus();
            return false;
        }

        if (formEmploye.salary == 0 || formEmploye.salary == null) {
            salaryRef.current?.focus();
            return false;
        }

        const data = {
            name: formEmploye.name,
            identificationNumber: formEmploye.identificationNumber,
            salary: formEmploye.salary
        }
        
        const res = await fetchData(url, '', 'POST', data);

        if (res.status !== 201) {
            setMessage(res.data.message);
            return false
        }

        getData()
        setShowModal(false);
        setFormEmploye(formDefault);
    }

    const onInputChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
    }

    const onChangeSearch = () => {
        setSearch(search)
    }

    useEffect(() => {
        getData();
    }, [search])


    const handleChangeFormEmploye = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormEmploye({
            ...formEmploye,
            [e.target.name]: e.target.value
        })
    }


    const handleDelete = async (id: number) => {
        const res = await fetchData(`${url}/${id}`, '', 'DELETE', {});
        console.log(res);
        getData();
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
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group mr-2">
                                    <button className="btn btn-sm btn-primary" onClick={handleShowModal}>Añadir Nuevo Empleado</button>
                                </div>
                            </div>
                        </div>






                        <div className="row">
                            <div className="col-md-8 order-md-1">
                                <form className="form-inline my-2 my-lg-0">
                                    <input 
                                        className="form-control mr-sm-2"
                                        type="text" 
                                        name="search"
                                        placeholder="Buscar"
                                        aria-label="Search"
                                        onChange={onInputChangeSearch}
                                        autoComplete="off"
                                    />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={onChangeSearch}>Search</button>

                                </form>
                            </div>
                        </div>


                        <br></br>


                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Numero de Identificacion</th>
                                    <th scope="col">Salario</th>
                                    <th scope="col">Accion</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    employes.map((employe: Employe) => (
                                        <tr key={employe.id}>
                                            <th scope="row" >{employe.id}</th>
                                            <td>{employe.name}</td>
                                            <td>{employe.identificationNumber}</td>
                                            <td>
                                                {
                                                    employe.salary !== null ?
                                                        employe.salary.toLocaleString()
                                                        :
                                                        0
                                                } $
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employe.id || 0)} >Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>


                        <div className="card-deck mb-3 text-center">
                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Salario Mas Alto</h4>
                                </div>
                                {
                                    maxSalary.map((employe: Employe) => (
                                        <div className="card-body" key={employe.id}>
                                            <h1 className="card-title pricing-card-title">
                                            {
                                                    employe.salary !== null ? 
                                                        employe.salary.toLocaleString()
                                                        :
                                                        0
                                                }
                                                <small className="text-muted">/ MXN</small>
                                            </h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                                <li>Nombre: {employe.name}</li>
                                                <li>{employe.identificationNumber}</li>
                                            </ul>
                                        </div>
                                    ))
                                }


                            </div>
                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Salario Mas Bajo</h4>
                                </div>
                                {
                                    minSalary.map((employe: Employe) => (
                                        <div className="card-body" key={employe.id}>
                                            <h1 className="card-title pricing-card-title">
                                                {
                                                    employe.salary !== null ? 
                                                        employe.salary.toLocaleString()
                                                        :
                                                        0
                                                }
                                                <small className="text-muted">/ MXN</small>
                                            </h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                                <li>Nombre: {employe.name}</li>
                                                <li>{employe.identificationNumber}</li>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Salario promedio</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$ {averageSalary.toLocaleString()} <small className="text-muted"> MXN</small></h1>
                                </div>
                            </div>
                        </div>





                    </main>
                </div>
            </div>

            <ModalComponent
                title={modalTitle}
                show={showModal}
                onHide={handleCloseModal}
                bodyContent={
                    <>
                        <form autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" className="form-control" id="name" placeholder="" name="name" value={formEmploye.name} onChange={handleChangeFormEmploye} ref={nameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="identificationNumber">Numero de Identificación</label>
                                <input type="string" className="form-control" id="identificationNumber" placeholder="" name="identificationNumber" value={formEmploye.identificationNumber ?? ''} onChange={handleChangeFormEmploye} ref={identificationRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">Salario</label>
                                <input type="number" className="form-control" id="salary" placeholder="" name="salary" value={formEmploye.salary ?? ''} onChange={handleChangeFormEmploye} ref={salaryRef} />
                            </div>
                        </form>
                    </>
                }
                message={message}
            ></ModalComponent>




        </>
    )
}

