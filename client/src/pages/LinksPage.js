import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

const {useState} = require("react");

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const auth = useContext(AuthContext);
    const {request, loading} = useHttp();

    const getLinks = async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setLinks(fetched.links)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect( () => {
        getLinks()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}

export default LinksPage;
