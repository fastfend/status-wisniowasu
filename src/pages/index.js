import React from "react"
import "../styles/pages/index.scss"
import Container from "../components/container"
import TitleBox from "../components/titlebox"
import Footer from "../components/footer"
import StatusBoxContainer from "../components/statusboxContainer"

export default ({ data }) => (
        <Container>
            <TitleBox/>
            <StatusBoxContainer/>
            <Footer/>
        </Container>
)