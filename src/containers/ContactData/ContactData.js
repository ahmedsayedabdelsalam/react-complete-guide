import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import classes from './ContactData.module.css'
import Button from '../../components/UI/Button/Button'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from '../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Your Name',
                    type: 'text',
                    name: 'name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Street',
                    type: 'text',
                    name: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Zip Code',
                    type: 'text',
                    name: 'zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 6,
                    minLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Country',
                    type: 'text',
                    name: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Your Email',
                    type: 'email',
                    name: 'name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                inputType: 'select',
                inputConfig: {
                    options: [
                        { name: 'fastest', displayName: 'Fastest' },
                        { name: 'cheapest', displayName: 'Cheapest' },
                    ],
                    name: 'deliverymethod'
                },
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = () => {
        this.setState({ loading: true });

        const orderData = {};
        if (this.state.hasOwnProperty('orderForm')) {
            for (let inputId in this.state.orderForm) {
                if (this.state.orderForm.hasOwnProperty(inputId)) {
                    orderData[inputId] = this.state.orderForm[inputId].value;
                }
            }
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: orderData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                console.log(response);
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error)
            })
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }

        return isValid;
    }

    checkTheWholeFormValidity(form) {
        let formIsValid = true;
        for (let input in form) {
            if (form.hasOwnProperty(input) && form[input].hasOwnProperty('valid')) {
                formIsValid = form[input].valid && formIsValid
            }
        }
        return formIsValid;
    }

    inputChangedHandler = (event, inputId) => {
        // clone orderForm object
        const updatedOrderForm = { ...this.state.orderForm };
        // clone selected input object
        const updatedInput = { ...updatedOrderForm[inputId] };
        // updated clone version of the selected object value with the new value
        updatedInput.value = event.target.value;
        // check value validity and updated input validity status
        if (updatedInput.hasOwnProperty('validation'))
            updatedInput.valid = this.checkValidity(updatedInput.value, updatedInput.validation);
        // update touched key to be true
        updatedInput.touched = true;
        // update the clone version of the orderForm object
        updatedOrderForm[inputId] = updatedInput;
        // check the whole form validity
        const formIsValid = this.checkTheWholeFormValidity(updatedOrderForm);
        // update the state of orderForm with new object
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };

    render() {
        const formInputArray = [];
        if (this.state.hasOwnProperty('orderForm')) {
            for (let input in this.state.orderForm) {
                if (this.state.orderForm.hasOwnProperty(input)) {
                    formInputArray.push({
                        id: input,
                        config: this.state.orderForm[input]
                    })
                }
            }
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formInputArray.map(input => (
                        <Input changed={(event) => this.inputChangedHandler(event, input.id)} key={input.id}
                               inputType={input.config.inputType} inputConfig={input.config.inputConfig}
                               value={input.config.value} invalid={!input.config.valid}
                               shouldValidate={input.config.validation} touched={input.config.touched}/>
                    ))
                }
                <Button disabled={!this.state.formIsValid} type="success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.contactData}>
                <h3>Enter Contact Data</h3>
                {form}
            </div>
        )
    }
}

export default withErrorHandler(withRouter(ContactData), axios)