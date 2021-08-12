import React from "react";
import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button, Text, TouchableOpacity, View} from "react-native";
import Styles from "../Styles";
import FormTextInput from "../components/FormTextInput";
import ServerConfig from "../../ServerConfig";


export default function RegistrationPage() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [serverError, setServerError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [emailError, setEmailError] = useState()
    const [loading, setLoading] = useState()
    const history = useHistory()
    const classes = Styles()

    const handleSubmit = () => {
        console.log(email)
        console.log(name)
        console.log(password1)
        console.log(password2)

        if (validateEmail(email) && validatePasswords(password1, password2)) {
            setLoading(true)
            const credentials = {
                "email": email,
                "name": name,
                "password": password1
            }
            axios.post(ServerConfig().ip + "/user/register", credentials)
                .then((response) => response.data)
                .then((data) => {
                    setServerError()
                    return data
                })
                .then((data) => {
                    history.push(ServerConfig().ip + "/registration/done")
                    return data
                })
                .catch((error) => {
                    if (error.response?.data?.message !== undefined) {
                        setServerError(error.response.data.message)
                    }
                    console.error(error.response.data.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        console.log(serverError)
        console.log(emailError)
        console.log(passwordError)
    }

    const validateEmail = (email) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setEmailError("Email not valid")
            return false
        }
        setEmailError()
        return true
    }

    const validatePasswords = (password1, password2) => {
        if (password1.length < 8) {
            setPasswordError("Password too short")
            return false
        }
        if (password1.length > 128) {
            setPasswordError("Password too long")
            return false
        }
        if (!/[a-z]/.test(password1)) {
            setPasswordError("lowercase letter required")
            return false
        }
        if (!/[A-Z]/.test(password1)) {
            setPasswordError("uppercase letter required")
            return false
        }
        if (!/\d/.test(password1)) {
            setPasswordError("number required")
            return false
        }
        if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password1)) {
            setPasswordError("special character required")
            return false
        }
        if (password1 !== password2) {
            setPasswordError("Passwords do not match")
            return false
        }

        setPasswordError()
        return true
    }

    return (
        <>
            <View style={classes.card}>
                <Text style={classes.page_title}>
                    Registration
                </Text>
                {serverError && <Text style={classes.error}>{serverError}</Text>}
                <View style={classes.content}>

                    <FormTextInput
                        titleText={"Email"}
                        value={email}
                        onChangeText={setEmail}
                        errorText={emailError}
                        keyboardType={"email-address"}
                        placeholder={"Email"}/>
                    <FormTextInput
                        titleText={"Name"}
                        value={name}
                        onChangeText={setName}
                        placeholder={"Name"}/>
                    <FormTextInput
                        titleText={"Password"}
                        errorText={passwordError}
                        value={password1}
                        onChangeText={setPassword1}
                        secureTextEntry={true}
                        placeholder={"Password"}/>
                    <FormTextInput
                        titleText={"Password"}
                        errorText={passwordError}
                        value={password2}
                        onChangeText={setPassword2}
                        secureTextEntry={true}
                        placeholder={"Password"}/>

                    <TouchableOpacity disabled={loading}
                                      onPress={handleSubmit}
                                      style={classes.button}
                    >
                        <Text style={{textAlign: "center", color: "#ffffff"}}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                </View>
                {loading && <View/>}
            </View>
        </>
    )
}
