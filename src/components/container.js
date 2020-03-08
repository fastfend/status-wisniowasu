import React from "react"
import containerStyles from "../styles/components/container.module.scss"

export default ({ children }) => (
  <div id={containerStyles.container}>{children}</div>
)