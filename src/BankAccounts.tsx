import { useEffect, useRef, useState } from "react";
import { NavbarComponent } from "./components/NavbarComponent"
import { NavleftComponent } from "./components/NavleftComponent"
import { ModalComponent } from "./components/ModalComponent";
import { fetchData } from "./assets/helpers/fetchData";


interface FormAccount {
    id?: number,
    accountType: string,
    accountNumber: string | '',
    amount: number | ''
}


interface Account {
    id?: number,
    tipo_cuenta: string,
    numero_cuenta: string | '',
    saldo: number | ''
}


interface FormAmount {
    accountNumber: string | '',
    amount: number | ''
}



export const BankAccounts = () => {


    const [showModal, setShowModal] = useState<boolean>(false);
    const handleShowModal = () => setShowModal(true);
    const [message, setMessage] = useState<string>("")

    const [messageAmount, setMessageAmount] = useState<string>("")

    const formDefault: FormAccount = {
        accountType: "Cuenta Ahorro",
        accountNumber: '',
        amount: '',
    }

    const formAmountDefault: FormAmount = {
        accountNumber: '',
        amount: '',
    }

    const accountNumberRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);


    const accountNumberInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const [formAccount, setFormAccount] = useState<FormAccount>(formDefault);

    const [accounts, setAccounts] = useState<Account[]>([])


    const [formAmount, setFormAmount] = useState<FormAmount>(formAmountDefault);


    const handleCloseModal = async (value: number) => {
        switch (value) {
            case 1:
                setShowModal(false);
                break;
            case 2:
                await createAccount()
                break;
            default:
                break;
        }
    }

    const handleChangeFormAccount = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormAccount({
            ...formAccount,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeFormAmount = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormAmount({
            ...formAmount,
            [e.target.name]: e.target.value
        })
    }

    const createAccount = async () => {
        setMessage("");
        if (formAccount.accountNumber == '' || formAccount.accountNumber == null) {
            accountNumberRef.current?.focus();
            return false;
        }

        if (formAccount.amount == '' || formAccount.amount == null) {
            amountRef.current?.focus();
            return false;
        }

        const saldo = formAccount.amount.toString();

        const data = {
            tipoCuenta: formAccount.accountType,
            numeroCuenta: formAccount.accountNumber.trim(),
            saldo: parseFloat(saldo)
        }



        const url = 'cuenta'
        const res = await fetchData(url, '', 'POST', data);

        if (res.status !== 201) {
            setMessage(res.data.message);
            return false
        }

        setShowModal(false);
        setFormAccount(formDefault);
        getData()
    }

    const getData = async () => {
        const url = 'cuenta'
        const res = await fetchData(url, '', 'GET', {});

        if (res) {
            setAccounts(res.data.data);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    const handleAmount = async (val: number) => {

        if (formAmount.accountNumber == '' || formAccount.accountNumber == null) {
            accountNumberInputRef.current?.focus();
            return false;
        }

        if (formAmount.amount == '' || formAmount.amount == null) {
            amountInputRef.current?.focus();
            return false;
        }

        let url = ''
        switch (val) {
            case 1: //Depositar
                url = 'cuenta/depositar';
                break;

            case 2: //Retirar
                url = 'cuenta/retirar';
                break;

            default:
                return false;
        }

        const saldo = formAmount.amount.toString();

        const data = {
            numeroCuenta: formAmount.accountNumber.trim(),
            saldo: parseFloat(saldo)
        }

        const res = await fetchData(url, '', 'PUT', data);

        if (res.status !== 200) {
            setMessageAmount(res.data.message);
            return false
        }
        alert(res.data.message)
        getData();
        setMessageAmount("");
        setFormAmount(formAmountDefault)
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
                                    <button className="btn btn-sm btn-primary" onClick={handleShowModal}>Añadir Nueva Cuenta Bancaria</button>
                                </div>
                            </div>
                        </div>

                        <form autoComplete="off">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputaAcountNumber">Numero de Cuenta</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAcountNumber"
                                        name="accountNumber"
                                        onChange={handleChangeFormAmount}
                                        ref={accountNumberInputRef}
                                        value={formAmount.accountNumber}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputaAmount">Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputAmount"
                                        name="amount"
                                        onChange={handleChangeFormAmount}
                                        ref={amountInputRef}
                                        value={formAmount.amount}
                                    />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputState">&nbsp;</label>
                                    <button type="button" className="btn btn-secondary form-control" onClick={() => handleAmount(1)}>Depositar</button>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputState">&nbsp;</label>
                                    <button type="button" className="btn btn-secondary form-control" onClick={() => handleAmount(2)}>Retirar</button>
                                </div>
                            </div>
                        </form>

                        {
                            messageAmount !== "" ? (
                                <div className="alert alert-warning text-center" role="alert">
                                    {messageAmount}
                                </div>
                            )
                                : null
                        }





                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Numero de Cuenta</th>
                                    <th scope="col">Tipo de Cuenta</th>
                                    <th scope="col"  className="text-end">Saldo</th>
                                    {/* <th scope="col">Accion</th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    accounts.map((a: Account) => (
                                        <tr key={a.id}>
                                            <th scope="row" >{a.id}</th>
                                            <td>{a.numero_cuenta}</td>
                                            <td>
                                                {
                                                    a.tipo_cuenta === 'Cuenta Ahorro' ?  
                                                    (
                                                        <a href="#" className="badge badge-primary">{a.tipo_cuenta}</a>
                                                    )
                                                    :
                                                    (
                                                        <a href="#" className="badge badge-secondary ">{a.tipo_cuenta}</a>
                                                    )
                                                }

                                                
                                            </td>
                                            <td className="text-end">{a.saldo} $</td>
                                            {/* <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id || 0)} >Eliminar</button>
                                            </td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </main>
                </div>
            </div>


            <ModalComponent
                title='Nueva cuenta bancaria'
                show={showModal}
                onHide={handleCloseModal}
                bodyContent={
                    <>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Tipo de Cuenta</label>
                                <select
                                    className="form-control"
                                    aria-label="Default select example"
                                    name="accountType"
                                    onChange={handleChangeFormAccount}
                                >
                                    <option value="Cuenta Ahorro">Cuenta Ahorro</option>
                                    <option value="Cuenta Corriente">Cuenta Corriente</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Número de cuenta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountNumber"
                                    placeholder=""
                                    name="accountNumber"
                                    onChange={handleChangeFormAccount}
                                    ref={accountNumberRef}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Saldo Inicial</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    placeholder=""
                                    name="amount"
                                    onChange={handleChangeFormAccount}
                                    ref={amountRef}
                                />
                            </div>
                        </form>
                    </>
                }
                message={message}
            ></ModalComponent>
        </>
    )
}
